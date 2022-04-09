import { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";

interface AssetBrowserProps {
    gameDefinition: GameDefinition;
    gameDefinitionName: string;
}

interface AssetFiles {
    meshes: string[];
    sounds: string[];
    textures: string[];
    glsl: string[];
}

export const AssetBrowser: React.FC<AssetBrowserProps> = ({ gameDefinition, gameDefinitionName }) => {
    const [assetFiles, setAssetFiles] = useState<AssetFiles>();

    useEffect(() => {
        const fetchAssetFiles = async () => {
            const response = await fetch(`http://${window.location.hostname}:5000/listAssets/${gameDefinitionName}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch asset files: ${response.statusText}`);
            }
            const json = await response.json();
            setAssetFiles(json);
        };
        fetchAssetFiles();
    }, [gameDefinitionName]);

    return (
        <div
            style={{
                width: "400px",
                height: "100%",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                pointerEvents: "all",
                padding: "10px",
            }}
        >
            {assetFiles && (
                <>
                    <Collapsible trigger="Meshes">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {assetFiles.meshes.map((mesh) => (
                                <div>{mesh}</div>
                            ))}
                        </div>
                    </Collapsible>
                    <Collapsible trigger="Sounds">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {assetFiles.sounds.map((sound) => (
                                <div>{sound}</div>
                            ))}
                        </div>
                    </Collapsible>
                    <Collapsible trigger="Textures">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {assetFiles.textures.map((texture) => (
                                <div>{texture}</div>
                            ))}
                        </div>
                    </Collapsible>
                    <Collapsible trigger="GLSL">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {assetFiles.glsl.map((name) => (
                                <div>{name}</div>
                            ))}
                        </div>
                    </Collapsible>
                </>
            )}
        </div>
    );
};
