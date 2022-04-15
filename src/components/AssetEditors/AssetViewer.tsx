import { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ViewableAsset } from "./AssetEditors";
import { SoundViewer } from "./SoundViewer";
import { TextureViewer } from "./TextureViewer";

interface AssetViewerProps {
    gameDefinitionName: string;
    currentAsset: ViewableAsset;
    setCurrentAsset: Dispatch<SetStateAction<ViewableAsset | undefined>>;
}

export const AssetViewer: React.FC<AssetViewerProps> = ({ gameDefinitionName, currentAsset, setCurrentAsset }) => {
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
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                    pointerEvents: "all",
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
        </div>
    );
};
