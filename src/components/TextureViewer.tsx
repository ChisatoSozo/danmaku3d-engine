interface TextureViewerProps {
    gameDefinitionName: string;
    url: string;
}

export const TextureViewer: React.FC<TextureViewerProps> = ({ gameDefinitionName, url }) => {
    const fullURL = `/games/${gameDefinitionName}/textures/${url}`;
    return <img alt={url} src={fullURL} />;
};
