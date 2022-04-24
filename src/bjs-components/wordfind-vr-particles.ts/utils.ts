import { Constants, RawTexture, Scene, Vector3 } from "@babylonjs/core";
import { nextPowerOfTwo } from "../../loaders/scalarGenerators/scalarGeneratorUtils";

export const makeTextureFromVectors = (vectors: Vector3[], scene: Scene, w: number | number[] = 1, fill = -100000) => {
    const num = vectors.length;
    const WIDTH = Math.max(nextPowerOfTwo(Math.ceil(Math.sqrt(num))), 2);
    const data = new Float32Array(WIDTH * WIDTH * 4);

    let offset = 0;

    const wa = w as number[];
    const wn = w as number;
    const wIsArray = Array.isArray(w);

    vectors.forEach((vector, i) => {
        offset = i * 4;
        data[offset + 0] = vector.x;
        data[offset + 1] = vector.y;
        data[offset + 2] = vector.z;
        data[offset + 3] = wIsArray ? wa[i] : wn;
    });

    for (let i = offset / 4 + 1; i < WIDTH * WIDTH; i++) {
        offset = i * 4;
        data[offset + 0] = fill;
        data[offset + 1] = fill;
        data[offset + 2] = fill;
        data[offset + 3] = (wIsArray ? wa[i] : wn) || 1;
    }

    return RawTexture.CreateRGBATexture(
        data,
        WIDTH,
        WIDTH,
        scene,
        false,
        false,
        Constants.TEXTURE_NEAREST_NEAREST,
        Constants.TEXTURETYPE_FLOAT
    );
};
