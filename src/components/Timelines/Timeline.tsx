import { BubbleDataPoint, Chart, ChartDataset, ChartOptions, registerables, ScatterDataPoint, Tick } from "chart.js";
import "chartjs-plugin-dragdata";
import zoomPlugin from "chartjs-plugin-zoom";
import React, { MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";
import { theme } from "../../utils/theme";
import { camelCaseToSpaces } from "../../utils/Utils";
import { ScrubStick } from "../ScrubStick";
import { InstructionPoint } from "./GameDefinitionTimeline";

Chart.register(zoomPlugin);
Chart.register(...registerables);

interface TimelineProps {
    timeRef: React.MutableRefObject<number>;
    datasets: ChartDataset<"scatter", (number | ScatterDataPoint | null)[]>[];
    datapointChanged?: (datasetIndex: number, index: number, value: InstructionPoint) => void;
    chartClicked?: (point: { x: number; y: number }) => void;
    chartRightClicked?: (point: { x: number; y: number }) => void;
    width?: number;
    height?: number;
}

export const Timeline: React.FC<TimelineProps> = ({
    timeRef,
    datasets,
    datapointChanged,
    chartClicked,
    chartRightClicked,
    width,
    height,
}) => {
    const datapointChangedRef = useRef(datapointChanged);
    useEffect(() => {
        datapointChangedRef.current = datapointChanged;
    }, [datapointChanged]);

    const chartClickedRef = useRef(chartClicked);
    useEffect(() => {
        chartClickedRef.current = chartClicked;
    }, [chartClicked]);

    const chartRef = useRef<
        ChartJSOrUndefined<"scatter", (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown> | undefined
    >();

    const [chartStateRef, setChartStateRef] = useState<
        | ChartJSOrUndefined<"scatter", (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown>
        | undefined
        | null
    >();

    useEffect(() => {
        if (!chartStateRef) return;
        chartRef.current = chartStateRef;
    }, [chartStateRef]);

    const handleRightClick: MouseEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            if (!chartRightClicked) return;
            const naitiveEvent = event.nativeEvent;

            naitiveEvent.preventDefault();
            naitiveEvent.stopPropagation();

            const chart = chartRef.current;
            if (!chart) return;
            const yTop = chart.chartArea.top;
            const yBottom = chart.chartArea.bottom;

            const yMin = chart.scales["yAxis"].min;
            const yMax = chart.scales["yAxis"].max;
            let newY = 0;

            if (naitiveEvent.offsetY <= yBottom && naitiveEvent.offsetY >= yTop) {
                newY = Math.abs((naitiveEvent.offsetY - yTop) / (yBottom - yTop));
                newY = (newY - 1) * -1;
                newY = newY * Math.abs(yMax - yMin) + yMin;
            }

            const xTop = chart.chartArea.left;
            const xBottom = chart.chartArea.right;
            const xMin = chart.scales["xAxis"].min;
            const xMax = chart.scales["xAxis"].max;
            let newX = 0;

            if (naitiveEvent.offsetX <= xBottom && naitiveEvent.offsetX >= xTop) {
                newX = Math.abs((naitiveEvent.offsetX - xTop) / (xBottom - xTop));
                newX = newX * Math.abs(xMax - xMin) + xMin;
            }

            const roundedY = Math.round(7 - newY);

            chartRightClicked({ x: newX, y: roundedY });
        },
        [chartRightClicked]
    );

    const options = useMemo(
        () =>
            ({
                maintainAspectRatio: false,
                animation: {
                    duration: 0,
                },
                onClick: (event) => {
                    if (!chartRef.current) return;
                    if (!chartClickedRef.current) return;
                    if (!event.native) return;
                    const nativeEvent = event.native as PointerEvent;
                    const chart = chartRef.current;
                    const yTop = chart.chartArea.top;
                    const yBottom = chart.chartArea.bottom;

                    const yMin = chart.scales["yAxis"].min;
                    const yMax = chart.scales["yAxis"].max;
                    let newY = 0;

                    if (nativeEvent.offsetY <= yBottom && nativeEvent.offsetY >= yTop) {
                        newY = Math.abs((nativeEvent.offsetY - yTop) / (yBottom - yTop));
                        newY = (newY - 1) * -1;
                        newY = newY * Math.abs(yMax - yMin) + yMin;
                    }

                    const xTop = chart.chartArea.left;
                    const xBottom = chart.chartArea.right;
                    const xMin = chart.scales["xAxis"].min;
                    const xMax = chart.scales["xAxis"].max;
                    let newX = 0;

                    if (nativeEvent.offsetX <= xBottom && nativeEvent.offsetX >= xTop) {
                        newX = Math.abs((nativeEvent.offsetX - xTop) / (xBottom - xTop));
                        newX = newX * Math.abs(xMax - xMin) + xMin;
                    }

                    const roundedY = Math.round(7 - newY);

                    chartClickedRef.current({ x: newX, y: roundedY });
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
                        onDragEnd: function (e: Event, datasetIndex: number, index: number, value: InstructionPoint) {
                            if (datapointChangedRef.current) datapointChangedRef.current(datasetIndex, index, value);
                            e.preventDefault();
                            e.stopPropagation();
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

    return (
        <div style={{ position: "relative" }} onContextMenu={handleRightClick}>
            {chartStateRef && <ScrubStick chart={chartStateRef} xRef={timeRef} />}
            <Scatter
                ref={(ref) => setChartStateRef(ref)}
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
