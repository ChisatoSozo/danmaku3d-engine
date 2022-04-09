import { TransformNode } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import { BabylonNode, FiberTransformNodeProps, FiberTransformNodePropsCtor } from "react-babylonjs";
import { useMeshAsset } from "../loaders/meshLoader";
import { MeshAssetDefinition } from "../types/gameDefinition/GameDefinition";

type MeshFromAssetDefinitionProps = {
    assetDefinition: MeshAssetDefinition;
} & FiberTransformNodeProps &
    FiberTransformNodePropsCtor &
    BabylonNode<TransformNode>;

export const MeshFromAssetDefinition: React.FC<MeshFromAssetDefinitionProps> = ({
    assetDefinition,
    ...transformNodeProps
}) => {
    const container = useMeshAsset(assetDefinition);
    const transformNodeRef = useRef<TransformNode>(null);

    useEffect(() => {
        if (!transformNodeRef.current) {
            return;
        }
        const instantiated = container.instantiateModelsToScene();
        instantiated.rootNodes.forEach((node) => {
            node.parent = transformNodeRef.current;
        });

        return () => {
            instantiated.animationGroups.forEach((group) => {
                group.dispose();
            });
            instantiated.skeletons.forEach((skeleton) => {
                skeleton.dispose();
            });
            instantiated.rootNodes.forEach((node) => {
                node.dispose();
            });
        };
    }, [container]);

    return <transformNode ref={transformNodeRef} {...transformNodeProps}></transformNode>;
};
