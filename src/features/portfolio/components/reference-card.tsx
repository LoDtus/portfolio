import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import PhotoSlider from "@/features/portfolio/components/photo-slider";
import TechBadge from "@/features/portfolio/components/tech-badge";
import type {
    ReferenceFacts,
    ReferenceText,
} from "@/features/portfolio/types/portfolio.types";
import { attachPhotoAlts } from "@/features/portfolio/utils/experience.utils";

// Chữ cái đầu của họ và tên (từ đầu và từ cuối), dùng làm ảnh thay thế khi chưa có ảnh: "Nguyễn Huy Toán" -> "NT".
function getInitials(name: string): string {
    const words = name.trim().split(/\s+/);
    const first = words[0]?.charAt(0) ?? "";
    const last = words.length > 1 ? (words[words.length - 1]?.charAt(0) ?? "") : "";
    return `${first}${last}`.toUpperCase();
}

const PHOTO_FRAME = "aspect-[4/5] w-full md:w-64";
const PHOTO_SIZES = "(min-width: 768px) 256px, 100vw";

// Thẻ một người tham chiếu: ảnh (một ảnh tĩnh, nhiều ảnh thì slide, chưa có thì chữ cái đầu), tên, chức danh, giới thiệu,
// email và số điện thoại hiện thẳng thành chữ, các trang khác là thẻ liên kết. Phần nào chưa có dữ liệu thì bỏ qua.
export default function ReferenceCard({
    facts,
    text,
    labels,
}: {
    facts: ReferenceFacts;
    text: ReferenceText;
    labels: { email: string; phone: string; links: string; gallery: { prev: string; next: string; bullet: string } };
}) {
    const photos = attachPhotoAlts(facts.photos, text.photoAlts);
    const firstPhoto = photos[0];
    const hasContact = facts.email !== null || facts.phoneE164 !== null;

    return (
        <article className="card-lift spotlight grid gap-6 border border-border-main bg-muted p-5 sm:p-6 md:grid-cols-[16rem_1fr]">
            {photos.length > 1 ? (
                <PhotoSlider
                    photos={photos}
                    labels={labels.gallery}
                    frameClassName={PHOTO_FRAME}
                    sizes={PHOTO_SIZES}
                />
            ) : (
                <div
                    className={`relative overflow-hidden border-b-4 border-accent bg-band ${PHOTO_FRAME}`}
                >
                    {firstPhoto === undefined ? (
                        <span
                            aria-hidden="true"
                            className="flex size-full items-center justify-center font-display text-5xl font-bold tracking-wide text-brand-mint"
                        >
                            {getInitials(facts.name)}
                        </span>
                    ) : (
                        <Image
                            src={firstPhoto.src}
                            alt={firstPhoto.alt}
                            width={firstPhoto.width}
                            height={firstPhoto.height}
                            sizes={PHOTO_SIZES}
                            style={
                                firstPhoto.position === undefined
                                    ? undefined
                                    : { objectPosition: firstPhoto.position }
                            }
                            className="size-full object-cover"
                        />
                    )}
                </div>
            )}

            <div className="min-w-0 space-y-4">
                <div>
                    <h3 className="font-display text-2xl font-bold text-heading">
                        {facts.name}
                    </h3>
                    {text.role === null ? null : (
                        <p className="mt-1 font-semibold text-accent-ink">{text.role}</p>
                    )}
                    {facts.organization === null ? null : (
                        <p className="text-sm text-text-sub">{facts.organization}</p>
                    )}
                </div>

                {text.summary === null ? null : (
                    <p className="leading-7 text-text-main">{text.summary}</p>
                )}
                {text.highlights.length === 0 ? null : (
                    <ul className="space-y-2 leading-7 text-text-main">
                        {text.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-3">
                                <span
                                    aria-hidden="true"
                                    className="mt-3 size-1.5 shrink-0 rotate-45 bg-accent"
                                />
                                {highlight}
                            </li>
                        ))}
                    </ul>
                )}

                {hasContact ? (
                    <ul className="space-y-1.5 font-semibold text-heading">
                        {facts.email === null ? null : (
                            <li className="flex items-center gap-2">
                                <Mail
                                    aria-hidden="true"
                                    className="size-4 shrink-0 text-accent-ink"
                                />
                                <span className="sr-only">{labels.email}: </span>
                                <a
                                    href={`mailto:${facts.email}`}
                                    className="link-draw break-all"
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
                                <a href={`tel:${facts.phoneE164}`} className="link-draw">
                                    {facts.phoneDisplay ?? facts.phoneE164}
                                </a>
                            </li>
                        )}
                    </ul>
                ) : null}

                {facts.links.length === 0 ? null : (
                    <ul aria-label={labels.links} className="flex flex-wrap gap-2">
                        {facts.links.map((link) => (
                            <li key={link.url}>
                                <TechBadge name={link.label} href={link.url} tone="outline" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </article>
    );
}
