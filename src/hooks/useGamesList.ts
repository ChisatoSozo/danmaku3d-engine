import { useEffect, useState } from "react";
import { assetHost } from "../utils/Utils";

interface Game {
    name: string;
    description: string;
}

export const useGamesList = () => {
    const [gamesList, setGamesList] = useState<Game[]>([]);

    useEffect(() => {
        const fetchGamesList = async () => {
            const response = await fetch(`${assetHost}listGames`);
            const games = (await response.json()) as string[];
            setGamesList(
                games.map((game) => {
                    return {
                        name: game,
                        description: "",
                    };
                })
            );
        };
        fetchGamesList();
    }, []);

    return gamesList as Game[] | undefined;
};
