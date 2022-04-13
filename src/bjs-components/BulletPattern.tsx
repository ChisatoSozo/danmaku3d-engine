import { Effect, Mesh, ShaderMaterial, TransformNode } from "@babylonjs/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useScene } from "react-babylonjs";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { useGLSLAsset } from "../loaders/glslLoader";
import { useTimingAsset } from "../loaders/timingsLoader";
import { useVectorAsset } from "../loaders/vectorLoader";
import { BulletPatternDefinition } from "../types/gameDefinition/BulletPatternDefinition";
import { findMeshChild, glsl, makeInstances } from "../utils/BabylonUtils";
import DifferentialPositionVelocityCollisionSystem from "../utils/DifferentialPositionVelocityCollisionSystem";
import { MeshFromAssetDefinition } from "./MeshFromAssetDefinition";

Effect.ShadersStore["customVertexShader"] = glsl`
#include<instancesDeclaration>
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 worldViewProjection;
varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec2 vUV;

uniform sampler2D positionSampler;
uniform sampler2D velocitySampler;
uniform sampler2D timingsSampler;
uniform sampler2D endTimingsSampler;

uniform float timeSinceStart;
uniform float disableWarning;
uniform float radius;
uniform float warning;

varying float dTiming;

#include<helperFunctions>

void makeRotation(in vec3 direction, out mat3 rotation)
{
    vec3 xaxis = cross(vec3(0., 1., 0.), direction);
    xaxis = normalize(xaxis);

    vec3 yaxis = cross(direction, xaxis);
    yaxis = normalize(yaxis);

    rotation = mat3(xaxis, yaxis, direction);
}

void main() {
    int instance = gl_InstanceID;
    int width = textureSize(positionSampler, 0).x;
    int x = instance % width;
    int y = instance / width;                            // integer division
    float u = (float(x) + 0.5) / float(width);           // map into 0-1 range
    float v = (float(y) + 0.5) / float(width);
    vec4 instPos = texture(positionSampler, vec2(u, v));
    vec4 instVel = texture(velocitySampler, vec2(u, v));
    vec4 timingPosition = texture2D( timingsSampler, vec2(u, v));
    vec4 endTimingPosition = texture2D( endTimingsSampler, vec2(u, v) );
    float timing = timingPosition.w;

    mat3 rotation;
    makeRotation(normalize(vec3(instVel)), rotation);
    vec4 rotatedVert = vec4(rotation * position, 1.0 );

    dTiming = timeSinceStart - timing;

    float size = (warning - clamp(dTiming, 0.0, warning)) / warning;
    size *= (1. - disableWarning);
    float hasEnded = float(dTiming > endTimingPosition.w);

    rotatedVert *= size * 3. + 1.;
    rotatedVert *= (1. - hasEnded);
    rotatedVert *= radius;

    vec4 totalPosition = vec4(rotatedVert.xyz + instPos.xyz, 1.0);

    vPositionW = totalPosition.xyz;
    vNormalW = rotation * normal;
    
    gl_Position = worldViewProjection * totalPosition;
}
`;

interface BulletPatternProps {
    bulletPatternDefinition: BulletPatternDefinition;
}

