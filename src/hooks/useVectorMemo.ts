import { Vector3 } from "@babylonjs/core";
import { IVector3Like } from "@babylonjs/core/Maths/math.like";
import { useMemo } from "react";

export const useVectorMemo = (vector: IVector3Like) => {
    return useMemo(() => new Vector3(vector.x, vector.y, vector.z), [vector]);
};
