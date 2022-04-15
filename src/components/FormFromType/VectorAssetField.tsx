import { Schema } from "ts-json-schema-generator";
import { VectorAssetDefinition } from "../../types/gameDefinition/AssetDefinition";
import { VectorGenerator } from "../../types/gameDefinition/BulletPatternDefinition";
import { FormFromType } from "./FormFromType";

interface VectorAssetFieldProps {
    schema: Schema;
    value: VectorAssetDefinition;
    setValue: (value: VectorAssetDefinition) => void;
    label: string;
}

export const VectorAssetField: React.FC<VectorAssetFieldProps> = ({ schema, value, setValue, label }) => {
    const setVectorAssetGenerator = (generator: VectorGenerator) => {
        setValue({ ...value, generator });
    };

    return (
        <FormFromType
            value={value.generator}
            setValue={setVectorAssetGenerator}
            localSchema={schema?.definitions?.["VectorGenerator"] as Schema}
            schema={schema}
            label={label}
        />
    );
};
