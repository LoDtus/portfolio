import type { MetadataRoute } from "next";
import { PROFILE } from "@/features/portfolio/constants/profile.constants";

export const dynamic = "force-static";

// Web App Manifest: tên, màu và biểu tượng khi người dùng ghim trang lên màn hình chính.
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${PROFILE.name} | Portfolio`,
        short_name: PROFILE.name,
        description: "Portfolio of Long Nguyen, Fullstack Developer.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#14412b",
        icons: [
            { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
            { src: "/icon.png", sizes: "192x192", type: "image/png" },
        ],
    };
}
