import { IVector3Like } from "@babylonjs/core/Maths/math.like";
import { MeshAssetDefinition, TextureAssetDefinition } from "./AssetDefinition";

export interface CharacterPortraitTexture {
    asset: TextureAssetDefinition;
}

export interface CharacterPortraitTextures {
    angry?: CharacterPortraitTexture;
    dissapoint?: CharacterPortraitTexture;
    excited?: CharacterPortraitTexture;
    neutral: CharacterPortraitTexture;
    shocked?: CharacterPortraitTexture;
    special?: CharacterPortraitTexture;
    tired?: CharacterPortraitTexture;
}

export interface EmitterDefinition {
    asset: MeshAssetDefinition;
    position: IVector3Like;
    focusPosition: IVector3Like;
    mirrored?: boolean;
}

export interface PlayableCharacterDefinition {
    name: string;
    speed: number;
    portraits: CharacterPortraitTextures;
    emitters: EmitterDefinition[];
}
