import { Game } from "../Scene/Game";

export class Map {
    private scene: Game;
    hoverRect: Phaser.GameObjects.Graphics;
    groundLayer: Phaser.Tilemaps.TilemapLayer;
    baseLayer: Phaser.Tilemaps.TilemapLayer;
    enemyPath: Phaser.Tilemaps.TilemapLayer;
    spawnsLayer: Phaser.Tilemaps.TilemapLayer;
    objectsLayers: Phaser.Tilemaps.TilemapLayer;
    turretLayer: Phaser.Tilemaps.TilemapLayer;
    buildingsLayer: Phaser.Tilemaps.TilemapLayer;

    map: Phaser.Tilemaps.Tilemap;
    occupiedPositions: Set<string> = new Set();

    constructor(scene: Game) {
        this.scene = scene;
        this.hoverRect = this.scene.add.graphics();
        this.hoverRect.lineStyle(2, 0xffffff, 1);
        this.hoverRect.setDepth(1);

        this.scene.input.on(
            "pointermove",
            (pointer: Phaser.Input.Pointer) => this.mouseHover(pointer),
        );
        this.occupiedPositions.add(`30,20`);
    }

    drawMap() {
        this.map = this.scene.make.tilemap({ key: "tilemap" });
        const tileset = this.map.addTilesetImage("tilemap", "tilemap");

        if (!tileset) {
            throw new Error("Objeto tileset indefinido");
        }

        const buildingsLayer = this.map.createLayer("buildings_sites", tileset);
        const turretLayer = this.map.createLayer("turrets_sites", tileset);
        const groundLayer = this.map.createLayer("suelo", tileset);
        const enemyPath = this.map.createLayer("enemy_paths", tileset);
        const objectsLayer = this.map.createLayer("objects", tileset);
        const spawnsLayer = this.map.createLayer("spawns", tileset);
        const baseLayer = this.map.createLayer("base_sites", tileset);

        if (!groundLayer) throw new Error("layer no inicializada");
        if (!baseLayer) throw new Error("layer no inicializada");
        if (!enemyPath) throw new Error("layer no inicializada");
        if (!spawnsLayer) throw new Error("layer no inicializada");
        if (!objectsLayer) throw new Error("layer no inicializada");
        if (!turretLayer) throw new Error("layer no inicializado");
        if (!buildingsLayer) throw new Error("layer no inicializado");

        this.baseLayer = baseLayer;
        this.enemyPath = enemyPath;
        this.groundLayer = groundLayer;
        this.spawnsLayer = spawnsLayer;
        this.objectsLayers = objectsLayer;
        this.turretLayer = turretLayer;
        this.buildingsLayer = buildingsLayer;

        return this.map;
    }

    mouseHover(pointer: Phaser.Input.Pointer) {
        // Convierte la posición del puntero a coordenadas del mundo
        const worldPoint = pointer.positionToCamera(
            this.scene.cameras.main,
        ) as Phaser.Math.Vector2;

        // Accede a las propiedades x e y de worldPoint
        const x = Math.floor(worldPoint.x / 16);
        const y = Math.floor(worldPoint.y / 16);

        const turretLayer = this.turretLayer.getTileAt(
            x,
            y,
        );

        if (turretLayer) {
            this.hoverRect.clear();

            this.hoverRect.strokeRect(
                x * 16,
                y * 16,
                16,
                16,
            );
            this.hoverRect.setDepth(100);
        } else {
            this.hoverRect.clear();
        }
    }

    canBuild(positionKey: string): boolean {
        if (this.occupiedPositions.has(positionKey)) {
            console.log("Lugar ocupado");
            return false;
        }
        return true;
    }
}
