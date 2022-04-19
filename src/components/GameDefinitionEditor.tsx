import { Scene } from "@babylonjs/core";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import { EditorContainer } from "../containers/EditorContainer";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { theme } from "../utils/theme";
import { assetHost } from "../utils/Utils";
import { AssetEditors } from "./AssetEditors/AssetEditors";
import { StagePhasePicker } from "./StagePhasePicker";
import { TimelineSection } from "./Timelines/TimelineSection";

interface GameDefinitionEditorProps {
    paused: boolean;
    setPaused: Dispatch<SetStateAction<boolean>>;
    time: MutableRefObject<number>;
    scene?: Scene;
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
    paused,
    setPaused,
    time,
    scene,
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
    useEffect(() => {
        if (gameDefinition) {
            const formData = new FormData();
            formData.append("gameDefinition", JSON.stringify(gameDefinition));
            fetch(`${assetHost}games/${gameDefinitionName}`, {
                method: "PATCH",
                body: formData,
            });
        }
    }, [gameDefinition, gameDefinitionName]);
    if (!gameDefinition) return null;

    return (
        <EditorContainer
            paused={paused}
            setPaused={setPaused}
            time={time}
            scene={scene}
            gameDefinitionName={gameDefinitionName}
            overrideGameDefinition={overrideGameDefinition}
            setOverrideGameDefinition={setOverrideGameDefinition}
            gameDefinition={gameDefinition}
            setGameDefinition={setGameDefinition}
            reloadAsset={setAssetToReload}
        >
            <div
                style={{
                    color: theme.colors.text,
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
                    <AssetEditors
                        gameDefinition={gameDefinition}
                        setGameDefinition={setGameDefinition}
                        currentStage={currentStage}
                    />
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
                    <TimelineSection currentStage={currentStage} currentPhase={currentPhase} />
                </div>
            </div>
        </EditorContainer>
    );
};
