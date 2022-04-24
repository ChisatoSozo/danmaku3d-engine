import { Matrix, Mesh, Quaternion, ShaderMaterial, TransformNode, Vector3 } from "@babylonjs/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useScene } from "react-babylonjs";
import { globalUniformRefs } from "../containers/GlobalUniforms";
import { CustomFloatProceduralTexture } from "../forks/CustomFloatProceduralTexture";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { useNormalizedFrameSkipRef } from "../hooks/useNormalizedFrameSkipRef";
import { useBulletPatternAsset } from "../loaders/bulletPatternLoader";
import { useGLSLAsset } from "../loaders/glslLoader";
import { useTimingAsset } from "../loaders/timingsLoader";
import { useVectorAsset } from "../loaders/vectorLoader";
import { BulletPatternAssetDefinition } from "../types/gameDefinition/AssetDefinition";
import { findMeshChild, makeInstances } from "../utils/BabylonUtils";
import DifferentialPositionVelocityCollisionSystem from "../utils/DifferentialPositionVelocityCollisionSystem";
import { MAX_ACTIVE_ENEIMIES } from "../utils/EngineConstants";
import { MeshFromAssetDefinition } from "./MeshFromAssetDefinition";
import { makeClickParticles } from "./wordfind-vr-particles.ts/clickParticles";

interface BulletPatternComponentProps {
    bulletPatternDefinition: BulletPatternAssetDefinition;
}

const bulletMaterialAssetVersions: { [key: string]: number } = {};

const bindGlobalUniformRefs = (bindTo: ShaderMaterial | CustomFloatProceduralTexture) => {
    bindTo.setVector3("playerPosition", globalUniformRefs.playerPosition);
    bindTo.setFloat("greyscaleDistance", globalUniformRefs.greyscaleDistance);
    bindTo.setFloat("firing", globalUniformRefs.firing);

    const enemyPositionArray = globalUniformRefs.enemies
        .map((enemy) => [enemy.position.x, enemy.position.y, enemy.position.z])
        .flat();
    const enemyRadiiArray = globalUniformRefs.enemies.map((enemy) => enemy.radius);
    bindTo.setFloats("enemyPositions", enemyPositionArray);
    bindTo.setFloats("enemyRadii", enemyRadiiArray);
};

interface FrameStateUniforms {
    timeSinceStart: number;
    parentWorldMatrix: Matrix;
    fireRate: number;
}

const bindFrameStateUniforms = (
    bindTo: ShaderMaterial | CustomFloatProceduralTexture,
    { timeSinceStart, parentWorldMatrix, fireRate }: FrameStateUniforms
) => {
    const position = new Vector3();
    const rotation = new Quaternion();
    const scale = new Vector3();
    parentWorldMatrix.decompose(scale, rotation, position);

    bindTo.setFloat("timeSinceStart", timeSinceStart);
    bindTo.setVector3("parentPosition", position);

    const forward = Vector3.Forward().rotateByQuaternionToRef(rotation, Vector3.Zero());

    bindTo.setVector3("parentForward", forward);
    bindTo.setFloat("fireRate", Number(fireRate.toPrecision(1)));
};

interface InitialStateUniforms {
    size: number;
    fireVelocity: number;
}

const bindInitialStateUniforms = (
    bindTo: ShaderMaterial | CustomFloatProceduralTexture,
    { size, fireVelocity }: InitialStateUniforms
) => {
    bindTo.setFloat("size", size);
    bindTo.setFloat("fireVelocity", fireVelocity);
};

interface PlayerBulletCollision {
    enemyIndex: number;
    enemyPosition: Vector3;
}

