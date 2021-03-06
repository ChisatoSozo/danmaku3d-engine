import { Dispatch, SetStateAction } from "react";
import { useEditor } from "../../containers/EditorContainer";
import { GameDefinition } from "../../types/gameDefinition/GameDefinition";
import { theme } from "../../utils/theme";
import { GameDetails } from "../GameDetails";
import { BulletPatternDetails } from "./BulletPatternDetails";
import { PhaseDetails } from "./PhaseDetails";
import { SingleEnemyInstructionDetails } from "./SingleEnemyInstructionDetails";
import { SpawnEnemyInstructionDetails } from "./SpawnEnemyInstructionDetails";
import { StageDetails } from "./StageDetails";

interface DetailsPaneProps {
    gameDefinition: GameDefinition;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
}

export const DetailsPane: React.FC<DetailsPaneProps> = ({ gameDefinition, setGameDefinition }) => {
    const { selectedDetails, gameDefinitionName } = useEditor();
    return (
        <div
            style={{
                pointerEvents: "all",
                width: "250px",
                height: "100%",
                backgroundColor: theme.colors.background,
                overflowY: "auto",
            }}
        >
            {selectedDetails?.type === "game" && (
                <GameDetails gameDefinition={gameDefinition} setGameDefinition={setGameDefinition} />
            )}
            {selectedDetails?.type === "stage" && (
                <StageDetails
                    gameDefinition={gameDefinition}
                    setGameDefinition={setGameDefinition}
                    stage={selectedDetails.stage}
                />
            )}
            {selectedDetails?.type === "phase" && (
                <PhaseDetails
                    gameDefinition={gameDefinition}
                    setGameDefinition={setGameDefinition}
                    stage={selectedDetails.stage}
                    phase={selectedDetails.phase}
                />
            )}
            {selectedDetails?.type === "bulletPattern" && (
                <BulletPatternDetails
                    gameDefinitionName={gameDefinitionName}
                    bulletPattern={selectedDetails.bulletPattern}
                    fileName={selectedDetails.fileName}
                />
            )}
            {selectedDetails?.type === "spawnEnemyInstruction" && (
                <SpawnEnemyInstructionDetails
                    stageIndex={selectedDetails.stage}
                    phaseIndex={selectedDetails.phase}
                    instructionIndex={selectedDetails.instructionIndex}
                />
            )}

            {selectedDetails?.type === "singleEnemyInstruction" && (
                <SingleEnemyInstructionDetails
                    stageIndex={selectedDetails.stage}
                    phaseIndex={selectedDetails.phase}
                    instructionIndex={selectedDetails.instructionIndex}
                    enemyInstructionIndex={selectedDetails.enemyInstructionIndex}
                    schemaIndex={selectedDetails.schemaIndex}
                />
            )}
        </div>
    );
};
