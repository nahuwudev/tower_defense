import { Game } from "../Scene/Game";
import { AddNewBuildings, Buildings } from "../Entity/Buildings";
import { HUD } from "./HUD";
import { AddNewTurret, Turret } from "../Entity/Turret";
import { Bullet } from "../Entity/Bullet";
import { Dialog } from "../UI/Dialog";

export class Player {
    sessionId: string;
    scene: Game;
    turrets: Phaser.GameObjects.Group;
    bullets: Phaser.GameObjects.Group;
    buildings: Phaser.GameObjects.Group;
    dialogs: Dialog;
    coins: number;
    hud: HUD;
    dialogOpen: boolean = false;
    playerEnemyKills = 0;

    constructor(scene: Game) {
        this.scene = scene;
        this.dialogs = new Dialog(this);
        this.scene.input.on("pointerdown", this.handleBuild, this);
        this.create();
    }

    create(): void {
        this.turrets = this.scene.add.group({
            classType: Turret,
            runChildUpdate: true,
        });
        this.bullets = this.scene.add.group({
            classType: Bullet,
            runChildUpdate: true,
        });
        this.buildings = this.scene.add.group({
            classType: Buildings,
            runChildUpdate: true,
        });
        this.coins = 0;
        this.hud = new HUD(this);
    }

    async handleBuild(pointer: Phaser.Input.Pointer) {
        if (this.dialogOpen) return;

        const worldPoint = pointer.positionToCamera(
            this.scene.cameras.main,
        ) as Phaser.Math.Vector2;

        const x = Math.floor(worldPoint.x / 16);
        const y = Math.floor(worldPoint.y / 16);

        const turretLayerTile = this.scene.map.turretLayer.getTileAt(x, y);
        const baseLayerTile = this.scene.map.baseLayer.getTileAt(x, y);
        const positionKey = `${x},${y}`;

        if (baseLayerTile) {
            this.dialogOpen = true;

            const response = await this.dialogs.buildingDialog();

            if (response) {
                console.log(response);
                const availablePositions = this.getAvailablePositionsInLayer(
                    this.scene.map.buildingsLayer,
                );

                if (availablePositions.length > 0) {
                    const randomPosition = availablePositions[
                        Math.floor(Math.random() * availablePositions.length)
                    ];

                    const [randomX, randomY] = randomPosition.split(",").map(
                        Number,
                    );

                    this.buildBuilding(
                        randomX * 16,
                        randomY * 16,
                        this.dialogs.level,
                        this.dialogs.cost,
                    );
                } else {
                    console.log("no hay pos disp");
                }
            }
        }

        if (turretLayerTile && this.scene.map.canBuild(positionKey)) {
            this.dialogOpen = true;

            const response = await this.dialogs.towerDialog();

            if (response) {
                this.buildTurret(
                    x * 16,
                    y * 16,
                    this.dialogs.level,
                    this.dialogs.cost,
                );
            }
        }
    }

    buildBuilding(x: number, y: number, level: number, cost: number) {
        if (this.coins >= cost) {
            const newBuilding = new AddNewBuildings(this.scene, this)
                .setPassiveIncome(level * 2)
                .setLevel(level)
                .build();

            this.buildings.add(newBuilding);
            this.scene.map.occupiedPositions.add(`${x / 16},${y / 16}`);
            newBuilding.setActive(true);
            newBuilding.setVisible(true);
            newBuilding.setPosition(x, y);
            newBuilding.setOrigin(0, 0);
            this.coins -= cost;
        } else {
            alert("No te alcanza, pelotudo.");
        }
    }

    buildTurret(x: number, y: number, level: number, cost: number) {
        if (this.coins >= cost) {
            const newTurret = new AddNewTurret(this.scene, this)
                .setLevel(level)
                .setAttackDamage(level * 10)
                .setAttackSpeed(3)
                .setHealth(level * 10)
                .build();

            this.turrets.add(newTurret);
            this.scene.map.occupiedPositions.add(`${x / 16},${y / 16}`);
            newTurret.setActive(true);
            newTurret.setVisible(true);
            newTurret.setPosition(x, y);
            newTurret.setOrigin(0, 0);
            this.coins -= cost;
        } else {
            alert("No te alcanza, pelotudo.");
        }
    }

    getAvailablePositionsInLayer(
        layer: Phaser.Tilemaps.TilemapLayer,
    ): string[] {
        const availablePositions: string[] = [];

        for (let y = 0; y < layer.tilemap.height; y++) {
            for (let x = 0; x < layer.tilemap.width; x++) {
                const tile = layer.getTileAt(x, y);
                const positionKey = `${x},${y}`;

                if (
                    tile && !this.scene.map.occupiedPositions.has(positionKey)
                ) {
                    availablePositions.push(positionKey);
                }
            }
        }

        return availablePositions;
    }

    incrementKills() {
        this.playerEnemyKills += 1;
    }
}
