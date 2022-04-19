import { Color3, Vector3 } from "@babylonjs/core";
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
    editing: boolean;
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
    editing,
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

    const removeEnemy = (enemy: KeyedInstruction<SpawnEnemyInstruction>) => {
        setEnemies((enemies) => enemies.filter((e) => e.key !== enemy.key));
    };

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

    const stageBoundsVisualizationPosition = useMemo(() => {
        const stageBounds = stageDefinition.bounds;
        const stageBoundsVisualizationPosition = new Vector3(
            (stageBounds.max.x + stageBounds.min.x) / 2,
            (stageBounds.max.y + stageBounds.min.y) / 2,
            (stageBounds.max.z + stageBounds.min.z) / 2
        );
        return stageBoundsVisualizationPosition;
    }, [stageDefinition]);

    const stageBoundsExtents = useMemo(() => {
        const stageBounds = stageDefinition.bounds;
        const stageBoundsExtents = new Vector3(
            Math.abs(stageBounds.max.x - stageBounds.min.x),
            Math.abs(stageBounds.max.y - stageBounds.min.y),
            Math.abs(stageBounds.max.z - stageBounds.min.z)
        );
        return stageBoundsExtents;
    }, [stageDefinition]);

    console.log(stageBoundsExtents);

    return (
        <>
            {editing && (
                <box
                    name="stageBoundsVisualization"
                    position={stageBoundsVisualizationPosition}
                    width={stageBoundsExtents.x}
                    height={stageBoundsExtents.y}
                    depth={stageBoundsExtents.z}
                >
                    <standardMaterial
                        name="stageBoundsVisualizationMaterial"
                        emissiveColor={new Color3(1, 1, 1)}
                        backFaceCulling={false}
                        wireframe={true}
                    />
                </box>
            )}
            <ControlsToState editing={editing} setFocused={setFocused} />
            <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
            <FadeText text={stageDefinition.title} position={TITLE_POSITION} size={8} fontSize={0.1} />
            <FadeText text={stageDefinition.subtitle} position={SUBTITLE_POSITION} size={8} fontSize={0.08} />
            <StageMesh stageDefinition={stageDefinition} />
            {musics.map((music) => (
                <Music key={music.key} musicInstruction={music.instruction} />
            ))}
            {enemies.map((enemy) => (
                <Enemy key={enemy.key} enemyInstruction={enemy.instruction} removeMe={() => removeEnemy(enemy)} />
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
