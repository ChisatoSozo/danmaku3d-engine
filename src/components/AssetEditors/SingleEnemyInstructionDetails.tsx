import { useCallback, useMemo } from "react";
import { Schema } from "ts-json-schema-generator";
import { useEditor } from "../../containers/EditorContainer";
import { EditorInstruction } from "../../types/gameDefinition/CommonDefinition";
import { BaseEnemyInstruction } from "../../types/gameDefinition/EnemyDefinition";
import { SpawnEnemyInstruction } from "../../types/gameDefinition/GameDefinition";
import gameDefinitionSchema from "../../types/gameDefinition/GameDefinition.json";
import { FormFromType } from "../FormFromType/FormFromType";

interface SingleEnemyInstructionDetailsProps {
    stageIndex: number;
    phaseIndex: number;
    instructionIndex: number;
    enemyInstructionIndex: number;
    schemaIndex: keyof typeof gameDefinitionSchema.definitions;
}

export const SingleEnemyInstructionDetails: React.FC<SingleEnemyInstructionDetailsProps> = ({
    stageIndex,
    phaseIndex,
    instructionIndex,
    enemyInstructionIndex,
    schemaIndex,
}) => {
    const { gameDefinition, overrideGameDefinition, setGameDefinition, setOverrideGameDefinition, currentAsset, time } =
        useEditor();

    const instruction = useMemo(
        () =>
            (
                gameDefinition?.stages[stageIndex].phases[phaseIndex].instructions[
                    instructionIndex
                ] as SpawnEnemyInstruction
            ).instructions[enemyInstructionIndex],
        [enemyInstructionIndex, gameDefinition?.stages, instructionIndex, phaseIndex, stageIndex]
    );

    const setInstruction = useCallback(
        (newInstruction: EditorInstruction & BaseEnemyInstruction) => {
            if (!gameDefinition) return;
            const updatedGameDefinition = { ...gameDefinition };
            (
                gameDefinition.stages[stageIndex].phases[phaseIndex].instructions[
                    instructionIndex
                ] as SpawnEnemyInstruction
            ).instructions[enemyInstructionIndex] = newInstruction;
            (
                gameDefinition.stages[stageIndex].phases[phaseIndex].instructions[
                    instructionIndex
                ] as SpawnEnemyInstruction
            ).instructions = [
                ...(
                    gameDefinition.stages[stageIndex].phases[phaseIndex].instructions[
                        instructionIndex
                    ] as SpawnEnemyInstruction
                ).instructions,
            ];
            setGameDefinition(updatedGameDefinition);

            if (currentAsset?.assetType === "spawnEnemyInstruction") {
                time.current = 0;
                if (!overrideGameDefinition) return;
                const newOverrideGameDefinition = { ...overrideGameDefinition };
                (newOverrideGameDefinition.stages[0].phases[0].instructions[0] as SpawnEnemyInstruction).instructions[
                    enemyInstructionIndex
                ] = newInstruction;
                (newOverrideGameDefinition.stages[0].phases[0].instructions[0] as SpawnEnemyInstruction).instructions =
                    [
                        ...(newOverrideGameDefinition.stages[0].phases[0].instructions[0] as SpawnEnemyInstruction)
                            .instructions,
                    ];
                setOverrideGameDefinition(newOverrideGameDefinition);
            }
        },
        [
            gameDefinition,
            stageIndex,
            phaseIndex,
            instructionIndex,
            enemyInstructionIndex,
            setGameDefinition,
            currentAsset?.assetType,
            time,
            overrideGameDefinition,
            setOverrideGameDefinition,
        ]
    );

    return (
        <FormFromType
            value={instruction}
            setValue={setInstruction}
            localSchema={gameDefinitionSchema.definitions[schemaIndex] as Schema}
            schema={gameDefinitionSchema as any}
            label={schemaIndex}
        />
    );
};
