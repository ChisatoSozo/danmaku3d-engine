import { Mesh } from "@babylonjs/core";
import { useRef } from "react";
import { globalUniformRefs } from "../containers/GameContainer";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { PlayableCharacterDefinition } from "../types/gameDefinition/PlayableCharacterDefinition";
import { Emitter } from "./Emitter";

interface PlayerProps {
    playableCharacterDefinition: PlayableCharacterDefinition;
    focused: boolean;
}

export const Player: React.FC<PlayerProps> = ({ playableCharacterDefinition, focused }) => {
    const sphereRef = useRef<Mesh>();

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
        if (!sphereRef.current) return;
        sphereRef.current.scalingDeterminant = globalUniformRefs.greyscaleDistance;
    });

    return (
        <>
            {/* <sphere ref={sphereRef} name="bulletGreyscaleView" diameter={2}>
                <standardMaterial
                    name="bulletGreyscaleViewMaterial"
                    diffuseColor={new Color3(0.0, 0.0, 0.0)}
                    specularColor={new Color3(0.0, 0.0, 0.0)}
                    emissiveColor={new Color3(0.5, 0.5, 0.5)}
                    alpha={0.5}
                    backFaceCulling={false}
                />
            </sphere> */}
            {playableCharacterDefinition.emitters.map((emitterDefinition, i) => {
                return <Emitter key={i} focused={focused} emitterDefinition={emitterDefinition} />;
            })}
        </>
    );
};
