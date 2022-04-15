import { useCallback, useEffect, useState } from "react";
import { Schema } from "ts-json-schema-generator";
import { useEditor } from "../../containers/EditorContainer";
import { useInterval } from "../../hooks/useInterval";
import { BulletPatternDefinition } from "../../types/gameDefinition/BulletPatternDefinition";
import gameDefinitionSchema from "../../types/gameDefinition/GameDefinition.json";
import { MAX_BULLETS_PER_GROUP } from "../../utils/EngineConstants";
import { uploadJSON } from "../../utils/Utils";
import { Category } from "../Category";
import { FormFromType } from "../FormFromType/FormFromType";
import { LabeledField } from "../FormFromType/LabeledField";
import { NumberField } from "../FormFromType/NumberField";

interface BulletPatternDetailsProps {
    gameDefinitionName: string;
    fileName: string;
    bulletPattern: BulletPatternDefinition;
}

export const BulletPatternDetails: React.FC<BulletPatternDetailsProps> = ({
    gameDefinitionName,
    fileName,
    bulletPattern,
}) => {
    const { reloadAsset } = useEditor();
    const [localBulletPattern, setLocalBulletPattern] = useState<BulletPatternDefinition>(bulletPattern);
    const [count, setCount] = useState(bulletPattern.initialPositions.generator._count);

    useEffect(() => {
        setLocalBulletPattern((localBulletPattern) => ({
            ...localBulletPattern,
            initialPositions: {
                ...localBulletPattern.initialPositions,
                generator: {
                    ...localBulletPattern.initialPositions.generator,
                    _count: count,
                },
            },
            initialVelocities: {
                ...localBulletPattern.initialVelocities,
                generator: {
                    ...localBulletPattern.initialVelocities.generator,
                    _count: count,
                },
            },
            timings: {
                ...localBulletPattern.timings,
                generator: {
                    ...localBulletPattern.timings.generator,
                    _count: count,
                },
            },
        }));
    }, [count]);

    const [updatedBulletPattern, setUpdatedBulletPattern] = useState<BulletPatternDefinition | undefined>();

    useEffect(() => {
        setUpdatedBulletPattern(localBulletPattern);
    }, [localBulletPattern]);

    const tryUploadBulletPattern = useCallback(() => {
        if (!updatedBulletPattern) return;
        uploadJSON(fileName, "bulletPattern", gameDefinitionName, updatedBulletPattern).then(() => {
            reloadAsset(fileName);
        });
        setUpdatedBulletPattern(undefined);
    }, [fileName, gameDefinitionName, reloadAsset, updatedBulletPattern]);

    useInterval(tryUploadBulletPattern, 1000);

    return (
        <Category name="Bullet Definition" defaultOpen={true}>
            <LabeledField label="Count">
                <NumberField max={MAX_BULLETS_PER_GROUP} value={count} setValue={setCount} />
            </LabeledField>
            <FormFromType
                value={localBulletPattern}
                setValue={setLocalBulletPattern}
                localSchema={gameDefinitionSchema.definitions["BulletPatternDefinition"] as Schema}
                schema={gameDefinitionSchema as any}
                label="bulletDefinition"
            />
        </Category>
    );
};
