import { Dispatch, SetStateAction, useCallback } from "react";
import { AssetType } from "../types/gameDefinition/AssetDefinition";
import { ViewableAsset } from "./GameDefinitionEditor";

interface AssetElementProps {
    assetURL: string;
    assetType: AssetType;
    setCurrentAsset: Dispatch<SetStateAction<ViewableAsset | undefined>>;
}

export const AssetElement: React.FC<AssetElementProps> = ({ assetURL, assetType, setCurrentAsset }) => {
    const handleSetAsset = useCallback(() => {
        setCurrentAsset({ assetURL, assetType });
    }, [assetType, assetURL, setCurrentAsset]);

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                cursor: "pointer",
            }}
            onClick={handleSetAsset}
        >
            <div>{assetURL}</div>
            <div
                style={{
                    flex: 1,
                }}
            ></div>
            <div>&gt;</div>
        </div>
    );
};
