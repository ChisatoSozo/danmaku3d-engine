import { IVector3Like } from "@babylonjs/core/Maths/math.like";
import { Instruction } from "./CommonDefinition";
import { EnemyInstruction } from "./EnemyDefinition";

export type AssetType = "mesh" | "sound";

export type BaseAssetDefinition<T extends AssetType> = {
    hash?: string;
    type: T;
};

export interface MeshAssetDefinition extends BaseAssetDefinition<"mesh"> {
    url: string;
}

export interface SoundAssetDefinition extends BaseAssetDefinition<"sound"> {
    url: string;
}

export type AnyAssetDefinition = MeshAssetDefinition | SoundAssetDefinition;

export interface PlayMusicInstruction {
    type: "playMusic";
    asset: SoundAssetDefinition;
}

export interface SpawnEnemyInstruction {
    type: "spawnEnemy";
    asset: MeshAssetDefinition;
    position: IVector3Like;
    instructions: EnemyInstruction[];
}

export type BaseStageInstruction = PlayMusicInstruction | SpawnEnemyInstruction;

export type StageInstruction = BaseStageInstruction & Instruction;

export type Phase = {
    delayAfter: number;
    instructions: StageInstruction[];
};

export interface StageMeshDefinition {
    asset: MeshAssetDefinition;
    length: number;
}

export interface StageDefinition {
    title: string;
    subtitle: string;
    bounds: {
        min: IVector3Like;
        max: IVector3Like;
    };
    stageMeshes: StageMeshDefinition[];
    phases: Phase[];
}

export interface GameDefinition {
    stages: StageDefinition[];
}
