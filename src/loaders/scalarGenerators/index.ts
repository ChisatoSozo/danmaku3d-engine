import { Scene } from "@babylonjs/core";
import { TimingGenerator } from "../../types/gameDefinition/BulletPatternDefinition";
import { makeTextureFromScalars } from "./scalarGeneratorUtils";
import { uniformTimingGenerator } from "./uniformTimingGenerator";

export type TimingGeneratorFunction = (vectorGenerator: TimingGenerator) => number[];

const vectorGeneratorFunctions: { [key in TimingGenerator["type"]]: TimingGeneratorFunction } = {
    uniform: uniformTimingGenerator,
};

export const generateTimingTexture = (vectorGenerator: TimingGenerator, scene: Scene) => {
    const vectorGeneratorFunction = vectorGeneratorFunctions[vectorGenerator.type];
    if (!vectorGeneratorFunction) {
        throw new Error(`Timing generator type ${vectorGenerator.type} not supported`);
    }
    const vectors = vectorGeneratorFunction(vectorGenerator);
    return makeTextureFromScalars(vectors, scene);
};
