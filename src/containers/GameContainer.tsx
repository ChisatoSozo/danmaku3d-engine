import { AssetContainer, Sound } from "@babylonjs/core";
import { createContext } from "react";

interface GameContainerProps {
    assets: Assets;
}

export interface Assets {
    sounds: { [key: string]: Sound };
    meshes: { [key: string]: AssetContainer };
}

export const makeDefaultAssets = (): Assets => ({
    sounds: {},
    meshes: {},
});

export const AssetsContext = createContext<Assets>(makeDefaultAssets());

export const GameContainer: React.FC<GameContainerProps> = ({ assets, children }) => {
    return <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>;
};
