"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import {
    GALLERY_AUTOPLAY_DELAY_MS,
    GALLERY_SLIDE_SPEED_MS,
} from "@/features/portfolio/constants/experience.constants";
import { useSwiperAutoplay } from "@/features/portfolio/hooks/use-swiper-autoplay";
import type { ExperiencePhoto } from "@/features/portfolio/types/portfolio.types";
import { usePrefersMotion } from "@/shared/hooks/use-prefers-motion";

const SLIDE_GAP_PX = 12;

// Ảnh của trường dạng slide: mỗi lần một ảnh, chấm phân trang bên dưới, lặp vòng và tự chuyển ảnh giống mục Kinh nghiệm.
// Khung phủ kín cột bên trái (ảnh cắt theo khung bằng object-cover). Ô `.reveal` nằm NGOÀI Swiper vì `.swiper` có overflow hidden.
export default function EducationSlider({
    photos,
    labels,
}: {
    photos: readonly ExperiencePhoto[];
    labels: { prev: string; next: string; bullet: string };
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const prefersMotion = usePrefersMotion();

    const hasSlides = photos.length > 1;
    useSwiperAutoplay({
        swiper,
        containerRef,
        isAutoplay: hasSlides && prefersMotion,
        offsetMs: 0,
    });

    if (photos.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="reveal reveal-left relative min-h-72 lg:min-h-[30rem]"
        >
            <Swiper
                modules={[A11y, Autoplay, Keyboard, Pagination]}
                onSwiper={setSwiper}
                loop={hasSlides}
                speed={GALLERY_SLIDE_SPEED_MS}
                spaceBetween={SLIDE_GAP_PX}
                slidesPerView={1}
                autoplay={{
                    delay: GALLERY_AUTOPLAY_DELAY_MS,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true, onlyInViewport: true }}
                a11y={{
                    prevSlideMessage: labels.prev,
                    nextSlideMessage: labels.next,
                    paginationBulletMessage: labels.bullet,
                }}
                className="photo-swiper absolute inset-0 size-full"
                style={{ "--photos-per-view": 1 } as CSSProperties}
            >
                {photos.map((photo) => (
                    <SwiperSlide key={photo.src}>
                        <div className="relative size-full overflow-hidden bg-muted">
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                style={
                                    photo.position === undefined
                                        ? undefined
                                        : { objectPosition: photo.position }
                                }
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
