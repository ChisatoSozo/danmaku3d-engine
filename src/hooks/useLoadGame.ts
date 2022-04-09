import { Scene } from "@babylonjs/core";
import { useEffect, useMemo, useState } from "react";
import { glslLoaded, loadGLSL } from "../loaders/glslLoader";
import { loadMesh, meshLoaded } from "../loaders/meshLoader";
import { loadSound, soundLoaded } from "../loaders/soundLoader";
import { Assets, makeDefaultAssets } from "../types/Assets";
import { AnyAssetDefinition } from "../types/gameDefinition/AssetDefinition";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { traverseJsonAsync } from "../utils/ObjectUtils";

export const useLoadGame = (
    doLoadGame: boolean,
    gameDefinition: GameDefinition,
    gameDefinitionName: string,
    scene: Scene | null
) => {
    const [status, setStatus] = useState("");
    const [loadedAssets, setLoadedAssets] = useState<Assets>();
    const returnValue = useMemo(() => ({ status, loadedAssets }), [status, loadedAssets]);

    useEffect(() => {
        if (!scene) return;
        if (!doLoadGame) return;
        const loadGame = async () => {
            if (!scene) return;
            const assets = makeDefaultAssets();

            await traverseJsonAsync(gameDefinition, async (element, key) => {
                if (key === "asset") {
                    const assetDefinition = element as AnyAssetDefinition;
                    switch (assetDefinition.type) {
                        case "sound":
                            if (soundLoaded(assetDefinition, assets)) break;
                            setStatus(`loading sound ${assetDefinition.url}`);
                            await loadSound(gameDefinitionName, assetDefinition, scene, assets);
                            break;
                        case "mesh":
                            if (meshLoaded(assetDefinition, assets)) break;
                            setStatus(`loading mesh ${assetDefinition.url}`);
                            await loadMesh(gameDefinitionName, assetDefinition, scene, assets);
                            break;
                        case "glsl":
                            if (glslLoaded(assetDefinition, assets)) break;
                            setStatus(`loading glsl ${assetDefinition.url}`);
                            await loadGLSL(gameDefinitionName, assetDefinition, scene, assets);
                            break;
                    }
                }
            });
            setLoadedAssets(assets);
        };

        loadGame();

        return () => {
            setLoadedAssets((loadedAssets) => {
                loadedAssets?.meshes &&
                    Object.values(loadedAssets.meshes).forEach((mesh) => {
                        mesh.container.dispose();
                    });
                loadedAssets?.textures &&
                    Object.values(loadedAssets.textures).forEach((texture) => {
                        texture.dispose();
                    });
                loadedAssets?.sounds &&
                    Object.values(loadedAssets.sounds).forEach((sound) => {
                        sound.dispose();
                    });
                return undefined;
            });
        };
    }, [doLoadGame, gameDefinition, gameDefinitionName, scene]);

    return returnValue;
};
