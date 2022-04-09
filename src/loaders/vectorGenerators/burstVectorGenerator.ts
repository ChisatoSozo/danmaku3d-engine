import { Vector3 } from "@babylonjs/core";
import { VectorGeneratorFunction } from ".";
import { BurstVectorGenerator } from "../../types/gameDefinition/BulletPatternDefinition";

export const burstVectorGenerator: VectorGeneratorFunction = ({
    count,
    radius,
    startTheta,
    thetaLength,
    startY,
    yLength,
}: BurstVectorGenerator) => {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); //golden angle in radians

    for (let i = 0; i < count; i++) {
        const y = startY - (i / (count - 1)) * yLength; //y goes from 1 to -1
        const curRadius = Math.sqrt(1 - y * y); //radius at y

        const theta = ((phi * i) % thetaLength) + startTheta; //golden angle increment

        const x = Math.cos(theta) * curRadius;
        const z = Math.sin(theta) * curRadius;
        points.push(new Vector3(x, y, z).scale(radius));
    }

    return points;
};
