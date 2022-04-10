import { Instruction } from "./CommonDefinition";
import { IVector3 } from "./UtilTypes";

type EnemyMoveToInstruction = {
    type: "moveTo";
    position: IVector3;
    speed: number;
};

type BaseEnemyInstruction = EnemyMoveToInstruction;

export type EnemyInstruction = BaseEnemyInstruction & Instruction;
