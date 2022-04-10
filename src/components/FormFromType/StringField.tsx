interface StringFieldProps {
    value: string;
    setValue: (value: string) => void;
}

export const StringField: React.FC<StringFieldProps> = ({ value, setValue }) => {
    return <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />;
};
