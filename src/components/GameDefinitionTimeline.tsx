import { GameDefinition } from "../types/gameDefinition/GameDefinition";

interface GameDefinitionTimelineProps {
    gameDefinition: GameDefinition;
    currentStage: number;
    currentPhase: number;
}

export const GameDefinitionTimeline: React.FC<GameDefinitionTimelineProps> = ({
    gameDefinition,
    currentStage,
    currentPhase,
}) => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                flex: 1,
                backgroundColor: "rgba(255, 0, 0, 0.1)",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", paddingTop: 5, paddingLeft: 10 }}>
                <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                    <div>Stage: {currentStage}</div>
                    <div>Phase: {currentPhase}</div>
                </div>
            </div>
        </div>
    );
};
