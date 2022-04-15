import { Dispatch, SetStateAction, useCallback } from "react";
import { Schema } from "ts-json-schema-generator";
import { GameDefinition, StageDefinition } from "../../types/gameDefinition/GameDefinition";
import gameDefinitionSchema from "../../types/gameDefinition/GameDefinition.json";
import { FormFromType } from "./../FormFromType/FormFromType";

interface StageDetailsProps {
    gameDefinition: GameDefinition;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    stage: number;
}

export const StageDetails: React.FC<StageDetailsProps> = ({ gameDefinition, setGameDefinition, stage }) => {
    const setStageDefinition = useCallback(
        (stageDefinition: StageDefinition) => {
            const newGameDefinition = { ...gameDefinition };
            newGameDefinition.stages[stage] = { ...stageDefinition };
            setGameDefinition(newGameDefinition);
        },
        [gameDefinition, setGameDefinition, stage]
    );

    return (
        <>
            {gameDefinition.stages[stage] && (
                <FormFromType
                    value={gameDefinition.stages[stage]}
                    setValue={setStageDefinition}
                    localSchema={gameDefinitionSchema.definitions["StageDefinition"] as Schema}
                    schema={gameDefinitionSchema as any}
                    label="stageDefinition"
                />
            )}
        </>
    );
};
