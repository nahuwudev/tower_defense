import { Scene } from "phaser";
import { Path } from "../types";

export function createPaths(
    pathParam: Path[],
    scene: Scene,
): Phaser.Curves.Path[] {
    const paths: Phaser.Curves.Path[] = [];

    pathParam.forEach((pathConfig) => {
        const graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffffff, 1);

        const path = scene.add.path(
            pathConfig.start.x,
            pathConfig.start.y,
        );

        pathConfig.points.forEach((point) => {
            path.lineTo(point.x, point.y);
        });

        //path.draw(graphics);
        paths.push(path);
    });
    return paths;
}
