interface SoundViewerProps {
    gameDefinitionName: string;
    url: string;
}

export const SoundViewer: React.FC<SoundViewerProps> = ({ gameDefinitionName, url }) => {
    const fullURL = `/games/${gameDefinitionName}/sounds/${url}`;
    return <audio controls src={fullURL} />;
};
