import { Mesh, ShaderMaterial, TransformNode } from "@babylonjs/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useScene } from "react-babylonjs";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { useBulletPatternAsset } from "../loaders/bulletPatternLoader";
import { useGLSLAsset } from "../loaders/glslLoader";
import { useTimingAsset } from "../loaders/timingsLoader";
import { useVectorAsset } from "../loaders/vectorLoader";
import { BulletPatternAssetDefinition } from "../types/gameDefinition/AssetDefinition";
import { findMeshChild, makeInstances } from "../utils/BabylonUtils";
import DifferentialPositionVelocityCollisionSystem from "../utils/DifferentialPositionVelocityCollisionSystem";
import { MeshFromAssetDefinition } from "./MeshFromAssetDefinition";

interface BulletPatternComponentProps {
    bulletPatternDefinition: BulletPatternAssetDefinition;
}

const bulletMaterialAssetVersions: { [key: string]: number } = {};

export const BulletPatternComponent: React.FC<BulletPatternComponentProps> = ({ bulletPatternDefinition }) => {
    const scene = useScene();
    const bulletPatternAsset = useBulletPatternAsset(bulletPatternDefinition);

    const bulletVertexAsset = useGLSLAsset(bulletPatternAsset.vertex);
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
        rootNodes.forEach((node, i) => {
            if (i !== 0) {
                node.dispose();
            }
        });
        rootNodes[0].getChildMeshes().forEach((node, i) => {
            if (i !== 0) {
                node.dispose();
            }
        });
        mesh.parent = null;
        setMesh(mesh);
    }, []);

    const timeSinceStart = useRef(0.001);

    const dpvcsMaterial = useMemo(() => {
        if (!scene) return;
        if (!scene) return;
        if (!bulletMaterialAsset) return;
        if (!mesh) return;

        const newVersion = bulletMaterialAssetVersions[bulletMaterialAsset.shader] ?? 0;
        bulletMaterialAssetVersions[bulletMaterialAsset.shader] = newVersion + 1;

        const material = new ShaderMaterial(
            "",
            scene,
            {
                vertex: bulletVertexAsset.shader,
                fragment: bulletMaterialAsset.shader,
            },
            {
                attributes: ["position", "normal", "uv", "world0", "world1", "world2", "world3"],
                uniforms: ["worldView", "worldViewProjection", "view", "projection", "direction", "cameraPosition"],
                defines: ["#define SHADER_VERSION " + bulletMaterialAssetVersions[bulletMaterialAsset.shader]],
            }
        );
        material.setTexture("positionSampler", _startPositionsState);
        material.setTexture("velocitySampler", _startVelocitiesState);
        material.setTexture("collisionSampler", _startCollisionsState);
        material.setFloat("timeSinceStart", timeSinceStart.current);

        makeInstances(mesh, bulletPatternAsset.initialPositions.generator._count);

        mesh.material = material;

        return {
            dpvcs: new DifferentialPositionVelocityCollisionSystem({
                num: count,
                startPositionsState: _startPositionsState,
                startVelocitiesState: _startVelocitiesState,
                startCollisionsState: _startCollisionsState,
                positionShader: positionShader.shader,
                velocityShader: velocityShader.shader,
                collisionShader: collisionShader.shader,
                downsampleCollisions,
                scene,
                initialValuesFunction: (texture) => {
                    texture.setTexture("initialPositionSampler", initialPositionSampler);
                    texture.setTexture("initialVelocitySampler", initialVelocitiesSampler);
                    texture.setTexture("timingsSampler", timingsAsset);
                    texture.setFloat("timeSinceStart", timeSinceStart.current);
                },
            }),
            material,
        };
    }, [
        scene,
        bulletMaterialAsset,
        mesh,
        bulletVertexAsset,
        _startPositionsState,
        _startVelocitiesState,
        _startCollisionsState,
        bulletPatternAsset,
        count,
        positionShader,
        velocityShader,
        collisionShader,
        downsampleCollisions,
        initialPositionSampler,
        initialVelocitiesSampler,
        timingsAsset,
    ]);

    useDeltaBeforeRender((scene, deltaS) => {
        if (!dpvcsMaterial) return;
        timeSinceStart.current += deltaS;
        const updateResult = dpvcsMaterial.dpvcs.update(deltaS, (texture) => {
            texture.setFloat("timeSinceStart", timeSinceStart.current);
        });

        if (!updateResult) return;

        const [newPositions, newVelocities, newCollisions] = updateResult;

        dpvcsMaterial.material.setTexture("positionSampler", newPositions);
        dpvcsMaterial.material.setTexture("velocitySampler", newVelocities);
        dpvcsMaterial.material.setTexture("collisionSampler", newCollisions);
        dpvcsMaterial.material.setFloat("timeSinceStart", timeSinceStart.current);
    });

    useEffect(() => {
        const oldDpvcsMaterial = dpvcsMaterial;
        return () => {
            if (oldDpvcsMaterial?.dpvcs) oldDpvcsMaterial.dpvcs.dispose();
            if (oldDpvcsMaterial?.material) oldDpvcsMaterial.material.dispose();
        };
    }, [dpvcsMaterial]);

    return <MeshFromAssetDefinition onMeshLoaded={setRootNodes} name="" assetDefinition={bulletPatternAsset.mesh} />;
};
