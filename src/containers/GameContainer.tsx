import { createContext } from "react";
import { Assets, makeDefaultAssets } from "../types/Assets";
import { ControlsContext, useControlsContext } from "./ControlsContext";
import { PauseContext, usePause } from "./PauseContext";
import { useResolveFloatTextureReadPixels } from "./useResolveFloatTextureReadPixels";

interface GameContainerProps {
    assets: Assets;
}

export const AssetsContext = createContext<Assets>(makeDefaultAssets());

export const GameContainer: React.FC<GameContainerProps> = ({ assets, children }) => {
    const controls = useControlsContext(false);
    const pausing = usePause();
    useResolveFloatTextureReadPixels();
    return (
        <PauseContext.Provider value={pausing}>
            <ControlsContext.Provider value={controls}>
                <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>
            </ControlsContext.Provider>
        </PauseContext.Provider>
    );
};
