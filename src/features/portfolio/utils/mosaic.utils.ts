import type { MosaicVariant } from "@/features/portfolio/types/portfolio.types";

export type MosaicShape = "square" | "quarter" | "triangle" | "circle";
export type MosaicColor =
    | "forest"
    | "pine"
    | "leaf"
    | "olive"
    | "sage"
    | "terra"
    | "mint"
    | "mist";
// Góc xoay quanh tâm ô; hình gốc (quarter, triangle) neo ở góc trên-trái.
export type MosaicRotation = 0 | 90 | 180 | 270;

export interface MosaicTile {
    shape: MosaicShape;
    color: MosaicColor;
    rotation: MosaicRotation;
}

function tile(
    shape: MosaicShape,
    color: MosaicColor,
    rotation: MosaicRotation = 0,
): MosaicTile {
    return { shape, color, rotation };
}

// Bố cục gốc 4x4 gồm phần tư đường tròn, tam giác, vuông và tròn theo bảng màu xanh lá.
const BASE_TILES: readonly MosaicTile[] = [
    tile("quarter", "leaf", 0),
    tile("quarter", "forest", 90),
    tile("square", "mist"),
    tile("circle", "terra"),

    tile("triangle", "pine", 180),
    tile("square", "forest"),
    tile("quarter", "leaf", 180),
    tile("triangle", "forest", 90),

    tile("square", "forest"),
    tile("circle", "sage"),
    tile("triangle", "terra", 270),
    tile("quarter", "pine", 270),

    tile("quarter", "pine", 270),
    tile("triangle", "forest", 0),
    tile("square", "mint"),
    tile("quarter", "olive", 90),
];

const GRID_SIZE = 4;

const MIRROR_HORIZONTAL: Record<MosaicRotation, MosaicRotation> = {
    0: 90,
    90: 0,
    180: 270,
    270: 180,
};

const MIRROR_VERTICAL: Record<MosaicRotation, MosaicRotation> = {
    0: 270,
    270: 0,
    90: 180,
    180: 90,
};

const ROTATE_HALF_TURN: Record<MosaicRotation, MosaicRotation> = {
    0: 180,
    90: 270,
    180: 0,
    270: 90,
};

function mapRows(
    tiles: readonly MosaicTile[],
    mapRow: (row: readonly MosaicTile[]) => readonly MosaicTile[],
    mapRotation: Record<MosaicRotation, MosaicRotation>,
): MosaicTile[] {
    const rows: MosaicTile[][] = [];
    for (let index = 0; index < tiles.length; index += GRID_SIZE) {
        rows.push(tiles.slice(index, index + GRID_SIZE));
    }
    return mapRow(rows.flat())
        .map((item) => ({ ...item, rotation: mapRotation[item.rotation] }));
}

// Các biến thể sinh từ bố cục gốc bằng phép đối xứng, để mỗi project có hình riêng mà vẫn cùng một ngôn ngữ.
export function buildMosaicTiles(variant: MosaicVariant): MosaicTile[] {
    switch (variant) {
        case "alpha":
            return mapRows(BASE_TILES, (tiles) => [...tiles].reverse(), ROTATE_HALF_TURN);
        case "beta": {
            const mirrored = mapRows(
                BASE_TILES,
                (tiles) => tiles,
                MIRROR_HORIZONTAL,
            );
            const rows: MosaicTile[][] = [];
            for (let index = 0; index < mirrored.length; index += GRID_SIZE) {
                rows.push(mirrored.slice(index, index + GRID_SIZE).reverse());
            }
            return rows.flat();
        }
        case "gamma": {
            const mirrored = mapRows(
                BASE_TILES,
                (tiles) => tiles,
                MIRROR_VERTICAL,
            );
            const rows: MosaicTile[][] = [];
            for (let index = 0; index < mirrored.length; index += GRID_SIZE) {
                rows.push(mirrored.slice(index, index + GRID_SIZE));
            }
            return rows.reverse().flat();
        }
        case "hero":
        default:
            return [...BASE_TILES];
    }
}
