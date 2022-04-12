import { BulletPatternDefinition, TimingGenerator, VectorGenerator } from "./BulletPatternDefinition";

export type AssetType = "mesh" | "sound" | "texture" | "bulletPattern" | "glsl" | "timing" | "vector";
export type ShaderType = "vertex" | "fragment" | "pixel";

export type BaseAssetDefinition<T extends AssetType> = {
    hash?: string;
    type: T;
};

export type GLSLAssetDefinition = BaseAssetDefinition<"glsl"> & {
    shaderType: ShaderType;
    url: string;
};

export const makeGLSLAssetDefinition = (): GLSLAssetDefinition => ({
    type: "glsl",
    shaderType: "vertex",
    url: "",
});

export type BulletPatternAssetDefinition = BaseAssetDefinition<"bulletPattern"> & {
    pattern: BulletPatternDefinition;
};

export type MeshAssetDefinition = BaseAssetDefinition<"mesh"> & {
    url: string;
};

export type SoundAssetDefinition = BaseAssetDefinition<"sound"> & {
    url: string;
};

export type TextureAssetDefinition = BaseAssetDefinition<"texture"> & {
    url: string;
};

export type TimingAssetDefinition = BaseAssetDefinition<"timing"> & {
    generator: TimingGenerator;
};

export const makeTimingAssetDefinition = (): TimingAssetDefinition => ({
    type: "timing",
    generator: {
        type: "uniform",
        count: 100,
        time: 0,
    },
});

export type VectorAssetDefinition = BaseAssetDefinition<"vector"> & {
    generator: VectorGenerator;
};

export const makeVectorAssetDefinition = (): VectorAssetDefinition => ({
    type: "vector",
    generator: {
        type: "burst",
        count: 100,
        radius: 1,
        startTheta: 0,
        thetaLength: 2 * Math.PI,
        startY: 1,
        yLength: 2,
    },
});

export type AnyAssetDefinition =
    | MeshAssetDefinition
    | SoundAssetDefinition
    | TextureAssetDefinition
    | GLSLAssetDefinition
    | BulletPatternAssetDefinition
    | TimingAssetDefinition
    | VectorAssetDefinition;
