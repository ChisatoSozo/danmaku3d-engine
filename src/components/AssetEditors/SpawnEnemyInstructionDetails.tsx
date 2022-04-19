import { useCallback, useMemo } from "react";
import { Schema } from "ts-json-schema-generator";
import { useEditor } from "../../containers/EditorContainer";
import { EditorInstruction } from "../../types/gameDefinition/CommonDefinition";
import { SpawnEnemyInstruction } from "../../types/gameDefinition/GameDefinition";
import gameDefinitionSchema from "../../types/gameDefinition/GameDefinition.json";
import { FormFromType } from "../FormFromType/FormFromType";

interface SpawnEnemyInstructionDetailsProps {
    stageIndex: number;
    phaseIndex: number;
    instructionIndex: number;
}

export const SpawnEnemyInstructionDetails: React.FC<SpawnEnemyInstructionDetailsProps> = ({
    stageIndex,
    phaseIndex,
    instructionIndex,
}) => {
    const { gameDefinition, setGameDefinition, setOverrideGameDefinition, currentAsset, time, overrideGameDefinition } =
        useEditor();

    const instruction = useMemo(
        () => gameDefinition?.stages[stageIndex].phases[phaseIndex].instructions[instructionIndex],
        [gameDefinition, instructionIndex, phaseIndex, stageIndex]
    );

    const setInstruction = useCallback(
        (newInstruction: EditorInstruction & SpawnEnemyInstruction) => {
            if (!gameDefinition) return;
            const updatedGameDefinition = { ...gameDefinition };
            gameDefinition.stages[stageIndex].phases[phaseIndex].instructions[instructionIndex] = newInstruction;
            gameDefinition.stages[stageIndex].phases[phaseIndex].instructions = [
                ...gameDefinition.stages[stageIndex].phases[phaseIndex].instructions,
            ];
            setGameDefinition(updatedGameDefinition);

            if (currentAsset?.assetType === "spawnEnemyInstruction" && overrideGameDefinition) {
                time.current = 0;
                const newGameDefinition = { ...overrideGameDefinition };
                overrideGameDefinition.stages[0].phases[0].instructions = [{ ...newInstruction, at: 0 }];
                setOverrideGameDefinition(newGameDefinition);
            }
        },
        [
            gameDefinition,
            stageIndex,
            phaseIndex,
            instructionIndex,
            setGameDefinition,
            currentAsset?.assetType,
            overrideGameDefinition,
            time,
            setOverrideGameDefinition,
        ]
    );

    return (
        <FormFromType
            value={instruction}
            setValue={setInstruction}
            localSchema={gameDefinitionSchema.definitions["SpawnEnemyInstruction"] as Schema}
            schema={gameDefinitionSchema as any}
            label="spawnEnemyInstruction"
        />
    );
};
