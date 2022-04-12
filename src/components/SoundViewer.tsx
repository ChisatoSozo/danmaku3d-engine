interface SoundViewerProps {
    gameDefinitionName: string;
    url: string;
}

export const SoundViewer: React.FC<SoundViewerProps> = ({ gameDefinitionName, url }) => {
    const fullURL = `${window.location.protocol}//${window.location.hostname}:5000/${gameDefinitionName}/sounds/${url}`;
    return <audio controls src={fullURL} />;
};
