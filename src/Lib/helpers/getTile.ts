import { GetTileProp } from "../types";

export function getTile(options: GetTileProp) {
    const { x, index, scene, y, scale } = options;
    const tile = scene.add.image(x, y, "tileset", index);
    tile.setDepth(10)
    tile.setScale(scale)
    return tile;
}
