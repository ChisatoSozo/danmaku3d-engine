import { theme } from "../../utils/theme";
import { GameDefinitionTimeline } from "./GameDefinitionTimeline";

interface TimelineSectionProps {
    currentStage: number;
    currentPhase: number;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ currentStage, currentPhase, children }) => {
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
            <GameDefinitionTimeline currentStage={currentStage} currentPhase={currentPhase} />
        </div>
    );
};
