import { TimingGeneratorFunction } from ".";
import { UniformTimingGenerator } from "../../types/gameDefinition/BulletPatternDefinition";

export const uniformTimingGenerator: TimingGeneratorFunction = ({ time, count }: UniformTimingGenerator) => {
    const times = [];

    for (let i = 0; i < count; i++) {
        times.push(time);
    }

    return times;
};
