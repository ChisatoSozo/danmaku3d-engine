import { useMemo } from "react";
import { Schema } from "ts-json-schema-generator";
import { Category } from "../Category";
import { LabeledField } from "./LabeledField";
import { MeshAssetField } from "./MeshAssetField";
import { NumberField } from "./NumberField";
import { StringField } from "./StringField";
import { TextureAssetField } from "./TextureAssetField";
import { VectorField } from "./VectorField";

interface FormFromTypeProps {
    value: any;
    setValue: (value: any) => void;
    localSchema: Schema;
    schema: Schema;
    label?: string;
    exclude?: string[];
    topLevel?: boolean;
}

type JSONSchema7TypeName =
    | "string" //
    | "number"
    | "integer"
    | "boolean"
    | "object"
    | "array"
    | "null";

const ExtendedSchemaTypes = ["IVector3", "MeshAssetDefinition", "TextureAssetDefinition"];
type ExtendedSchemaTypeTypes = "IVector3" | "MeshAssetDefinition" | "TextureAssetDefinition";

const camelCaseToSpaces = (str: string) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
};

const humanReadableLabel = (label: string | undefined) => {
    if (!label) {
        return "";
    }
    return camelCaseToSpaces(label.split(".").pop() || "");
};

const resolveSchema = (schema: Schema, localSchema: Schema, value: any): Schema => {
    if (!localSchema) throw new Error("localSchema is undefined: " + JSON.stringify(schema));
    if (localSchema.anyOf) {
        const newLocalSchema = localSchema.anyOf.find((schemaInst: any) => {
            return schemaInst.properties.type.const === value.type;
        }) as Schema;
        if (!newLocalSchema) throw new Error(`Could not find schema for type ${value.type}`);
        return resolveSchema(schema, newLocalSchema, value);
    }

    if (localSchema.$ref) {
        const ref = localSchema.$ref.replace("#/definitions/", "");
        if (ExtendedSchemaTypes.includes(ref)) {
            return { ...localSchema, type: ref as any };
        }
        if (!schema.definitions) throw new Error("Schema does not contain definitions");
        const refSchema = schema.definitions[ref] as Schema;
        if (!refSchema) throw new Error(`Could not find schema for ref ${ref}`);
        return resolveSchema(schema, refSchema, value);
    }
    return localSchema;
};

export const FormFromType: React.FC<FormFromTypeProps> = ({
    value,
    setValue,
    localSchema,
    schema,
    label = "root",
    exclude = [],
    topLevel = true,
}) => {
    const resolvedLocalSchema = useMemo(() => {
        return resolveSchema(schema, localSchema, value);
    }, [localSchema, schema, value]);

    const type = useMemo(() => {
        if (!resolvedLocalSchema.type)
            throw new Error(`Schema must have a type: ${JSON.stringify(resolvedLocalSchema)}`);
        if (Array.isArray(resolvedLocalSchema.type)) throw new Error("Schema must have a single type");
        return resolvedLocalSchema.type as JSONSchema7TypeName;
    }, [resolvedLocalSchema]);

    const setters = useMemo(() => {
        if (type === "array") {
            return value.map((_: any, i: number) => {
                return (newValue: any) => {
                    const newArrayValue = [...value];
                    newArrayValue[i] = newValue;
                    setValue(newArrayValue);
                };
            });
        }
        if (type === "object") {
            const properties = resolvedLocalSchema.properties;
            if (!properties) throw new Error("Schema must have properties");
            return Object.keys(properties).map((key: string, i) => {
                if (exclude.includes(key)) return <></>;
                return (newValue: any) => {
                    const newObjectValue = { ...value };
                    newObjectValue[key] = newValue;
                    setValue(newObjectValue);
                };
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedLocalSchema.properties, setValue, type, value]);

    let formElement: JSX.Element | JSX.Element[] = <></>;
    switch (type as JSONSchema7TypeName & ExtendedSchemaTypeTypes) {
        case "array":
            const newLocalSchema = resolvedLocalSchema.items;
            if (!newLocalSchema) throw new Error("Array schema must have an items property");
            formElement = (
                <Category defaultOpen={topLevel} name={humanReadableLabel(label)}>
                    {value.map((valueInst: any, i: number) => {
                        if (!valueInst) return <></>;
                        return (
                            <FormFromType
                                topLevel={false}
                                label={`${label}[${i}]`}
                                key={i}
                                value={valueInst}
                                setValue={setters[i]}
                                localSchema={newLocalSchema as Schema}
                                schema={schema}
                            />
                        );
                    })}
                </Category>
            );
            break;
        case "object":
            const properties = resolvedLocalSchema.properties;
            if (!properties) throw new Error("Object schema must have a properties property");
            const objectValue = value as any;
            const required = properties.required as string[];
            formElement = (
                <Category defaultOpen={topLevel} name={humanReadableLabel(label)}>
                    {Object.keys(properties).map((key: string, i) => {
                        if (required && !required.includes(key)) return <></>;
                        const property = properties[key];
                        return (
                            <FormFromType
                                topLevel={false}
                                label={`${label}.${key}`}
                                key={key}
                                value={objectValue[key]}
                                setValue={setters[i]}
                                localSchema={property as Schema}
                                schema={schema}
                            />
                        );
                    })}
                </Category>
            );
            break;
        case "string":
            formElement = (
                <LabeledField label={humanReadableLabel(label)}>
                    <StringField value={value} setValue={setValue} />
                </LabeledField>
            );
            break;
        case "number":
            formElement = (
                <LabeledField label={humanReadableLabel(label)}>
                    <NumberField value={value} setValue={setValue} />
                </LabeledField>
            );
            break;
        case "IVector3":
            formElement = (
                <LabeledField label={humanReadableLabel(label)}>
                    <VectorField value={value} setValue={setValue} />
                </LabeledField>
            );
            break;
        case "MeshAssetDefinition":
            formElement = (
                <LabeledField label={humanReadableLabel(label)}>
                    <MeshAssetField value={value} setValue={setValue} />
                </LabeledField>
            );
            break;
        case "TextureAssetDefinition":
            formElement = (
                <LabeledField label={humanReadableLabel(label)}>
                    <TextureAssetField value={value} setValue={setValue} />
                </LabeledField>
            );
            break;
        default:
            console.log("unknown type", type);
    }

    return <>{formElement}</>;
};