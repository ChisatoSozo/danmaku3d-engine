import React, { useEffect } from "react";
import { useScene } from "react-babylonjs";
import { useLoadGame } from "../hooks/useLoadGame";

export type GameLoaderOutput = ReturnType<typeof useLoadGame>;

interface GameLoaderProps {
    gameDefinitionName: string;
    setGameLoaderOutput: (output: GameLoaderOutput) => void;
}

export const GameLoader: React.FC<GameLoaderProps> = ({ gameDefinitionName, setGameLoaderOutput }) => {
    const scene = useScene();
    const gameLoaderOutput = useLoadGame(gameDefinitionName, scene);
    useEffect(() => {
        setGameLoaderOutput(gameLoaderOutput);
    }, [gameLoaderOutput, setGameLoaderOutput]);

    return null;
};
