import { useContext } from "react";
import { AssetsContext } from "../containers/GameContainer";
import { Assets } from "../types/Assets";
import { AnyAssetDefinition } from "../types/gameDefinition/AssetDefinition";

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
    } else if (assetDefinition.type === "glsl") {
        return assets.glsl[hash];
    } else if (assetDefinition.type === "texture") {
        return assets.textures[hash];
    } else if (assetDefinition.type === "vector") {
        return assets.textures[hash];
    } else if (assetDefinition.type === "timing") {
        return assets.textures[hash];
    }
    throw new Error(`Asset ${assetDefinition.type} is not an Asset Type`);
};
