import { BulletPatternAssetDefinition } from "./AssetDefinition";
import { EditorInstruction } from "./CommonDefinition";
import { IVector3 } from "./UtilTypes";

export type EnemyMoveToInstruction = {
    type: "moveTo";
    position: IVector3;
    speed: number;
};

export const makeMoveToInstruction = (): EnemyMoveToInstruction => ({
    type: "moveTo",
    position: { x: 5, y: 5, z: 0 },
    speed: 1,
});

export type EnemyAttackInstruction = {
    type: "attack";
    bulletPattern: BulletPatternAssetDefinition;
};

export type BaseEnemyInstruction = EnemyMoveToInstruction | EnemyAttackInstruction;

export type EnemyInstruction = BaseEnemyInstruction & EditorInstruction;
