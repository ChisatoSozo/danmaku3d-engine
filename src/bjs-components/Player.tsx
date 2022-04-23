import { keyObject } from "../containers/ControlsContext";
import { globalUniformRefs } from "../containers/GlobalUniforms";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { PlayableCharacterDefinition } from "../types/gameDefinition/PlayableCharacterDefinition";
import { Emitter } from "./Emitter";

interface PlayerProps {
    playableCharacterDefinition: PlayableCharacterDefinition;
    focused: boolean;
}

export const Player: React.FC<PlayerProps> = ({ playableCharacterDefinition, focused }) => {
    useDeltaBeforeRender((scene, deltaS) => {
        if (focused) {
            if (globalUniformRefs.greyscaleDistance > 2) {
                globalUniformRefs.greyscaleDistance = Math.max(2, globalUniformRefs.greyscaleDistance - deltaS * 800);
            }
        } else {
            if (globalUniformRefs.greyscaleDistance < 200) {
                globalUniformRefs.greyscaleDistance = Math.min(200, globalUniformRefs.greyscaleDistance + deltaS * 800);
            }
        }
        const firing = keyObject.metaDownKeys["SHOOT"];
        globalUniformRefs.firing = +firing;
    });

    return (
        <>
            {playableCharacterDefinition.emitters.map((emitterDefinition, i) => {
                return <Emitter key={i} focused={focused} emitterDefinition={emitterDefinition} />;
            })}
        </>
    );
};
