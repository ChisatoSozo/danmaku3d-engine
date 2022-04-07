export interface PlayMusicInstruction {
    type: "playMusic";
    musicURI: string;
}

export type BaseStageInstruction = PlayMusicInstruction;

export type StageInstruction = BaseStageInstruction & {
    at: number;
    executed?: boolean;
};

export type Phase = {
    delayAfter: number;
    instructions: StageInstruction[];
};

export interface StageMeshDefinition {
    url: string;
    length: number;
}

export interface StageDefinition {
    title: string;
    subtitle: string;
    stageMeshes: StageMeshDefinition[];
    phases: Phase[];
}

export interface GameDefinition {
    stages: StageDefinition[];
}
