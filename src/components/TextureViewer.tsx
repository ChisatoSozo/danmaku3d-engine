interface TextureViewerProps {
    gameDefinitionName: string;
    url: string;
}

export const TextureViewer: React.FC<TextureViewerProps> = ({ gameDefinitionName, url }) => {
    const fullURL = `${window.location.protocol}//${window.location.hostname}:5000/${gameDefinitionName}/textures/${url}`;
    return <img alt={url} src={fullURL} />;
};
