import { Vector3 } from "@babylonjs/core";
import React, { useEffect, useMemo, useState } from "react";
import { useExecutor } from "../hooks/useExecutor";
import { GameDefinition, PlayMusicInstruction, SpawnEnemyInstruction } from "../types/gameDefinition/GameDefinition";
import { Enemy } from "./Enemy";
import { FadeText } from "./FadeText";
import { Music } from "./Music";
import { StageMesh } from "./StageMesh";

interface StageProps {
    stageIndex: number;
    setStageIndex: React.Dispatch<React.SetStateAction<number>>;
    gameDefinition: GameDefinition;
}

const TITLE_POSITION = new Vector3(0, 4, 0.5);
const SUBTITLE_POSITION = new Vector3(0, 2, 0.5);

export const Stage: React.FC<StageProps> = ({ stageIndex, setStageIndex, gameDefinition }) => {
    const [phaseIndex, setPhaseIndex] = useState(0);
    const stageDefinition = useMemo(() => gameDefinition.stages[stageIndex], [gameDefinition, stageIndex]);
    const phaseDefinition = useMemo(() => stageDefinition.phases[phaseIndex], [stageDefinition, phaseIndex]);
    const [musics, setMusics] = useState<{ musicInstruction: PlayMusicInstruction; key: number }[]>([]);
    const [enemies, setEnemies] = useState<{ enemyInstruction: SpawnEnemyInstruction; key: number }[]>([]);

    useEffect(() => {
        return () => {
            setMusics([]);
            setEnemies([]);
        };
    }, [stageDefinition]);

    useExecutor((instruction, index) => {
        switch (instruction.type) {
            case "playMusic":
                setMusics((musics) => [...musics, { musicInstruction: instruction, key: index }]);
                break;
            case "spawnEnemy":
                setEnemies((enemies) => [...enemies, { enemyInstruction: instruction, key: index }]);
                break;
        }
    }, phaseDefinition.instructions);

    return (
        <>
            <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
            <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={8} />
            <FadeText text={stageDefinition.title} position={TITLE_POSITION} size={8} fontSize={0.1} />
            <FadeText text={stageDefinition.subtitle} position={SUBTITLE_POSITION} size={8} fontSize={0.08} />
            <StageMesh stageDefinition={stageDefinition} />
            {musics.map((music) => (
                <Music key={music.key} musicInstruction={music.musicInstruction} />
            ))}
            {enemies.map((enemy) => (
                <Enemy key={enemy.key} enemyInstruction={enemy.enemyInstruction} />
            ))}
        </>
    );
};
