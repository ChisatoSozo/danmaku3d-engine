import { BubbleDataPoint, ScatterDataPoint } from "chart.js";
import { MutableRefObject, useCallback, useMemo, useRef } from "react";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";
import { useEveryFrame } from "../hooks/useEveryFrame";

interface ScrubStickProps {
    chart: ChartJSOrUndefined<"scatter", (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown>;
    xRef: MutableRefObject<number>;
}

export const ScrubStick: React.FC<ScrubStickProps> = ({ chart, xRef }) => {
    const handleRef = useRef<HTMLDivElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const height = useMemo(() => {
        if (!chart) return 0;
        const top = chart.chartArea.top;
        const bottom = chart.chartArea.bottom;
        return bottom - top;
    }, [chart]);

    const update = useCallback(() => {
        if (!chart) return;
        const leftPx = chart.chartArea.left;
        const rightPx = chart.chartArea.right;
        const leftNumber = chart.scales["xAxis"].min;
        const rightNumber = chart.scales["xAxis"].max;

        if (xRef.current === undefined) return;
        if (!divRef.current) return;
        if (!handleRef.current) return;
        const x = xRef.current;
        const xPercent = (x - leftNumber) / (rightNumber - leftNumber);
        const xPx = leftPx + (rightPx - leftPx) * xPercent;
        divRef.current.style.left = `${xPx}px`;
        handleRef.current.style.left = `${xPx - 5}px`;
    }, [chart, xRef]);

    const leftStartDrag = useRef(0);
    const leftClientStartDrag = useRef(0);

    const elementDrag = useCallback(
        (e: PointerEvent) => {
            if (!divRef.current) return;
            if (!handleRef.current) return;
            if (!chart) return;
            const leftPx = chart.chartArea.left;
            const rightPx = chart.chartArea.right;
            const leftNumber = chart.scales["xAxis"].min;
            const rightNumber = chart.scales["xAxis"].max;

            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            const delta = e.clientX - leftClientStartDrag.current;
            let newLeft = leftStartDrag.current + delta + 5;

            const xPercent = (newLeft - leftPx) / (rightPx - leftPx);
            const x = leftNumber + (rightNumber - leftNumber) * xPercent;
            if (x < leftNumber) {
                xRef.current = leftNumber;
                newLeft = leftPx;
            } else {
                xRef.current = x;
            }

            divRef.current.style.left = `${newLeft}px`;
            handleRef.current.style.left = `${newLeft - 5}px`;
        },
        [chart, xRef]
    );

    const endDrag = useCallback((e: PointerEvent) => {
        e = e || window.event;
        e.preventDefault();
        document.onpointerup = null;
        document.onpointermove = null;
    }, []);

    const dragPointerDown: React.PointerEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            e.preventDefault();
            leftStartDrag.current = parseFloat((e.target as HTMLDivElement).style.left.replace("px", ""));
            leftClientStartDrag.current = e.clientX;
            document.onpointerup = endDrag;
            document.onpointermove = elementDrag;
        },
        [elementDrag, endDrag]
    );

    useEveryFrame(update);

    return (
        <>
            <div
                ref={handleRef}
                onPointerDown={dragPointerDown}
                style={{
                    position: "absolute",
                    top: 0,
                    zIndex: 2,
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    border: "1px solid white",
                    cursor: "ew-resize",
                }}
            />
            <div
                ref={divRef}
                style={{
                    position: "absolute",
                    zIndex: 1,
                    width: "2px",
                    height: height,
                    backgroundColor: "white",
                }}
            />
        </>
    );
};
