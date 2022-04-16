import { useCallback, useMemo, useState } from "react";
import { BiRewind } from "react-icons/bi";
import { BsFillPlayFill, BsPause } from "react-icons/bs";
import { useResizeDetector } from "react-resize-detector";
import { useEditor } from "../../containers/EditorContainer";
import { PausableScene } from "../../hooks/useDeltaBeforeRender";
import { EditorInstruction } from "../../types/gameDefinition/CommonDefinition";
import { BaseEnemyInstruction, EnemyInstruction } from "../../types/gameDefinition/EnemyDefinition";
import {
    BaseStageInstruction,
    StageInstruction,
    StageInstructionType,
} from "../../types/gameDefinition/GameDefinition";
import { Timeline } from "./Timeline";

interface EditorInstructionTimelineProps {
    instructionTypes: {
        accessor: string;
        label: string;
        color: string;
        instructionGenerator: (() => BaseStageInstruction) | (() => BaseEnemyInstruction);
    }[];
    instructions: (EditorInstruction & {
        type: string;
    })[];
    setInstructions: (instructions: EditorInstruction[]) => void;
    instructionClicked?: (instruction: EditorInstruction, instructionIndex: number) => void;
}

export type InstructionPoint = {
    x: number;
    y: number;
    phaseInstructionIndex: number;
};

export const EditorInstructionTimeline: React.FC<EditorInstructionTimelineProps> = ({
    instructionTypes,
    instructions,
    setInstructions,
    instructionClicked,
    children,
}) => {
    const { width, height, ref } = useResizeDetector();
    const { time, scene, paused, setPaused } = useEditor();
    const [instructionToAdd, setInstructionToAdd] = useState<string>(instructionTypes[0].accessor);

    const dataTypes = useMemo(() => {
        const dataTypes: { [key: string]: InstructionPoint[] } = {};

        const uniqueTypes = new Set<string>();
        instructions.forEach((instruction) => {
            uniqueTypes.add(instruction.type);
        });

        uniqueTypes.forEach((type) => {
            const data = [];
            for (let i = 0; i < instructions.length; i++) {
                const instruction = instructions[i];
                if (instruction.type === type) {
                    data.push({
                        x: instruction.at,
                        y: instruction._editorTrack,
                        phaseInstructionIndex: i,
                    });
                }
            }
            dataTypes[type] = data;
        });
        return dataTypes;
    }, [instructions]);

    const datapointChanged = useCallback(
        (datasetIndex: number, index: number, value: InstructionPoint) => {
            const phaseInstructionIndex = value.phaseInstructionIndex;

            const newInstruction = {
                ...instructions[phaseInstructionIndex],
            };
            newInstruction.at = value.x;
            newInstruction._editorTrack = value.y;

            instructions[phaseInstructionIndex] = newInstruction;
            setInstructions([...instructions]);
        },
        [instructions, setInstructions]
    );

    const chartClicked = useCallback(
        (point: { x: number; y: number }) => {
            const closeToExistingInstructionIndex = instructions.findIndex((instruction) => {
                return Math.abs(instruction.at - point.x) < 25 && instruction._editorTrack === point.y;
            });

            if (closeToExistingInstructionIndex !== -1) {
                if (instructionClicked) {
                    instructionClicked(instructions[closeToExistingInstructionIndex], closeToExistingInstructionIndex);
                }
                return;
            }

            let newInstruction: BaseStageInstruction | BaseEnemyInstruction | undefined;

            const generator = instructionTypes.find(
                (instructionType) => instructionType.accessor === instructionToAdd
            )?.instructionGenerator;
            if (!generator) throw new Error("No generator found for " + instructionToAdd);
            newInstruction = generator();

            if (!newInstruction) throw new Error("newInstruction is undefined");

            const stageInstruction: StageInstruction | EnemyInstruction = {
                ...newInstruction,
                at: point.x,
                _editorTrack: point.y,
            };

            setInstructions([...instructions, stageInstruction]);
        },
        [instructionClicked, instructionToAdd, instructionTypes, instructions, setInstructions]
    );

    const chartRightClicked = useCallback(
        (point: { x: number; y: number }) => {
            const closeToExistingInstructionIndex = instructions.findIndex((instruction) => {
                return Math.abs(instruction.at - point.x) < 25 && instruction._editorTrack === point.y;
            });
            if (closeToExistingInstructionIndex === -1) return;

            const newInstructions = [...instructions];
            newInstructions.splice(closeToExistingInstructionIndex, 1);
            setInstructions(newInstructions);
        },
        [instructions, setInstructions]
    );

    const handlePlayToggle = useCallback(() => {
        if (!scene) return;
        setPaused((paused) => !paused);
    }, [scene, setPaused]);

    const handleRewind = useCallback(() => {
        time.current = 0;
        (scene as PausableScene).paused = true;
        setPaused(true);
    }, [scene, setPaused, time]);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", paddingTop: 5, paddingLeft: 10 }}>
                <div style={{ display: "flex", flexDirection: "row", gap: 10, paddingRight: 16 }}>
                    {children}
                    <div style={{ flex: 1 }} />
                    <button style={{ height: 18 }} onClick={handleRewind}>
                        <BiRewind />
                    </button>
                    <button style={{ height: 18 }} onClick={handlePlayToggle}>
                        {paused ? <BsFillPlayFill /> : <BsPause />}
                    </button>
                    <div style={{ flex: 1 }} />
                    <div>Instruction To Add:</div>
                    <select
                        value={instructionToAdd}
                        onChange={(e) => setInstructionToAdd(e.target.value as StageInstructionType)}
                    >
                        {instructionTypes.map((instructionType) => (
                            <option key={instructionType.accessor} value={instructionType.accessor}>
                                {instructionType.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div
                style={{
                    width: "100%",
                    flex: 1,
                    overflow: "hidden",
                }}
                ref={ref}
            >
                <Timeline
                    timeRef={time}
                    width={width}
                    height={height}
                    datapointChanged={datapointChanged}
                    chartClicked={chartClicked}
                    chartRightClicked={chartRightClicked}
                    datasets={Object.keys(dataTypes).map((dataKey) => {
                        const data = dataTypes[dataKey];
                        return {
                            label: dataKey,
                            xAxisID: "xAxis",
                            yAxisID: "yAxis",
                            borderColor:
                                instructionTypes.find((instructionType) => instructionType.accessor === dataKey)
                                    ?.color || "white",
                            pointRadius: 5,
                            backgroundColor:
                                instructionTypes.find((instructionType) => instructionType.accessor === dataKey)
                                    ?.color || "white",
                            data: data,
                        };
                    })}
                />
            </div>
        </>
    );
};
