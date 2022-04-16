import { useEditor } from "../../containers/EditorContainer";
import { theme } from "../../utils/theme";
import { SpawnEnemyInstructionTimeline } from "./EnemyInstructionTimeline";
import { GameDefinitionTimeline } from "./GameDefinitionTimeline";

interface TimelineSectionProps {
    currentStage: number;
    currentPhase: number;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ currentStage, currentPhase }) => {
    const { currentAsset } = useEditor();
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                flex: 1,
                backgroundColor: theme.colors.background,
                display: "flex",
                flexDirection: "column",
                pointerEvents: "all",
            }}
        >
            {currentAsset?.assetType === "spawnEnemyInstruction" ? (
                <SpawnEnemyInstructionTimeline spawnEnemyInstructionViewable={currentAsset} />
            ) : (
                <GameDefinitionTimeline currentStage={currentStage} currentPhase={currentPhase} />
            )}
        </div>
    );
};
