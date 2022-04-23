import { Animation, TransformNode, Vector3 } from "@babylonjs/core";
import { useEffect, useMemo, useRef } from "react";
import { useBeforeRender } from "react-babylonjs";
import { useRegisterAnimation } from "../containers/AnimationsContext";
import { globalUniformRefs } from "../containers/GlobalUniforms";
import { useVectorMemo } from "../hooks/useVectorMemo";
import { EmitterDefinition } from "../types/gameDefinition/PlayableCharacterDefinition";
import { MeshFromAssetDefinition } from "./MeshFromAssetDefinition";
import { SubEmitter } from "./SubEmitter";

interface EmitterProps {
    emitterDefinition: EmitterDefinition;
    focused: boolean;
}

export const Emitter: React.FC<EmitterProps> = ({ emitterDefinition, focused }) => {
    const transformNodeRef = useRef<TransformNode>();
    const position = useVectorMemo(emitterDefinition.position);
    const unfocusPosition = useVectorMemo(emitterDefinition.position);
    const focusPosition = useVectorMemo(emitterDefinition.focusPosition);
    const scaling = useMemo(() => new Vector3(emitterDefinition.mirrored ? -1 : 1, 1, 1), [emitterDefinition]);
    const registerAnimation = useRegisterAnimation();

    useEffect(() => {
        if (!transformNodeRef.current) return;
        if (focused) {
            registerAnimation(
                Animation.CreateAndStartAnimation(
                    "anim",
                    transformNodeRef.current,
                    "position",
                    60,
                    15,
                    transformNodeRef.current.position,
                    focusPosition,
                    Animation.ANIMATIONLOOPMODE_CONSTANT
                )
            );
        } else {
            registerAnimation(
                Animation.CreateAndStartAnimation(
                    "anim",
                    transformNodeRef.current,
                    "position",
                    60,
                    15,
                    transformNodeRef.current.position,
                    unfocusPosition,
                    Animation.ANIMATIONLOOPMODE_CONSTANT
                )
            );
        }
    }, [focusPosition, focused, registerAnimation, unfocusPosition]);

    useBeforeRender(() => {
        if (!transformNodeRef.current) return;
        transformNodeRef.current.lookAt(globalUniformRefs.target);
    });

    return (
        <transformNode ref={transformNodeRef} position={position} name={""}>
            {emitterDefinition.subEmitters.map((subEmitterDefinition, index) => (
                <SubEmitter
                    key={index}
                    position={subEmitterDefinition.position}
                    bulletPatternDefinition={subEmitterDefinition.bulletPattern}
                />
            ))}
            <MeshFromAssetDefinition
                name=""
                alpha={focused ? 0.4 : 1}
                scaling={scaling}
                assetDefinition={emitterDefinition.asset}
                activeAnimation="default"
            />
        </transformNode>
    );
};
