import { Path } from "./types";

export const CELL_WIDTH = 16;
export const CELL_HEIGHT = 16;

export const ENEMY_SPEED = 1 / (1 * 10000);

export const TILE_INDEX = {
    GUN_ENEMY: 124,
    AXE_GREEN_ENEMY: 179,
    GREEN_BASE: 81,
    BASE_SITE: 109,
    V_ROAD_START: 163,
    V_ROAD_MID: 145,
    V_ROAD_END: 127,
    H_ROAD_START: 110,
    H_ROAD_MID: 111,
    H_ROAD_END: 112,
    SPAWN_FLAG: 72,
    //SPAWN_ZONE: 80, igual al building_1 ??
    TURRET: 117,
    BUILDING_1: 82,
    BUILDING_2: 81,
    BUILDING_3: 80,
    BUILDING_4: 83,
    BUILDING_5: 84,
};

export const PATHS: Path[] = [
    {
        id: "start_top",
        start: { x: 216, y: 168 },
        points: [
            { x: 297, y: 168 },
            { x: 297, y: 248 },
            { x: 488, y: 248 },
            { x: 488, y: 320 },
        ],
    },
    {
        id: "middle_top",
        start: { x: 488, y: 60 },
        points: [{ x: 488, y: 320 }],
    },
    {
        id: "end_top",
        start: { x: 904, y: 70 },
        points: [
            { x: 904, y: 105 },
            { x: 840, y: 105 },
            { x: 840, y: 170 },
            { x: 745, y: 170 },
            { x: 745, y: 248 },
            { x: 488, y: 248 },
            { x: 488, y: 320 },
        ],
    },
    {
        id: "start_middle",
        start: { x: 56, y: 327 },
        points: [{ x: 475, y: 327 }],
    },
    {
        id: "end_middle",
        start: { x: 904, y: 327 },
        points: [{ x: 502, y: 327 }],
    },
    {
        id: "start_bottom",
        start: { x: 216, y: 488 },
        points: [
            { x: 216, y: 390 },
            { x: 488, y: 390 },
            { x: 488, y: 340 },
        ],
    },
    {
        id: "middle_bottom",
        start: { x: 488, y: 575 },
        points: [{ x: 488, y: 340 }],
    },
    {
        id: "middle_bottom",
        start: { x: 890, y: 584 },
        points: [
            { x: 793, y: 584 },
            { x: 793, y: 390 },
            { x: 488, y: 390 },
            { x: 488, y: 390 },
            { x: 488, y: 340 },
        ],
    },
];
