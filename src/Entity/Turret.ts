import { Game } from "../Scene/Game";
import { Player } from "../System/Player";
import { Entity } from "./Entity";

export class Turret extends Entity {
    scene: Game;
    nextShoot: number;
    owner: Player;

    constructor(scene: Game, owner: Player) {
        super(scene, 0, 0, owner, 117);
        this.owner = owner
        this.scene = scene;
        this.attackSpeed = 2;
        this.nextShoot = 0;
        this.unitCost = 10;
        this.attackDamage = 30; 
    }

    update(time: number, _delta: number) {
        if (time > this.nextShoot) {
            const enemy = this.scene.getEnemy(this.x, this.y, 100);

            if (enemy) {
                this.fire(enemy, this.x, this.y);
            }

            this.nextShoot = time + (this.attackSpeed * 1000);
        }
    }

    buildTurret(x: number, y: number, level: number, _cost: number) {
        if (this.scene.player.coins >= 20) {
            const newTurret = new AddNewTurret(this.scene, this.owner)
                .setLevel(level)
                .setAttackDamage(level * 10)
                .setAttackSpeed(level * 0.5)
                .setHealth(level * 10)
                .build();

            this.scene.player.turrets.add(newTurret);
            this.scene.map.occupiedPositions.add(`${x / 16},${y / 16}`);
            newTurret.setActive(true);
            newTurret.setVisible(true);
            newTurret.setPosition(x, y);
            newTurret.setOrigin(0, 0);
        } else {
            alert("No te alcanza, pelotudo.");
        }
    }
}

export class AddNewTurret {
    private turret: Turret;

    constructor(scene: Game, Player: Player) {
        this.turret = new Turret(scene, Player);
    }

    setHealth(health: number): AddNewTurret {
        this.turret.maxLife = health;
        this.turret.life = health
        return this;
    }

    setAttackSpeed(speed: number): AddNewTurret {
        this.turret.attackSpeed = speed;
        return this;
    }

    setAttackDamage(damage: number): AddNewTurret {
        this.turret.attackDamage = damage;
        return this;
    }

    setLevel(level: number): AddNewTurret {
        this.turret.level = level;
        return this
    }

    setCost(cost: number): AddNewTurret {
        this.turret.unitCost = cost;
        return this;
    }

    build(): Turret {
        return this.turret
    }
}
