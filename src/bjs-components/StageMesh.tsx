import { TransformNode, Vector3 } from "@babylonjs/core";
import { useMemo, useRef } from "react";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { maxFogDistance } from "../tempConstants";
import { StageDefinition } from "../types/gameDefinition/GameDefinition";
import { MeshFromAssetDefinition } from "./MeshFromAssetDefinition";

interface StageMeshProps {
    stageDefinition: StageDefinition;
}

const velocity = new Vector3(0, 0, 10);

export const StageMesh: React.FC<StageMeshProps> = ({ stageDefinition }) => {
    const numMeshes = useMemo(() => {
        return stageDefinition.stageMeshes.length;
    }, [stageDefinition]);

    const positions = useMemo(() => {
        let curLen = -1 * stageDefinition.stageMeshes[0].length;
        const _positions: Vector3[] = [];
        for (let i = 0; i < numMeshes; i++) {
            _positions.push(new Vector3(0, 0, curLen));
            curLen += stageDefinition.stageMeshes[i].length;
        }
        for (let i = 0; i < numMeshes; i++) {
            _positions.push(new Vector3(0, 0, curLen));
            curLen += stageDefinition.stageMeshes[i].length;
        }
        return _positions;
    }, [numMeshes, stageDefinition]);

    const transformNodeRef = useRef<TransformNode>(null);

    useDeltaBeforeRender((scene, deltaS) => {
        if (!transformNodeRef.current) return;

        transformNodeRef.current.position.addInPlace(velocity.scale(-deltaS));

        if (transformNodeRef.current.position.z < -(positions[positions.length - 1].z - maxFogDistance)) {
            transformNodeRef.current.position.z += positions[positions.length - 1].z;
        }
    });

    return (
        <transformNode name="repeatingArena" ref={transformNodeRef}>
            {stageDefinition.stageMeshes.map((mesh, i) => (
                <MeshFromAssetDefinition
                    key={i}
                    name={`sceneMeshBlock0-${i}`}
                    assetDefinition={mesh.asset}
                    position={positions[i]}
                />
            ))}
            {stageDefinition.stageMeshes.map((mesh, i) => (
                <MeshFromAssetDefinition
                    key={numMeshes + i}
                    name={`sceneMeshBlock1-${i}`}
                    assetDefinition={mesh.asset}
                    position={positions[numMeshes + i]}
                />
            ))}
        </transformNode>
    );
};
