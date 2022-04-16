import { MutableRefObject, useRef } from "react";
import { Instruction } from "../types/gameDefinition/CommonDefinition";
import { useDeltaBeforeRender } from "./useDeltaBeforeRender";

type ExecutorFunction<T extends Instruction> = (instruction: T, index: number) => void;

export const useExecutor = <T extends Instruction>(
    executorFunction: ExecutorFunction<T>,
    instructions: T[],
    timeRef?: MutableRefObject<number>
) => {
    const time = useRef(0);
    const usedTimeRef = timeRef || time;

    const lastTime = useRef(0);

    useDeltaBeforeRender((scene, deltaS) => {
        usedTimeRef.current += deltaS * 1000;

        if (lastTime.current > usedTimeRef.current) {
            lastTime.current = usedTimeRef.current - 1;
        }

        if (scene.paused) return;
        const instructionsToRemove: T[] = [];
        instructions.forEach((instruction, index) => {
            if (instruction.at <= usedTimeRef.current && instruction.at > lastTime.current) {
                executorFunction(instruction, index);
                instructionsToRemove.push(instruction);
            }
        });

        lastTime.current = usedTimeRef.current;
    });
};
