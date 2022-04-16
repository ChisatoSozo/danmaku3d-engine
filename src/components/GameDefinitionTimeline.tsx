import { useCallback, useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useEditor } from "../containers/EditorContainer";
import { Timeline } from "./Timeline";

interface GameDefinitionTimelineProps {
    currentStage: number;
    currentPhase: number;
}

const typeToColorMap: { [key: string]: string } = {
    playMusic: "#00ff00",
    spawnEnemy: "#ff0000",
};

export const GameDefinitionTimeline: React.FC<GameDefinitionTimelineProps> = ({ currentStage, currentPhase }) => {
    const { width, height, ref } = useResizeDetector();
    const { gameDefinition, setGameDefinition } = useEditor();

    const dataTypes = useMemo(() => {
        if (!gameDefinition) return {};
        const phaseInstructions = gameDefinition.stages[currentStage].phases[currentPhase].instructions;
        const dataTypes: { [key: string]: { x: number; y: number }[] } = {};

        const uniqueTypes = new Set<string>();
        phaseInstructions.forEach((instruction) => {
            uniqueTypes.add(instruction.type);
        });

        uniqueTypes.forEach((type) => {
            const data = phaseInstructions
                .filter((instruction) => instruction.type === type)
                .map((instruction) => {
                    return {
                        x: instruction.at,
                        y: instruction._editorTrack,
                    };
                });
            dataTypes[type] = data;
        });
        return dataTypes;
    }, [currentPhase, currentStage, gameDefinition]);

    const datapointChanged = useCallback(
        (datasetIndex: number, index: number, value: { x: number; y: number }) => {
            if (!gameDefinition) return;

            const newInstruction = {
                ...gameDefinition.stages[currentStage].phases[currentPhase].instructions[datasetIndex],
            };
            newInstruction.at = value.x;
            newInstruction._editorTrack = value.y;

            gameDefinition.stages[currentStage].phases[currentPhase].instructions[datasetIndex] = newInstruction;
            setGameDefinition({ ...gameDefinition });

            console.log(index, value);
        },
        [currentPhase, currentStage, gameDefinition, setGameDefinition]
    );

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", paddingTop: 5, paddingLeft: 10 }}>
                <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                    <div>Stage: {currentStage}</div>
                    <div>Phase: {currentPhase}</div>
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
                    width={width}
                    height={height}
                    datapointChanged={datapointChanged}
                    datasets={Object.keys(dataTypes).map((dataKey) => {
                        const data = dataTypes[dataKey];
                        return {
                            label: dataKey,
                            xAxisID: "xAxis",
                            yAxisID: "yAxis",
                            borderColor: typeToColorMap[dataKey] || "white",
                            pointRadius: 5,
                            backgroundColor: typeToColorMap[dataKey] || "white",
                            data: data,
                        };
                    })}
                />
            </div>
        </>
    );
};
