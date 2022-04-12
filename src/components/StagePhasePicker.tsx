import { Dispatch, SetStateAction } from "react";
import { BsGearFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useEditor } from "../containers/EditorContainer";
import { GameDefinition, makePhaseDefinition, makeStageDefinition } from "../types/gameDefinition/GameDefinition";
import { Category } from "./Category";

export interface StagePhasePickerProps {
    gameDefinition: GameDefinition;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    currentStage: number;
    setCurrentStage: Dispatch<SetStateAction<number>>;
    currentPhase: number;
    setCurrentPhase: Dispatch<SetStateAction<number>>;
}

export const StagePhasePicker: React.FC<StagePhasePickerProps> = ({
    gameDefinition,
    setGameDefinition,
    currentStage,
    setCurrentStage,
    currentPhase,
    setCurrentPhase,
}) => {
    const { selectedDetails, setSelectedDetails } = useEditor();

    return (
        <div style={{ pointerEvents: "all", padding: "10px" }}>
            <button
                style={{
                    cursor: "pointer",
                }}
                onClick={() => {
                    setSelectedDetails({ type: "game" });
                }}
            >
                Configure Game
            </button>
            {gameDefinition.stages.map((stage, stageIndex) => (
                <Category
                    key={stageIndex}
                    name={`Stage ${stageIndex}`}
                    additionalElement={
                        <div style={{ display: "flex" }}>
                            <BsGearFill
                                onClick={(e) => {
                                    setCurrentStage(stageIndex);
                                    setSelectedDetails({
                                        type: "stage",
                                        stage: stageIndex,
                                    });
                                    e.stopPropagation();
                                }}
                            />
                            {gameDefinition.stages.length > 1 && (
                                <MdDelete
                                    onClick={(e) => {
                                        const newGameDefinition = { ...gameDefinition };
                                        const newStages = [...newGameDefinition.stages];
                                        newStages.splice(stageIndex, 1);
                                        newGameDefinition.stages = newStages;
                                        setGameDefinition(newGameDefinition);
                                        if (currentStage === stageIndex) {
                                            setCurrentStage(0);
                                        }
                                        if (selectedDetails?.type === "stage" && selectedDetails.stage === stageIndex) {
                                            setSelectedDetails(undefined);
                                        }
                                        e.stopPropagation();
                                    }}
                                />
                            )}
                        </div>
                    }
                >
                    {stage.phases.map((phase, phaseIndex) => (
                        <div
                            key={phaseIndex}
                            onClick={() => {
                                setCurrentStage(stageIndex);
                                setCurrentPhase(phaseIndex);
                                setSelectedDetails({
                                    type: "phase",
                                    stage: stageIndex,
                                    phase: phaseIndex,
                                });
                            }}
                            style={{ width: "100%", display: "flex", cursor: "pointer" }}
                        >
                            <div>Phase {phaseIndex}</div>
                            <div style={{ flex: 1 }} />
                            <div>&gt;</div>
                            {stage.phases.length > 1 && (
                                <MdDelete
                                    onClick={(e) => {
                                        const newGameDefinition = { ...gameDefinition };
                                        const newStages = [...newGameDefinition.stages];
                                        const newPhases = [...newStages[stageIndex].phases];
                                        newPhases.splice(phaseIndex, 1);
                                        newStages[stageIndex].phases = newPhases;
                                        newGameDefinition.stages = newStages;
                                        setGameDefinition(newGameDefinition);
                                        if (currentPhase === phaseIndex) {
                                            setCurrentPhase(0);
                                        }
                                        if (selectedDetails?.type === "phase" && selectedDetails.phase === phaseIndex) {
                                            setSelectedDetails(undefined);
                                        }
                                        e.stopPropagation();
                                    }}
                                />
                            )}
                        </div>
                    ))}
                    <button
                        style={{ width: "100%", cursor: "pointer" }}
                        onClick={() => {
                            const newGameDefinition = { ...gameDefinition };
                            const newStages = [...newGameDefinition.stages];
                            newStages[stageIndex].phases.push(makePhaseDefinition());
                            newGameDefinition.stages = newStages;
                            setGameDefinition(newGameDefinition);
                        }}
                    >
                        Add a Phase
                    </button>
                </Category>
            ))}
            <button
                style={{ width: "100%", cursor: "pointer" }}
                onClick={() => {
                    const newGameDefinition = { ...gameDefinition };
                    newGameDefinition.stages.push(makeStageDefinition());
                    setGameDefinition(newGameDefinition);
                }}
            >
                Add a Stage
            </button>
        </div>
    );
};
