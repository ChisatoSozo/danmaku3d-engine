import {
    GLSLAssetDefinition,
    makeGLSLAssetDefinition,
    makeTimingAssetDefinition,
    makeVectorAssetDefinition,
    TimingAssetDefinition,
    VectorAssetDefinition,
} from "./AssetDefinition";

export type BurstVectorGenerator = {
    type: "burst";
    count: number;
    radius: number;
    startTheta: number;
    thetaLength: number;
    startY: number;
    yLength: number;
};

export type VectorGenerator = BurstVectorGenerator;

export type UniformTimingGenerator = {
    type: "uniform";
    count: number;
    time: number;
};

export type TimingGenerator = UniformTimingGenerator;

export type BulletPatternDefinition = {
    initialPositions: VectorAssetDefinition;
    initialVelocities: VectorAssetDefinition;
    timings: TimingAssetDefinition;
    positionFunctionGLSL: GLSLAssetDefinition;
    velocityFunctionGLSL: GLSLAssetDefinition;
    collisionFunctionGLSL: GLSLAssetDefinition;
};

export const makeBulletPatternDefinition = (): BulletPatternDefinition => ({
    initialPositions: makeVectorAssetDefinition(),
    initialVelocities: makeVectorAssetDefinition(),
    timings: makeTimingAssetDefinition(),
    positionFunctionGLSL: makeGLSLAssetDefinition(),
    velocityFunctionGLSL: makeGLSLAssetDefinition(),
    collisionFunctionGLSL: makeGLSLAssetDefinition(),
});
