import { useContext } from "react";
import { Assets, AssetsContext } from "../containers/GameContainer";
import { AnyAssetDefinition } from "../types/gameDefinition/GameDefinition";

export const useAssets = () => useContext(AssetsContext);

export const getAsset = (assets: Assets, assetDefinition: AnyAssetDefinition) => {
    const hash = assetDefinition.hash;
    if (!hash) {
        throw new Error(`Asset ${hash} was never loaded`);
    }
    if (assetDefinition.type === "sound") {
        return assets.sounds[hash];
    } else if (assetDefinition.type === "mesh") {
        return assets.meshes[hash];
    }
    throw new Error(`Asset ${hash} is not an Asset Type`);
};
