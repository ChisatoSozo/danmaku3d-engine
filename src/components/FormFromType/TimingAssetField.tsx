import { Schema } from "ts-json-schema-generator";
import { TimingAssetDefinition } from "../../types/gameDefinition/AssetDefinition";
import { TimingGenerator } from "../../types/gameDefinition/BulletPatternDefinition";
import { FormFromType } from "./FormFromType";

interface TimingAssetFieldProps {
    schema: Schema;
    value: TimingAssetDefinition;
    setValue: (value: TimingAssetDefinition) => void;
    label: string;
}

export const TimingAssetField: React.FC<TimingAssetFieldProps> = ({ schema, value, setValue, label }) => {
    const setTimingAssetGenerator = (generator: TimingGenerator) => {
        setValue({ ...value, generator });
    };

    return (
        <FormFromType
            value={value.generator}
            setValue={setTimingAssetGenerator}
            localSchema={schema?.definitions?.["TimingGenerator"] as Schema}
            schema={schema}
            label={label}
        />
    );
};
