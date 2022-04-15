import { assetTypeToAssetFileMap } from "../containers/EditorContainer";
import { AssetType } from "../types/gameDefinition/AssetDefinition";

export const assetHost = `${window.location.protocol}//${window.location.hostname}:5000/`;

export const assertNever = (shouldBeNever: never) => {
    throw new Error("Was not never: " + JSON.stringify(shouldBeNever));
};

export const uploadFile = async (fileName: string, fileType: AssetType, gameDefinitionName: string, object: {}) => {
    const formData = new FormData();
    const json = JSON.stringify(object);
    const blob = new Blob([json], { type: "text/json" });

    const assetFileIndex = assetTypeToAssetFileMap[fileType];
    if (!assetFileIndex) throw new Error("No asset file map for asset type: " + fileType);

    formData.append("file", blob, fileName);
    formData.append("type", fileType);
    formData.append("gameDefinitionName", gameDefinitionName);
    await fetch(`${assetHost}upload-asset`, {
        method: "POST",
        body: formData,
    });
};

type TwoLayerDeepObject<T extends string> = { [key in T]?: { [key: string]: any } };

export const twoLayerCopy = <T extends string>(object: TwoLayerDeepObject<T>) => {
    const copy: TwoLayerDeepObject<T> = {};
    for (const key in object) {
        const value = object[key as T];
        copy[key] = { ...value };
    }
    return copy;
};
