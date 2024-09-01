import { Boot } from "./Scene/Boot";
import { Game as MainGame } from "./Scene/Game";
import { Preloader } from "./Scene/Preloader";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import WebFontLoaderPlugin from "phaser3-rex-plugins/plugins/webfontloader-plugin.js";

import { Game, Types } from "phaser";

declare module "phaser" {
    interface Scene {
        rexUI: RexUIPlugin;
    }
}

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: "game-container",
    backgroundColor: "#028af8",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        Boot,
        Preloader,
        MainGame,
    ],
    plugins: {
        scene: [{
            key: "rexUI",
            plugin: RexUIPlugin,
            mapping: "rexUI",
        }],
        global: [{
            key: "rexWebFontLoader",
            plugin: WebFontLoaderPlugin,
            start: true,
        }],
    },
};

export default new Game(config);
