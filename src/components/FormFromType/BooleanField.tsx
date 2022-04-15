type BooleanFieldProps = {
    value: boolean;
    setValue: (value: boolean) => void;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const BooleanField: React.FC<BooleanFieldProps> = ({ value, setValue, ...props }) => {
    return <input {...props} type="checkbox" checked={value} onChange={(e) => setValue(e.target.checked)} />;
};
