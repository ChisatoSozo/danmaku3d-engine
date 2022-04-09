import { TransformNode, Vector3 } from "@babylonjs/core";
import React, { useMemo, useRef } from "react";
import { keyObject } from "../containers/ControlsContext";
import { useDeltaBeforeRender } from "../hooks/useDeltaBeforeRender";
import { useVectorMemo } from "../hooks/useVectorMemo";
import { StageDefinition } from "../types/gameDefinition/GameDefinition";
import { PlayableCharacterDefinition } from "../types/gameDefinition/PlayableCharacterDefinition";
import { clampVectorInPlace } from "../utils/BabylonUtils";

interface PlayerMovementProps {
    stageDefinition: StageDefinition;
    playableCharacterDefinition: PlayableCharacterDefinition;
}

export const PlayerMovement: React.FC<PlayerMovementProps> = ({
    stageDefinition,
    playableCharacterDefinition,
    children,
}) => {
    const transformNodeRef = useRef<TransformNode>();

    const minBound = useVectorMemo(stageDefinition.bounds.min);
    const maxBound = useVectorMemo(stageDefinition.bounds.max);

    const position = useMemo(
        () => new Vector3((minBound.x + maxBound.x) / 2, (minBound.y + maxBound.y) / 2, minBound.z),
        [minBound, maxBound]
    );

    useDeltaBeforeRender((scene, deltaS) => {
        if (!transformNodeRef.current) return;

        const UP = keyObject.metaDownKeys["UP"];
        const DOWN = keyObject.metaDownKeys["DOWN"];
        const LEFT = keyObject.metaDownKeys["LEFT"];
        const RIGHT = keyObject.metaDownKeys["RIGHT"];
        const SLOW = keyObject.metaDownKeys["SLOW"];

        const position = transformNodeRef.current.position;

        const slowFactor = SLOW ? 0.5 : 1;

        if (UP) position.addInPlace(Vector3.Up().scale(deltaS * playableCharacterDefinition.speed * slowFactor * +UP));
        if (DOWN)
            position.addInPlace(Vector3.Down().scale(deltaS * playableCharacterDefinition.speed * slowFactor * +DOWN));
        if (LEFT)
            position.addInPlace(Vector3.Left().scale(deltaS * playableCharacterDefinition.speed * slowFactor * +LEFT));
        if (RIGHT)
            position.addInPlace(
                Vector3.Right().scale(deltaS * playableCharacterDefinition.speed * slowFactor * +RIGHT)
            );

        clampVectorInPlace(position, minBound, maxBound, 1);
    });

    return (
        <transformNode ref={transformNodeRef} name="playerTransform" position={position}>
            {children}
        </transformNode>
    );
};