export const BulletPattern: React.FC<BulletPatternProps> = ({ bulletPatternDefinition }) => {
    const scene = useScene();
    const bulletMaterialAsset = useGLSLAsset(bulletPatternDefinition.material.asset);

    const positionShader = useGLSLAsset(bulletPatternDefinition.positionFunctionGLSL.asset);
    const velocityShader = useGLSLAsset(bulletPatternDefinition.velocityFunctionGLSL.asset);
    const collisionShader = useGLSLAsset(bulletPatternDefinition.collisionFunctionGLSL.asset);

    const startPositionsState = useVectorAsset(bulletPatternDefinition._startPositionsState.asset);
    const startVelocitiesState = useVectorAsset(bulletPatternDefinition._startVelocitiesState.asset);

    const initialPositionSampler = useVectorAsset(bulletPatternDefinition.initialPositions.asset);
    const initialVelocitiesSampler = useVectorAsset(bulletPatternDefinition.initialVelocities.asset);
    const startCollisionsState = useVectorAsset(bulletPatternDefinition._initialCollisions.asset);
    const timingsAsset = useTimingAsset(bulletPatternDefinition.timings.asset);
    const endTimingsAsset = useTimingAsset(bulletPatternDefinition.endTimings.asset);

    const [mesh, setMesh] = useState<Mesh>();
    const [material, setMaterial] = useState<ShaderMaterial>();

    const count = useMemo(
        () => bulletPatternDefinition.initialPositions.asset.generator.count,
        [bulletPatternDefinition.initialPositions.asset.generator.count]
    );
    const downsampleCollisions = useMemo(
        () => bulletPatternDefinition.downsampleCollisions,
        [bulletPatternDefinition.downsampleCollisions]
    );

    const setRootNodes = useCallback((rootNodes: TransformNode[]) => {
        if (rootNodes.length > 1) {
            throw new Error("BulletPattern: Only one root node is supported");
        }
        const mesh = findMeshChild(rootNodes[0]);
        if (!mesh) {
            throw new Error("BulletPattern: No mesh found");
        }
        setMesh(mesh);
    }, []);

    const timeSinceStart = useRef(0.001);

    const differentialPositionVelocityCollisionSystem = useMemo(() => {
        if (!scene) return;
        return new DifferentialPositionVelocityCollisionSystem({
            num: count,
            startPositionsState,
            startVelocitiesState,
            startCollisionsState,
            positionShader,
            velocityShader,
            collisionShader,
            downsampleCollisions,
            scene,
            initialValuesFunction: (texture) => {
                texture.setTexture("initialPositionSampler", initialPositionSampler);
                texture.setTexture("initialVelocitySampler", initialVelocitiesSampler);
                texture.setTexture("timingsSampler", timingsAsset);
                texture.setTexture("endTimingsSampler", endTimingsAsset);
                texture.setFloat("timeSinceStart", timeSinceStart.current);
            },
        });
    }, [
        collisionShader,
        count,
        downsampleCollisions,
        endTimingsAsset,
        initialPositionSampler,
        initialVelocitiesSampler,
        positionShader,
        scene,
        startCollisionsState,
        startPositionsState,
        startVelocitiesState,
        timingsAsset,
        velocityShader,
    ]);

    useEffect(() => {
        if (!scene) return;
        if (!bulletMaterialAsset) return;
        if (!mesh) return;

        console.log(bulletMaterialAsset);
        console.log(Effect.ShadersStore[bulletMaterialAsset]);

        const material = new ShaderMaterial(
            "",
            scene,
            {
                vertex: "custom",
                fragment: bulletMaterialAsset.replace("FragmentShader", ""),
            },
            {
                attributes: ["position", "normal", "uv", "world0", "world1", "world2", "world3"],
                uniforms: ["worldView", "worldViewProjection", "view", "projection", "direction", "cameraPosition"],
            }
        );

        makeInstances(mesh, bulletPatternDefinition.initialPositions.asset.generator.count);

        mesh.material = material;

        setMaterial(material);
    }, [bulletMaterialAsset, bulletPatternDefinition.initialPositions.asset.generator.count, mesh, scene]);

    useDeltaBeforeRender((scene, deltaS) => {
        if (!differentialPositionVelocityCollisionSystem) return;
        if (!material) return;
        const updateResult = differentialPositionVelocityCollisionSystem.update(deltaS, (texture) => {
            texture.setFloat("timeSinceStart", timeSinceStart.current);
        });

        if (!updateResult) return;

        const [newPositions, newVelocities, newCollisions] = updateResult;

        material.setTexture("positionSampler", newPositions);
        material.setTexture("velocitySampler", newVelocities);
        material.setTexture("collisionSampler", newCollisions);
        material.setFloat("timeSinceStart", timeSinceStart.current);
    });

    useEffect(() => {
        return () => {
            if (differentialPositionVelocityCollisionSystem) differentialPositionVelocityCollisionSystem.dispose();
            if (material) material.dispose();
        };
    }, [differentialPositionVelocityCollisionSystem, material]);

    return (
        <MeshFromAssetDefinition
            onMeshLoaded={setRootNodes}
            name=""
            assetDefinition={bulletPatternDefinition.mesh.asset}
        />
    );
};
