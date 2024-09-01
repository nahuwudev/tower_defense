import { Scene } from "phaser";

export class Boot extends Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.
        this.input.setDefaultCursor("url(assets/cursors/cursor.png), pointer");

        this.load.setPath("assets");
        this.load.image("background", "bg.png");
        this.load.image("tilemap", "tilemap.png");
        this.load.tilemapTiledJSON("tilemap", "map.json");
               
        this.load.atlas('flares', 'particles/flares.png', 'particles/flares.json')
       
        this.load.image("cursor", "cursors/cursor.png");
        this.load.image("cursor", "cursors/build.png");
        
        this.load.image("towerIcon", "tower.png");
        this.load.image("baseIcon", "base.png");
        this.load.image("coinIcon", "coin.png");

        this.load.spritesheet("tileset", "tilemap.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    create() {
        this.scene.start("Preloader");
    }
}
