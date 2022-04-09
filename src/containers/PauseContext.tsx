import { Animatable } from "@babylonjs/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useScene } from "react-babylonjs";
import { PausableScene } from "../hooks/useDeltaBeforeRender";

export const PauseContext = React.createContext<ReturnType<typeof usePause>>({
    paused: false,
    setPaused: () => {},
    registerAnimation: () => {},
    unregisterAnimation: () => {},
});

export const usePause = () => {
    const [paused, setPaused] = useState(false);
    const [, setAnimations] = useState<Animatable[]>([]);
    const scene = useScene();

    useEffect(() => {
        if (paused) {
            (scene as PausableScene).paused = true;
            setAnimations((animations) =>
                animations.filter((animation) => {
                    animation.pause();
                    return (
                        //@ts-ignore
                        animation._runtimeAnimations[0]._maxFrame - animation._runtimeAnimations[0]._currentFrame > 0.2
                    );
                })
            );
        } else {
            (scene as PausableScene).paused = false;
            setAnimations((animations) =>
                animations.filter((animation) => {
                    //@ts-ignore
                    animation._paused = false;
                    return (
                        //@ts-ignore
                        animation._runtimeAnimations[0]._maxFrame - animation._runtimeAnimations[0]._currentFrame > 0.2
                    );
                })
            );
        }
    }, [paused, scene]);

    const registerAnimation = useCallback((animation: Animatable | null) => {
        if (!animation) return;
        setAnimations((animations) => [animation, ...animations]);
    }, []);

    const unregisterAnimation = useCallback((animation: Animatable | null) => {
        if (!animation) return;
        setAnimations((animations) => animations.filter((animationInst) => animationInst !== animation));
    }, []);

    return { paused, setPaused, registerAnimation, unregisterAnimation };
};

export const useRegisterAnimation = () => {
    const { registerAnimation } = useContext(PauseContext);
    return registerAnimation;
};
