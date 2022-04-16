import CodeEditor from "@uiw/react-textarea-code-editor";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useEditor } from "../../containers/EditorContainer";
import { useSave } from "../../hooks/useSave";
import { lintConstructPixelShader, otherUniforms, uniforms } from "../../utils/BabylonUtils";
import { theme } from "../../utils/theme";
import { assetHost, uploadText } from "../../utils/Utils";

interface GLSLViewerProps {
    gameDefinitionName: string;
    url: string;
}

const newValueNotice = `
    // new value goes in updatedValue
    // updated value is declared as
    vec3 updatedValue = vec3(0.);
`;

const removeLinesContainingString = (body: string, stringToRemove: string) => {
    const lines = body.split("\n");
    const newLines = lines.filter((line) => !line.includes(stringToRemove));
    const removedLines = lines.filter((line) => line.includes(stringToRemove));
    return { newString: newLines.join("\n"), removedLines };
};

const supplyBuiltins = (body: string) => {
    return `
    uniform int gl_InstanceID;

    ivec2 textureSize(sampler2D sampler, int level) {
        return ivec2(0., 0.);
    }

    vec4 texture(sampler2D sampler, vec2 uv) {
        return vec4(0., 0., 0., 0.);
    }
    ${body} 
`;
};

const replaceWeirdTokens = (body: string) => {
    return body.replaceAll("%", "+");
};

export const GLSLViewer: React.FC<GLSLViewerProps> = ({ gameDefinitionName, url }) => {
    const [networkGLSL, setNetworkGLSL] = useState<string>("");
    const [glsl, setGlsl] = useState<string>("");
    const [error, setError] = useState<string>();
    const [uploading, setUploading] = useState(false);
    const { reloadAsset } = useEditor();

    const isPixelShader = useMemo(() => url.endsWith(".glsl"), [url]);

    const changed = glsl !== networkGLSL;

    const fetchGLSL = useCallback(async () => {
        const glsl = await fetch(`${assetHost}${gameDefinitionName}/glsl/${url}`).then((res) => res.text());
        setGlsl(glsl);
        setNetworkGLSL(glsl);
    }, [gameDefinitionName, url]);

    const saveGLSL = useCallback(
        async (glslInput?: string) => {
            if (error) return;
            const glslToSave = glslInput || glsl;
            setUploading(true);
            await uploadText(url, "glsl", gameDefinitionName, glslToSave);
            await fetchGLSL();
            reloadAsset(url);

            setUploading(false);
        },
        [error, glsl, url, gameDefinitionName, fetchGLSL, reloadAsset]
    );

    useEffect(() => {
        fetchGLSL();
    }, [fetchGLSL]);

    const onSave = useCallback(() => {
        if (uploading || error) return;

        const { newString: withoutIncludes, removedLines } = removeLinesContainingString(glsl, "#include");

        const formatted = (window as any).GLSLX.format(withoutIncludes);
        const formattedWithIncludes = removedLines.length ? removedLines.join("\n") + "\n\n" + formatted : formatted;
        setGlsl(formattedWithIncludes);
        saveGLSL(formattedWithIncludes);
    }, [error, glsl, saveGLSL, uploading]);

    useSave(onSave);

    useEffect(() => {
        const constructedGLSL = isPixelShader ? lintConstructPixelShader(glsl) : glsl;
        const { newString: withoutIncludes } = removeLinesContainingString(constructedGLSL, "#include");
        const withBuiltins = supplyBuiltins(withoutIncludes);
        const withoutWeirdTokens = replaceWeirdTokens(withBuiltins);
        setError((window as any).GLSLX.compile(withoutWeirdTokens).log);
    }, [glsl, isPixelShader]);

    return (
        <div
            style={{
                display: "flex",
                height: "100%",
                width: "100%",
            }}
        >
            {isPixelShader && (
                <pre
                    style={{
                        fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        width: 270,
                        fontSize: 12,
                        height: "100%",
                        paddingLeft: 10,
                        marginTop: 0,
                        backgroundColor: theme.colors.codeBackground,
                    }}
                >
                    {"\n"}
                    Available Uniforms:
                    {"\n"}
                    {uniforms.replaceAll("uniform ", "")}
                    {otherUniforms}
                    {newValueNotice}
                </pre>
            )}
            <div
                style={{
                    height: "100%",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        overflowY: "auto",
                        width: "100%",
                        flex: 1,
                        pointerEvents: "all",
                    }}
                >
                    <CodeEditor
                        value={glsl}
                        language="glsl"
                        placeholder="Please enter GLSL code."
                        onChange={(evn) => setGlsl(evn.target.value)}
                        style={{
                            backgroundColor: theme.colors.codeBackground,
                            fontSize: 12,
                            fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                            width: "100%",
                            minHeight: "100%",
                        }}
                    />
                </div>

                {error && (
                    <div
                        style={{
                            width: "100%",
                            backgroundColor: theme.colors.errorBackground,
                            cursor: "pointer",
                            pointerEvents: "all",
                            fontSize: 12,
                            fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        }}
                    >
                        <pre>{error}</pre>
                    </div>
                )}
                {!error && changed && (
                    <div
                        style={{
                            width: "100%",
                            backgroundColor: theme.colors.noticeBackground,
                            cursor: "pointer",
                            pointerEvents: "all",
                        }}
                        onClick={uploading ? () => {} : () => saveGLSL()}
                    >
                        {uploading ? "Uploading..." : "Unsaved changes, click to save"}
                    </div>
                )}
            </div>
        </div>
    );
};
