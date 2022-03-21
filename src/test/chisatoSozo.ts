import { GameDefinition } from "../types/gameDefinition/GameDefinition";

export const chisatoSozo: GameDefinition = {
    stages: [
        {
            title: "What an Odd World",
            subtitle: "I wonder what we'll find",
            phases: [
                {
                    delayAfter: 0,
                    instructions: [
                        {
                            at: 0,
                            type: "playMusic",
                            musicURI: "eternalMelody.mp3",
                        },
                    ],
                },
            ],
        },
    ],
};
