import {
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
    _count: number;
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
    _count: number;
    time: number;
};

export type TimingGenerator = UniformTimingGenerator;

export type BulletPatternDefinition = {
    _url: string;
    _startPositionsState: VectorAssetDefinition;
    _startVelocitiesState: VectorAssetDefinition;
    _startCollisionsState: VectorAssetDefinition;

    parented: boolean;
    downsampleCollisions: boolean;
    material: GLSLAssetDefinition;
    mesh: MeshAssetDefinition;
    initialPositions: VectorAssetDefinition;
    initialVelocities: VectorAssetDefinition;
    timings: TimingAssetDefinition;

    phases: {
        at: number;
        positionInitializationGLSL: GLSLAssetDefinition;
        velocityInitializationGLSL: GLSLAssetDefinition;
        positionUpdateGLSL: GLSLAssetDefinition;
        velocityUpdateGLSL: GLSLAssetDefinition;
    }[];
    collisionFunctionGLSL: GLSLAssetDefinition;
};

export const makeBulletPatternDefinition = (refURL: string): BulletPatternDefinition => ({
    _url: refURL,
    parented: false,
    downsampleCollisions: true,
    material: makeGLSLAssetDefinition("fresnel.fs", "fragment"),
    mesh: makeMeshAssetDefinition(),
    _startPositionsState: makeBlankVectorAssetDefinition(),
    _startVelocitiesState: makeBlankVectorAssetDefinition(),
    _startCollisionsState: makeBlankVectorAssetDefinition(),
    initialPositions: makeVectorAssetDefinition(),
    initialVelocities: makeVectorAssetDefinition(),
    timings: makeTimingAssetDefinition(0),
    phases: [
        {
            at: 0,
            positionInitializationGLSL: makeGLSLAssetDefinition("initializePosition.glsl", "pixel"),
            velocityInitializationGLSL: makeGLSLAssetDefinition("initializeVelocity.glsl", "pixel"),
            positionUpdateGLSL: makeGLSLAssetDefinition("linearPosition.glsl", "pixel"),
            velocityUpdateGLSL: makeGLSLAssetDefinition("linearVelocity.glsl", "pixel"),
        },
    ],
    collisionFunctionGLSL: makeGLSLAssetDefinition("collision.glsl", "pixel"),
});
