import { useEffect, useState } from "react";

type NumberFieldProps = {
    value: number;
    setValue: (value: number) => void;
    propName?: string;
    min?: number;
    max?: number;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const NumberField: React.FC<NumberFieldProps> = ({ value, setValue, min, max, propName, ...props }) => {
    const [numberString, setNumberString] = useState(value.toString());

    useEffect(() => {
        setNumberString(value.toString());
    }, [value]);

    useEffect(() => {
        const floatValue = parseFloat(numberString);
        const isValid = !isNaN(floatValue);
        if (isValid) {
            if (min !== undefined && floatValue < min) {
                setNumberString(min.toString().slice(0, 5));
            } else if (max !== undefined && floatValue > max) {
                setNumberString(max.toString().slice(0, 5));
            } else {
                setValue(floatValue);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max, numberString]);

    let rangeElement: JSX.Element | undefined;

    switch (propName) {
        case "startY":
            rangeElement = (
                <input
                    style={{
                        width: "100px",
                    }}
                    min={-1}
                    max={1}
                    step={0.001}
                    type="range"
                    value={numberString}
                    onChange={(e) => setNumberString(e.target.value.slice(0, 5))}
                />
            );
            break;
        case "yLength":
            rangeElement = (
                <input
                    style={{
                        width: "100px",
                    }}
                    min={0}
                    max={2}
                    step={0.001}
                    type="range"
                    value={numberString}
                    onChange={(e) => setNumberString(e.target.value.slice(0, 5))}
                />
            );
            break;
        case "startTheta":
        case "thetaLength":
            rangeElement = (
                <input
                    style={{
                        width: "100px",
                    }}
                    min={-2 * Math.PI}
                    max={2 * Math.PI}
                    step={0.001}
                    type="range"
                    value={numberString}
                    onChange={(e) => setNumberString(e.target.value.slice(0, 5))}
                />
            );
            break;
    }

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                maxWidth: "100%",
            }}
        >
            {rangeElement}
            <input
                {...props}
                style={{
                    ...(props.style || {}),
                    flex: 1,
                    minWidth: 0,
                }}
                type="number"
                value={numberString}
                onChange={(e) => setNumberString(e.target.value.slice(0, 5))}
            />
        </div>
    );
};
