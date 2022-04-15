import { Dispatch, SetStateAction, useCallback } from "react";
import { Schema } from "ts-json-schema-generator";
import { GameDefinition, PhaseDefinition } from "../../types/gameDefinition/GameDefinition";
import gameDefinitionSchema from "../../types/gameDefinition/GameDefinition.json";
import { FormFromType } from "../FormFromType/FormFromType";

interface PhaseDetailsProps {
    gameDefinition: GameDefinition;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    stage: number;
    phase: number;
}

export const PhaseDetails: React.FC<PhaseDetailsProps> = ({ gameDefinition, setGameDefinition, stage, phase }) => {
    const setPhaseDefinition = useCallback(
        (phseDefinition: PhaseDefinition) => {
            const newGameDefinition = { ...gameDefinition };
            newGameDefinition.stages[stage] = { ...gameDefinition.stages[stage] };
            newGameDefinition.stages[stage].phases[phase] = { ...phseDefinition };
            setGameDefinition(newGameDefinition);
        },
        [gameDefinition, phase, setGameDefinition, stage]
    );

    return (
        <>
            {gameDefinition.stages[stage].phases[phase] && (
                <FormFromType
                    value={gameDefinition.stages[stage].phases[phase]}
                    setValue={setPhaseDefinition}
                    localSchema={gameDefinitionSchema.definitions["PhaseDefinition"] as Schema}
                    schema={gameDefinitionSchema as any}
                    label="phaseDefinition"
                />
            )}
        </>
    );
};
