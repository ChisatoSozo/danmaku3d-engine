import { useCallback, useState } from "react";
import { assetTypeToAssetFileMap, useEditor } from "../containers/EditorContainer";
import { AssetType } from "../types/gameDefinition/AssetDefinition";
import { makeBulletPatternDefinition } from "../types/gameDefinition/BulletPatternDefinition";
import { uploadJSON } from "../utils/Utils";

interface NewAssetProps {
    gameDefinitionName: string;
    assetType: AssetType;
}

const newAssetGenerators: { [key: string]: (url: string) => any } = {
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
        const assetFileIndex = assetTypeToAssetFileMap[assetType];
        if (!assetFileIndex) throw new Error("No asset file map for asset type: " + assetType);
        const newFileName = findNewFileName(assetFiles[assetFileIndex], "newBulletPattern.json");
        const newAsset = newAssetGenerators[assetType](newFileName);
        setUploading(true);
        await uploadJSON(newFileName, assetType, gameDefinitionName, newAsset);
        refreshAssetFiles();
        setUploading(false);
    }, [assetFiles, assetType, gameDefinitionName, refreshAssetFiles]);

    return <button onClick={uploadNewFile}>{uploading ? "Uploading..." : "New"}</button>;
};
