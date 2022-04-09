import { Scene, Sound } from "@babylonjs/core";
import { Assets } from "../containers/GameContainer";
import { getAsset, useAssets } from "../hooks/useAsset";
import { SoundAssetDefinition } from "../types/gameDefinition/GameDefinition";

export const hashSound = (soundAssetDefinition: SoundAssetDefinition) => {
    return soundAssetDefinition.url;
};
export const soundLoaded = (assetDefinition: SoundAssetDefinition, assets: Assets) => {
    if (assetDefinition.hash) {
        return true;
    }

    const hash = hashSound(assetDefinition);
    if (assets.sounds[hash]) {
        return true;
    }

    return false;
};
export const loadSound = (
    gameDefinitionName: string,
    assetDefinition: SoundAssetDefinition,
    scene: Scene,
    assets: Assets
) => {
    return new Promise<boolean>((resolve) => {
        if (assetDefinition.hash) {
            resolve(false);
            return;
        }

        const hash = hashSound(assetDefinition);
        if (assets.sounds[hash]) {
            assetDefinition.hash = hash;
            resolve(false);
            return;
        }

        const URI = `/games/${gameDefinitionName}/sounds/${assetDefinition.url}`;
        const sound = new Sound(
            hash,
            URI,
            scene,
            () => {
                assets.sounds[hash] = sound;
                assetDefinition.hash = hash;
                resolve(true);
            },
            {
                autoplay: false,
            }
        );
    });
};

export const useSoundAsset = (assetDefinition: SoundAssetDefinition) => {
    const assets = useAssets();
    return getAsset(assets, assetDefinition) as Sound;
};

export const useSoundAssetArray = (assetDefinitions: SoundAssetDefinition[]) => {
    const assets = useAssets();
    return assetDefinitions.map((assetDefinition) => getAsset(assets, assetDefinition)) as Sound[];
};
