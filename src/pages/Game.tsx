import { Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";
import { useEffect, useMemo, useState } from "react";
import { Scene } from "react-babylonjs";
import { useLocation, useMatch } from "react-router-dom";
import { BindControls } from "../bjs-components/BindControls";
import { GameLoader, GameLoaderOutput } from "../bjs-components/GameLoader";
import { Stage } from "../bjs-components/Stage";
import { GameDefinitionEditor } from "../components/GameDefinitionEditor";
import { Overlay } from "../components/Overlay";
import { GameContainer } from "../containers/GameContainer";
import Engine from "../forks/Engine";
import { useWindowSize } from "../hooks/useWindowSize";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

export const Game = () => {
    const name = useMatch("/game/:name")?.params.name;
    const editing = useQuery().get("editing") === "true";
    const windowSize = useWindowSize();
    const [gameLoaderOutput, setGameLoaderOutput] = useState<GameLoaderOutput>();
    const [loadGame, setLoadGame] = useState(false);
    const [stageIndex, setStageIndex] = useState(0);
    const [gameDefinition, setGameDefinition] = useState<GameDefinition>();
    useEffect(() => {
        const fetchGameDefinition = async () => {
            const response = await fetch(`/games/${name}/definition.json`);
            const gameDefinition = await response.json();
            setGameDefinition(gameDefinition);
        };
        fetchGameDefinition();
    }, [name]);

    if (!name) return <>404 game not found</>;
    return (
        <>
            {editing ? (
                <Overlay>
                    <GameDefinitionEditor
                        gameDefinitionName={name}
                        gameDefinition={gameDefinition}
                        setGameDefinition={setGameDefinition}
                    />
                </Overlay>
            ) : (
                <>
                    {!loadGame && (
                        <Overlay>
                            <button onClick={() => setLoadGame(true)}>Load Game Definition</button>
                        </Overlay>
                    )}
                    {gameLoaderOutput && !gameLoaderOutput.loadedAssets && (
                        <Overlay>
                            <span> {gameLoaderOutput.status}</span>
                        </Overlay>
                    )}
                </>
            )}
            <Engine width={windowSize.width} height={windowSize.height} antialias canvasId="babylonJS">
                <Scene>
                    {gameDefinition && (
                        <GameLoader
                            loadGame={loadGame}
                            gameDefinition={gameDefinition}
                            gameDefinitionName={name}
                            setGameLoaderOutput={setGameLoaderOutput}
                        />
                    )}
                    {(!gameLoaderOutput || !gameLoaderOutput.loadedAssets || !gameDefinition) && (
                        <>
                            <arcRotateCamera
                                name="camera1"
                                target={Vector3.Zero()}
                                alpha={Math.PI / 2}
                                beta={Math.PI / 4}
                                radius={8}
                            />
                        </>
                    )}
                    {gameLoaderOutput && gameLoaderOutput.loadedAssets && gameDefinition && (
                        <GameContainer assets={gameLoaderOutput.loadedAssets}>
                            <BindControls />
                            <Stage
                                stageIndex={stageIndex}
                                setStageIndex={setStageIndex}
                                gameDefinition={gameDefinition}
                            />
                        </GameContainer>
                    )}
                </Scene>
            </Engine>
        </>
    );
};
