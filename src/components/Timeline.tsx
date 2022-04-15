import { ChartDataset, ChartOptions, ScatterDataPoint, Tick } from "chart.js";
import "chartjs-plugin-dragdata";
import zoomPlugin from "chartjs-plugin-zoom";
import React from "react";
import { Chart, Scatter } from "react-chartjs-2";
import { theme } from "../utils/theme";

Chart.register(zoomPlugin);

interface TimelineProps {
    datasets: ChartDataset<"scatter", (number | ScatterDataPoint | null)[]>[];
    width?: number;
    height?: number;
}

export const Timeline: React.FC<TimelineProps> = ({ datasets, width, height }) => {
    const options = {
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 0,
            },
            line: {
                borderWidth: 1.5,
            },
        },

        scales: {
            xAxis: {
                grid: {
                    color: theme.colors.chartLines,
                },
                ticks: {
                    color: theme.colors.text, // labels such as 10, 20, etc
                    showLabelBackdrop: false, // hide square behind text
                },
            },
            yAxis: {
                reverse: true,
                min: 0.5,
                max: 7,

                grid: {
                    color: theme.colors.chartLines,
                },
                ticks: {
                    callback: function (value: number | string, index: number, values: Tick[]) {
                        if (value !== 0.5) {
                            return values[index].value;
                        }
                    },
                    color: theme.colors.text, // labels such as 10, 20, etc
                    showLabelBackdrop: false, // hide square behind text
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            zoom: {
                limits: {
                    x: { min: 0 },
                },
                zoom: {
                    wheel: {
                        enabled: true, // SET SCROOL ZOOM TO TRUE
                    },
                    mode: "x",
                    speed: 100,
                },
            },
            dragData: {
                round: 0,
                dragX: true,
                dragY: true,
            },
        },
    } as ChartOptions<"scatter">;

    return (
        <div>
            <Scatter
                width={width}
                height={height}
                style={{
                    width: width,
                    height: height,
                }}
                data={{
                    datasets,
                }}
                options={options}
            />
        </div>
    );
};
