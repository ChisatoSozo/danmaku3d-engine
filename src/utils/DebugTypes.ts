import { GameDefinition } from "../types/gameDefinition/GameDefinition";

export const test = {
    playableCharacters: [
        {
            name: "Reimu",
            speed: 10,
            portraits: {
                angry: { asset: { isAsset: true, type: "texture", url: "angry.png" } },
                dissapoint: { asset: { isAsset: true, type: "texture", url: "dissapoint.png" } },
                excited: { asset: { isAsset: true, type: "texture", url: "excited.png" } },
                neutral: { asset: { isAsset: true, type: "texture", url: "neutral.png" } },
                shocked: { asset: { isAsset: true, type: "texture", url: "shocked.png" } },
                special: { asset: { isAsset: true, type: "texture", url: "special.png" } },
                tired: { asset: { isAsset: true, type: "texture", url: "tired.png" } },
            },
            emitters: [
                {
                    asset: { isAsset: true, type: "mesh", url: "yinyangball.glb" },
                    position: { x: 3, y: 0, z: 1 },
                    focusPosition: { x: 1.5, y: 0, z: 1 },
                },
                {
                    asset: { isAsset: true, type: "mesh", url: "yinyangball.glb" },
                    position: { x: -3, y: 0, z: 1 },
                    focusPosition: { x: -1.5, y: 0, z: 1 },
                    mirrored: true,
                },
            ],
        },
    ],
    stages: [
        {
            title: "What an Odd World",
            subtitle: "I wonder what we'll find",
            bounds: { min: { x: -10, y: 0, z: -10 }, max: { x: 10, y: 10, z: 10 } },
            stageMeshes: [
                { asset: { isAsset: true, type: "mesh", url: "landscapeTileAdraco.glb" }, length: 125 },
                { asset: { isAsset: true, type: "mesh", url: "landscapeTileBdraco.glb" }, length: 125 },
            ],
            phases: [
                {
                    delayAfter: 0,
                    instructions: [
                        {
                            at: 0,
                            _editorTrack: 1,
                            type: "playMusic",
                            asset: {
                                isAsset: true,
                                type: "sound",
                                url: "Dolls in Pseudo Paradise - Eternal Shrine Maiden.mp3",
                            },
                        },
                        {
                            at: 1000,
                            _editorTrack: 1,
                            type: "spawnEnemy",
                            hidden: false,
                            asset: { isAsset: true, type: "mesh", url: "blueFairy.glb" },
                            position: { x: 0, y: 0, z: 0 },
                            instructions: [
                                {
                                    at: 1000,
                                    _editorTrack: 1,
                                    type: "moveTo",
                                    position: { x: 10, y: 10, z: 0 },
                                    speed: 1,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
} as GameDefinition;
