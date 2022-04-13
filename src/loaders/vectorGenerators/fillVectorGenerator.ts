import { Vector3 } from "@babylonjs/core";
import { VectorGeneratorFunction } from ".";
import { FillVectorGenerator } from "../../types/gameDefinition/BulletPatternDefinition";

export const fillVectorGenerator: VectorGeneratorFunction = ({ count, vector }: FillVectorGenerator) => {
    const points = [];

    for (let i = 0; i < count; i++) {
        points.push(new Vector3(vector.x, vector.y, vector.z));
    }

    return points;
};
