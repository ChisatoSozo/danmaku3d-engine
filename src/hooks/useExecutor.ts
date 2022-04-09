import { useEffect, useRef, useState } from "react";
import { Instruction } from "../types/gameDefinition/CommonDefinition";
import { useDeltaBeforeRender } from "./useDeltaBeforeRender";

type ExecutorFunction<T extends Instruction> = (instruction: T, index: number) => void;

export const useExecutor = <T extends Instruction>(executorFunction: ExecutorFunction<T>, instructions: T[]) => {
    const time = useRef(0);

    const lock = useRef(false);
    const index = useRef(0);
    const [remainingInstructions, setRemainingInstructions] = useState(instructions);

    useEffect(() => {
        lock.current = false;
    }, [remainingInstructions]);

    useEffect(() => {
        index.current = 0;
        setRemainingInstructions(instructions);
    }, [instructions]);

    useDeltaBeforeRender((scene, deltaS) => {
        time.current += deltaS * 1000;

        if (lock.current) return;
        const instructionsToRemove: T[] = [];
        remainingInstructions.forEach((instruction) => {
            if (instruction.at <= time.current) {
                executorFunction(instruction, index.current);
                index.current++;
                instructionsToRemove.push(instruction);
            }
        });

        if (!instructionsToRemove.length) return;

        lock.current = true;
        setRemainingInstructions((remainingInstructions) =>
            remainingInstructions.filter((instruction) => !instructionsToRemove.includes(instruction))
        );
    });
};
