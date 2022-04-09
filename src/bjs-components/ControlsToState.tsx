import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ControlsContext } from "../containers/ControlsContext";
import { PauseContext } from "../containers/PauseContext";

interface ControlsToStateProps {
    setFocused: Dispatch<SetStateAction<boolean>>;
}

export const ControlsToState: React.FC<ControlsToStateProps> = ({ setFocused }) => {
    const { downKeys } = useContext(ControlsContext);
    const { setPaused } = useContext(PauseContext);
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
