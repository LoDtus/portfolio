"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
    GALLERY_AUTOPLAY_DELAY_MS,
    GALLERY_SLIDE_SPEED_MS,
} from "@/features/portfolio/constants/experience.constants";
import { useSwiperAutoplay } from "@/features/portfolio/hooks/use-swiper-autoplay";
import type { ExperiencePhoto } from "@/features/portfolio/types/portfolio.types";
import { usePrefersMotion } from "@/shared/hooks/use-prefers-motion";

const MAX_PHOTOS_PER_VIEW = 2;
const SLIDE_GAP_PX = 12;
// Breakpoint (px) từ đó hiện nhiều ảnh cạnh nhau; dưới đó mỗi lần một ảnh.
const WIDE_BREAKPOINT_PX = 768;

// Bộ ảnh của một nơi làm việc dạng slide (Swiper), lặp vòng và tự chuyển ảnh.
// `autoplayOffsetMs` là độ lệch pha khi bắt đầu tự chạy (để các công ty đổi ảnh xen kẽ nhau); null = không tự chạy.
// Tự chạy chỉ khi bộ ảnh đang hiện trên màn hình, dừng khi rê chuột vào, và tắt hẳn nếu người dùng giảm chuyển động.
// Ô `.reveal` nằm NGOÀI Swiper vì `.swiper` có overflow hidden, nếu để bên trong sẽ làm hỏng timeline cuộn.
export default function ExperienceGallery({
    photos,
    labels,
    autoplayOffsetMs,
}: {
    photos: readonly ExperiencePhoto[];
    labels: { prev: string; next: string; bullet: string };
    autoplayOffsetMs: number | null;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const prefersMotion = usePrefersMotion();

    const hasSlides = photos.length > 1;
    const isAutoplay = hasSlides && autoplayOffsetMs !== null && prefersMotion;
    const offsetMs = autoplayOffsetMs ?? 0;

    useSwiperAutoplay({ swiper, containerRef, isAutoplay, offsetMs });

    if (photos.length === 0) return null;

    // Lặp vòng cần nhiều ảnh hơn số ảnh hiện cùng lúc, nên khi chỉ có 2 ảnh thì hiện một ảnh mỗi lần.
    const wideCount = Math.max(1, Math.min(MAX_PHOTOS_PER_VIEW, photos.length - 1));

    return (
        <div
            ref={containerRef}
            className={`reveal reveal-zoom mt-6 ${wideCount === 1 ? "md:max-w-2xl" : ""}`}
        >
            <Swiper
                modules={[A11y, Autoplay, Keyboard, Navigation, Pagination]}
                onSwiper={setSwiper}
                loop={hasSlides}
                speed={GALLERY_SLIDE_SPEED_MS}
                spaceBetween={SLIDE_GAP_PX}
                slidesPerView={1}
                breakpoints={{ [WIDE_BREAKPOINT_PX]: { slidesPerView: wideCount } }}
                autoplay={{
                    delay: GALLERY_AUTOPLAY_DELAY_MS,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation
                pagination={{ clickable: true }}
                keyboard={{ enabled: true, onlyInViewport: true }}
                a11y={{
                    prevSlideMessage: labels.prev,
                    nextSlideMessage: labels.next,
                    paginationBulletMessage: labels.bullet,
                }}
                className="photo-swiper"
                style={{ "--photos-per-view": wideCount } as CSSProperties}
            >
                {photos.map((photo) => (
                    <SwiperSlide key={photo.src}>
                        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                width={photo.width}
                                height={photo.height}
                                sizes="(min-width: 1024px) 420px, (min-width: 768px) 45vw, 90vw"
                                style={
                                    photo.position === undefined
                                        ? undefined
                                        : { objectPosition: photo.position }
                                }
                                className="size-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
