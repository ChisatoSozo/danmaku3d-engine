interface LabeledFieldProps {
    label: string;
    direction?: "row" | "column";
}

export const LabeledField: React.FC<LabeledFieldProps> = ({ label, direction = "column", children }) => {
    return (
        <div style={{ display: "flex", flexDirection: direction, paddingLeft: 14 }}>
            <label>{label}</label>
            {children}
        </div>
    );
};
