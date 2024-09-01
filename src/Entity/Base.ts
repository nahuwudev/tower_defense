import { TILE_INDEX } from "../Lib/const";
import { Game } from "../Scene/Game";
import { Player } from "../System/Player";
import { AddHealthBar, HealthBar } from "../UI/HealthBar";
import { Entity } from "./Entity";

export class Base extends Entity {
    scene: Game;
    baseLayer: Phaser.Tilemaps.TilemapLayer;
    passiveIncome: number = 1;
    lastCoinTime: number = 0;
    nextShoot: number;
    healthBar: HealthBar;
    players: Player[]
    destroyed: boolean = false;


    constructor(scene: Game, players: Player[]) {
        super(scene, 0, 0, players, TILE_INDEX.GREEN_BASE);
        this.scene = scene;
        this.nextShoot = 0;
        
        this.healthBar = new AddHealthBar(scene)
        .setPosition(this.x, this.y - 10)
        .setSize(this.width, 4)
        .build();
    }

    initBase(players: Player[]) {
        const newBase = new AddNewBase(this.scene, players)
            .setAttackDamage(25)
            .setAttackSpeed(2)
            .setHealth(100)
            .setRangeAttack(300)
            .build();

        newBase.setPosition(479, 315);
        newBase.setActive(true);
        newBase.setVisible(true);

        newBase.setOrigin(0);
        newBase.setScale(1.2);
        newBase.setDepth(1);

        return newBase;
    }

    update(time: number) {
        if (this.destroyed) return;
        this.healthBar.updateLifeBar(this.life, this.maxLife);

        if (time - this.lastCoinTime > 1000) {
            this.scene.player.coins += this.passiveIncome;

            this.lastCoinTime = time;
        }

        if (time > this.nextShoot) {
            const enemy = this.scene.getEnemy(this.x, this.y, this.rangeAttack);

            if (enemy) {               
                this.fire(enemy, this.x, this.y);
            }

            this.nextShoot = time + (this.attackSpeed * 1000);
        }
    }

    updatePassiveIncome(num: number) {
        return this.passiveIncome = num;
    }

    die() {
        if (this.destroyed) return;
        this.destroyed = true;
        this.setActive(false);
        this.setVisible(false);
    }
}

export class AddNewBase {
    private base: Base;

    constructor(scene: Game, players: Player[]) {
        this.base = new Base(scene, players);
    }

    setHealth(health: number): AddNewBase {
        this.base.maxLife = health;
        this.base.life = health;
        return this;
    }

    setAttackSpeed(speed: number): AddNewBase {
        this.base.attackSpeed = speed;
        return this;
    }

    setAttackDamage(damage: number): AddNewBase {
        this.base.attackDamage = damage;
        return this;
    }

    setRangeAttack(range: number): AddNewBase {
        this.base.rangeAttack = range;
        return this;
    }

    build(): Base {
        return this.base;
    }
}
