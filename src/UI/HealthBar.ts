export class HealthBar extends Phaser.GameObjects.Graphics {
    private width: number;
    private height: number;
    
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene);
        this.scene = scene;
        this.width = width;
        this.height = height;
        
        this.setPosition(x, y);
        this.scene.add.existing(this);
    }

    updateLifeBar(life: number, maxLife: number) {
        this.clear();

        const lifeBarWidth = this.width * (life / maxLife);

        if (life > 0) {
            this.fillStyle(0xff0000, 1);
            this.fillRect(-this.width / 2, -this.height / 2, lifeBarWidth, this.height);
        }
    }
}

export class AddHealthBar {
    private scene: Phaser.Scene;
    private x: number;
    private y: number;
    private width: number = 16;
    private height: number = 3;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    setPosition(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    setSize(width: number, height: number): this {
        this.width = width;
        this.height = height;
        return this;
    }

    build(): HealthBar {
        return new HealthBar(
            this.scene,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
