import { useEditor } from "../../containers/EditorContainer";
import { MeshAssetDefinition } from "../../types/gameDefinition/AssetDefinition";

interface MeshAssetFieldProps {
    value: MeshAssetDefinition;
    setValue: (value: MeshAssetDefinition) => void;
}

export const MeshAssetField: React.FC<MeshAssetFieldProps> = ({ value, setValue }) => {
    const meshAssets = useEditor().assetFiles?.meshes ?? [];

    const setMeshAssetUrl = (url: string) => {
        setValue({ ...value, url });
    };

    return (
        <select value={value.url} onChange={(e) => setMeshAssetUrl(e.target.value)}>
            {meshAssets.map((url) => (
                <option key={url} value={url}>
                    {url}
                </option>
            ))}
        </select>
    );
};
