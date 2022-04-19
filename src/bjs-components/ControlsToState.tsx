import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { AnimationsContext } from "../containers/AnimationsContext";
import { ControlsContext } from "../containers/ControlsContext";

interface ControlsToStateProps {
    editing: boolean;
    setFocused: Dispatch<SetStateAction<boolean>>;
}

export const ControlsToState: React.FC<ControlsToStateProps> = ({ setFocused, editing }) => {
    const { downKeys } = useContext(ControlsContext);
    const { setPaused } = useContext(AnimationsContext);
    useEffect(() => {
        if (downKeys.MENU && !editing) {
            setPaused((paused) => !paused);
        }
    }, [downKeys.MENU, editing, setPaused]);
    useEffect(() => {
        setFocused(!!downKeys.SLOW);
    }, [downKeys.SLOW, setFocused]);
    return null;
};
