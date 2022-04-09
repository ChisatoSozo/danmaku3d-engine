import { IVector3Like } from "@babylonjs/core/Maths/math.like";
import { Instruction } from "./CommonDefinition";

type EnemyMoveToInstruction = {
    type: "moveTo";
    position: IVector3Like;
    speed: number;
};

type BaseEnemyInstruction = EnemyMoveToInstruction;

export type EnemyInstruction = BaseEnemyInstruction & Instruction;
