import { TILE_INDEX } from "../Lib/const";
import { Game } from "../Scene/Game";
import { Player } from "../System/Player";
import { Entity } from "./Entity";

export class Buildings extends Entity {
    player: Player;

    constructor(
        scene: Game,
        buildingTile = TILE_INDEX.BUILDING_1,
        player: Player,
    ) {
        super(scene, 0, 0, player, buildingTile);
    }
}

export class AddNewBuildings {
    private building: Buildings;

    constructor(scene: Game, player: Player) {
        this.building = new Buildings(scene, TILE_INDEX.BUILDING_1, player);
    }

    setPassiveIncome(amount: number): AddNewBuildings {
        this.building.passiveIncome = amount;
        return this;
    }

    setLevel(level: number) {
        this.building.level = level;
        return this;
    }

    build(): Buildings {
        return this.building;
    }
}
