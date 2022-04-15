import { assetHost } from "../../utils/Utils";

interface SoundViewerProps {
    gameDefinitionName: string;
    url: string;
}

export const SoundViewer: React.FC<SoundViewerProps> = ({ gameDefinitionName, url }) => {
    const fullURL = `${assetHost}${gameDefinitionName}/sounds/${url}`;
    return <audio style={{ pointerEvents: "all" }} controls src={fullURL} />;
};
