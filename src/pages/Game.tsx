import { Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";
import { useState } from "react";
import { Scene } from "react-babylonjs";
import { useMatch } from "react-router-dom";
import { GameLoader, GameLoaderOutput } from "../bjs-components/GameLoader";
import { Stage } from "../bjs-components/Stage";
import { Overlay } from "../components/Overlay";
import { GameContainer } from "../containers/GameContainer";
import Engine from "../forks/Engine";
import { useWindowSize } from "../hooks/useWindowSize";

export const Game = () => {
    const name = useMatch("/game/:name")?.params.name;
    const windowSize = useWindowSize();
    const [gameLoaderOutput, setGameLoaderOutput] = useState<GameLoaderOutput>();
    const [loadGame, setLoadGame] = useState(false);
    const [stageIndex, setStageIndex] = useState(0);
    if (!name) return <>404 game not found</>;
    return (
        <>
            {!loadGame && (
                <Overlay>
                    <button onClick={() => setLoadGame(true)}>Load Game Definition</button>
                </Overlay>
            )}
            {gameLoaderOutput && !gameLoaderOutput.loadedAssets && (
                <Overlay>
                    <span> {gameLoaderOutput.status}</span>
                    <br></br>
                    <span> {gameLoaderOutput.subStatus}</span>
                    <br></br>
                    <span> {gameLoaderOutput.assetName}</span>
                </Overlay>
            )}
            <Engine width={windowSize.width} height={windowSize.height} antialias canvasId="babylonJS">
                <Scene>
                    {(!gameLoaderOutput || !gameLoaderOutput.loadedAssets || !gameLoaderOutput.gameDefinition) && (
                        <>
                            <arcRotateCamera
                                name="camera1"
                                target={Vector3.Zero()}
                                alpha={Math.PI / 2}
                                beta={Math.PI / 4}
                                radius={8}
                            />
                            {loadGame && (
                                <GameLoader gameDefinitionName={name} setGameLoaderOutput={setGameLoaderOutput} />
                            )}
                        </>
                    )}
                    {gameLoaderOutput && gameLoaderOutput.loadedAssets && gameLoaderOutput.gameDefinition && (
                        <GameContainer assets={gameLoaderOutput.loadedAssets}>
                            <Stage
                                stageIndex={stageIndex}
                                setStageIndex={setStageIndex}
                                gameDefinition={gameLoaderOutput.gameDefinition}
                            />
                        </GameContainer>
                    )}
                </Scene>
            </Engine>
        </>
    );
};
