import { Vector3 } from "@babylonjs/core";
import { MAX_ACTIVE_ENEIMIES } from "../utils/EngineConstants";

interface GlobalEnemyRef {
    position: Vector3;
    radius: number;
    health: number;
    active: boolean;
}

interface GlobalUniformRefs {
    playerPosition: Vector3;
    greyscaleDistance: number;
    firing: number;
    target: Vector3;
    enemies: GlobalEnemyRef[];
}

const makeGlobalEnemyRef = () => {
    return {
        position: new Vector3(-510, -510, -510),
        radius: 0,
        health: 0,
        active: false,
    };
};

const times = <T>(n: number, f: () => T): T[] => {
    const result: T[] = [];
    for (let i = 0; i < n; i++) {
        result.push(f());
    }
    return result;
};

export const globalUniformRefs: GlobalUniformRefs = {
    playerPosition: new Vector3(-510, -510, -510),
    greyscaleDistance: 200,
    firing: 0,
    target: new Vector3(0, 0, 0),
    enemies: times(MAX_ACTIVE_ENEIMIES, makeGlobalEnemyRef),
};

export const insertNewGlobalEnemyRef = (enemy: GlobalEnemyRef) => {
    const index = globalUniformRefs.enemies.findIndex((e) => !e.active);
    if (index === -1) {
        throw new Error("There are more than " + MAX_ACTIVE_ENEIMIES + " enemies");
    }
    globalUniformRefs.enemies[index] = enemy;
    return index;
};
