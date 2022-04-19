import { useEditor } from "../../containers/EditorContainer";
import { BulletPatternAssetDefinition } from "../../types/gameDefinition/AssetDefinition";

interface BulletPatternAssetFieldProps {
    value: BulletPatternAssetDefinition;
    setValue: (value: BulletPatternAssetDefinition) => void;
}

export const BulletPatternAssetField: React.FC<BulletPatternAssetFieldProps> = ({ value, setValue }) => {
    const BulletPatternAssets = useEditor().assetFiles?.bulletPatterns ?? [];

    const setBulletPatternAssetUrl = (url: string) => {
        setValue({ ...value, url });
    };

    return (
        <select value={value.url} onChange={(e) => setBulletPatternAssetUrl(e.target.value)}>
            {BulletPatternAssets.map((url) => (
                <option key={url} value={url}>
                    {url}
                </option>
            ))}
        </select>
    );
};
