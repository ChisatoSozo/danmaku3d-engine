import { useCallback, useMemo } from "react";
import { useEditor } from "../../containers/EditorContainer";
import { EditorInstruction } from "../../types/gameDefinition/CommonDefinition";
import { EnemyInstruction, makeMoveToInstruction } from "../../types/gameDefinition/EnemyDefinition";
import { SpawnEnemyInstruction } from "../../types/gameDefinition/GameDefinition";
import { SpawnEnemyInstructionViewable } from "../AssetEditors/AssetEditors";
import { EditorInstructionTimeline } from "./EditorInstructionTimeline";

interface SpawnEnemyInstructionTimelineProps {
    spawnEnemyInstructionViewable: SpawnEnemyInstructionViewable;
}

export type InstructionPoint = {
    x: number;
    y: number;
    phaseInstructionIndex: number;
};

export const SpawnEnemyInstructionTimeline: React.FC<SpawnEnemyInstructionTimelineProps> = ({
    spawnEnemyInstructionViewable,
}) => {
    const { gameDefinition, setGameDefinition, overrideGameDefinition, setOverrideGameDefinition } = useEditor();
    const { phase: phaseIndex, stage: stageIndex, instructionIndex } = spawnEnemyInstructionViewable;

    const instructions = useMemo(
        () =>
            (
                gameDefinition?.stages[stageIndex].phases[phaseIndex].instructions[
                    instructionIndex
                ] as SpawnEnemyInstruction
            ).instructions,
        [gameDefinition, stageIndex, phaseIndex, instructionIndex]
    );

    const setInstructions = useCallback(
        (instructions: EditorInstruction[]) => {
            if (!gameDefinition) return;
            if (!overrideGameDefinition) return;
            const updatedGameDefinition = { ...gameDefinition };
            const updatedOverrideGameDefinition = { ...overrideGameDefinition };
            (
                gameDefinition.stages[stageIndex].phases[phaseIndex].instructions[
                    instructionIndex
                ] as SpawnEnemyInstruction
            ).instructions = instructions as unknown as EnemyInstruction[];

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

            gameDefinition.stages[stageIndex].phases[phaseIndex].instructions = [
                ...gameDefinition.stages[stageIndex].phases[phaseIndex].instructions,
            ];

            (
                overrideGameDefinition.stages[stageIndex].phases[phaseIndex].instructions[0] as SpawnEnemyInstruction
            ).instructions = [
                ...(
                    overrideGameDefinition.stages[stageIndex].phases[phaseIndex]
                        .instructions[0] as SpawnEnemyInstruction
                ).instructions,
            ];

            overrideGameDefinition.stages[stageIndex].phases[phaseIndex].instructions = [
                ...overrideGameDefinition.stages[stageIndex].phases[phaseIndex].instructions,
            ];

            setGameDefinition(updatedGameDefinition);
            setOverrideGameDefinition(updatedOverrideGameDefinition);
        },
        [
            gameDefinition,
            overrideGameDefinition,
            stageIndex,
            phaseIndex,
            instructionIndex,
            setGameDefinition,
            setOverrideGameDefinition,
        ]
    );

    return instructions ? (
        <EditorInstructionTimeline
            instructionTypes={[
                {
                    accessor: "moveTo",
                    label: "Move To",
                    color: "#00ff00",
                    instructionGenerator: makeMoveToInstruction,
                },
            ]}
            instructions={instructions}
            setInstructions={setInstructions}
        />
    ) : null;
};
