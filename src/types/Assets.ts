import { AssetContainer, Sound, Texture } from "@babylonjs/core";

export interface MeshAdditionalData {
    animations?: {
        [key: string]: string;
    };
}

export interface MeshAsset {
    container: AssetContainer;
    additionalData?: MeshAdditionalData;
}

export interface BulletPatternAsset {
    initialPositionsHash: string;
    initialVelocitiesHash: string;
    timingsHash: string;
    positionFunctionGLSLHash: string;
    velocityFunctionGLSLHash: string;
    collisionFunctionGLSLHash: string;
}

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
