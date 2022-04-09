import { GLSLAssetDefinition, TimingAssetDefinition, VectorAssetDefinition } from "./AssetDefinition";

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

export interface BulletPatternDefinition {
    initialPositions: VectorAssetDefinition;
    initialVelocities: VectorAssetDefinition;
    timings: TimingAssetDefinition;
    positionFunctionGLSL: GLSLAssetDefinition;
    velocityFunctionGLSL: GLSLAssetDefinition;
    collisionFunctionGLSL: GLSLAssetDefinition;
}
