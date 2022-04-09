import { GameDefinition } from "../types/gameDefinition/GameDefinition";

export const chisatoSozo: GameDefinition = {
    stages: [
        {
            title: "What an Odd World",
            subtitle: "I wonder what we'll find",
            bounds: {
                min: { x: -10, y: -10, z: -10 },
                max: { x: 10, y: 10, z: 10 },
            },
            stageMeshes: [
                {
                    asset: {
                        type: "mesh",
                        url: "landscapeTileAdraco.glb",
                    },
                    length: 125,
                },
                {
                    asset: {
                        type: "mesh",
                        url: "landscapeTileBdraco.glb",
                    },
                    length: 125,
                },
            ],
            phases: [
                {
                    delayAfter: 0,
                    instructions: [
                        {
                            at: 0,
                            type: "playMusic",
                            asset: {
                                type: "sound",
                                url: "eternalMelody.mp3",
                            },
                        },
                        {
                            at: 1000,
                            type: "spawnEnemy",
                            asset: {
                                type: "mesh",
                                url: "blueFairy.glb",
                            },
                            position: { x: 0, y: 0, z: 0 },
                            instructions: [
                                {
                                    at: 1000,
                                    type: "moveTo",
                                    position: { x: 10, y: 10, z: 0 },
                                    speed: 1,
                                },
                                {
                                    at: 2000,
                                    type: "moveTo",
                                    position: { x: -10, y: 10, z: 0 },
                                    speed: 1,
                                },
                                {
                                    at: 3000,
                                    type: "moveTo",
                                    position: { x: 0, y: 0, z: 0 },
                                    speed: 1,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