const readPlayerBulletCollisions = (collisions: Float32Array) => {
    const collisionsOut: PlayerBulletCollision[] = [];
    for (let i = 0; i < collisions.length; i += 4) {
        const enemyIndex = collisions[i + 3];
        if (enemyIndex) {
            const enemyPosition = new Vector3(collisions[i], collisions[i + 1], collisions[i + 2]);
            collisionsOut.push({ enemyIndex: enemyIndex - MAX_ACTIVE_ENEIMIES, enemyPosition });
        }
    }
    return collisionsOut;
};

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
    const transformNodeRef = useRef<TransformNode>();

    const _fireRate = useMemo(() => {
        return bulletPatternAsset.bulletPatternType === "player" ? bulletPatternAsset.fireRate : 0;
    }, [bulletPatternAsset]);

    const fireVelocity = useMemo(() => {
        return bulletPatternAsset.bulletPatternType === "player" ? bulletPatternAsset.fireVelocity : 0;
    }, [bulletPatternAsset]);

    const frameSkipRef = useNormalizedFrameSkipRef(60 / _fireRate);

    const count = useMemo(
        () => bulletPatternAsset.initialPositions.generator._count,
        [bulletPatternAsset.initialPositions.generator._count]
    );
    const downsampleCollisions = useMemo(
        () => bulletPatternAsset._downsampleCollisions,
        [bulletPatternAsset._downsampleCollisions]
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
        mesh.position.copyFromFloats(0, 0, 0);
        mesh.rotation.copyFromFloats(0, 0, 0);
        mesh.scaling.copyFromFloats(1, 1, 1);
        setMesh(mesh);
    }, []);

    const timeSinceStart = useRef(0.001);

    const dpvcsMaterial = useMemo(() => {
        if (!scene) return;
        if (!scene) return;
        if (!bulletMaterialAsset) return;
        if (!mesh) return;
        const parent = transformNodeRef.current;
        if (!parent) return;

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

        bindInitialStateUniforms(material, {
            size: bulletPatternAsset.size,
            fireVelocity,
        });

        bindFrameStateUniforms(material, {
            timeSinceStart: timeSinceStart.current,
            parentWorldMatrix: parent.getWorldMatrix(),
            fireRate: 1 / frameSkipRef.current,
        });

        bindGlobalUniformRefs(material);

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

                    bindInitialStateUniforms(texture, {
                        size: bulletPatternAsset.size,
                        fireVelocity,
                    });

                    bindFrameStateUniforms(texture, {
                        timeSinceStart: timeSinceStart.current,
                        parentWorldMatrix: parent.getWorldMatrix(),
                        fireRate: 1 / frameSkipRef.current,
                    });

                    bindGlobalUniformRefs(texture);
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
        frameSkipRef,
        count,
        positionShader,
        velocityShader,
        collisionShader,
        downsampleCollisions,
        initialPositionSampler,
        initialVelocitiesSampler,
        timingsAsset,
        fireVelocity,
    ]);

    useDeltaBeforeRender((scene, deltaS) => {
        if (!dpvcsMaterial) return;
        const parent = transformNodeRef.current;
        if (!parent) return;
        timeSinceStart.current += deltaS;
        const updateResult = dpvcsMaterial.dpvcs.update(deltaS, (texture) => {
            bindFrameStateUniforms(texture, {
                timeSinceStart: timeSinceStart.current,
                parentWorldMatrix: parent.getWorldMatrix(),
                fireRate: 1 / frameSkipRef.current,
            });
            bindGlobalUniformRefs(texture);
        });

        if (!updateResult) return;

        const [newPositions, newVelocities, newCollisions] = updateResult;

        newCollisions.readPixelsAsync()?.then((collisions) => {
            if (bulletPatternAsset.bulletPatternType === "player") {
                const collisionResults = readPlayerBulletCollisions(collisions);
                collisionResults.forEach((result) => {
                    globalUniformRefs.enemies[result.enemyIndex].health -= bulletPatternAsset.value;
                    makeClickParticles(scene, [result.enemyPosition]);
                });
            }
        });

        dpvcsMaterial.material.setTexture("positionSampler", newPositions);
        dpvcsMaterial.material.setTexture("velocitySampler", newVelocities);
        dpvcsMaterial.material.setTexture("collisionSampler", newCollisions);
        bindFrameStateUniforms(dpvcsMaterial.material, {
            timeSinceStart: timeSinceStart.current,
            parentWorldMatrix: parent.getWorldMatrix(),
            fireRate: 1 / frameSkipRef.current,
        });
        bindGlobalUniformRefs(dpvcsMaterial.material);
    });

    useEffect(() => {
        const oldDpvcsMaterial = dpvcsMaterial;
        return () => {
            if (oldDpvcsMaterial?.dpvcs) oldDpvcsMaterial.dpvcs.dispose();
            if (oldDpvcsMaterial?.material) oldDpvcsMaterial.material.dispose();
        };
    }, [dpvcsMaterial]);

    useEffect(() => {
        const oldMesh = mesh;
        return () => {
            if (oldMesh) oldMesh.dispose();
        };
    }, [mesh]);

    return (
        <>
            <transformNode name="" ref={transformNodeRef} />
            <MeshFromAssetDefinition onMeshLoaded={setRootNodes} name="" assetDefinition={bulletPatternAsset.mesh} />
        </>
    );
};
