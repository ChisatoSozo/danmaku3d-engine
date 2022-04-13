import { assetHost } from "../utils/Utils";

interface TextureViewerProps {
    gameDefinitionName: string;
    url: string;
}

export const TextureViewer: React.FC<TextureViewerProps> = ({ gameDefinitionName, url }) => {
    const fullURL = `${assetHost}${gameDefinitionName}/textures/${url}`;
    return <img style={{ pointerEvents: "all" }} alt={url} src={fullURL} />;
};
