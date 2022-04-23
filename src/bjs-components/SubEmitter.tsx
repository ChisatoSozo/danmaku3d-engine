import { useVectorMemo } from "../hooks/useVectorMemo";
import { BulletPatternAssetDefinition } from "../types/gameDefinition/AssetDefinition";
import { IVector3 } from "../types/gameDefinition/UtilTypes";
import { BulletPatternComponent } from "./BulletPattern";

interface SubEmitterProps {
    bulletPatternDefinition: BulletPatternAssetDefinition;
    position: IVector3;
}

export const SubEmitter: React.FC<SubEmitterProps> = ({ bulletPatternDefinition, position }) => {
    const positionVector = useVectorMemo(position);

    return (
        <transformNode name="" position={positionVector}>
            <BulletPatternComponent bulletPatternDefinition={bulletPatternDefinition} />
        </transformNode>
    );
};
