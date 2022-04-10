import { Dispatch, SetStateAction } from "react";
import { useEditor } from "../containers/EditorContainer";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { AssetElement } from "./AssetElement";
import { Category } from "./Category";
import { ViewableAsset } from "./GameDefinitionEditor";

interface AssetBrowserProps {
    gameDefinition: GameDefinition;
    gameDefinitionName: string;
    currentAsset: ViewableAsset | undefined;
    setCurrentAsset: Dispatch<SetStateAction<ViewableAsset | undefined>>;
}

export const AssetBrowser: React.FC<AssetBrowserProps> = ({
    gameDefinition,
    gameDefinitionName,
    currentAsset,
    setCurrentAsset,
}) => {
    const { assetFiles } = useEditor();

    return (
        <div
            style={{
                width: "250px",
                height: "100%",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                pointerEvents: "all",
                paddingLeft: "10px",
            }}
        >
            {assetFiles && (
                <>
                    <Category name="Meshes">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {assetFiles.meshes.map(
                                (mesh) =>
                                    !mesh.endsWith(".json") && (
                                        <AssetElement
                                            key={mesh}
                                            assetType="mesh"
                                            assetURL={mesh}
                                            setCurrentAsset={setCurrentAsset}
                                        />
                                    )
                            )}
                        </div>
                    </Category>
                    <Category name="Sounds">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {assetFiles.sounds.map((sound) => (
                                <AssetElement
                                    key={sound}
                                    assetType="sound"
                                    assetURL={sound}
                                    setCurrentAsset={setCurrentAsset}
                                />
                            ))}
                        </div>
                    </Category>
                    <Category name="Textures">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {assetFiles.textures.map((texture) => (
                                <AssetElement
                                    key={texture}
                                    assetType="texture"
                                    assetURL={texture}
                                    setCurrentAsset={setCurrentAsset}
                                />
                            ))}
                        </div>
                    </Category>
                    <Category name="GLSL">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {assetFiles.glsl.map((glsl) => (
                                <AssetElement
                                    key={glsl}
                                    assetType="glsl"
                                    assetURL={glsl}
                                    setCurrentAsset={setCurrentAsset}
                                />
                            ))}
                        </div>
                    </Category>
                </>
            )}
        </div>
    );
};
