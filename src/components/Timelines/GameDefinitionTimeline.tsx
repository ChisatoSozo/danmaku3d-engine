import { useCallback, useMemo } from "react";
import { useEditor } from "../../containers/EditorContainer";
import { EditorInstruction } from "../../types/gameDefinition/CommonDefinition";
import {
    makePlayMusicInstruction,
    makeSpawnEnemyInstruction,
    SpawnEnemyInstruction,
    StageInstruction,
} from "../../types/gameDefinition/GameDefinition";
import { EditorInstructionTimeline } from "./EditorInstructionTimeline";

interface GameDefinitionTimelineProps {
    currentStage: number;
    currentPhase: number;
}

export type InstructionPoint = {
    x: number;
    y: number;
    phaseInstructionIndex: number;
};

export const GameDefinitionTimeline: React.FC<GameDefinitionTimelineProps> = ({ currentStage, currentPhase }) => {
    const { gameDefinition, setGameDefinition, setCurrentAsset, setSelectedDetails } = useEditor();

    const instructions = useMemo(
        () => gameDefinition?.stages[currentStage].phases[currentPhase].instructions,
        [gameDefinition, currentStage, currentPhase]
    );

    const setInstructions = useCallback(
        (instructions: EditorInstruction[]) => {
            if (!gameDefinition) return;
            const newGameDefinition = { ...gameDefinition };

            newGameDefinition.stages[currentStage].phases[currentPhase].instructions =
                instructions as StageInstruction[];
            setGameDefinition(newGameDefinition);
        },
        [gameDefinition, currentStage, currentPhase, setGameDefinition]
    );

    const instructionClicked = useCallback(
        (instruction: EditorInstruction, instructionIndex: number) => {
            setCurrentAsset({
                spawnEnemyInstruction: instruction as unknown as SpawnEnemyInstruction,
                instructionIndex: instructionIndex,
                assetType: "spawnEnemyInstruction",
                phase: currentPhase,
                stage: currentStage,
            });
            setSelectedDetails({
                type: "spawnEnemyInstruction",
                instructionIndex,
                phase: currentPhase,
                stage: currentStage,
                spawnEnemyInstruction: instruction as unknown as SpawnEnemyInstruction,
            });
        },
        [currentPhase, currentStage, setCurrentAsset, setSelectedDetails]
    );

    return instructions ? (
        <EditorInstructionTimeline
            instructionTypes={[
                {
                    accessor: "playMusic",
                    label: "Play Music",
                    color: "#00ff00",
                    instructionGenerator: makePlayMusicInstruction,
                },
                {
                    accessor: "spawnEnemy",
                    label: "spawnEnemy",
                    color: "#ff0000",
                    instructionGenerator: makeSpawnEnemyInstruction,
                },
            ]}
            instructions={instructions}
            setInstructions={setInstructions}
            instructionClicked={instructionClicked}
        />
    ) : null;
};
