import React, { useEffect } from "react";
import { useScene } from "react-babylonjs";
import { useLoadGame } from "../hooks/useLoadGame";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";

export type GameLoaderOutput = ReturnType<typeof useLoadGame>;

interface GameLoaderProps {
    loadGame: boolean;
    gameDefinition: GameDefinition;
    gameDefinitionName: string;
    setGameLoaderOutput: (output: GameLoaderOutput) => void;
}

export const GameLoader: React.FC<GameLoaderProps> = ({
    loadGame,
    gameDefinition,
    gameDefinitionName,
    setGameLoaderOutput,
}) => {
    const scene = useScene();
    const gameLoaderOutput = useLoadGame(loadGame, gameDefinition, gameDefinitionName, scene);
    useEffect(() => {
        setGameLoaderOutput(gameLoaderOutput);
    }, [gameLoaderOutput, setGameLoaderOutput]);

    return null;
};
