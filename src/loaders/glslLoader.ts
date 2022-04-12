import { Effect, Scene } from "@babylonjs/core";
import { getAsset, useAssets } from "../hooks/useAsset";
import { Assets } from "../types/Assets";
import { GLSLAssetDefinition, ShaderType } from "../types/gameDefinition/AssetDefinition";

export const hashGLSL = (glslAssetDefinition: GLSLAssetDefinition) => {
    return glslAssetDefinition.url + glslAssetDefinition.shaderType;
};
export const glslLoaded = (assetDefinition: GLSLAssetDefinition, assets: Assets) => {
    if (assetDefinition.hash) {
        return true;
    }

    const hash = hashGLSL(assetDefinition);
    if (assets.glsl[hash]) {
        assetDefinition.hash = hash;
        return true;
    }

    return false;
};

const shaderTypeToSuffixMap: { [key in ShaderType]: string } = {
    vertex: "VertexShader",
    fragment: "FragmentShader",
    pixel: "PixelShader",
};

export const loadGLSL = async (
    gameDefinitionName: string,
    assetDefinition: GLSLAssetDefinition,
    scene: Scene,
    assets: Assets
) => {
    const hash = hashGLSL(assetDefinition);
    const URI = `${window.location.protocol}//${window.location.hostname}:5000/${gameDefinitionName}/glsl/${assetDefinition.url}`;
    const response = await fetch(URI);
    if (!response.ok) throw new Error(`Failed to load ${URI}: ${response.statusText}`);
    const glsl = await response.text();
    const shaderName = assetDefinition.url.replaceAll(".", "") + shaderTypeToSuffixMap[assetDefinition.shaderType];
    assets.glsl[hash] = shaderName;
    Effect.ShadersStore[shaderName] = glsl;
};

export const useGLSLAsset = (assetDefinition: GLSLAssetDefinition) => {
    const assets = useAssets();
    return getAsset(assets, assetDefinition) as string;
};

export const useGLSLAssetArray = (assetDefinitions: GLSLAssetDefinition[]) => {
    const assets = useAssets();
    return assetDefinitions.map((assetDefinition) => getAsset(assets, assetDefinition)) as string[];
};
