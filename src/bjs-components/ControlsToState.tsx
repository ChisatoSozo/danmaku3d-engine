import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { AnimationsContext } from "../containers/AnimationsContext";
import { ControlsContext } from "../containers/ControlsContext";

interface ControlsToStateProps {
    setFocused: Dispatch<SetStateAction<boolean>>;
}

export const ControlsToState: React.FC<ControlsToStateProps> = ({ setFocused }) => {
    const { downKeys } = useContext(ControlsContext);
    const { setPaused } = useContext(AnimationsContext);
    useEffect(() => {
        if (downKeys.MENU) {
            setPaused((paused) => !paused);
        }
    }, [downKeys.MENU, setPaused]);
    useEffect(() => {
        setFocused(!!downKeys.SLOW);
    }, [downKeys.SLOW, setFocused]);
    return null;
};
