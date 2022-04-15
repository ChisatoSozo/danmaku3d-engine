import { Effect, Scene } from "@babylonjs/core";
import hash from "object-hash";
import { getAsset, useAssets } from "../hooks/useAsset";
import { findAndLoadAssetDefinitions } from "../hooks/useLoadGame";
import { Assets, BulletPatternAsset } from "../types/Assets";
import { BulletPatternAssetDefinition, GLSLAssetDefinition } from "../types/gameDefinition/AssetDefinition";
import { BulletPatternDefinition } from "../types/gameDefinition/BulletPatternDefinition";
import { BulletPhase, constructPixelShader } from "../utils/BabylonUtils";
import { assetHost } from "../utils/Utils";
import { manualLoadGLSL } from "./glslLoader";

export const hashBulletPattern = (bulletPatternAssetDefinition: BulletPatternAssetDefinition) => {
    return hash(bulletPatternAssetDefinition);
};
export const bulletPatternLoaded = (assetDefinition: BulletPatternAssetDefinition, assets: Assets) => {
    const hash = hashBulletPattern(assetDefinition);
    if (assets.bulletPatterns[hash]) {
        assetDefinition.hash = hash;
        return true;
    }

    return false;
};

const glslAssetDefinitionToContent = (glslAssetDefinition: GLSLAssetDefinition, assets: Assets) => {
    const hash = glslAssetDefinition.hash;
    if (!hash) throw new Error("glslAssetDefinitionToContent: hash is undefined");

    const glslAsset = assets.glsl[hash];
    if (!glslAsset) throw new Error("glslAssetDefinitionToContent: glslAsset is undefined");

    const shaderContent = Effect.ShadersStore[glslAsset + "PixelShader"];
    if (!shaderContent) throw new Error("glslAssetDefinitionToContent: shaderContent is undefined");
    return shaderContent;
};

export const loadBulletPattern = async (
    gameDefinitionName: string,
    assetDefinition: BulletPatternAssetDefinition,
    scene: Scene,
    assets: Assets,
    setStatus: (status: string) => void
) => {
    const hash = hashBulletPattern(assetDefinition);

    const URI = `${assetHost}${gameDefinitionName}/bulletPatterns/${assetDefinition.url}`;
    const patternDefinition = (await fetch(URI).then((response) => response.json())) as BulletPatternDefinition;
    await findAndLoadAssetDefinitions(gameDefinitionName, patternDefinition, scene, assets, undefined, setStatus);

    const positionPhases = patternDefinition.phases.map((phase): BulletPhase => {
        const at = phase.at;
        const positionInitializationGLSL = glslAssetDefinitionToContent(phase.positionInitializationGLSL, assets);
        const positionUpdateGLSL = glslAssetDefinitionToContent(phase.positionUpdateGLSL, assets);

        return {
            at,
            initializationFunction: positionInitializationGLSL,
            updateFunction: positionUpdateGLSL,
        };
    });

    const velocityPhases = patternDefinition.phases.map((phase): BulletPhase => {
        const at = phase.at;
        const velocityInitializationGLSL = glslAssetDefinitionToContent(phase.velocityInitializationGLSL, assets);
        const velocityUpdateGLSL = glslAssetDefinitionToContent(phase.velocityUpdateGLSL, assets);

        return {
            at,
            initializationFunction: velocityInitializationGLSL,
            updateFunction: velocityUpdateGLSL,
        };
    });

    const positionFunctionGLSL = constructPixelShader(positionPhases, "position");
    const velocityFunctionGLSL = constructPixelShader(velocityPhases, "velocity");

    const positionFunctionGLSLName = hash + "PositionFunction";
    const velocityFunctionGLSLName = hash + "VelocityFunction";

    const positionFunctionGLSLHash = manualLoadGLSL(positionFunctionGLSLName, positionFunctionGLSL, "pixel", assets);
    const velocityFunctionGLSLHash = manualLoadGLSL(velocityFunctionGLSLName, velocityFunctionGLSL, "pixel", assets);

    const bulletPattern: BulletPatternAsset = {
        ...patternDefinition,
        positionFunctionGLSL: {
            isAsset: true,
            hash: positionFunctionGLSLHash,
            type: "glsl",
            shaderType: "pixel",
            url: "",
        },
        velocityFunctionGLSL: {
            isAsset: true,
            hash: velocityFunctionGLSLHash,
            type: "glsl",
            shaderType: "pixel",
            url: "",
        },
    };

    assets.bulletPatterns[hash] = bulletPattern;
    assetDefinition.hash = hash;
};

export const useBulletPatternAsset = (assetDefinition: BulletPatternAssetDefinition) => {
    const assets = useAssets();
    return getAsset(assets, assetDefinition) as BulletPatternAsset;
};

export const useBulletPatternAssetArray = (assetDefinitions: BulletPatternAssetDefinition[]) => {
    const assets = useAssets();
    return assetDefinitions.map((assetDefinition) => getAsset(assets, assetDefinition)) as BulletPatternAsset[];
};
