import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { AssetBrowser } from "./AssetBrowser";
import { GameDefinitionTimeline } from "./GameDefinitionTimeline";

interface GameDefinitionEditorProps {
    gameDefinitionName: string;
    gameDefinition?: GameDefinition;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
}

export const GameDefinitionEditor: React.FC<GameDefinitionEditorProps> = ({
    gameDefinitionName,
    gameDefinition,
    setGameDefinition,
}) => {
    const [localGameDefinition, setLocalGameDefinition] = useState(gameDefinition);

    useEffect(() => {
        setLocalGameDefinition(gameDefinition);
    }, [gameDefinition]);

    if (!localGameDefinition) return null;
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                zIndex: 1000,
                backgroundColor: "rgba(0, 0, 0, 0)",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    position: "relative",
                    flex: 1,
                    pointerEvents: "none",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <AssetBrowser gameDefinition={localGameDefinition} gameDefinitionName={gameDefinitionName} />
            </div>
            <GameDefinitionTimeline gameDefinition={localGameDefinition} />
        </div>
    );
};
