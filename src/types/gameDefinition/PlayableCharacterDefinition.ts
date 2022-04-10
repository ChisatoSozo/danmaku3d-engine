import { MeshAssetDefinition, TextureAssetDefinition } from "./AssetDefinition";
import { IVector3 } from "./UtilTypes";

export type CharacterPortraitTexture = {
    asset: TextureAssetDefinition;
};

export type CharacterPortraitTextures = {
    angry?: CharacterPortraitTexture;
    dissapoint?: CharacterPortraitTexture;
    excited?: CharacterPortraitTexture;
    neutral: CharacterPortraitTexture;
    shocked?: CharacterPortraitTexture;
    special?: CharacterPortraitTexture;
    tired?: CharacterPortraitTexture;
};

export type EmitterDefinition = {
    asset: MeshAssetDefinition;
    position: IVector3;
    focusPosition: IVector3;
    mirrored?: boolean;
};

export type PlayableCharacterDefinition = {
    name: string;
    speed: number;
    portraits: CharacterPortraitTextures;
    emitters: EmitterDefinition[];
};
