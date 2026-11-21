import { House, Mail, Phone, type LucideIcon } from "lucide-react";
import { TOP_BAR_ITEMS } from "@/features/portfolio/constants/profile.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";

type TopBarItemId = (typeof TOP_BAR_ITEMS)[number]["id"];

const ICONS: Record<TopBarItemId, LucideIcon> = {
    phone: Phone,
    email: Mail,
    address: House,
};

// Màn hình hẹp chỉ đủ chỗ cho số điện thoại; rộng dần thì hiện thêm email, rồi địa chỉ.
const VISIBILITY: Record<TopBarItemId, string> = {
    phone: "",
    email: "hidden sm:flex",
    address: "hidden md:flex",
};

// Dải thông tin liên hệ nhanh bên trái thanh trên cùng: biểu tượng + giá trị, ngăn cách bằng dấu "|".
// Mỗi mục là liên kết (gọi điện, gửi thư, mở bản đồ); nhãn kênh nằm ở title để người đọc màn hình biết mục đó là gì.
export default function TopContactBar({
    content,
}: {
    content: PortfolioContent;
}) {
    return (
        <ul
            aria-label={content.ui.topBarLabel}
            className="flex min-w-0 items-center gap-3 text-sm font-medium"
        >
            {TOP_BAR_ITEMS.map((item, index) => {
                const Icon = ICONS[item.id];
                const label = content.contact.channels[item.id].label;
                const isExternal = item.id === "address";

                return (
                    <li
                        key={item.id}
                        className={`${VISIBILITY[item.id]} min-w-0 items-center gap-3`}
                    >
                        {index > 0 ? (
                            <span aria-hidden="true" className="text-white/30">
                                |
                            </span>
                        ) : null}
                        <a
                            href={item.href}
                            title={label}
                            {...(isExternal
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                            className="inline-flex min-w-0 items-center gap-2 text-white/85 hover:text-white focus-visible:text-white"
                        >
                            <Icon aria-hidden="true" className="size-4 shrink-0" />
                            <span className="sr-only">{label}: </span>
                            <span className="truncate">{item.value}</span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
