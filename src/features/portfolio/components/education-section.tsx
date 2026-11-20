import Image from "next/image";
import SectionHeading from "@/features/portfolio/components/section-heading";
import { EDUCATION } from "@/features/portfolio/constants/profile.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";

// Khối số liệu theo thanglong.edu.vn ("Những con số ấn tượng"): ảnh bên trái, panel indigo bên phải.
// Logo dùng nguyên bản (bản màu) trên nền trắng, rộng 140px, có vùng an toàn xung quanh (tối thiểu theo cẩm nang là 60px).
export default function EducationSection({ content }: { content: PortfolioContent }) {
    const { education } = content;

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
                    <div className="reveal reveal-left relative min-h-72 lg:min-h-[30rem]">
                        <Image
                            src={EDUCATION.photo}
                            alt={education.photoAlt}
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover object-[50%_30%]"
                        />
                    </div>

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
                                    {EDUCATION.startYear} – {EDUCATION.endYear}
                                </dd>
                            </div>
                            <div className="reveal reveal-zoom reveal-d2 flex flex-col-reverse bg-band py-5 sm:p-5">
                                <dt className="text-sm text-white/70">
                                    {education.gpaLabel}
                                </dt>
                                <dd className="font-display text-2xl font-bold lg:text-3xl">
                                    {EDUCATION.gpa}
                                    <span className="text-lg text-white/70">
                                        {" "}/ {EDUCATION.gpaScale}
                                    </span>
                                </dd>
                            </div>
                        </dl>

                        <div className="space-y-6">
                            <p className="leading-7 text-white/80">{education.summary}</p>
                            <a
                                href={EDUCATION.majorUrl}
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
