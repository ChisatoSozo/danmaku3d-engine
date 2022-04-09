import { Link } from "react-router-dom";
import { useGamesList } from "../hooks/useGamesList";

export const Games = () => {
    const gamesList = useGamesList();
    return (
        <ul>
            {gamesList &&
                gamesList.map((game) => (
                    <li key={game.name}>
                        <Link to={`/game/${game.name}`}>{game.name}</Link>
                        <Link to={`/game/${game.name}?editing=true`}>edit</Link>
                    </li>
                ))}
        </ul>
    );
};
