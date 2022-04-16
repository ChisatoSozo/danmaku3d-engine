import { MeshAssetDefinition, SoundAssetDefinition } from "./AssetDefinition";
import { EditorInstruction } from "./CommonDefinition";
import { EnemyInstruction } from "./EnemyDefinition";
import { PlayableCharacterDefinition } from "./PlayableCharacterDefinition";
import { IVector3 } from "./UtilTypes";

export type PlayMusicInstruction = {
    type: "playMusic";
    asset: SoundAssetDefinition;
};

export type SpawnEnemyInstruction = {
    type: "spawnEnemy";
    asset: MeshAssetDefinition;
    position: IVector3;
    hidden: boolean;
    instructions: EnemyInstruction[];
};

export type BaseStageInstruction = PlayMusicInstruction | SpawnEnemyInstruction;

export type StageInstruction = BaseStageInstruction & EditorInstruction;

export type PhaseDefinition = {
    delayAfter: number;
    instructions: StageInstruction[];
};

export const makePhaseDefinition = (): PhaseDefinition => ({
    delayAfter: 0,
    instructions: [],
});

export type StageMeshDefinition = {
    asset: MeshAssetDefinition;
    length: number;
};

export type StageDefinition = {
    title: string;
    subtitle: string;
    bounds: {
        min: IVector3;
        max: IVector3;
    };
    stageMeshes: StageMeshDefinition[];
    phases: PhaseDefinition[];
};

export const makeStageDefinition = (): StageDefinition => ({
    title: "",
    subtitle: "",
    bounds: {
        min: { x: 10, y: 0, z: 10 },
        max: { x: -10, y: 0, z: -10 },
    },
    stageMeshes: [],
    phases: [makePhaseDefinition()],
});

export type GameDefinition = {
    playableCharacters: PlayableCharacterDefinition[];
    stages: StageDefinition[];
};

export const makeGameDefinition = (): GameDefinition => ({
    playableCharacters: [],
    stages: [makeStageDefinition()],
});
