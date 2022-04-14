import { BulletPatternAssetDefinition } from "./AssetDefinition";
import { Instruction } from "./CommonDefinition";
import { IVector3 } from "./UtilTypes";

export type EnemyMoveToInstruction = {
    type: "moveTo";
    position: IVector3;
    speed: number;
};

export type EnemyAttackInstruction = {
    type: "attack";
    bulletPattern: BulletPatternAssetDefinition;
};

type BaseEnemyInstruction = EnemyMoveToInstruction | EnemyAttackInstruction;

export type EnemyInstruction = BaseEnemyInstruction & Instruction;
