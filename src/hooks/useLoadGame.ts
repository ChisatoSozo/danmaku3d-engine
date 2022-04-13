import { Scene } from "@babylonjs/core";
import { useEffect, useMemo, useState } from "react";
import { glslLoaded, loadGLSL } from "../loaders/glslLoader";
import { loadMesh, meshLoaded } from "../loaders/meshLoader";
import { loadSound, soundLoaded } from "../loaders/soundLoader";
import { loadTiming, timingLoaded } from "../loaders/timingsLoader";
import { loadVector, vectorLoaded } from "../loaders/vectorLoader";
import { Assets, makeDefaultAssets } from "../types/Assets";
import { AnyAssetDefinition } from "../types/gameDefinition/AssetDefinition";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { traverseJsonAsync } from "../utils/ObjectUtils";

export const useLoadGame = (
    gameDefinition: GameDefinition | undefined,
    gameDefinitionName: string | undefined,
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
            const assets = loadedAssets ? { ...loadedAssets } : makeDefaultAssets();

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
                        case "vector":
                            if (vectorLoaded(assetDefinition, assets)) break;
                            setStatus(`loading vector ${assetDefinition.type}`);
                            await loadVector(gameDefinitionName, assetDefinition, scene, assets);
                            break;
                        case "timing":
                            if (timingLoaded(assetDefinition, assets)) break;
                            setStatus(`loading timing ${assetDefinition.type}`);
                            await loadTiming(gameDefinitionName, assetDefinition, scene, assets);
                            break;
                        default:
                            break;
                    }
                }
            });
            setLoadedAssets(assets);
            setLoadingAssets(false);
        };

        loadGame();

        return () => {
            setLoadingAssets(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameDefinition, gameDefinitionName, scene]);

    return returnValue;
};
