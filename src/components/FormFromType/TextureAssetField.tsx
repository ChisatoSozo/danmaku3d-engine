import { useEditor } from "../../containers/EditorContainer";
import { TextureAssetDefinition } from "../../types/gameDefinition/AssetDefinition";

interface TextureAssetFieldProps {
    value: TextureAssetDefinition;
    setValue: (value: TextureAssetDefinition) => void;
}

export const TextureAssetField: React.FC<TextureAssetFieldProps> = ({ value, setValue }) => {
    const textureAssets = useEditor().assetFiles?.textures ?? [];

    const setTextureAssetUrl = (url: string) => {
        setValue({ ...value, url });
    };

    return (
        <select value={value.url} onChange={(e) => setTextureAssetUrl(e.target.value)}>
            {textureAssets.map((url) => (
                <option key={url} value={url}>
                    {url}
                </option>
            ))}
        </select>
    );
};
