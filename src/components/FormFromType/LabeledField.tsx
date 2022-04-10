interface LabeledFieldProps {
    label: string;
}

export const LabeledField: React.FC<LabeledFieldProps> = ({ label, children }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <label>{label}</label>
            {children}
        </div>
    );
};
