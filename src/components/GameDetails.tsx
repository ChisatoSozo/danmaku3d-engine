import { Dispatch, SetStateAction } from "react";
import { Schema } from "ts-json-schema-generator";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import gameDefinitionSchema from "../types/gameDefinition/GameDefinition.json";
import { FormFromType } from "./FormFromType/FormFromType";

interface GameDetailsProps {
    gameDefinition: GameDefinition;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
}

export const GameDetails: React.FC<GameDetailsProps> = ({ gameDefinition, setGameDefinition }) => {
    return (
        <FormFromType
            value={gameDefinition}
            setValue={setGameDefinition}
            localSchema={gameDefinitionSchema.definitions["GameDefinition"] as Schema}
            schema={gameDefinitionSchema as any}
            label="gameDefinition"
        />
    );
};
