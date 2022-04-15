import { TransformNode, Vector3 } from "@babylonjs/core";
import React, { useRef, useState } from "react";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { useExecutor } from "../hooks/useExecutor";
import { useVectorMemo } from "../hooks/useVectorMemo";
import {
    EnemyAttackInstruction,
    EnemyInstruction,
    EnemyMoveToInstruction,
} from "../types/gameDefinition/EnemyDefinition";
import { SpawnEnemyInstruction } from "../types/gameDefinition/GameDefinition";
import { KeyedInstruction } from "../types/utilTypes/InstructionTypes";
import { BulletPatternComponent } from "./BulletPattern";
import { MeshFromAssetDefinition } from "./MeshFromAssetDefinition";

interface EnemyProps {
    enemyInstruction: SpawnEnemyInstruction;
}

const useMovement = (
    movementInstruction: EnemyMoveToInstruction | undefined,
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

    const [movementInstruction, setMovementInstruction] = useState<EnemyMoveToInstruction>();
    const [bulletPatterns, setBulletPatterns] = useState<KeyedInstruction<EnemyAttackInstruction>[]>([]);
    const position = useVectorMemo(enemyInstruction.position);

    useExecutor((instruction: EnemyInstruction, index) => {
        if (instruction.type === "moveTo") {
            setMovementInstruction(instruction);
        }
        if (instruction.type === "attack") {
            setBulletPatterns((patterns) => [...patterns, { instruction, key: index }]);
        }
    }, enemyInstruction.instructions);

    useMovement(movementInstruction, transformNodeRef);

    return (
        <transformNode name="" ref={transformNodeRef} position={position}>
            {!enemyInstruction.hidden && (
                <transformNode name="" rotation-y={Math.PI}>
                    <MeshFromAssetDefinition name="" assetDefinition={enemyInstruction.asset} />
                </transformNode>
            )}
            {bulletPatterns.map((pattern) => (
                <BulletPatternComponent key={pattern.key} bulletPatternDefinition={pattern.instruction.bulletPattern} />
            ))}
        </transformNode>
    );
};
