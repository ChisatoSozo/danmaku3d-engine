import { PlayableCharacterDefinition } from "../types/gameDefinition/PlayableCharacterDefinition";
import { Emitter } from "./Emitter";

interface PlayerProps {
    playableCharacterDefinition: PlayableCharacterDefinition;
    focused: boolean;
}

export const Player: React.FC<PlayerProps> = ({ playableCharacterDefinition, focused }) => {
    return (
        <>
            {playableCharacterDefinition.emitters.map((emitterDefinition, i) => {
                return <Emitter key={i} focused={focused} emitterDefinition={emitterDefinition} />;
            })}
        </>
    );
};
