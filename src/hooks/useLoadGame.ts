import { Scene, Sound } from "@babylonjs/core";
import { useEffect, useState } from "react";
import { chisatoSozo } from "../test/chisatoSozo";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";

export interface Assets {
    sounds: { [key: string]: Sound };
}

export const makeDefaultAssets = (): Assets => ({ sounds: {} });

const loadSound = (gameDefinitionName: string, url: string, scene: Scene) => {
    return new Promise<Sound>((resolve) => {
        const URI = `/games/${gameDefinitionName}/sounds/${url}`;
        const sound = new Sound(
            url,
            URI,
            scene,
            () => {
                resolve(sound);
            },
            {
                autoplay: false,
            }
        );
    });
};

export const useLoadGame = (gameDefinitionName: string, scene: Scene | null) => {
    const [status, setStatus] = useState("");
    const [subStatus, setSubStatus] = useState("");
    const [assetName, setAssetName] = useState("");
    const [loadedAssets, setLoadedAssets] = useState<Assets>();
    const [gameDefinition, setGameDefinition] = useState<GameDefinition>();

    useEffect(() => {
        if (!scene) return;
        setLoadedAssets(undefined);
        const loadGame = async () => {
            if (!scene) return;
            const assets = makeDefaultAssets();

            setStatus("loading game definition");
            const gameDefinition = chisatoSozo;
            setGameDefinition(gameDefinition);

            for (let stageIndex in gameDefinition.stages) {
                setStatus(`loading stage ${stageIndex}`);
                const stage = gameDefinition.stages[stageIndex];
                for (let phaseIndex in stage.phases) {
                    setSubStatus(`loading phase ${phaseIndex}`);
                    const phase = stage.phases[phaseIndex];
                    for (let instructionIndex in phase.instructions) {
                        const instruction = phase.instructions[instructionIndex];
                        switch (instruction.type) {
                            case "playMusic":
                                if (assets.sounds[instruction.musicURI]) break;
                                setAssetName(instruction.musicURI);
                                assets.sounds[instruction.musicURI] = await loadSound(
                                    gameDefinitionName,
                                    instruction.musicURI,
                                    scene
                                );
                                break;
                        }
                    }
                }
            }
            setLoadedAssets(assets);
        };

        loadGame();
    }, [gameDefinitionName, scene]);

    return { status, subStatus, assetName, loadedAssets, gameDefinition };
};
