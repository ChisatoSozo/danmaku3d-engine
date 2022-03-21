interface PlayMusicInstruction {
    type: "playMusic";
    musicURI: string;
}

type BaseStageInstruction = PlayMusicInstruction;

type StageInstruction = BaseStageInstruction & {
    at: number;
};

type Phase = {
    delayAfter: number;
    instructions: StageInstruction[];
};

export interface StageDefinition {
    title: string;
    subtitle: string;
    phases: Phase[];
}

export interface GameDefinition {
    stages: StageDefinition[];
}
