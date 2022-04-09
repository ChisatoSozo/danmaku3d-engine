import { Scene } from "@babylonjs/core";
import { useBeforeRender } from "react-babylonjs";

export interface PausableScene extends Scene {
    paused: boolean;
}

export const useDeltaBeforeRender = (func: (scene: PausableScene, deltaS: number) => void) => {
    useBeforeRender((_scene) => {
        const scene = _scene as PausableScene;
        const deltaS = scene.paused ? 0 : scene.getEngine().getDeltaTime() / 1000;
        func(scene as PausableScene, deltaS);
    });
};
