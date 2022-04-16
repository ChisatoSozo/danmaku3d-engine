import { Dispatch, SetStateAction, useEffect } from "react";
import { useEditor } from "../../containers/EditorContainer";
import { AssetType } from "../../types/gameDefinition/AssetDefinition";
import { BulletPatternDefinition } from "../../types/gameDefinition/BulletPatternDefinition";
import { GameDefinition, makeGameDefinition, SpawnEnemyInstruction } from "../../types/gameDefinition/GameDefinition";
import { assetHost } from "../../utils/Utils";
import { AssetBrowser } from "./AssetBrowser";
import { AssetViewer } from "./AssetViewer";
import { DetailsPane } from "./DetailsPane";

export type SpawnEnemyInstructionViewable = {
    spawnEnemyInstruction: SpawnEnemyInstruction;
    instructionIndex: number;
    phase: number;
    stage: number;
    assetType: "spawnEnemyInstruction";
};

export type ViewableAsset =
    | {
          assetURL: string;
          assetType: AssetType;
      }
    | SpawnEnemyInstructionViewable;

interface AssetEditorsProps {
    gameDefinition: GameDefinition;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
}

export const AssetEditors: React.FC<AssetEditorsProps> = ({ gameDefinition, setGameDefinition }) => {
    const { setSelectedDetails, setOverrideGameDefinition, gameDefinitionName, currentAsset, setCurrentAsset } =
        useEditor();

    useEffect(() => {
        if (!setOverrideGameDefinition) return;
        const setOverride = async () => {
            if (!currentAsset) {
                setOverrideGameDefinition(undefined);
                return;
            }
            if (currentAsset?.assetType === "mesh") {
                const tempGameDefinition = makeGameDefinition();
                tempGameDefinition.stages[0].phases[0].instructions.push({
                    at: 0,
                    _editorTrack: 1,
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
                setOverrideGameDefinition(tempGameDefinition);
            }

            if (currentAsset?.assetType === "bulletPattern") {
                const bulletPatternDefinitionJson = (await fetch(
                    `${assetHost}${gameDefinitionName}/bulletPatterns/${currentAsset.assetURL}`
                ).then((res) => res.json())) as BulletPatternDefinition;

                const tempGameDefinition = makeGameDefinition();
                tempGameDefinition.stages[0].phases[0].instructions.push({
                    at: 0,
                    _editorTrack: 1,
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
                            _editorTrack: 1,
                            type: "attack",
                            bulletPattern: {
                                isAsset: true,
                                type: "bulletPattern",
                                url: currentAsset.assetURL,
                            },
                        },
                    ],
                });

                setSelectedDetails({
                    type: "bulletPattern",
                    fileName: currentAsset.assetURL,
                    bulletPattern: bulletPatternDefinitionJson,
                });
                setOverrideGameDefinition(tempGameDefinition);
            }

            return;
        };
        setOverride();
    }, [currentAsset, gameDefinitionName, setOverrideGameDefinition, setSelectedDetails]);

    return (
        <>
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
        </>
    );
};
