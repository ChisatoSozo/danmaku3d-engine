import { Color3, Scene, TransformNode, Vector3 } from "@babylonjs/core";
import { RefObject } from "react";
import "./Behaviours";
import { CustomParticleSystemEngine } from "./CustomParticleSystemEngine";

const clickParticles: {
    current?: CustomParticleSystemEngine;
} = {};

const timer: {
    current?: number;
} = {};

export const makeClickParticles = (
    scene: Scene,
    locations: Vector3[],
    origin: TransformNode | RefObject<TransformNode> = new TransformNode("")
) => {
    if (!clickParticles.current || clickParticles.current?.getIsDisposed()) {
        if (clickParticles.current) {
            clickParticles.current.dispose();
        }
        const engine = new CustomParticleSystemEngine(
            {
                count: 5000,
                minLifespan: 0.3,
                maxLifespan: 1.5,
                minSize: 0.1,
                maxSize: 0.3,
                direction1: new Vector3(1, 1, 1),
                direction2: new Vector3(-1, -1, 1),
                minVelocity: 3,
                maxVelocity: 6,
                color: new Color3(1.0, 0.1, 0.1),
                //@ts-ignore
                emitter: origin.current || origin,
            },
            scene
        );

        // Where the particles come from
        engine.emitRadius = 0.5;
        engine.emissionType = "locations";

        engine.init();
        clickParticles.current = engine;
    }

    if (!clickParticles.current) return;

    //@ts-ignore
    clickParticles.current.settings.emitter = origin.current || origin;
    clickParticles.current.emitLocations = locations;

    clickParticles.current.start();

    if (timer.current) {
        window.clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
        if (!clickParticles.current) return;
        clickParticles.current.stop();
    }, 100);
};
