import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ViewableAsset } from "./AssetEditors";
import { GLSLViewer } from "./GLSLViewer";
import { SoundViewer } from "./SoundViewer";
import { TextureViewer } from "./TextureViewer";

interface AssetViewerProps {
    gameDefinitionName: string;
    currentAsset: ViewableAsset;
    setCurrentAsset: (asset: ViewableAsset | undefined) => void;
}

export const AssetViewer: React.FC<AssetViewerProps> = ({ gameDefinitionName, currentAsset, setCurrentAsset }) => {
    //listen for the escape key to close the asset viewer
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setCurrentAsset(undefined);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setCurrentAsset]);

    return (
        <div
            style={{
                position: "relative",
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 1,
                    right: 0,
                    cursor: "pointer",
                    zIndex: 999,
                }}
            >
                <AiOutlineClose color="white" />
            </div>
            <div
                style={{
                    position: "absolute",
                    top: -1,
                    right: 0,
                    cursor: "pointer",
                    zIndex: 999,
                }}
            >
                <AiOutlineClose color="white" />
            </div>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                    pointerEvents: "all",
                    zIndex: 1000,
                }}
                onClick={() => setCurrentAsset(undefined)}
            >
                <AiOutlineClose />
            </div>
            {currentAsset.assetType === "sound" && (
                <SoundViewer gameDefinitionName={gameDefinitionName} url={currentAsset?.assetURL} />
            )}
            {currentAsset.assetType === "texture" && (
                <TextureViewer gameDefinitionName={gameDefinitionName} url={currentAsset?.assetURL} />
            )}
            {currentAsset.assetType === "glsl" && (
                <GLSLViewer gameDefinitionName={gameDefinitionName} url={currentAsset?.assetURL} />
            )}
        </div>
    );
};
