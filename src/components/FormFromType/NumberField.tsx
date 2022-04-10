import { useEffect, useState } from "react";

type NumberFieldProps = {
    value: number;
    setValue: (value: number) => void;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const NumberField: React.FC<NumberFieldProps> = ({ value, setValue, ...props }) => {
    const [numberString, setNumberString] = useState(value.toString());

    useEffect(() => {
        //is the number string valid?
        const isValid = !isNaN(parseFloat(numberString));
        if (isValid) {
            setValue(parseFloat(numberString));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberString]);

    return <input {...props} type="number" value={numberString} onChange={(e) => setNumberString(e.target.value)} />;
};
