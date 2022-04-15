import { Dispatch, SetStateAction } from "react";
import { EditorContainer } from "../containers/EditorContainer";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { AssetEditors } from "./AssetEditors/AssetEditors";
import { GameDefinitionTimeline } from "./GameDefinitionTimeline";
import { StagePhasePicker } from "./StagePhasePicker";

interface GameDefinitionEditorProps {
    gameDefinitionName: string;
    gameDefinition?: GameDefinition;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    overrideGameDefinition?: GameDefinition;
    setOverrideGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    currentStage: number;
    setCurrentStage: Dispatch<SetStateAction<number>>;
    currentPhase: number;
    setCurrentPhase: Dispatch<SetStateAction<number>>;
    setAssetToReload: Dispatch<SetStateAction<string | undefined>>;
}

export const GameDefinitionEditor: React.FC<GameDefinitionEditorProps> = ({
    gameDefinitionName,
    gameDefinition,
    setGameDefinition,
    overrideGameDefinition,
    setOverrideGameDefinition,
    currentStage,
    setCurrentStage,
    currentPhase,
    setCurrentPhase,
    setAssetToReload,
}) => {
    if (!gameDefinition) return null;
    return (
        <EditorContainer
            gameDefinitionName={gameDefinitionName}
            overrideGameDefinition={overrideGameDefinition}
            setOverrideGameDefinition={setOverrideGameDefinition}
            gameDefinition={gameDefinition}
            setGameDefinition={setGameDefinition}
            reloadAsset={setAssetToReload}
        >
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
                    <AssetEditors gameDefinition={gameDefinition} setGameDefinition={setGameDefinition} />
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
                        gameDefinition={gameDefinition}
                        setGameDefinition={setGameDefinition}
                        currentStage={currentStage}
                        setCurrentStage={setCurrentStage}
                        currentPhase={currentPhase}
                        setCurrentPhase={setCurrentPhase}
                    />
                    <GameDefinitionTimeline
                        gameDefinition={gameDefinition}
                        currentStage={currentStage}
                        currentPhase={currentPhase}
                    />
                </div>
            </div>
        </EditorContainer>
    );
};
