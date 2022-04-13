import {
    AssetContainer,
    GLSLAssetDefinition,
    makeBlankVectorAssetDefinition,
    makeGLSLAssetDefinition,
    makeMeshAssetDefinition,
    makeTimingAssetDefinition,
    makeVectorAssetDefinition,
    MeshAssetDefinition,
    TimingAssetDefinition,
    VectorAssetDefinition,
} from "./AssetDefinition";
import { IVector3 } from "./UtilTypes";

export type BaseVectorGenerator = {
    count: number;
};

export type BurstVectorGenerator = {
    type: "burst";
    radius: number;
    startTheta: number;
    thetaLength: number;
    startY: number;
    yLength: number;
} & BaseVectorGenerator;

export type BlankVectorGenerator = {
    type: "blank";
} & BaseVectorGenerator;

export type FillVectorGenerator = {
    type: "fill";
    vector: IVector3;
} & BaseVectorGenerator;

export type VectorGenerator = BurstVectorGenerator | BlankVectorGenerator | FillVectorGenerator;

export type UniformTimingGenerator = {
    type: "uniform";
    count: number;
    time: number;
};

export type TimingGenerator = UniformTimingGenerator;

export type BulletPatternDefinition = {
    parented: boolean;
    downsampleCollisions: boolean;
    material: AssetContainer<GLSLAssetDefinition>;
    mesh: AssetContainer<MeshAssetDefinition>;
    _startPositionsState: AssetContainer<VectorAssetDefinition>;
    _startVelocitiesState: AssetContainer<VectorAssetDefinition>;
    initialPositions: AssetContainer<VectorAssetDefinition>;
    initialVelocities: AssetContainer<VectorAssetDefinition>;
    _initialCollisions: AssetContainer<VectorAssetDefinition>;
    timings: AssetContainer<TimingAssetDefinition>;
    endTimings: AssetContainer<TimingAssetDefinition>;
    positionFunctionGLSL: AssetContainer<GLSLAssetDefinition>;
    velocityFunctionGLSL: AssetContainer<GLSLAssetDefinition>;
    collisionFunctionGLSL: AssetContainer<GLSLAssetDefinition>;
};

export const makeBulletPatternDefinition = (): BulletPatternDefinition => ({
    parented: false,
    downsampleCollisions: true,
    material: {
        asset: makeGLSLAssetDefinition("fresnel.fs", "fragment"),
    },
    mesh: {
        asset: makeMeshAssetDefinition(),
    },
    _startPositionsState: {
        asset: makeBlankVectorAssetDefinition(),
    },
    _startVelocitiesState: {
        asset: makeBlankVectorAssetDefinition(),
    },
    initialPositions: {
        asset: makeVectorAssetDefinition(),
    },
    initialVelocities: {
        asset: makeVectorAssetDefinition(),
    },
    _initialCollisions: {
        asset: makeBlankVectorAssetDefinition(),
    },
    timings: {
        asset: makeTimingAssetDefinition(0),
    },
    endTimings: {
        asset: makeTimingAssetDefinition(10000),
    },
    positionFunctionGLSL: {
        asset: makeGLSLAssetDefinition("linearPosition.glsl", "pixel"),
    },
    velocityFunctionGLSL: {
        asset: makeGLSLAssetDefinition("linearVelocity.glsl", "pixel"),
    },
    collisionFunctionGLSL: {
        asset: makeGLSLAssetDefinition("collision.glsl", "pixel"),
    },
});
