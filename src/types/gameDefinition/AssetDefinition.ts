import { BulletPatternDefinition, TimingGenerator, VectorGenerator } from "./BulletPatternDefinition";

export type AssetType = "mesh" | "sound" | "texture" | "bulletPattern" | "glsl" | "timing" | "vector";
export type ShaderType = "vertex" | "fragment" | "pixel";

export type BaseAssetDefinition<T extends AssetType> = {
    hash?: string;
    type: T;
};

export interface GLSLAssetDefinition extends BaseAssetDefinition<"glsl"> {
    shaderType: ShaderType;
    url: string;
}

export interface BulletPatternAssetDefinition extends BaseAssetDefinition<"bulletPattern"> {
    pattern: BulletPatternDefinition;
}

export interface MeshAssetDefinition extends BaseAssetDefinition<"mesh"> {
    url: string;
}

export interface SoundAssetDefinition extends BaseAssetDefinition<"sound"> {
    url: string;
}

export interface TextureAssetDefinition extends BaseAssetDefinition<"texture"> {
    url: string;
}

export interface TimingAssetDefinition extends BaseAssetDefinition<"timing"> {
    generator: TimingGenerator;
}

export interface VectorAssetDefinition extends BaseAssetDefinition<"vector"> {
    generator: VectorGenerator;
}

export type AnyAssetDefinition =
    | MeshAssetDefinition
    | SoundAssetDefinition
    | TextureAssetDefinition
    | GLSLAssetDefinition
    | BulletPatternAssetDefinition
    | TimingAssetDefinition
    | VectorAssetDefinition;
