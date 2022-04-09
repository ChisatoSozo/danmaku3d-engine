import { GameDefinition } from "../types/gameDefinition/GameDefinition";

interface GameDefinitionTimelineProps {
    gameDefinition: GameDefinition;
}

export const GameDefinitionTimeline: React.FC<GameDefinitionTimelineProps> = ({ gameDefinition }) => {
    return (
        <div
            style={{
                width: "100%",
                height: "400px",
                zIndex: 1000,
                backgroundColor: "rgba(255, 0, 0, 0.1)",
            }}
        ></div>
    );
};
