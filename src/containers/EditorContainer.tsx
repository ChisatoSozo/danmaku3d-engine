import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface GameDetails {
    type: "game";
}

interface StageDetails {
    type: "stage";
    stage: number;
}

interface PhaseDetails {
    type: "phase";
    stage: number;
    phase: number;
}

type SelectedDetails = GameDetails | StageDetails | PhaseDetails;
interface AssetFiles {
    meshes: string[];
    sounds: string[];
    textures: string[];
    glsl: string[];
}

interface IEditorContext {
    selectedDetails?: SelectedDetails;
    setSelectedDetails: Dispatch<SetStateAction<SelectedDetails | undefined>>;
    assetFiles?: AssetFiles;
    refreshAssetFiles: () => void;
}

const makeDefaultIEditor = (): IEditorContext => ({
    setSelectedDetails: () => {},
    refreshAssetFiles: () => {},
});

const EditorContext = createContext<IEditorContext>(makeDefaultIEditor());

export const useEditor = () => {
    return useContext(EditorContext);
};

interface EditorContainerProps {
    gameDefinitionName: string;
}

export const EditorContainer: React.FC<EditorContainerProps> = ({ children, gameDefinitionName }) => {
    const [selectedDetails, setSelectedDetails] = useState<SelectedDetails>();
    const [assetFiles, setAssetFiles] = useState<AssetFiles>();

    const fetchAssetFiles = useCallback(async () => {
        const response = await fetch(
            `${window.location.protocol}//${window.location.hostname}:5000/listAssets/${gameDefinitionName}`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch asset files: ${response.statusText}`);
        }
        const json = await response.json();
        setAssetFiles(json);
    }, [gameDefinitionName]);

    useEffect(() => {
        fetchAssetFiles();
    }, [fetchAssetFiles]);

    const refreshAssetFiles = useCallback(() => {
        fetchAssetFiles();
    }, [fetchAssetFiles]);

    const editorContextValue = useMemo(
        () => ({ selectedDetails, setSelectedDetails, assetFiles, refreshAssetFiles }),
        [selectedDetails, setSelectedDetails, assetFiles, refreshAssetFiles]
    );

    return <EditorContext.Provider value={editorContextValue}>{children}</EditorContext.Provider>;
};
