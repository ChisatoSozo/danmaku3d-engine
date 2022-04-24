import { TransformNode, Vector3 } from "@babylonjs/core";
import React, { useEffect, useRef, useState } from "react";
import { useBeforeRender } from "react-babylonjs";
import { globalUniformRefs, insertNewGlobalEnemyRef, removeGlobalEnemyRef } from "../containers/GlobalUniforms";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { useExecutor } from "../hooks/useExecutor";
import { useVectorMemo } from "../hooks/useVectorMemo";
import { useLimitSoundAsset } from "../loaders/soundLoader";
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
    removeMe: () => void;
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

export const Enemy: React.FC<EnemyProps> = ({ enemyInstruction, removeMe }) => {
    const transformNodeRef = useRef<TransformNode>(null);

    const [movementInstruction, setMovementInstruction] = useState<EnemyMoveToInstruction>();
    const [bulletPatterns, setBulletPatterns] = useState<KeyedInstruction<EnemyAttackInstruction>[]>([]);
    const position = useVectorMemo(enemyInstruction.position);
    const [diedOrLeft, setDiedOrLeft] = useState(false);
    const [globalEnemyRefIndex, setGlobalEnemyRefIndex] = useState<number>();
    const hurtSound = useLimitSoundAsset(enemyInstruction.hurtSound, 100);

    useExecutor((instruction: EnemyInstruction, index) => {
        if (instruction.type === "moveTo") {
            setMovementInstruction(instruction);
        }
        if (instruction.type === "attack") {
            setBulletPatterns((patterns) => [...patterns, { instruction, key: index }]);
        }
        if (instruction.type === "leave") {
            setDiedOrLeft(true);
        }
    }, enemyInstruction.instructions);

    useMovement(movementInstruction, transformNodeRef);

    useEffect(() => {
        if (!transformNodeRef.current) return;
        const globalEnemyRefIndex = insertNewGlobalEnemyRef({
            position: transformNodeRef.current.position,
            radius: 2,
            health: 1000,
            active: true,
        });
        setGlobalEnemyRefIndex(globalEnemyRefIndex);
    }, []);

    const lastHealth = useRef(1000);

    useBeforeRender(() => {
        if (!transformNodeRef.current) return;
        if (globalEnemyRefIndex === undefined) return;
        const globalEnemyRef = globalUniformRefs.enemies[globalEnemyRefIndex];
        if (globalEnemyRef.health <= 0) {
            removeMe();
            return;
        }
        if (globalEnemyRef.health < lastHealth.current) {
            hurtSound.play();
        }
        lastHealth.current = globalEnemyRef.health;
        globalEnemyRef.position = transformNodeRef.current.position;
    });

    useEffect(() => {
        const oldGlobalEnemyRefIndex = globalEnemyRefIndex;
        return () => {
            if (oldGlobalEnemyRefIndex === undefined) return;
            console.log(oldGlobalEnemyRefIndex);
            removeGlobalEnemyRef(oldGlobalEnemyRefIndex);
        };
    }, [globalEnemyRefIndex]);

    return (
        <transformNode name="" ref={transformNodeRef} position={position}>
            {!enemyInstruction.hidden && !diedOrLeft && (
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
