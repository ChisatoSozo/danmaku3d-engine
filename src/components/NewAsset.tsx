import { useCallback, useState } from "react";
import { assetTypeToAssetFileMap, useEditor } from "../containers/EditorContainer";
import { AssetType } from "../types/gameDefinition/AssetDefinition";
import { makeBulletPatternDefinition } from "../types/gameDefinition/BulletPatternDefinition";

interface NewAssetProps {
    gameDefinitionName: string;
    assetType: AssetType;
}

const newAssetGenerators: { [key: string]: any } = {
    bulletPattern: makeBulletPatternDefinition,
};

const findNewFileName = (files: string[], fileName: string): string => {
    const fileNameParts = fileName.split(".");
    const fileNameWithoutExtension = fileNameParts[0];
    const fileExtension = fileNameParts[1];
    let newFileName = fileNameWithoutExtension;
    let i = 1;
    while (files.includes(newFileName + "." + fileExtension)) {
        newFileName = fileNameWithoutExtension + "-" + i;
        i++;
    }
    return newFileName + "." + fileExtension;
};

export const NewAsset: React.FC<NewAssetProps> = ({ gameDefinitionName, assetType }) => {
    const { assetFiles, refreshAssetFiles } = useEditor();
    const [uploading, setUploading] = useState(false);

    const uploadNewFile = useCallback(async () => {
        if (!assetFiles) return;
        //upload file to /upload-asset
        const formData = new FormData();
        const object = newAssetGenerators[assetType]();
        const json = JSON.stringify(object);
        const blob = new Blob([json], { type: "text/json" });

        const assetFileIndex = assetTypeToAssetFileMap[assetType];
        if (!assetFileIndex) throw new Error("No asset file map for asset type: " + assetType);

        formData.append("file", blob, findNewFileName(assetFiles[assetFileIndex], "newBulletPattern.json"));
        formData.append("type", assetType);
        formData.append("gameDefinitionName", gameDefinitionName);
        setUploading(true);
        await fetch(`${window.location.protocol}//${window.location.hostname}:5000/upload-asset`, {
            method: "POST",
            body: formData,
        });
        refreshAssetFiles();
        setUploading(false);
    }, [assetFiles, assetType, gameDefinitionName, refreshAssetFiles]);

    return <button onClick={uploadNewFile}>{uploading ? "Uploading..." : "New"}</button>;
};
