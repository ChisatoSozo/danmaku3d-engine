import { createContext, Dispatch, SetStateAction } from "react";
import { Assets, makeDefaultAssets } from "../types/Assets";
import { AnimationsContext, useAnimations } from "./AnimationsContext";
import { ControlsContext, useControlsContext } from "./ControlsContext";
import { useResolveFloatTextureReadPixels } from "./useResolveFloatTextureReadPixels";

interface GameContainerProps {
    assets: Assets;
    paused: boolean;
    setPaused: Dispatch<SetStateAction<boolean>>;
}

export const AssetsContext = createContext<Assets>(makeDefaultAssets());

export const GameContainer: React.FC<GameContainerProps> = ({ assets, children, paused, setPaused }) => {
    const controls = useControlsContext(false);
    const pausing = useAnimations(paused, setPaused);
    useResolveFloatTextureReadPixels();
    return (
        <AnimationsContext.Provider value={pausing}>
            <ControlsContext.Provider value={controls}>
                <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>
            </ControlsContext.Provider>
        </AnimationsContext.Provider>
    );
};
