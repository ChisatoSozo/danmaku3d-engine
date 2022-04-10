import { IVector3 } from "../../types/gameDefinition/UtilTypes";
import { NumberField } from "./NumberField";

interface VectorFieldProps {
    value: IVector3;
    setValue: (value: IVector3) => void;
}

export const VectorField: React.FC<VectorFieldProps> = ({ value, setValue }) => {
    return (
        <div style={{ width: "100%", display: "flex" }}>
            <NumberField
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
                value={value.x}
                setValue={(e) => setValue({ ...value, x: e })}
            />
            <NumberField
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
                value={value.y}
                setValue={(e) => setValue({ ...value, y: e })}
            />
            <NumberField
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
                value={value.z}
                setValue={(e) => setValue({ ...value, z: e })}
            />
        </div>
    );
};
