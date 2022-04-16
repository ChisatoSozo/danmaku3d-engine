import { useEffect } from "react";

export const useEveryFrame = (callback: () => void) => {
    useEffect(() => {
        let continueLoop = true;
        const frame = () => {
            if (!continueLoop) return;
            callback();
            requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
        return () => {
            continueLoop = false;
        };
    }, [callback]);
};
