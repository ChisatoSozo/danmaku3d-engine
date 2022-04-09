import { useEffect } from "react";
import { useSoundAsset } from "../loaders/soundLoader";
import { PlayMusicInstruction } from "../types/gameDefinition/GameDefinition";

interface MusicProps {
    musicInstruction: PlayMusicInstruction;
}

export const Music: React.FC<MusicProps> = ({ musicInstruction }) => {
    const musicAsset = useSoundAsset(musicInstruction.asset);

    useEffect(() => {
        musicAsset.play();
        return () => {
            musicAsset.stop();
        };
    }, [musicAsset]);

    return null;
};
