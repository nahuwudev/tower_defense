import { Scene } from "phaser";

export class Bullet extends Phaser.GameObjects.Rectangle {
    dx: number;
    dy: number;
    lifespan = 0;
    speed: number;

    constructor(scene: Scene) {
        const size = 5;
        super(scene, 0, 0, size, size, 0x0000ff);
        this.dx = 0;
        this.dy = 0;
        this.speed = Phaser.Math.GetSpeed(600, 1);
    }

    fire(x: number, y: number, angle: number) {
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);
        this.angle = angle;

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        this.lifespan = 500;
    }

    update(_time: number, delta: number): void {
        this.lifespan -= delta;

        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);

        if (this.lifespan <= 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
