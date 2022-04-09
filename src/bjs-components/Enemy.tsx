import { TransformNode, Vector3 } from "@babylonjs/core";
import React, { useRef, useState } from "react";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { useExecutor } from "../hooks/useExecutor";
import { EnemyInstruction } from "../types/gameDefinition/EnemyDefinition";
import { SpawnEnemyInstruction } from "../types/gameDefinition/GameDefinition";
import { MeshFromAssetDefinition } from "./MeshFromAssetDefinition";

interface EnemyProps {
    enemyInstruction: SpawnEnemyInstruction;
}

const useMovement = (
    movementInstruction: EnemyInstruction | undefined,
    transformNodeRef: React.RefObject<TransformNode>
) => {
    useDeltaBeforeRender((scene, deltaS) => {
        if (!deltaS) return;
        if (!movementInstruction) return;
        if (!transformNodeRef.current) return;
        const transformNode = transformNodeRef.current;
        if (movementInstruction.type === "moveTo") {
            const target = new Vector3(
                movementInstruction.position.x,
                movementInstruction.position.y,
                movementInstruction.position.z
            );
            const distance = target.subtract(transformNode.position).length();
            if (distance < deltaS * movementInstruction.speed) {
                transformNode.position.copyFrom(target);
            }

            transformNode.position.addInPlace(
                target.subtract(transformNode.position).scale(deltaS * movementInstruction.speed)
            );
        }
    });
};

export const Enemy: React.FC<EnemyProps> = ({ enemyInstruction }) => {
    const transformNodeRef = useRef<TransformNode>(null);

    const [movementInstruction, setMovementInstruction] = useState<EnemyInstruction>();

    useExecutor((instruction: EnemyInstruction) => {
        if (instruction.type === "moveTo") {
            setMovementInstruction(instruction);
        }
    }, enemyInstruction.instructions);

    useMovement(movementInstruction, transformNodeRef);

    return (
        <transformNode name="" ref={transformNodeRef}>
            <transformNode name="" rotation-y={Math.PI}>
                <MeshFromAssetDefinition name="" assetDefinition={enemyInstruction.asset} />
            </transformNode>
        </transformNode>
    );
};
