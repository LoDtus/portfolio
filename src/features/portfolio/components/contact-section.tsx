import { Download } from "lucide-react";
import ContactChannelCard from "@/features/portfolio/components/contact-channel-card";
import ContactCopyCard from "@/features/portfolio/components/contact-copy-card";
import {
    CONTACT_CHANNELS,
    CV_FILES,
} from "@/features/portfolio/constants/profile.constants";
import { REVEAL_DELAY_CLASSES } from "@/features/portfolio/constants/reveal.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import { localizeContactChannel } from "@/features/portfolio/utils/contact-channel.utils";
import { keepWordsTogether } from "@/features/portfolio/utils/no-break.utils";
import { locales } from "@/shared/constants/i18n.constants";

export default function ContactSection({ content }: { content: PortfolioContent }) {
    const { contact } = content;
    // Bản CV cùng ngôn ngữ với trang đứng đầu, bản còn lại đứng sau.
    const cvLocales = [content.locale, ...locales.filter((item) => item !== content.locale)];
    const channels = CONTACT_CHANNELS.map((channel) =>
        localizeContactChannel(channel, contact.channels[channel.id]),
    );

    return (
        <section
            id="contact"
            aria-labelledby="contact-title"
            className="bg-band py-20 text-white lg:py-28"
        >
            <div className="site-container">
                <div className="max-w-4xl">
                    <div className="print-keep-next reveal reveal-left">
                        <div className="mb-8 flex items-stretch gap-4">
                            <span
                                aria-hidden="true"
                                className="reveal-bar w-1 shrink-0 bg-brand-peach"
                            />
                            <h2
                                id="contact-title"
                                className="font-display text-4xl font-bold leading-tight lg:text-5xl"
                            >
                                {contact.title}
                            </h2>
                        </div>
                        <p className="max-w-2xl text-balance text-lg leading-8 text-white/80">
                            {keepWordsTogether(contact.description)}
                        </p>
                    </div>

                    <ul
                        aria-label={contact.channelsLabel}
                        className="mt-10 grid gap-3 sm:grid-cols-2"
                    >
                        {channels.map((channel, index) => (
                            <li
                                key={channel.id}
                                className={`reveal min-w-0 sm:[&:last-child:nth-child(odd)]:col-span-2 ${REVEAL_DELAY_CLASSES[index % 2]}`}
                            >
                                {channel.copyText === null ? (
                                    <ContactChannelCard
                                        channel={channel}
                                        label={contact.channels[channel.id].label}
                                    />
                                ) : (
                                    <ContactCopyCard
                                        channel={channel}
                                        copyText={channel.copyText}
                                        label={contact.channels[channel.id].label}
                                        hint={contact.copyHint}
                                        copiedLabel={contact.copied}
                                        failedLabel={contact.copyFailed}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Khối tải CV tách riêng bằng đường kẻ, tiêu đề và nút đặc có biểu tượng tải xuống, để không bị nhầm là một kênh liên hệ. */}
                    <div className="print-keep reveal mt-12 border-t border-white/20 pt-8">
                        <h3 className="font-display text-2xl font-bold">{contact.cv.title}</h3>
                        <p className="mt-2 text-white/75">{contact.cv.description}</p>
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            {cvLocales.map((fileLocale, index) => {
                                const file = CV_FILES[fileLocale];
                                const text = contact.cv.files[fileLocale];
                                return (
                                    <a
                                        key={fileLocale}
                                        href={file.href}
                                        download={file.fileName}
                                        type="application/pdf"
                                        title={text.title}
                                        className={`btn ${index === 0 ? "btn-light" : "btn-on-dark"}`}
                                    >
                                        <Download aria-hidden="true" className="size-5" />
                                        {text.label}
                                        <span
                                            aria-hidden="true"
                                            className="text-xs font-bold tracking-wider opacity-70"
                                        >
                                            PDF
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
