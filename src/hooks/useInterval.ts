import { useEffect, useRef } from "react";

//like usecallback, but calls the function at a specified interval
export const useInterval = <T extends Function>(callback: T, delay: number) => {
    const savedCallback = useRef<T>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const tick = () => {
            if (!savedCallback.current) return;
            savedCallback.current();
        };
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
