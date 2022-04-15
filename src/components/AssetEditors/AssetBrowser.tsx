import { Dispatch, SetStateAction } from "react";
import { useEditor } from "../../containers/EditorContainer";
import { GameDefinition } from "../../types/gameDefinition/GameDefinition";
import { Category } from "../Category";
import { NewAsset } from "../NewAsset";
import { ViewableAsset } from "./AssetEditors";
import { AssetElement } from "./AssetElement";
import { AssetUpload } from "./AssetUpload";

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
                            <AssetUpload gameDefinitionName={gameDefinitionName} assetType="mesh" />
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
                            <AssetUpload gameDefinitionName={gameDefinitionName} assetType="sound" />
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
                            <AssetUpload gameDefinitionName={gameDefinitionName} assetType="texture" />
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
                            <AssetUpload gameDefinitionName={gameDefinitionName} assetType="glsl" />
                        </div>
                    </Category>
                    <Category name="Bullet Patterns">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {assetFiles.bulletPatterns.map((bulletPatterns) => (
                                <AssetElement
                                    key={bulletPatterns}
                                    assetType="bulletPattern"
                                    assetURL={bulletPatterns}
                                    setCurrentAsset={setCurrentAsset}
                                />
                            ))}
                            <NewAsset gameDefinitionName={gameDefinitionName} assetType="bulletPattern" />
                            <AssetUpload gameDefinitionName={gameDefinitionName} assetType="bulletPattern" />
                        </div>
                    </Category>
                </>
            )}
        </div>
    );
};
