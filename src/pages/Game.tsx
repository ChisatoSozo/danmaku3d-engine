import { useMatch } from "react-router-dom";

export const Game = () => {
    const name = useMatch("/game/:name")?.params.name;
    const { status, data } = useLoadGame(name);
    return <div>status</div>;
};
