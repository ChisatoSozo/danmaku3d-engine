import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EditorContainer } from "../containers/EditorContainer";
import { AssetType } from "../types/gameDefinition/AssetDefinition";
import { BulletPatternDefinition } from "../types/gameDefinition/BulletPatternDefinition";
import { GameDefinition, makeGameDefinition } from "../types/gameDefinition/GameDefinition";
import { assetHost } from "../utils/Utils";
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
    overrideGameDefinition?: GameDefinition;
    setOverrideGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    currentStage: number;
    setCurrentStage: Dispatch<SetStateAction<number>>;
    currentPhase: number;
    setCurrentPhase: Dispatch<SetStateAction<number>>;
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
}) => {
    const [currentAsset, setCurrentAsset] = useState<ViewableAsset>();

    useEffect(() => {
        const setOverride = async () => {
            const tempGameDefinition = makeGameDefinition();
            if (!currentAsset) {
                setOverrideGameDefinition(undefined);
                return;
            }
            if (currentAsset?.assetType === "mesh") {
                tempGameDefinition.stages[0].phases[0].instructions.push({
                    at: 0,
                    type: "spawnEnemy",
                    position: { x: 0, y: 0, z: 0 },
                    hidden: false,
                    asset: {
                        isAsset: true,
                        type: "mesh",
                        url: currentAsset.assetURL,
                    },
                    instructions: [],
                });
            }

            if (currentAsset?.assetType === "bulletPattern") {
                const bulletPatternDefinitionJson = (await fetch(
                    `${assetHost}${gameDefinitionName}/bulletPatterns/${currentAsset.assetURL}`
                ).then((res) => res.json())) as BulletPatternDefinition;
                tempGameDefinition.stages[0].phases[0].instructions.push({
                    at: 0,
                    type: "spawnEnemy",
                    position: { x: 0, y: 0, z: 0 },
                    hidden: true,
                    asset: {
                        isAsset: true,
                        type: "mesh",
                        url: "sphere.glb",
                    },
                    instructions: [
                        {
                            at: 0,
                            type: "attack",
                            bulletPattern: {
                                isAsset: true,
                                type: "bulletPattern",
                                pattern: bulletPatternDefinitionJson,
                            },
                        },
                    ],
                });
            }

            setOverrideGameDefinition(tempGameDefinition);
            return;
        };
        setOverride();
    }, [currentAsset, gameDefinitionName, setOverrideGameDefinition]);

    if (!gameDefinition) return null;
    return (
        <EditorContainer
            gameDefinitionName={gameDefinitionName}
            overrideGameDefinition={overrideGameDefinition}
            setOverrideGameDefinition={setOverrideGameDefinition}
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
                    <AssetBrowser
                        gameDefinition={gameDefinition}
                        gameDefinitionName={gameDefinitionName}
                        currentAsset={currentAsset}
                        setCurrentAsset={setCurrentAsset}
                    />
                    {currentAsset ? (
                        <AssetViewer
                            gameDefinitionName={gameDefinitionName}
                            currentAsset={currentAsset}
                            setCurrentAsset={setCurrentAsset}
                        />
                    ) : (
                        <div style={{ flex: 1 }} />
                    )}
                    <DetailsPane gameDefinition={gameDefinition} setGameDefinition={setGameDefinition} />
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
