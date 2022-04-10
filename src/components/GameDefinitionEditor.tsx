import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EditorContainer } from "../containers/EditorContainer";
import { AssetType } from "../types/gameDefinition/AssetDefinition";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { AssetBrowser } from "./AssetBrowser";
import { AssetViewer } from "./AssetViewer";
import { DetailsPane } from "./DetailsPane";
import { GameDefinitionTimeline } from "./GameDefinitionTimeline";
import { StagePhasePicker } from "./StagePhasePicker";

export interface ViewableAsset {
    assetURL: string;
    assetType: AssetType;
}

interface GameDefinitionEditorProps {
    gameDefinitionName: string;
    gameDefinition?: GameDefinition;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    currentStage: number;
    setCurrentStage: Dispatch<SetStateAction<number>>;
    currentPhase: number;
    setCurrentPhase: Dispatch<SetStateAction<number>>;
}

export const GameDefinitionEditor: React.FC<GameDefinitionEditorProps> = ({
    gameDefinitionName,
    gameDefinition,
    setGameDefinition,
    currentStage,
    setCurrentStage,
    currentPhase,
    setCurrentPhase,
}) => {
    const [localGameDefinition, setLocalGameDefinition] = useState(gameDefinition);
    const [currentAsset, setCurrentAsset] = useState<ViewableAsset>();

    useEffect(() => {
        setLocalGameDefinition(gameDefinition);
    }, [gameDefinition]);

    if (!localGameDefinition) return null;
    return (
        <EditorContainer gameDefinitionName={gameDefinitionName}>
            <div
                style={{
                    position: "relative",
                    width: "100vw",
                    height: "100vh",
                    maxHeight: "100vh",
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
                        display: "flex",
                        flexDirection: "row",
                        maxHeight: "calc(100vh - 250px)",
                    }}
                >
                    <AssetBrowser
                        gameDefinition={localGameDefinition}
                        gameDefinitionName={gameDefinitionName}
                        currentAsset={currentAsset}
                        setCurrentAsset={setCurrentAsset}
                    />
                    {currentAsset ? (
                        <AssetViewer gameDefinitionName={gameDefinitionName} currentAsset={currentAsset} />
                    ) : (
                        <div style={{ flex: 1 }} />
                    )}
                    <DetailsPane gameDefinition={localGameDefinition} setGameDefinition={setLocalGameDefinition} />
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "250px",
                        minHeight: "250px",
                        display: "flex",
                    }}
                >
                    <StagePhasePicker
                        gameDefinition={localGameDefinition}
                        setGameDefinition={setLocalGameDefinition}
                        currentStage={currentStage}
                        setCurrentStage={setCurrentStage}
                        currentPhase={currentPhase}
                        setCurrentPhase={setCurrentPhase}
                    />
                    <GameDefinitionTimeline
                        gameDefinition={localGameDefinition}
                        currentStage={currentStage}
                        currentPhase={currentPhase}
                    />
                </div>
            </div>
        </EditorContainer>
    );
};
