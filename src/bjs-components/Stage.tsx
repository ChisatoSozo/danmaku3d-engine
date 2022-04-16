import { Vector3 } from "@babylonjs/core";
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { useExecutor } from "../hooks/useExecutor";
import { GameDefinition, PlayMusicInstruction, SpawnEnemyInstruction } from "../types/gameDefinition/GameDefinition";
import { KeyedInstruction } from "../types/utilTypes/InstructionTypes";
import { Camera } from "./Camera";
import { ControlsToState } from "./ControlsToState";
import { Enemy } from "./Enemy";
import { FadeText } from "./FadeText";
import { Music } from "./Music";
import { Player } from "./Player";
import { PlayerMovement } from "./PlayerMovement";
import { StageMesh } from "./StageMesh";

interface StageProps {
    time?: MutableRefObject<number>;
    currentStage: number;
    setCurrentStage: Dispatch<SetStateAction<number>>;
    currentPhase: number;
    setCurrentPhase: Dispatch<SetStateAction<number>>;
    gameDefinition: GameDefinition;
}

const TITLE_POSITION = new Vector3(0, 4, 0.5);
const SUBTITLE_POSITION = new Vector3(0, 2, 0.5);

export const Stage: React.FC<StageProps> = ({
    time,
    currentStage,
    setCurrentStage,
    currentPhase,
    setCurrentPhase,
    gameDefinition,
}) => {
    const stageDefinition = useMemo(() => gameDefinition.stages[currentStage], [gameDefinition, currentStage]);
    const phaseDefinition = useMemo(() => stageDefinition.phases[currentPhase], [stageDefinition, currentPhase]);
    const [musics, setMusics] = useState<KeyedInstruction<PlayMusicInstruction>[]>([]);
    const [enemies, setEnemies] = useState<KeyedInstruction<SpawnEnemyInstruction>[]>([]);
    const lastTime = useRef(0);

    useDeltaBeforeRender(() => {
        if (!time) return;
        if (time.current < lastTime.current) {
            setMusics([]);
            setEnemies([]);
        }
        lastTime.current = time.current;
    });

    useEffect(() => {
        return () => {
            setMusics([]);
            setEnemies([]);
        };
    }, [stageDefinition]);

    useExecutor(
        (instruction, index) => {
            switch (instruction.type) {
                case "playMusic":
                    setMusics((musics) => [...musics, { instruction, key: index }]);
                    break;
                case "spawnEnemy":
                    setEnemies((enemies) => [...enemies, { instruction, key: index }]);
                    break;
            }
        },
        phaseDefinition.instructions,
        time
    );

    const [focused, setFocused] = useState(false);

    return (
        <>
            <ControlsToState setFocused={setFocused} />
            <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
            <FadeText text={stageDefinition.title} position={TITLE_POSITION} size={8} fontSize={0.1} />
            <FadeText text={stageDefinition.subtitle} position={SUBTITLE_POSITION} size={8} fontSize={0.08} />
            <StageMesh stageDefinition={stageDefinition} />
            {musics.map((music) => (
                <Music key={music.key} musicInstruction={music.instruction} />
            ))}
            {enemies.map((enemy) => (
                <Enemy key={enemy.key} enemyInstruction={enemy.instruction} />
            ))}
            {gameDefinition.playableCharacters.length > 0 ? (
                <PlayerMovement
                    stageDefinition={stageDefinition}
                    playableCharacterDefinition={gameDefinition.playableCharacters[0]}
                >
                    <Player focused={focused} playableCharacterDefinition={gameDefinition.playableCharacters[0]} />
                    <Camera mode="player" />
                </PlayerMovement>
            ) : (
                <Camera mode="free" />
            )}
        </>
    );
};
