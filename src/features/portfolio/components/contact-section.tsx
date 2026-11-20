import ContactChannelCard from "@/features/portfolio/components/contact-channel-card";
import GeometricMosaic from "@/features/portfolio/components/geometric-mosaic";
import { CONTACT_CHANNELS } from "@/features/portfolio/constants/profile.constants";
import { REVEAL_DELAY_CLASSES } from "@/features/portfolio/constants/reveal.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";

export default function ContactSection({ content }: { content: PortfolioContent }) {
    const { contact } = content;

    return (
        <section
            id="contact"
            aria-labelledby="contact-title"
            className="bg-band py-20 text-white lg:py-28"
        >
            <div className="site-container grid items-start gap-12 lg:grid-cols-[1.4fr_0.6fr]">
                <div>
                    <div className="reveal reveal-left">
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
                        <p className="max-w-xl text-lg leading-8 text-white/80">
                            {contact.description}
                        </p>
                    </div>

                    <ul
                        aria-label={contact.channelsLabel}
                        className="mt-10 grid gap-3 sm:grid-cols-2"
                    >
                        {CONTACT_CHANNELS.map((channel, index) => (
                            <li
                                key={channel.id}
                                className={`reveal min-w-0 ${REVEAL_DELAY_CLASSES[index % 2]}`}
                            >
                                <ContactChannelCard
                                    channel={channel}
                                    label={contact.channels[channel.id].label}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <GeometricMosaic
                    variant="gamma"
                    rows={4}
                    className="reveal reveal-pop reveal-d1 mx-auto hidden aspect-square w-full max-w-xs lg:block"
                />
            </div>
        </section>
    );
}
