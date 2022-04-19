import { useCallback, useMemo } from "react";
import { useEditor } from "../../containers/EditorContainer";
import { EditorInstruction } from "../../types/gameDefinition/CommonDefinition";
import {
    EnemyInstruction,
    makeEnemyAttackInstruction,
    makeEnemyLeaveInstruction,
    makeMoveToInstruction,
} from "../../types/gameDefinition/EnemyDefinition";
import { SpawnEnemyInstruction } from "../../types/gameDefinition/GameDefinition";
import gameDefinitionSchema from "../../types/gameDefinition/GameDefinition.json";
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

const schemaMap: { [key in EnemyInstruction["type"]]: keyof typeof gameDefinitionSchema.definitions } = {
    moveTo: "EnemyMoveToInstruction",
    attack: "EnemyAttackInstruction",
    leave: "EnemyLeaveInstruction",
};

export const SpawnEnemyInstructionTimeline: React.FC<SpawnEnemyInstructionTimelineProps> = ({
    spawnEnemyInstructionViewable,
}) => {
    const {
        gameDefinition,
        setGameDefinition,
        overrideGameDefinition,
        setOverrideGameDefinition,
        time,
        setSelectedDetails,
    } = useEditor();
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
                updatedGameDefinition.stages[stageIndex].phases[phaseIndex].instructions[
                    instructionIndex
                ] as SpawnEnemyInstruction
            ).instructions = instructions as unknown as EnemyInstruction[];

            (updatedOverrideGameDefinition.stages[0].phases[0].instructions[0] as SpawnEnemyInstruction).instructions =
                instructions as unknown as EnemyInstruction[];

            setGameDefinition(updatedGameDefinition);
            setOverrideGameDefinition(updatedOverrideGameDefinition);
            time.current = 0;
        },
        [
            gameDefinition,
            overrideGameDefinition,
            stageIndex,
            phaseIndex,
            instructionIndex,
            setGameDefinition,
            setOverrideGameDefinition,
            time,
        ]
    );

    const instructionClicked = useCallback(
        (editorInstruction: EditorInstruction, instructionIndex: number) => {
            const instruction = editorInstruction as EnemyInstruction;
            setSelectedDetails({
                type: "singleEnemyInstruction",
                instructionIndex: spawnEnemyInstructionViewable.instructionIndex,
                enemyInstructionIndex: instructionIndex,
                phase: phaseIndex,
                stage: stageIndex,
                schemaIndex: schemaMap[instruction.type],
            });
            time.current = 0;
        },
        [phaseIndex, setSelectedDetails, spawnEnemyInstructionViewable.instructionIndex, stageIndex, time]
    );

    return instructions ? (
        <EditorInstructionTimeline
            instructionTypes={[
                {
                    accessor: "moveTo",
                    label: "Move To",
                    color: "#aaaaaa",
                    instructionGenerator: makeMoveToInstruction,
                },
                {
                    accessor: "attack",
                    label: "Attack",
                    color: "#ff0000",
                    instructionGenerator: makeEnemyAttackInstruction,
                },
                {
                    accessor: "leave",
                    label: "Leave",
                    color: "#ffff00",
                    instructionGenerator: makeEnemyLeaveInstruction,
                },
            ]}
            instructions={instructions}
            setInstructions={setInstructions}
            instructionClicked={instructionClicked}
        />
    ) : null;
};
