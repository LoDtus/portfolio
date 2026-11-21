import Image from "next/image";
import CountUp from "@/features/portfolio/components/count-up";
import EducationSlider from "@/features/portfolio/components/education-slider";
import HighlightedText from "@/features/portfolio/components/highlighted-text";
import SectionHeading from "@/features/portfolio/components/section-heading";
import { EDUCATION } from "@/features/portfolio/constants/profile.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import { attachPhotoAlts } from "@/features/portfolio/utils/experience.utils";

// Khối số liệu theo thanglong.edu.vn ("Những con số ấn tượng"): ảnh bên trái, panel indigo bên phải.
// Logo dùng nguyên bản (bản màu) trên nền trắng, rộng 140px, có vùng an toàn xung quanh (tối thiểu theo cẩm nang là 60px).
// `programUrl` là địa chỉ nút "Xem ngành học" đã kiểm tra lúc build (xem resolveProgramUrl): trang ngành học, hoặc trang chủ của trường nếu trang đó không còn.
export default function EducationSection({
    content,
    programUrl,
}: {
    content: PortfolioContent;
    programUrl: string;
}) {
    const { education } = content;
    const photos = attachPhotoAlts(EDUCATION.photos, education.photoAlts);

    return (
        <section
            id="education"
            aria-labelledby="education-title"
            className="py-20 lg:py-24"
        >
            <div className="site-container">
                <SectionHeading
                    id="education-title"
                    title={education.title}
                    description={education.description}
                    tone="light"
                />

                <div className="grid border border-border-main lg:grid-cols-2">
                    <EducationSlider photos={photos} labels={content.experience.gallery} />

                    <div className="reveal reveal-right reveal-d1 flex flex-col justify-between gap-10 bg-band p-8 text-white lg:p-12">
                        <div className="space-y-6">
                            <a
                                href={EDUCATION.schoolUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white p-4"
                            >
                                <Image
                                    src={EDUCATION.logoColor}
                                    alt={education.school}
                                    width={141}
                                    height={40}
                                    className="h-10 w-auto"
                                />
                            </a>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-wider text-brand-mint">
                                    {education.majorLabel}
                                </p>
                                <p className="mt-2 font-display text-3xl font-bold">
                                    {education.major}
                                </p>
                                <p className="mt-1 text-white/75">{education.school}</p>
                            </div>
                        </div>

                        <dl className="grid grid-cols-1 gap-px bg-white/20 sm:grid-cols-2">
                            <div className="reveal reveal-zoom reveal-d1 flex flex-col-reverse bg-band py-5 sm:pr-5">
                                <dt className="text-sm text-white/70">
                                    {education.periodLabel}
                                </dt>
                                <dd className="font-display text-2xl font-bold lg:text-3xl">
                                    <CountUp
                                        value={`${EDUCATION.startYear} – ${EDUCATION.endYear}`}
                                    />
                                </dd>
                            </div>
                            <div className="reveal reveal-zoom reveal-d2 flex flex-col-reverse bg-band py-5 sm:p-5">
                                <dt className="text-sm text-white/70">
                                    {education.gpaLabel}
                                </dt>
                                <dd className="font-display text-2xl font-bold lg:text-3xl">
                                    <CountUp value={EDUCATION.gpa} />
                                    <span className="text-lg text-white/70">
                                        {" "}/ {EDUCATION.gpaScale}
                                    </span>
                                </dd>
                            </div>
                        </dl>

                        <div className="space-y-6">
                            <p className="leading-7 text-white/80">
                                <HighlightedText
                                    text={education.summary}
                                    phrases={[education.summaryHighlight]}
                                />
                            </p>
                            <a
                                href={programUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-light"
                            >
                                {education.viewProgram}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
