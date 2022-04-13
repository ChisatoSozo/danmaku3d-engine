import { useCallback, useState } from "react";
import { useEditor } from "../containers/EditorContainer";
import { AssetType } from "../types/gameDefinition/AssetDefinition";
import { assetHost } from "../utils/Utils";

interface AssetUploadProps {
    gameDefinitionName: string;
    assetType: AssetType;
}

const fileExtensionMap: { [key in AssetType]?: string } = {
    mesh: ".glb,.gltf",
    sound: ".mp3,.wav",
    texture: ".png,.jpg",
    glsl: ".glsl,.frag,.vert,.vs,.fs",
};

export const AssetUpload: React.FC<AssetUploadProps> = ({ gameDefinitionName, assetType }) => {
    const { refreshAssetFiles } = useEditor();
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            const file = e.target.files?.[0];
            if (file) {
                //upload file to /upload-asset
                const formData = new FormData();
                formData.append("file", file);
                formData.append("type", assetType);
                formData.append("gameDefinitionName", gameDefinitionName);
                setUploading(true);
                await fetch(`${assetHost}upload-asset`, {
                    method: "POST",
                    body: formData,
                });
                refreshAssetFiles();
                setUploading(false);
            }
        },
        [assetType, gameDefinitionName, refreshAssetFiles]
    );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <input
                type="file"
                accept={fileExtensionMap[assetType]}
                id={`file-upload-${assetType}`}
                style={{
                    display: "none",
                }}
                onChange={handleFileUpload}
            />
            <label htmlFor={`file-upload-${assetType}`}>{uploading ? "Uploading..." : "Upload"}</label>
        </div>
    );
};
