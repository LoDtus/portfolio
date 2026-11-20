import type { CSSProperties } from "react";
import type { MosaicVariant } from "@/features/portfolio/types/portfolio.types";
import {
    buildMosaicTiles,
    type MosaicColor,
    type MosaicShape,
} from "@/features/portfolio/utils/mosaic.utils";

const TILE_SIZE = 100;
const GRID_SIZE = 4;
const VIEW_SIZE = TILE_SIZE * GRID_SIZE;

// Lớp fill viết đầy đủ để Tailwind quét được.
const FILL_CLASS: Record<MosaicColor, string> = {
    forest: "fill-brand-forest",
    pine: "fill-brand-pine",
    leaf: "fill-brand-leaf",
    olive: "fill-brand-olive",
    sage: "fill-brand-sage",
    terra: "fill-brand-terracotta",
    mint: "fill-brand-mint",
    mist: "fill-[#e6efe4]",
};

const PATH_BY_SHAPE: Record<Exclude<MosaicShape, "circle" | "square">, string> = {
    quarter: "M0 0H100A100 100 0 0 1 0 100Z",
    triangle: "M0 0H100L0 100Z",
};

function renderShape(shape: MosaicShape, fillClass: string) {
    if (shape === "square") {
        return <rect width={TILE_SIZE} height={TILE_SIZE} className={fillClass} />;
    }
    if (shape === "circle") {
        return <circle cx={50} cy={50} r={50} className={fillClass} />;
    }
    return <path d={PATH_BY_SHAPE[shape]} className={fillClass} />;
}

// Khối hình học trang trí (phần tư đường tròn, tam giác, vuông, tròn) theo màu thương hiệu.
// Thay cho ảnh cá nhân ở hero/project/liên hệ; luôn có nền trắng ngà để đúng màu ở cả light và dark.
export default function GeometricMosaic({
    variant,
    rows,
    className,
}: {
    variant: MosaicVariant;
    // Số hàng hiển thị (4 = hình vuông, 2 = dải ngang 2:1), luôn cắt đúng ranh giới ô.
    rows: 2 | 4;
    className: string;
}) {
    const tiles = buildMosaicTiles(variant).slice(0, rows * GRID_SIZE);
    const viewHeight = rows * TILE_SIZE;

    return (
        <svg
            viewBox={`0 0 ${VIEW_SIZE} ${viewHeight}`}
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
            className={className}
        >
            <rect width={VIEW_SIZE} height={viewHeight} fill="#ffffff" />
            {tiles.map((item, index) => {
                const x = (index % GRID_SIZE) * TILE_SIZE;
                const y = Math.floor(index / GRID_SIZE) * TILE_SIZE;
                const style = { "--tile-index": index } as CSSProperties;

                return (
                    <g key={index} transform={`translate(${x} ${y})`}>
                        <g className="mosaic-tile" style={style}>
                            <g transform={`rotate(${item.rotation} 50 50)`}>
                                {renderShape(item.shape, FILL_CLASS[item.color])}
                            </g>
                        </g>
                    </g>
                );
            })}
        </svg>
    );
}
