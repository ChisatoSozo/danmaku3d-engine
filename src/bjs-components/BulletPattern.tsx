import { Effect, Mesh, ShaderMaterial, TransformNode } from "@babylonjs/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useScene } from "react-babylonjs";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { useBulletPatternAsset } from "../loaders/bulletPatternLoader";
import { useGLSLAsset } from "../loaders/glslLoader";
import { useTimingAsset } from "../loaders/timingsLoader";
import { useVectorAsset } from "../loaders/vectorLoader";
import { BulletPatternAssetDefinition } from "../types/gameDefinition/AssetDefinition";
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
    vec3 instPos = texture(positionSampler, vec2(u, v)).xyz;
    vec3 instVel = texture(velocitySampler, vec2(u, v)).xyz;

    mat3 rotation;
    makeRotation(normalize(instVel), rotation);
    vec4 rotatedVert = vec4(rotation * position, 1.0 );

    vec4 totalPosition = vec4(rotatedVert.xyz + instPos, 1.0);

    vPositionW = totalPosition.xyz;
    vNormalW = rotation * normal;
    
    gl_Position = worldViewProjection * totalPosition;
}
`;

interface BulletPatternComponentProps {
    bulletPatternDefinition: BulletPatternAssetDefinition;
}

export const BulletPatternComponent: React.FC<BulletPatternComponentProps> = ({ bulletPatternDefinition }) => {
    const scene = useScene();
    const bulletPatternAsset = useBulletPatternAsset(bulletPatternDefinition);

    const bulletMaterialAsset = useGLSLAsset(bulletPatternAsset.material);

    const positionShader = useGLSLAsset(bulletPatternAsset.positionFunctionGLSL);
    const velocityShader = useGLSLAsset(bulletPatternAsset.velocityFunctionGLSL);
    const collisionShader = useGLSLAsset(bulletPatternAsset.collisionFunctionGLSL);

    const _startPositionsState = useVectorAsset(bulletPatternAsset._startPositionsState);
    const _startVelocitiesState = useVectorAsset(bulletPatternAsset._startVelocitiesState);
    const _startCollisionsState = useVectorAsset(bulletPatternAsset._startCollisionsState);

    const initialPositionSampler = useVectorAsset(bulletPatternAsset.initialPositions);
    const initialVelocitiesSampler = useVectorAsset(bulletPatternAsset.initialVelocities);

    const timingsAsset = useTimingAsset(bulletPatternAsset.timings);

    const [mesh, setMesh] = useState<Mesh>();
    const [material, setMaterial] = useState<ShaderMaterial>();

    const count = useMemo(
        () => bulletPatternAsset.initialPositions.generator._count,
        [bulletPatternAsset.initialPositions.generator._count]
    );
    const downsampleCollisions = useMemo(
        () => bulletPatternAsset.downsampleCollisions,
        [bulletPatternAsset.downsampleCollisions]
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
            startPositionsState: _startPositionsState,
            startVelocitiesState: _startVelocitiesState,
            startCollisionsState: _startCollisionsState,
            positionShader,
            velocityShader,
            collisionShader,
            downsampleCollisions,
            scene,
            initialValuesFunction: (texture) => {
                texture.setTexture("initialPositionSampler", initialPositionSampler);
                texture.setTexture("initialVelocitySampler", initialVelocitiesSampler);
                texture.setTexture("timingsSampler", timingsAsset);
                texture.setFloat("timeSinceStart", timeSinceStart.current);
            },
        });
    }, [
        collisionShader,
        count,
        downsampleCollisions,
        initialPositionSampler,
        initialVelocitiesSampler,
        positionShader,
        scene,
        _startCollisionsState,
        _startPositionsState,
        _startVelocitiesState,
        timingsAsset,
        velocityShader,
    ]);

    useEffect(() => {
        if (!scene) return;
        if (!bulletMaterialAsset) return;
        if (!mesh) return;

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
        material.setTexture("positionSampler", _startPositionsState);
        material.setTexture("velocitySampler", _startVelocitiesState);
        material.setTexture("collisionSampler", _startCollisionsState);
        material.setFloat("timeSinceStart", timeSinceStart.current);

        makeInstances(mesh, bulletPatternAsset.initialPositions.generator._count);

        mesh.material = material;

        setMaterial(material);
    }, [
        _startCollisionsState,
        _startPositionsState,
        _startVelocitiesState,
        bulletMaterialAsset,
        bulletPatternAsset.initialPositions.generator._count,
        mesh,
        scene,
    ]);

    useDeltaBeforeRender((scene, deltaS) => {
        if (!differentialPositionVelocityCollisionSystem) return;
        if (!material) return;
        timeSinceStart.current += deltaS;
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
        const oldDiffSystem = differentialPositionVelocityCollisionSystem;
        return () => {
            if (oldDiffSystem) oldDiffSystem.dispose();
        };
    }, [differentialPositionVelocityCollisionSystem]);

    useEffect(() => {
        const oldMaterial = material;
        return () => {
            if (oldMaterial) oldMaterial.dispose();
        };
    }, [material]);

    return <MeshFromAssetDefinition onMeshLoaded={setRootNodes} name="" assetDefinition={bulletPatternAsset.mesh} />;
};
