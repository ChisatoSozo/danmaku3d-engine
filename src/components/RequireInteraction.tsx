import { useCallback, useEffect, useState } from "react";

//ensures the user has interacted with the page before rendering children
export const RequireInteraction: React.FC = ({ children }) => {
    const [hasInteracted, setHasInteracted] = useState(false);
    const handleInteraction = useCallback(() => {
        setHasInteracted(true);
    }, []);
    useEffect(() => {
        window.addEventListener("mousedown", handleInteraction);
        window.addEventListener("keydown", handleInteraction);
        return () => {
            window.removeEventListener("mousedown", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
        };
    }, [handleInteraction]);
    return hasInteracted ? <>{children}</> : <>Please click anywhere to continue</>;
};
