import { Game } from "../Scene/Game";
import { Player } from "../System/Player";
import { Bullet } from "./Bullet";
import { Enemy } from "./Enemy";

export class Entity extends Phaser.GameObjects.TileSprite {
    scene: Game;
    life: number;
    maxLife: number;
    attackSpeed: number;
    rangeAttack: number;
    attackDamage: number;
    unitCost: number;
    level: number;
    passiveIncome: number;
    owner: Player |  Player[] | 'cpu' 

    constructor(
        scene: Game,
        x: number,
        y: number,
        owner: Player |  Player[] | 'cpu' ,
        frame?: string | number,
    ) {
        super(scene, x, y, 16, 16, 'tileset', frame);
        this.scene = scene;
        this.owner = owner
        this.maxLife = this.life || 100;
        this.life = this.maxLife;
        this.attackSpeed = 1.0;
        this.attackDamage = 10; 
        this.rangeAttack = 50;
        this.passiveIncome = 1;

        this.scene.add.existing(this);
    }

    takeDamage(amount: number, _playerAttacker?: Player) {
        this.life -= amount;

        if (this.life <= 0) {
            this.die();
        }
    }

    fire(enemy: Enemy, x: number, y: number) {
        if (enemy) {
            const angle = Phaser.Math.Angle.Between(x, y, enemy.x, enemy.y);
    
            const bullet = this.scene.player.bullets.get() as Bullet;
    
            bullet.fire(x, y, angle);
    
            // Determine quién es el atacante
            let playerAttacker: Player | null = null;
    
            if (this.owner === 'cpu') {
                playerAttacker = null; // No hay un jugador asociado
            } else if (Array.isArray(this.owner)) {
                playerAttacker = this.owner.length > 0 ? this.owner[0] : null;
            } else {
                playerAttacker = this.owner;
            }
    
            enemy.takeDamage(this.attackDamage, playerAttacker);
        }
    }
    
    

    calculateAttacksPerSecond(attackSpeed: number): number {
        return parseFloat((1 / attackSpeed).toFixed(2));
    }

    die() {
        this.setActive(false);
        this.setVisible(false);
        this.destroy();
    }
}
