import { Map } from "../System/Map";
import { Enemy } from "../Entity/Enemy";
import { PATHS } from "../Lib/const";
import { createPaths } from "../Lib/helpers/createPaths";
import { Director } from "../System/Director";
import { Player } from "../System/Player";
import { Base } from "../Entity/Base";


export class Game extends Phaser.Scene {
    nextEnemy: number;
    paths: Phaser.Curves.Path[];
    player: Player;
    base: Base;
    timer: number;
    formattedTime: string;

    enemies: Phaser.GameObjects.Group;

    director: Director;
    map: Map;

    constructor() {
        super("Game");
        this.nextEnemy = 0;
        this.timer = 0;
        this.formattedTime = "00:00";
    }

    async create() {
        this.initializeGame();
    }

    gameOver() {
        if (this.base && this.base.life <= 0) {
            this.cleanUp();
            this.scene.pause();
            alert("Has perdido. Haz clic en OK para reiniciar.");
            this.scene.restart();
        }
    }

    initializeGame() {
        this.base = new Base(this, [this.player]).initBase([this.player]); // scale to multiplayer if u want
        this.player = new Player(this)

        this.enemies = this.add.group({
            classType: Enemy,
            runChildUpdate: true,
        });

        this.map = new Map(this);
        this.map.drawMap();

        this.paths = createPaths(PATHS, this);

        this.director = new Director(this);
        this.updateTimer();
    }

    cleanUp() {
        this.enemies.clear(true, true);
        this.timer = 0;
    }

    update(time: number, _delta: number): void {
        this.gameOver();
        if (this.base && !this.base.destroyed) {
            this.base.update(time);
        }
        if (this.base && this.player && this.director) {
            this.player.hud.update();

            this.director.update(time);
        }
    }

    updateTimer() {
        setInterval(() => {
            this.timer += 1;
            const minutes = Math.floor(this.timer / 60);
            const seconds = this.timer % 60;
            const formattedTime = `${minutes.toString().padStart(2, "0")}:${
                seconds.toString().padStart(2, "0")
            }`;

            this.formattedTime = formattedTime;
        }, 1000);
    }

    getEnemy(x: number, y: number, distance: number) {
        const enemyUnits = this.enemies.getChildren() as Enemy[];
        for (let i = 0; i < enemyUnits.length; i++) {
            const enemy = enemyUnits[i];

            if (
                enemy.active &&
                Phaser.Math.Distance.Between(
                        x,
                        y,
                        enemy.x,
                        enemy.y,
                    ) <= distance
            ) {
                return enemyUnits[i];
            }
        }
    }
}
