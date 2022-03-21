import { useEffect, useState } from "react";
import { chisatoSozo } from "../test/chisatoSozo";

export const useLoadGame = (name: string) => {
    const [status, setStatus] = useState("");

    useEffect(() => {
        const gameDefinition = chisatoSozo;
    }, [name]);

    return status;
};
