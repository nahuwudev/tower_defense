import { Label } from "phaser3-rex-plugins/templates/ui/ui-components.js";
import { Player } from "./Player";

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;

export class HUD {
    towersCount: Label;
    coinsCount: Label;
    enemyKills: Label;
    timerCount: Label;
    buildingsCount: Label;
    life: Label;
    turretsLength: number;
    player: Player;

    constructor(player: Player) {
        this.player = player;
        this.turretsLength = this.player.turrets.getLength();

        this.coinsCount = this.createLabel(`Coins: ${this.player.coins}`, 885);
        this.towersCount = this.createLabel(`Towers: ${this.turretsLength}`, 760)
        this.enemyKills = this.createLabel(`kills: ${player.playerEnemyKills}`, 640)
        this.buildingsCount = this.createLabel(`Edificios: ${player.buildings.getLength()}`, 500)
        this.life = this.createLabel(`vida: ${this.player.scene.base.life}`, 300)
       
        this.timerCount = this.createLabel(`00:00`, 50)
        
    }

    update() {
        this.timerCount.text = `${this.player.scene.formattedTime }`
        this.towersCount.text = `Towers: ${this.turretsLength}`;
        this.buildingsCount.text = `Edificios: ${this.player.buildings.getLength()}`
        this.coinsCount.text = `Coins: ${this.player.coins}`;
        this.enemyKills.text = `kills: ${this.player.playerEnemyKills}`
        this.life.text = `Vida: ${this.player.scene.base.life}`;

    }

    createLabel(content: string, x: number): Label {
        const scene = this.player.scene;
        const rexui = this.player.scene.rexUI;
        return new Label(scene, {
            x,
            height: 20,
            y: 15,
            align: "center",
            orientation: "x",
            background: rexui.add.roundRectangle(0, 0, 2, 2, 5, COLOR_MAIN)
                .setStrokeStyle(2, COLOR_LIGHT),
            text: this.player.scene.add.text(0, 0, content, {
                fontSize: "16px",
                color: "#fff",
                fontFamily: "VT323",
            }),
            space: { left: 20, right: 20, top: 1, bottom: 3 },
        }).layout().setDepth(2);
    }
}
