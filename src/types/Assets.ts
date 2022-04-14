import { AssetContainer, Sound, Texture } from "@babylonjs/core";
import { BulletPatternAssetDefinition, GLSLAssetDefinition } from "./gameDefinition/AssetDefinition";

export interface MeshAdditionalData {
    animations?: {
        [key: string]: string;
    };
}

export interface MeshAsset {
    container: AssetContainer;
    additionalData?: MeshAdditionalData;
}

export type BulletPatternAsset = {
    positionFunctionGLSL: GLSLAssetDefinition;
    velocityFunctionGLSL: GLSLAssetDefinition;
} & BulletPatternAssetDefinition["pattern"];

export interface Assets {
    sounds: { [key: string]: Sound };
    meshes: {
        [key: string]: MeshAsset;
    };
    bulletPatterns: { [key: string]: BulletPatternAsset };
    textures: { [key: string]: Texture };
    glsl: { [key: string]: string };
}

export const makeDefaultAssets = (): Assets => ({
    sounds: {},
    meshes: {},
    bulletPatterns: {},
    textures: {},
    glsl: {},
});
