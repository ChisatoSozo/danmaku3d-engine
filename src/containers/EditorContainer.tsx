import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ViewableAsset } from "../components/AssetEditors/AssetEditors";
import { AssetType } from "../types/gameDefinition/AssetDefinition";
import { BulletPatternDefinition } from "../types/gameDefinition/BulletPatternDefinition";
import { GameDefinition } from "../types/gameDefinition/GameDefinition";
import { assetHost } from "../utils/Utils";

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

interface BulletPatternDetails {
    type: "bulletPattern";
    fileName: string;
    bulletPattern: BulletPatternDefinition;
}

type SelectedDetails = GameDetails | StageDetails | PhaseDetails | BulletPatternDetails;
interface AssetFiles {
    meshes: string[];
    sounds: string[];
    textures: string[];
    glsl: string[];
    bulletPatterns: string[];
}

export const assetTypeToAssetFileMap: { [key in AssetType]?: keyof AssetFiles } = {
    texture: "textures",
    mesh: "meshes",
    sound: "sounds",
    glsl: "glsl",
    bulletPattern: "bulletPatterns",
};

interface IEditorContext {
    gameDefinitionName: string;
    gameDefinition: GameDefinition | undefined;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    selectedDetails?: SelectedDetails;
    setSelectedDetails: Dispatch<SetStateAction<SelectedDetails | undefined>>;
    assetFiles?: AssetFiles;
    refreshAssetFiles: () => void;
    reloadAsset: (url: string) => void;
    overrideGameDefinition: GameDefinition | undefined;
    setOverrideGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    currentAsset: ViewableAsset | undefined;
    setCurrentAsset: (asset: ViewableAsset | undefined) => void;
}

const makeDefaultIEditor = (): IEditorContext => ({
    gameDefinitionName: "",
    overrideGameDefinition: undefined,
    gameDefinition: undefined,
    currentAsset: undefined,
    setCurrentAsset: () => {},
    setGameDefinition: () => {},
    setOverrideGameDefinition: () => {},
    setSelectedDetails: () => {},
    refreshAssetFiles: () => {},
    reloadAsset: () => {},
});

const EditorContext = createContext<IEditorContext>(makeDefaultIEditor());

export const useEditor = () => {
    return useContext(EditorContext);
};

interface EditorContainerProps {
    gameDefinitionName: string;
    overrideGameDefinition: GameDefinition | undefined;
    setOverrideGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    gameDefinition: GameDefinition | undefined;
    setGameDefinition: Dispatch<SetStateAction<GameDefinition | undefined>>;
    reloadAsset: (url: string) => void;
}

export const EditorContainer: React.FC<EditorContainerProps> = ({
    children,
    gameDefinitionName,
    overrideGameDefinition,
    setOverrideGameDefinition,
    gameDefinition,
    setGameDefinition,
    reloadAsset,
}) => {
    const [selectedDetails, setSelectedDetails] = useState<SelectedDetails>();
    const [assetFiles, setAssetFiles] = useState<AssetFiles>();

    const fetchAssetFiles = useCallback(async () => {
        const response = await fetch(`${assetHost}listAssets/${gameDefinitionName}`);
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

    const [currentAssets, setCurrentAssets] = useState<ViewableAsset[]>([]);

    const currentAsset = useMemo(
        () => (currentAssets.length ? currentAssets[currentAssets.length - 1] : undefined),
        [currentAssets]
    );
    const setCurrentAsset = useCallback((asset: ViewableAsset | undefined) => {
        if (!asset) {
            setCurrentAssets((currentAssets) => {
                if (!currentAssets.length) return currentAssets;
                const newAssets = [...currentAssets];
                newAssets.pop();
                return newAssets;
            });
        } else {
            setCurrentAssets((currentAssets) => {
                const newAssets = [...currentAssets].filter((a) => a.assetType !== asset.assetType);
                return [...newAssets, asset];
            });
        }
    }, []);

    const editorContextValue = useMemo(
        () => ({
            gameDefinitionName,
            selectedDetails,
            setSelectedDetails,
            assetFiles,
            refreshAssetFiles,
            overrideGameDefinition,
            setOverrideGameDefinition,
            gameDefinition,
            setGameDefinition,
            reloadAsset,
            currentAsset,
            setCurrentAsset,
        }),
        [
            gameDefinitionName,
            selectedDetails,
            assetFiles,
            refreshAssetFiles,
            overrideGameDefinition,
            setOverrideGameDefinition,
            gameDefinition,
            setGameDefinition,
            reloadAsset,
            currentAsset,
            setCurrentAsset,
        ]
    );

    return <EditorContext.Provider value={editorContextValue}>{children}</EditorContext.Provider>;
};
