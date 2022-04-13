import { Scene } from "@babylonjs/core";
import hash from "object-hash";
import { getAsset, useAssets } from "../hooks/useAsset";
import { Assets, BulletPatternAsset } from "../types/Assets";
import { BulletPatternAssetDefinition } from "../types/gameDefinition/AssetDefinition";
import { hashGLSL } from "./glslLoader";
import { hashTiming } from "./timingsLoader";
import { hashVector } from "./vectorLoader";

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

export const loadBulletPattern = async (
    gameDefinitionName: string,
    assetDefinition: BulletPatternAssetDefinition,
    scene: Scene,
    assets: Assets
) => {
    const hash = hashBulletPattern(assetDefinition);

    const patternDefinition = assetDefinition.pattern;
    const bulletPattern: BulletPatternAsset = {
        startPositionsStateHash: hashVector(patternDefinition._startPositionsState.asset),
        startVelocitiesStateHash: hashVector(patternDefinition._startVelocitiesState.asset),
        initialPositionsHash: hashVector(patternDefinition.initialPositions.asset),
        initialVelocitiesHash: hashVector(patternDefinition.initialVelocities.asset),
        initialCollisionsHash: hashVector(patternDefinition._initialCollisions.asset),
        timingsHash: hashTiming(patternDefinition.timings.asset),
        positionFunctionGLSLHash: hashGLSL(patternDefinition.positionFunctionGLSL.asset),
        velocityFunctionGLSLHash: hashGLSL(patternDefinition.velocityFunctionGLSL.asset),
        collisionFunctionGLSLHash: hashGLSL(patternDefinition.collisionFunctionGLSL.asset),
    };

    assets.bulletPatterns[hash] = bulletPattern;
    assetDefinition.hash = hash;
};

export const useBulletPatternAsset = (assetDefinition: BulletPatternAssetDefinition) => {
    const assets = useAssets();
    return getAsset(assets, assetDefinition) as string;
};

export const useBulletPatternAssetArray = (assetDefinitions: BulletPatternAssetDefinition[]) => {
    const assets = useAssets();
    return assetDefinitions.map((assetDefinition) => getAsset(assets, assetDefinition)) as string[];
};
