import { Vector3 } from "@babylonjs/core";
import React, { useEffect, useMemo, useState } from "react";
import { useBeforeRender } from "react-babylonjs";
import { useAssets } from "../containers/GameContainer";
import { Assets } from "../hooks/useLoadGame";
import { GameDefinition, PlayMusicInstruction } from "../types/gameDefinition/GameDefinition";

interface StageProps {
    stageIndex: number;
    setStageIndex: React.Dispatch<React.SetStateAction<number>>;
    gameDefinition: GameDefinition;
}

const executePlayMusic = (instruction: PlayMusicInstruction, assets: Assets) => {
    const sound = assets.sounds[instruction.musicURI];
    if (sound) {
        sound.play();
    } else {
        throw new Error(`Sound ${instruction.musicURI} not found`);
    }
};

export const Stage: React.FC<StageProps> = ({ stageIndex, setStageIndex, gameDefinition }) => {
    const assets = useAssets();

    const [phaseIndex, setPhaseIndex] = useState(0);
    const stageDefinition = useMemo(() => gameDefinition.stages[stageIndex], [gameDefinition, stageIndex]);
    const phaseDefinition = useMemo(() => stageDefinition.phases[phaseIndex], [stageDefinition, phaseIndex]);

    const [phaseStartTime, setPhaseStartTime] = useState(0);
    useEffect(() => {
        setPhaseStartTime(Date.now());
    }, [stageIndex, phaseIndex]);

    useBeforeRender(() => {
        const now = Date.now();
        phaseDefinition.instructions.forEach((instruction) => {
            if (instruction.executed) return;
            if (now - phaseStartTime < instruction.at) return;

            instruction.executed = true;
            switch (instruction.type) {
                case "playMusic":
                    executePlayMusic(instruction, assets);
                    break;
            }
        });
    });

    return <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={8} />;
};
