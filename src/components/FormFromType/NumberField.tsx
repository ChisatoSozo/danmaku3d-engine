import { useEffect, useState } from "react";

type NumberFieldProps = {
    value: number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const NumberField: React.FC<NumberFieldProps> = ({ value, setValue, min, max, ...props }) => {
    const [numberString, setNumberString] = useState(value.toString());

    useEffect(() => {
        setNumberString(value.toString());
    }, [value]);

    useEffect(() => {
        if (value.toString() === numberString) return;
        const floatValue = parseFloat(numberString);
        const isValid = !isNaN(floatValue);
        if (isValid) {
            if (min !== undefined && floatValue < min) {
                setNumberString(min.toString());
            } else if (max !== undefined && floatValue > max) {
                setNumberString(max.toString());
            } else {
                setValue(floatValue);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max, numberString]);

    return <input {...props} type="number" value={numberString} onChange={(e) => setNumberString(e.target.value)} />;
};
