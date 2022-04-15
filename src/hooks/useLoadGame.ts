import { Scene } from "@babylonjs/core";
import { useEffect, useMemo, useState } from "react";
import { bulletPatternLoaded, loadBulletPattern } from "../loaders/bulletPatternLoader";
import { glslLoaded, loadGLSL } from "../loaders/glslLoader";
import { loadMesh, meshLoaded } from "../loaders/meshLoader";
import { loadSound, soundLoaded } from "../loaders/soundLoader";
import { loadTiming, timingLoaded } from "../loaders/timingsLoader";
import { loadVector, vectorLoaded } from "../loaders/vectorLoader";
import { Assets, makeDefaultAssets } from "../types/Assets";
import { AnyAssetDefinition } from "../types/gameDefinition/AssetDefinition";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { traverseJsonAsync } from "../utils/ObjectUtils";
import { twoLayerCopy } from "../utils/Utils";

export const findAndLoadAssetDefinitions = async (
    gameDefinitionName: string,
    parentDefinition: any,
    scene: Scene,
    assets: Assets,
    assetToReload: string | undefined,
    setStatus: (status: string) => void,
    debug = false
) => {
    await traverseJsonAsync(parentDefinition, async (element, key) => {
        if (element.isAsset) {
            const assetDefinition = element as AnyAssetDefinition;
            switch (assetDefinition.type) {
                case "sound":
                    if (soundLoaded(assetDefinition, assets) || assetDefinition.url === assetToReload) {
                        if (debug) console.log(`sound ${assetDefinition.url} already loaded`);
                        break;
                    }
                    setStatus(`loading sound ${assetDefinition.url}`);
                    if (debug) {
                        console.log(`loading sound ${assetDefinition.url}`);
                    }
                    await loadSound(gameDefinitionName, assetDefinition, scene, assets);
                    break;
                case "mesh":
                    if (meshLoaded(assetDefinition, assets) || assetDefinition.url === assetToReload) {
                        if (debug) console.log(`mesh ${assetDefinition.url} already loaded`);
                        break;
                    }
                    if (meshLoaded(assetDefinition, assets) || assetDefinition.url === assetToReload) break;
                    setStatus(`loading mesh ${assetDefinition.url}`);
                    if (debug) {
                        console.log(`loading mesh ${assetDefinition.url}`);
                    }
                    await loadMesh(gameDefinitionName, assetDefinition, scene, assets);
                    break;
                case "glsl":
                    if (glslLoaded(assetDefinition, assets) || assetDefinition.url === assetToReload) {
                        if (debug) console.log(`glsl ${assetDefinition.url} already loaded`);
                        break;
                    }
                    if (glslLoaded(assetDefinition, assets) || assetDefinition.url === assetToReload) break;
                    setStatus(`loading glsl ${assetDefinition.url}`);
                    if (debug) {
                        console.log(`loading glsl ${assetDefinition.url}`);
                    }
                    await loadGLSL(gameDefinitionName, assetDefinition, scene, assets);
                    break;
                case "vector":
                    if (vectorLoaded(assetDefinition, assets)) {
                        if (debug) console.log(`vector ${JSON.stringify(assetDefinition.generator)} already loaded`);
                        break;
                    }
                    if (vectorLoaded(assetDefinition, assets)) break;
                    setStatus(`loading vector ${assetDefinition.type}`);
                    if (debug) {
                        console.log(`loading vector ${assetDefinition.type}`);
                    }
                    await loadVector(gameDefinitionName, assetDefinition, scene, assets);
                    break;
                case "timing":
                    if (timingLoaded(assetDefinition, assets)) {
                        if (debug) console.log(`timing ${JSON.stringify(assetDefinition.generator)} already loaded`);
                        break;
                    }
                    if (timingLoaded(assetDefinition, assets)) break;
                    setStatus(`loading timing ${assetDefinition.type}`);
                    if (debug) {
                        console.log(`loading timing ${assetDefinition.type}`);
                    }
                    await loadTiming(gameDefinitionName, assetDefinition, scene, assets);
                    break;
                case "bulletPattern":
                    if (bulletPatternLoaded(assetDefinition, assets) || assetDefinition.url === assetToReload) {
                        if (debug) console.log(`bulletPattern ${assetDefinition.url} already loaded`);
                        break;
                    }
                    setStatus(`loading bullet pattern ${assetDefinition.url}`);
                    if (debug) {
                        console.log(`loading bullet pattern ${assetDefinition.url}`);
                    }
                    await loadBulletPattern(gameDefinitionName, assetDefinition, scene, assets, setStatus);
                    break;
                default:
                    break;
            }
        }
    });
};

export const useLoadGame = (
    gameDefinition: GameDefinition | undefined,
    gameDefinitionName: string | undefined,
    assetToReload: string | undefined,
    scene: Scene | undefined
) => {
    const [status, setStatus] = useState("");
    const [loadedAssets, setLoadedAssets] = useState<Assets>();
    const [loadingAssets, setLoadingAssets] = useState(false);
    const returnValue = useMemo(() => ({ status, loadedAssets, loadingAssets }), [status, loadedAssets, loadingAssets]);

    useEffect(() => {
        if (!scene) return;
        if (!gameDefinition) return;
        if (!gameDefinitionName) return;
        const loadGame = async () => {
            if (!scene) return;
            const assets = loadedAssets ? (twoLayerCopy(loadedAssets) as Assets) : makeDefaultAssets();

            await findAndLoadAssetDefinitions(
                gameDefinitionName,
                gameDefinition,
                scene,
                assets,
                assetToReload,
                setStatus
            );

            setLoadedAssets(assets);
            setLoadingAssets(false);
        };

        loadGame();

        return () => {
            setLoadingAssets(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameDefinition, gameDefinitionName, assetToReload, scene]);

    return returnValue;
};
