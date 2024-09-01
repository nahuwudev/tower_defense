export class EventText extends Phaser.GameObjects.Text {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        text: string,
        style: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: "VT323",
            fontSize: "82px",
            color: "#000000",
            align: "center",
        },
    ) {
        super(scene, x, y, text, style);

        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.setAlpha(0);
        this.setDepth(100);

        scene.tweens.add({
            targets: this,
            alpha: { from: 0, to: 1 },
            duration: 1000,
            ease: "Linear",
            onStart: () => {
                this.addShakeEffect();
                this.scheduleFadeOut();
            },
        });

        const emitter = this.scene.add.particles(0, 0, "flares", {
            frame: ["red", "yellow", "green"],
            lifespan: 4000,
            speed: { min: 150, max: 250 },
            scale: { start: 1, end: 0 },
            gravityY: 50,
            blendMode: "ADD",
            emitting: false,
            emitZone: {
                source: this.getBounds(),
                type: "random",
                quantity: 0,
            },
        });
        emitter.setDepth(99);
        emitter.explode(30);
    }

    addShakeEffect() {
        this.scene.tweens.add({
            targets: this,
            x: { from: this.x - 5, to: this.x + 5 },
            y: { from: this.y - 5, to: this.y + 5 },
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1,
            duration: 100,
        });
    }

    scheduleFadeOut() {
        this.scene.time.delayedCall(3000, () => {
            this.scene.tweens.add({
                targets: this,
                alpha: { from: 1, to: 0 },
                duration: 200,
                ease: "Linear",
                onComplete: () => {
                    this.destroy();
                },
            });
        });
    }
}
