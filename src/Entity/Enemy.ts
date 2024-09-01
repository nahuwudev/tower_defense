import { ENEMY_SPEED, TILE_INDEX } from "../Lib/const";
import { Game } from "../Scene/Game";
import { Player } from "../System/Player";
import { AddHealthBar, HealthBar } from "../UI/HealthBar";
import { Entity } from "./Entity"; // Asegúrate de que la ruta esté correcta

export class Enemy extends Entity {
    follower: { t: number; vec: Phaser.Math.Vector2 };
    path: Phaser.Curves.Path;
    healthBar: HealthBar;
    dropGold: number;
    damageInterval: number | null;
    speed: number = ENEMY_SPEED;

    constructor(scene: Game) {
        super(scene, 0, 0, "cpu", TILE_INDEX.AXE_GREEN_ENEMY);
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

        this.healthBar = new AddHealthBar(scene)
            .setPosition(this.x, this.y - 10)
            .setSize(this.width, 4)
            .build();

        this.damageInterval = null;
    }

    startOnPath(path: Phaser.Curves.Path) {
        this.path = path;
        this.follower.t = 0;

        this.path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    }

    update(_time: number, delta: number) {
        if(!this.scene.base) console.log('no existe')
        if (!this.path) return;

        this.follower.t += this.speed * delta;
        this.path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        this.healthBar.setPosition(this.x, this.y - 12);
        this.healthBar.updateLifeBar(this.life, this.maxLife);

        if (this.follower.t >= 1 && this.damageInterval === null) {
            this.damageInterval = window.setInterval(() => {
                this.scene.base.takeDamage(this.attackDamage);
            }, 1000);
        }
    }

    takeDamage(amount: number, playerAttacker?: Player | null) {
        super.takeDamage(amount);

        if (this.damageInterval !== null) {
            clearInterval(this.damageInterval);
            this.scene.base.life -= this.attackDamage;
            this.damageInterval = null;

            const random = Math.floor(Math.random() * 10);

            if (random > 8 && this.scene.base.life <= 80) {
                this.scene.base.life += Math.floor(Math.random() * 5);
            }
        }

        if (this.life <= 0) {
            this.healthBar.destroy();

            // Verifica si el atacante es un jugador válido antes de incrementar los kills
            if (playerAttacker) {
                playerAttacker.incrementKills();
            }
        }
    }

    die() {
        if (this.damageInterval !== null) {
            clearInterval(this.damageInterval);
            this.damageInterval = null;
        }
        this.healthBar.destroy();

        if (this.scene && this.scene.player) {
            this.scene.player.coins += this.dropGold;
        }

        super.die();
    }
}

export class AddNewEnemy {
    private enemy: Enemy;

    constructor(scene: Game) {
        this.enemy = new Enemy(scene);
    }

    setHealth(health: number): AddNewEnemy {
        this.enemy.maxLife = health;
        this.enemy.life = health;
        return this;
    }

    setSpeed(speed: number): AddNewEnemy {
        this.enemy.speed = speed;
        return this;
    }

    setAttackDamage(damage: number): AddNewEnemy {
        this.enemy.attackDamage = damage;
        return this;
    }

    setDropGold(amount: number): AddNewEnemy {
        this.enemy.dropGold = amount;
        return this;
    }

    build(): Enemy {
        return this.enemy;
    }
}
