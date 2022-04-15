import { useResizeDetector } from "react-resize-detector";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { theme } from "../utils/theme";
import { Timeline } from "./Timeline";

// Chart.register(zoomPlugin);
// Chart.register(...registerables);

interface GameDefinitionTimelineProps {
    gameDefinition: GameDefinition;
    currentStage: number;
    currentPhase: number;
}

const testData = [
    {
        x: 0,
        y: 1,
    },
    {
        x: 0,
        y: 1,
    },
    {
        x: 1000,
        y: 1,
    },
    {
        x: 3000,
        y: 2,
    },
];

export const GameDefinitionTimeline: React.FC<GameDefinitionTimelineProps> = ({
    gameDefinition,
    currentStage,
    currentPhase,
}) => {
    const { width, height, ref } = useResizeDetector();

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                flex: 1,
                backgroundColor: theme.colors.background,
                display: "flex",
                flexDirection: "column",
                pointerEvents: "all",
            }}
        >
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
                    datasets={[
                        {
                            xAxisID: "xAxis",
                            yAxisID: "yAxis",
                            borderColor: "red",
                            pointRadius: 5,
                            backgroundColor: "red",
                            data: testData,
                        },
                    ]}
                />
            </div>
        </div>
    );
};
