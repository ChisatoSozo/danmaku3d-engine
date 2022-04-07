import { createContext, useContext } from "react";
import { Assets, makeDefaultAssets } from "../hooks/useLoadGame";

interface GameContainerProps {
    assets: Assets;
}

const AssetsContext = createContext<Assets>(makeDefaultAssets());
export const useAssets = () => useContext(AssetsContext);

export const GameContainer: React.FC<GameContainerProps> = ({ assets, children }) => {
    return <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>;
};
