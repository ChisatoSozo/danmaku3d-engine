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

export type VectorAssetDefinition = BaseAssetDefinition<"vector"> & {
    generator: VectorGenerator;
};

export type AnyAssetDefinition =
    | MeshAssetDefinition
    | SoundAssetDefinition
    | TextureAssetDefinition
    | GLSLAssetDefinition
    | BulletPatternAssetDefinition
    | TimingAssetDefinition
    | VectorAssetDefinition;
