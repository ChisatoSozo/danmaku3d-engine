import { AssetContainer, Scene, SceneLoader } from "@babylonjs/core";
import { Assets } from "../containers/GameContainer";
import { getAsset, useAssets } from "../hooks/useAsset";
import { MeshAssetDefinition } from "../types/gameDefinition/GameDefinition";

export const hashMesh = (meshAssetDefinition: MeshAssetDefinition) => {
    return meshAssetDefinition.url;
};
export const meshLoaded = (assetDefinition: MeshAssetDefinition, assets: Assets) => {
    if (assetDefinition.hash) {
        return true;
    }

    const hash = hashMesh(assetDefinition);
    if (assets.meshes[hash]) {
        return true;
    }

    return false;
};
export const loadMesh = (
    gameDefinitionName: string,
    assetDefinition: MeshAssetDefinition,
    scene: Scene,
    assets: Assets
) => {
    return new Promise<boolean>((resolve) => {
        if (assetDefinition.hash) {
            resolve(false);
            return;
        }

        const hash = hashMesh(assetDefinition);
        if (assets.meshes[hash]) {
            assetDefinition.hash = hash;
            resolve(false);
            return;
        }

        const root = `/games/${gameDefinitionName}/meshes/`;
        const URI = assetDefinition.url;
        SceneLoader.LoadAssetContainer(root, URI, scene, (container) => {
            assets.meshes[hash] = container;
            assetDefinition.hash = hash;
            resolve(true);
        });
    });
};

export const useMeshAsset = (assetDefinition: MeshAssetDefinition) => {
    const assets = useAssets();
    return getAsset(assets, assetDefinition) as AssetContainer;
};

export const useMeshAssetArray = (assetDefinitions: MeshAssetDefinition[]) => {
    const assets = useAssets();
    return assetDefinitions.map((assetDefinition) => getAsset(assets, assetDefinition)) as AssetContainer[];
};
