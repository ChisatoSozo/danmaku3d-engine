import { Scene } from "@babylonjs/core";
import { useEffect, useState } from "react";
import { Assets } from "../containers/GameContainer";
import { loadMesh, meshLoaded } from "../loaders/meshLoader";
import { loadSound, soundLoaded } from "../loaders/soundLoader";
import { chisatoSozo } from "../test/chisatoSozo";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";

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
            const assets = {
                sounds: {},
                meshes: {},
            };

            setStatus("loading game definition");
            const gameDefinition = chisatoSozo;
            setGameDefinition(gameDefinition);

            for (let stageIndex in gameDefinition.stages) {
                setStatus(`loading stage ${stageIndex}`);
                const stage = gameDefinition.stages[stageIndex];
                for (let stageMeshIndex in stage.stageMeshes) {
                    const stageMesh = stage.stageMeshes[stageMeshIndex];
                    if (meshLoaded(stageMesh.asset, assets)) {
                        continue;
                    }
                    setAssetName(stageMesh.asset.url);
                    await loadMesh(gameDefinitionName, stageMesh.asset, scene, assets);
                }

                for (let phaseIndex in stage.phases) {
                    setSubStatus(`loading phase ${phaseIndex}`);
                    const phase = stage.phases[phaseIndex];
                    for (let instructionIndex in phase.instructions) {
                        const instruction = phase.instructions[instructionIndex];

                        switch (instruction.type) {
                            case "playMusic":
                                if (soundLoaded(instruction.asset, assets)) break;
                                setAssetName(instruction.asset.url);
                                await loadSound(gameDefinitionName, instruction.asset, scene, assets);
                                break;
                            case "spawnEnemy":
                                if (meshLoaded(instruction.asset, assets)) break;
                                setAssetName(instruction.asset.url);
                                await loadMesh(gameDefinitionName, instruction.asset, scene, assets);
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
