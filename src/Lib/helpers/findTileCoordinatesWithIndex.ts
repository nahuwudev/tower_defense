export function findTileCoordinatesWithIndex(
    index: number,
    layer: Phaser.Tilemaps.TilemapLayer,
) {
    const tiles = layer.getTilesWithin(0, 0, layer.width, layer.height);

    const coordinates = tiles
        .filter((tile) => tile.index === index)
        .map((tile) => ({
            x: tile.getCenterX(),
            y: tile.getCenterY(),
        }));

    console.log(`Coordinates of tiles with index ${index}:`, coordinates);
    return coordinates;
}
