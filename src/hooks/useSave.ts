import { useEffect } from "react";

//intercept ctrl+s keydown and run callback
export const useSave = (callback: () => void) => {
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === "s" && event.ctrlKey) {
                event.preventDefault();
                callback();
            }
        };
        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [callback]);
};
