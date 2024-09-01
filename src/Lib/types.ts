import { Scene } from "phaser";

export type GetTileProp = {
    scene: Scene;
    x: number;
    y: number;
    index: number;
    scale?: number;
};


export type Coords = {
    x: number;
    y: number;
};

export type Path = {
    id: string;
    start: Coords;
    points: Coords[];

};

export type Turret = {
    id: number;
    postion: Coords;
    maxHp: number;
    hp: number;
    attack: number;
    attackSpeed: number;
    range: number;
};
