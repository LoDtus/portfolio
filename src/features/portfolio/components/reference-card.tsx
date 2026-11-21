import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import type {
    ReferenceFacts,
    ReferenceText,
} from "@/features/portfolio/types/portfolio.types";

// Chữ cái đầu của họ và tên (từ đầu và từ cuối), dùng làm ảnh thay thế khi chưa có ảnh: "Nguyễn Huy Toán" -> "NT".
function getInitials(name: string): string {
    const words = name.trim().split(/\s+/);
    const first = words[0]?.charAt(0) ?? "";
    const last = words.length > 1 ? (words[words.length - 1]?.charAt(0) ?? "") : "";
    return `${first}${last}`.toUpperCase();
}

// Thẻ một người tham chiếu: ảnh (hoặc chữ cái đầu), tên, chức danh, đơn vị, email, điện thoại.
// Phần nào chưa có dữ liệu thì bỏ qua; chưa có gì để liên hệ thì hiện ghi chú "đang cập nhật" thay vì bịa nội dung.
export default function ReferenceCard({
    facts,
    text,
    labels,
}: {
    facts: ReferenceFacts;
    text: ReferenceText;
    labels: { email: string; phone: string; pending: string };
}) {
    const hasContact = facts.email !== null || facts.phoneE164 !== null;

    return (
        <article className="card-lift spotlight flex h-full gap-5 border border-border-main bg-muted p-5 sm:p-6">
            <div className="relative size-24 shrink-0 overflow-hidden border-b-4 border-accent bg-band sm:size-28">
                {facts.photo === null ? (
                    <span
                        aria-hidden="true"
                        className="flex size-full items-center justify-center font-display text-3xl font-bold tracking-wide text-brand-mint"
                    >
                        {getInitials(facts.name)}
                    </span>
                ) : (
                    <Image
                        src={facts.photo.src}
                        alt={facts.name}
                        width={facts.photo.width}
                        height={facts.photo.height}
                        sizes="112px"
                        className="size-full object-cover"
                    />
                )}
            </div>

            <div className="min-w-0 space-y-3">
                <div>
                    <h3 className="font-display text-xl font-bold text-heading">
                        {facts.name}
                    </h3>
                    {text.role === null ? null : (
                        <p className="mt-1 text-sm font-semibold text-accent-ink">
                            {text.role}
                        </p>
                    )}
                    {facts.organization === null ? null : (
                        <p className="text-sm text-text-sub">{facts.organization}</p>
                    )}
                </div>

                {hasContact ? (
                    <ul className="space-y-1.5 text-sm">
                        {facts.email === null ? null : (
                            <li className="flex items-center gap-2">
                                <Mail
                                    aria-hidden="true"
                                    className="size-4 shrink-0 text-accent-ink"
                                />
                                <span className="sr-only">{labels.email}: </span>
                                <a
                                    href={`mailto:${facts.email}`}
                                    className="link-draw break-all text-text-main"
                                >
                                    {facts.email}
                                </a>
                            </li>
                        )}
                        {facts.phoneE164 === null ? null : (
                            <li className="flex items-center gap-2">
                                <Phone
                                    aria-hidden="true"
                                    className="size-4 shrink-0 text-accent-ink"
                                />
                                <span className="sr-only">{labels.phone}: </span>
                                <a
                                    href={`tel:${facts.phoneE164}`}
                                    className="link-draw text-text-main"
                                >
                                    {facts.phoneDisplay ?? facts.phoneE164}
                                </a>
                            </li>
                        )}
                    </ul>
                ) : (
                    <p className="text-sm italic text-text-sub">{labels.pending}</p>
                )}
            </div>
        </article>
    );
}
