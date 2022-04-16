import { Scene as BJSScene, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";
import { useEffect, useMemo, useRef, useState } from "react";
import { Scene } from "react-babylonjs";
import { useLocation, useMatch } from "react-router-dom";
import { BindControls } from "../bjs-components/BindControls";
import { SceneElevator } from "../bjs-components/SceneElevator";
import { Stage } from "../bjs-components/Stage";
import { GameDefinitionEditor } from "../components/GameDefinitionEditor";
import { Overlay } from "../components/Overlay";
import { GameContainer } from "../containers/GameContainer";
import Engine from "../forks/Engine";
import { PausableScene } from "../hooks/useDeltaBeforeRender";
import { useLoadGame } from "../hooks/useLoadGame";
import { useWindowSize } from "../hooks/useWindowSize";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { assetHost } from "../utils/Utils";

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

export const Game = () => {
    const name = useMatch("/game/:name")?.params.name;
    const editing = useQuery().get("editing") === "true";
    const windowSize = useWindowSize();
    const [currentStage, setCurrentStage] = useState(0);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [gameDefinition, setGameDefinition] = useState<GameDefinition>();
    const [overrideGameDefinition, setOverrideGameDefinition] = useState<GameDefinition>();
    const [assetToReload, setAssetToReload] = useState<string>();
    const [paused, setPaused] = useState(false);
    const time = useRef(0);

    const gameDefinitionToUse = useMemo(() => {
        if (overrideGameDefinition) {
            return overrideGameDefinition;
        }

        return gameDefinition;
    }, [gameDefinition, overrideGameDefinition]);

    const [scene, setScene] = useState<BJSScene>();

    useEffect(() => {
        if (!scene) return;
        (scene as PausableScene).paused = paused;
    }, [scene, paused]);

    const gameLoaderOutput = useLoadGame(gameDefinitionToUse, name, assetToReload, scene);

    useEffect(() => {
        setAssetToReload(undefined);
    }, [gameLoaderOutput]);

    useEffect(() => {
        const fetchGameDefinition = async () => {
            const response = await fetch(`${assetHost}${name}/definition.json`);
            const gameDefinition = await response.json();
            setGameDefinition(gameDefinition);
        };
        fetchGameDefinition();
    }, [name]);

    if (!name) return <>404 game not found</>;
    return (
        <>
            {editing && (
                <Overlay>
                    <GameDefinitionEditor
                        paused={paused}
                        setPaused={setPaused}
                        time={time}
                        scene={scene}
                        gameDefinitionName={name}
                        gameDefinition={gameDefinition}
                        setGameDefinition={setGameDefinition}
                        overrideGameDefinition={overrideGameDefinition}
                        setOverrideGameDefinition={setOverrideGameDefinition}
                        currentStage={currentStage}
                        setCurrentStage={setCurrentStage}
                        currentPhase={currentPhase}
                        setCurrentPhase={setCurrentPhase}
                        setAssetToReload={setAssetToReload}
                    />
                </Overlay>
            )}
            {gameLoaderOutput && !gameLoaderOutput.loadedAssets && (
                <Overlay>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <span> {gameLoaderOutput.status}</span>
                    </div>
                </Overlay>
            )}
            <Engine width={windowSize.width} height={windowSize.height} antialias canvasId="babylonJS">
                <Scene>
                    <SceneElevator setScene={setScene} />
                    {gameLoaderOutput &&
                    gameLoaderOutput.loadedAssets &&
                    !gameLoaderOutput.loadingAssets &&
                    gameDefinitionToUse ? (
                        <GameContainer assets={gameLoaderOutput.loadedAssets} paused={paused} setPaused={setPaused}>
                            <BindControls />
                            <Stage
                                time={time}
                                currentStage={currentStage}
                                setCurrentStage={setCurrentStage}
                                currentPhase={currentPhase}
                                setCurrentPhase={setCurrentPhase}
                                gameDefinition={gameDefinitionToUse}
                            />
                        </GameContainer>
                    ) : (
                        <arcRotateCamera
                            name="camera1"
                            target={Vector3.Zero()}
                            alpha={Math.PI / 2}
                            beta={Math.PI / 4}
                            radius={50}
                        />
                    )}
                </Scene>
            </Engine>
        </>
    );
};
