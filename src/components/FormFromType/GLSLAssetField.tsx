import { useEditor } from "../../containers/EditorContainer";
import { GLSLAssetDefinition } from "../../types/gameDefinition/AssetDefinition";

interface GLSLAssetFieldProps {
    value: GLSLAssetDefinition;
    setValue: (value: GLSLAssetDefinition) => void;
}

export const GLSLAssetField: React.FC<GLSLAssetFieldProps> = ({ value, setValue }) => {
    const GLSLAssets = useEditor().assetFiles?.glsl ?? [];

    const setGLSLAssetUrl = (url: string) => {
        setValue({ ...value, url });
    };

    return (
        <select value={value.url} onChange={(e) => setGLSLAssetUrl(e.target.value)}>
            {GLSLAssets.map((url) => (
                <option key={url} value={url}>
                    {url}
                </option>
            ))}
        </select>
    );
};
