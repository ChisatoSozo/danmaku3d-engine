import { ViewableAsset } from "./GameDefinitionEditor";
import { MeshViewer } from "./MeshViewer";
import { SoundViewer } from "./SoundViewer";
import { TextureViewer } from "./TextureViewer";

interface AssetViewerProps {
    gameDefinitionName: string;
    currentAsset: ViewableAsset;
}

export const AssetViewer: React.FC<AssetViewerProps> = ({ gameDefinitionName, currentAsset }) => {
    return (
        <div
            style={{
                flex: 1,
                height: "100%",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "all",
            }}
        >
            {currentAsset.assetType === "mesh" && (
                <MeshViewer gameDefinitionName={gameDefinitionName} url={currentAsset?.assetURL} />
            )}
            {currentAsset.assetType === "sound" && (
                <SoundViewer gameDefinitionName={gameDefinitionName} url={currentAsset?.assetURL} />
            )}
            {currentAsset.assetType === "texture" && (
                <TextureViewer gameDefinitionName={gameDefinitionName} url={currentAsset?.assetURL} />
            )}
        </div>
    );
};
