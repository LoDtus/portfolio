import { keepWordsTogether } from "@/features/portfolio/utils/no-break.utils";

// Tiêu đề section theo thanglong.edu.vn: vạch đỏ đứng + tiêu đề đậm, phần mô tả nằm ở cột phải.
export default function SectionHeading({
    id,
    title,
    description,
    tone,
}: {
    id: string;
    title: string;
    description: string;
    tone: "light" | "dark";
}) {
    const isDark = tone === "dark";

    return (
        <div className="print-keep-next reveal mb-12 grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div className="flex items-stretch gap-4">
                <span
                    aria-hidden="true"
                    className={`reveal-bar w-1 shrink-0 ${isDark ? "bg-brand-peach" : "bg-accent"}`}
                />
                <h2
                    id={id}
                    className={`font-display text-3xl font-bold leading-tight lg:text-4xl ${
                        isDark ? "text-white" : "text-heading"
                    }`}
                >
                    {title}
                </h2>
            </div>
            <p
                className={`max-w-xl text-balance text-lg leading-8 lg:justify-self-end ${
                    isDark ? "text-white/75" : "text-text-sub"
                }`}
            >
                {keepWordsTogether(description)}
            </p>
        </div>
    );
}
