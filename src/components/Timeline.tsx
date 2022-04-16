import { Chart, ChartDataset, ChartOptions, registerables, ScatterDataPoint, Tick } from "chart.js";
import "chartjs-plugin-dragdata";
import zoomPlugin from "chartjs-plugin-zoom";
import React, { useEffect, useMemo, useRef } from "react";
import { Scatter } from "react-chartjs-2";
import { theme } from "../utils/theme";
import { camelCaseToSpaces } from "../utils/Utils";

Chart.register(zoomPlugin);
Chart.register(...registerables);

interface TimelineProps {
    datasets: ChartDataset<"scatter", (number | ScatterDataPoint | null)[]>[];
    datapointChanged?: (datasetIndex: number, index: number, value: { x: number; y: number }) => void;
    width?: number;
    height?: number;
}

export const Timeline: React.FC<TimelineProps> = ({ datasets, datapointChanged, width, height }) => {
    console.log(datasets);
    const datapointChangedRef = useRef(datapointChanged);
    useEffect(() => {
        datapointChangedRef.current = datapointChanged;
    }, [datapointChanged]);

    const options = useMemo(
        () =>
            ({
                maintainAspectRatio: false,
                animation: {
                    duration: 0,
                },
                scales: {
                    xAxis: {
                        min: 0,
                        max: 5000,
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
                        max: 6.5,

                        grid: {
                            color: theme.colors.chartLines,
                        },
                        ticks: {
                            callback: function (value: number | string, index: number, values: Tick[]) {
                                if (value !== 0.5 && value !== 6.5) {
                                    return values[index].value;
                                }
                            },
                            color: theme.colors.text, // labels such as 10, 20, etc
                            showLabelBackdrop: false, // hide square behind text
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label
                                    ? camelCaseToSpaces(context.dataset.label)
                                    : "Unknown Instruction";
                                return label;
                            },
                        },
                    },
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
                        onDragEnd: function (
                            e: Event,
                            datasetIndex: number,
                            index: number,
                            value: { x: number; y: number }
                        ) {
                            if (datapointChangedRef.current) datapointChangedRef.current(datasetIndex, index, value);
                        },
                        round: 0,
                        dragX: true,
                        dragY: true,
                    },
                },
            } as ChartOptions<"scatter">),
        []
    );

    const data = useMemo(() => ({ datasets }), [datasets]);

    console.log(data, options);

    return (
        <div>
            <Scatter
                width={width}
                height={height}
                style={{
                    width: width,
                    height: height,
                }}
                data={data}
                options={options}
            />
        </div>
    );
};
