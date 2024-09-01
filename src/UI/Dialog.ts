import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components";
import { Player } from "../System/Player";

export class Dialog {
    player: Player;
    level: number;
    cost: number;

    constructor(player: Player) {
        this.player = player;
        this.level = 1;
        this.cost = this.calculateCost(this.level);
    }

    towerDialog() {
        return new Promise((resolve) => {
            const row = this.createRow("build", {
                maxLevel: 10, // Por ejemplo, bases pueden tener hasta nivel 10
                initialLevel: 1,
                levelText: `Lv: 1`,
                costText: `${this.calculateCost(1)}`,
            });

            const dialog = this.createBaseDialog(
                "Crear torre",
                row,
                resolve,
            );

            return dialog;
        });
    }

    buildingDialog() {
        return new Promise((resolve) => {
            const row = this.createRow("build", {
                maxLevel: 5,
                initialLevel: 1,
                levelText: "Lv: 1",
                costText: `${this.calculateCost(1)}`,
            });

            const dialog = this.createBaseDialog(
                "Crear edificio",
                row,
                resolve,
            );

            return dialog;
        });
    }

    private createRow(
        type: "build" | "upgrade",
        options: {
            maxLevel?: number;
            initialLevel?: number;
            levelText?: string;
            costText?: string;
        } = {},
    ) {
        const {
            maxLevel = 6,
            initialLevel = 1,
            levelText = `Lv: ${initialLevel}`,
            costText = `${this.calculateCost(initialLevel)}`,
        } = options;

        const increaseButton = this.createLabel("+");
        const decreaseButton = this.createLabel("-");
        const levelLabel = this.createLabel(levelText);
        const costLabel = this.createLabel(costText);

        if (type === "build") {
        }

        increaseButton.setInteractive().on("pointerdown", () => {
            if (this.level < maxLevel) {
                this.level++;
                levelLabel.text = `Lv: ${this.level}`;
                this.updateCost(costLabel);
            }
        });

        decreaseButton.setInteractive().on("pointerdown", () => {
            if (this.level > 1) {
                this.level--;
                levelLabel.text = `Lv: ${this.level}`;
                this.updateCost(costLabel);
            }
        });

        const row = this.player.scene.rexUI.add.sizer({
            orientation: "horizontal",
            space: { item: 10 },
        })
            .add(decreaseButton)
            .add(levelLabel)
            .add(increaseButton)
            .add(costLabel);

        return this.player.scene.rexUI.add.sizer({
            orientation: "vertical",
            space: { item: 20 },
        })
            .add(row);
    }

    private createLabel(text: string) {
        const label = this.player.scene.rexUI.add.label({
            background: this.player.scene.rexUI.add.roundRectangle(
                0,
                0,
                0,
                0,
                20,
                0x5e92f3,
            ),
            text: this.player.scene.add.text(0, 0, text, {
                fontSize: "24px",
            }),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        });

        label.layout();

        return label.setDepth(101);
    }

    private createBaseDialog(title: string, content: Sizer, resolve: any) {
        const dialog = this.player.scene.rexUI.add.dialog({
            x: this.player.scene.cameras.main.centerX,
            y: this.player.scene.cameras.main.centerY,
            width: 500,
            background: this.player.scene.rexUI.add.roundRectangle(
                0,
                0,
                900000,
                390000,
                20,
                0x1565c0,
            ),
            title: this.createLabel(title).setDraggable(),
            toolbar: [this.createLabel("X")],
            content: content,
            actions: [this.createLabel("Construir")],
            align: { title: "center", actions: "right" },
            space: {
                left: 20,
                right: 20,
                top: -20,
                bottom: -20,
                title: 25,
                content: 25,
                toolbarItem: 15,
                action: 15,
            },
            expand: { title: false },
        }).setDraggable("background").layout()
            .popUp(100)
            .setDepth(100);

        this.openDialogTween(dialog);

        dialog.on("button.over", function (button: any) {
            button.getElement("background").setStrokeStyle(1, 0xffffff);
        });
        dialog.on("button.out", function (button: any) {
            button.getElement("background").setStrokeStyle();
        });
        dialog.on(
            "button.click",
            (_button: any, groupName: string, index: number) => {
                if (groupName === "actions" && index === 0) {
                    this.player.dialogOpen = false;
                    this.level = 1;
                    this.cost = this.calculateCost(this.level);
                    dialog.scaleDownDestroy(100);
                    resolve(true);
                }
            },
        );
        dialog.on(
            "button.click",
            (_button: any, groupName: string, index: number) => {
                if (groupName === "toolbar" && index === 0) {
                    this.player.dialogOpen = false;
                    this.level = 1;
                    this.cost = this.calculateCost(this.level);
                    dialog.scaleDownDestroy(100);
                    resolve(false);
                }
            },
        );
    }

    private openDialogTween(dialog: any) {
        return this.player.scene.tweens.add({
            targets: dialog,
            scaleX: 1,
            scaleY: 1,
            ease: "Bounce",
            duration: 300,
            repeat: 0,
            yoyo: false,
        });
    }

    private calculateCost(level: number): number {
        return level * 75;
    }

    private updateCost(costLabel: any) {
        this.cost = this.calculateCost(this.level);
        costLabel.getElement("text").setText(`${this.cost}`);
    }
}
