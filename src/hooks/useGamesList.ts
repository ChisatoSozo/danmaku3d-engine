import { useMemo } from "react";

interface Game {
    name: string;
    description: string;
}

export const useGamesList = () => {
    const gamesList = useMemo(
        () => [
            {
                name: "chisatoSozo",
                description: "lorem ipsum",
            },
        ],
        []
    );

    return gamesList as Game[] | undefined;
};
