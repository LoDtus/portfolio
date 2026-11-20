import {
    EDUCATION,
    IRDOP,
    LIFETEX,
    PROFILE,
    PROJECTS,
    UDATA,
} from "@/features/portfolio/constants/profile.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import {
    attachPhotoAlts,
    attachProjectTexts,
} from "@/features/portfolio/utils/experience.utils";
import { formatMonthRange } from "@/features/portfolio/utils/period.utils";

const PRESENT = "nay";

// Thời gian của một dự án cá nhân theo thứ tự khai báo trong PROJECTS.
function projectPeriod(index: number): string | null {
    const project = PROJECTS[index];
    if (project === undefined) return null;
    return formatMonthRange(project.startedAt, project.endedAt, PRESENT);
}

const CONTENT_VI: PortfolioContent = {
    locale: "vi",
    meta: {
        title: `${PROFILE.name} | Lập trình viên Fullstack`,
        description:
            "Long Nguyen, lập trình viên Fullstack tại Hà Nội: Next.js, NestJS, FastAPI, Docker. Kinh nghiệm tại Udata, IRDOP, Lifetex và các dự án đã triển khai.",
        jobTitle: "Lập trình viên Fullstack",
    },
    ui: {
        tagline: "Portfolio",
        skipToContent: "Bỏ qua điều hướng, tới nội dung chính",
        navLabel: "Điều hướng chính",
        menuOpen: "Mở menu",
        menuClose: "Đóng menu",
        contactCta: "Liên hệ",
        languageLabel: "Ngôn ngữ",
        stackLabel: "Công nghệ sử dụng",
        roleLabel: "Số lượng thành viên và vai trò",
        periodLabel: "Thời gian thực hiện",
        linkLabels: {
            website: "Trang web",
            googlePlay: "Google Play",
            appStore: "App Store",
            youtube: "YouTube",
            github: "GitHub",
        },
    },
    nav: {
        about: "Giới thiệu",
        skills: "Kỹ năng",
        education: "Học vấn",
        experience: "Kinh nghiệm",
        projects: "Dự án",
        contact: "Liên hệ",
    },
    hero: {
        eyebrow: "Portfolio · Lập trình viên Fullstack",
        name: PROFILE.name,
        role: "Fullstack · Triển khai · Vận hành",
        headline:
            "Tôi xây dựng và triển khai sản phẩm web, từ giao diện đến hạ tầng chạy thật.",
        summary:
            "Công nghệ thông tin, Đại học Thăng Long (2021 – 2026). Làm việc với Next.js, React, NestJS, FastAPI; đóng gói bằng Docker và chạy trên Cloudflare.",
        primaryCta: "Xem dự án",
        secondaryCta: "Liên hệ",
        photoAlt: "Chân dung Long Nguyen",
    },
    about: {
        title: "Giới thiệu",
        description:
            "Tóm tắt nhanh để bạn nắm được tôi là ai và đang làm gì.",
        paragraphs: [
            `Tôi học ngành Công nghệ thông tin tại Đại học Thăng Long trong giai đoạn ${EDUCATION.startYear} – ${EDUCATION.endYear} với GPA ${EDUCATION.gpa}/${EDUCATION.gpaScale}.`,
            "Tôi làm việc ở cả hai đầu của một sản phẩm: giao diện (Next.js, React, React Native) và dịch vụ phía sau (NestJS, FastAPI, Spring Boot), cùng cách đóng gói, triển khai, vận hành bằng Docker, Nginx và Cloudflare.",
        ],
        facts: [
            {
                value: `${EDUCATION.startYear} – ${EDUCATION.endYear}`,
                label: "Đại học Thăng Long · Công nghệ thông tin",
            },
            {
                value: `${EDUCATION.gpa} / ${EDUCATION.gpaScale}`,
                label: "GPA",
            },
            {
                value: String(PROJECTS.length),
                label: "Dự án đã thực hiện",
            },
        ],
    },
    skills: {
        title: "Kỹ năng",
        description:
            "Nhóm theo vai trò trong một sản phẩm web. Chỉ liệt kê công nghệ tôi đã dùng trong dự án thật.",
        groups: {
            languages: "Ngôn ngữ",
            frontend: "Frontend",
            backend: "Backend",
            deploy: "Triển khai",
            tools: "Các công cụ khác",
            soft: "Kỹ năng mềm",
        },
        softSkills: [
            "TOEIC 565",
            "Nas Synology",
            "Postman",
            "Figma",
            "Microsoft Office",
            "Adobe",
            "CapCut",
            "ElevenLabs",
            "Google Flows",
            "Chủ động trong công việc",
            "Phối hợp làm việc nhóm",
            "Tự học và tra cứu",
            "Có kinh nghiệm làm việc với các nghiệp vụ phức tạp của nhà máy, kiểm nghiệm, kiểm định, y tế",
        ],
    },
    education: {
        title: "Học vấn",
        description:
            "Chương trình đào tạo ứng dụng thực tiễn tại trường đại học ngoài công lập đầu tiên của Việt Nam.",
        school: "Trường Đại học Thăng Long",
        major: "Công nghệ thông tin",
        majorLabel: "Ngành",
        periodLabel: "Thời gian",
        gpaLabel: "GPA",
        summary:
            "Trường đại học ngoài công lập đầu tiên tại Việt Nam, với gần 40 năm tiên phong đào tạo ứng dụng thực tiễn.",
        photoAlt: "Sinh viên Đại học Thăng Long trong lễ tốt nghiệp",
        viewProgram: "Xem ngành học",
    },
    experience: {
        title: "Kinh nghiệm",
        description: "Nơi tôi đã làm việc và những gì tôi đã đóng góp.",
        entries: [
            {
                ...UDATA,
                role: "Lập trình viên Fullstack",
                period: formatMonthRange(UDATA.startedAt, UDATA.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(UDATA.photos, [
                    "Lễ ký kết biên bản ghi nhớ của Udata",
                    "Ảnh nhóm tại hiện trường, phía sau có biển hiệu Udata",
                    "Ảnh nhóm kỹ sư tại hiện trường, phía sau có biển hiệu Udata",
                ]),
                projects: attachProjectTexts(UDATA.projects, {
                    "uboard-esg": {
                        name: "Uboard ESG",
                        summary: null,
                        highlights: [],
                    },
                    uleadgen: {
                        name: "UleadGen",
                        summary: null,
                        highlights: [],
                    },
                    ugate: {
                        name: "Ugate",
                        summary: null,
                        highlights: [],
                    },
                }),
            },
            {
                ...IRDOP,
                role: "Lập trình viên Fullstack",
                period: formatMonthRange(IRDOP.startedAt, IRDOP.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(IRDOP.photos, [
                    "Ảnh tập thể tại lễ kỷ niệm 10 năm thành lập IRDOP",
                    "Ảnh chụp tại sự kiện Giáng sinh của IRDOP",
                    "Ảnh tập thể đội ngũ IRDOP trong khung chúc mừng năm mới",
                ]),
                projects: attachProjectTexts(IRDOP.projects, {
                    "internal-erp": {
                        name: "Hệ thống ERP quản lý doanh nghiệp nội bộ",
                        summary: null,
                        highlights: [
                            "Phát triển và nâng cấp các module ERP phục vụ quản lý hồ sơ kiểm nghiệm, lưu trữ tài liệu, xác thực dữ liệu và các nghiệp vụ kế toán nội bộ.",
                            "Đồng bộ các thao tác của kiểm nghiệm viên trên các thiết bị y tế, các thiết bị IoT và đồng bộ dữ liệu, backup, audit lên NAS Synology và hệ thống quản lý.",
                            "Tích hợp Gemini AI để tự động hóa xử lý tài liệu, nhận diện chữ viết tay và nhận diện con người từ video.",
                        ],
                    },
                }),
            },
            {
                ...LIFETEX,
                role: "Thực tập sinh Frontend",
                period: formatMonthRange(LIFETEX.startedAt, LIFETEX.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(LIFETEX.photos, [
                    "Ảnh tập thể đội ngũ tại Lifetex",
                ]),
                projects: attachProjectTexts(LIFETEX.projects, {
                    "life-office": {
                        name: "Life Office",
                        summary: null,
                        highlights: [
                            "Tham gia phát triển module quản lý văn phòng, quản lý tài sản và theo dõi phương tiện trên nền tảng di động.",
                            "Tích hợp Google Maps API để hiển thị bản đồ và chỉ đường cho người dùng.",
                        ],
                    },
                }),
            },
        ],
        pendingNote:
            "Vị trí, thời gian và đóng góp tại đây đang được cập nhật.",
        projectsLabel: "Các dự án đã tham gia",
        gallery: {
            prev: "Ảnh trước",
            next: "Ảnh sau",
            bullet: "Xem ảnh {{index}}",
        },
    },
    projects: {
        title: "Dự án",
        description:
            "Các sản phẩm tôi xây dựng và triển khai, xếp từ gần nhất đến xa nhất.",
        items: {
            "location-insight": {
                name: "Location Insight",
                summary: null,
                highlights: [],
                role: "1 người – Fullstack",
                period: projectPeriod(0),
            },
            vinfastreev: {
                name: "Vinfastreev",
                summary:
                    "Website giới thiệu, tư vấn xe điện cho các showroom Vinfast tại Hà Nội. Khách hàng có thể xem danh mục các xe, lựa chọn, so sánh, theo dõi các tin tức mới nhất và đăng ký tham gia lái thử. Nội dung do đại lý tự quản trị và đăng tải. Dự án được triển khai trên VPS, AWS Lightsail qua Cloudflare Tunnel, CI/CD bằng GitHub Actions và Docker, giám sát bằng Sentry, Better Stack và hệ thống cảnh báo, báo cáo hằng ngày qua Telegram.",
                highlights: [
                    "Phục vụ khoảng 50 người và khoảng 200 lượt truy cập mỗi ngày, trung bình có khoảng 10 lead mỗi tháng.",
                ],
                role: "1 người – Fullstack",
                period: projectPeriod(1),
            },
            "affiliate-product-catalog": {
                name: "Affiliate Product Catalog",
                summary:
                    "Nền tảng giúp người dùng so sánh giá và thông tin của một sản phẩm từ nhiều sàn thương mại điện tử khác nhau, đồng thời gợi ý giúp người dùng chọn mua sản phẩm và kiếm được tiền từ affiliate.",
                highlights: [],
                role: "1 người – Fullstack",
                period: projectPeriod(2),
            },
            "city-incidents-management-system": {
                name: "City Incidents Management System",
                summary:
                    "Ứng dụng hỗ trợ người dân và các cơ quan, tổ chức có thể theo dõi, báo cáo và xử lý các sự cố diễn ra xung quanh khu vực sinh sống theo thời gian thực.",
                highlights: [],
                role: "Phát triển cá nhân – Lên ý tưởng, viết tài liệu và phát triển toàn bộ dự án.",
                period: projectPeriod(3),
            },
        },
    },
    contact: {
        title: "Cùng làm việc",
        description:
            "Bạn đang tuyển dụng hoặc muốn trao đổi về một dự án? Liên hệ với tôi qua bất kỳ kênh nào dưới đây.",
        channelsLabel: "Kênh liên hệ",
        channels: {
            zalo: { label: "Zalo" },
            phone: { label: "Điện thoại" },
            email: { label: "Gmail" },
            github: { label: "GitHub" },
            facebook: { label: "Facebook" },
            linkedin: { label: "LinkedIn" },
            address: { label: "Địa chỉ" },
        },
    },
    footer: {
        credit: `Logo và ảnh tốt nghiệp thuộc ${EDUCATION.schoolName} (thanglong.edu.vn). Logo và ảnh của Udata, IRDOP, Lifetex thuộc các đơn vị tương ứng.`,
        builtWith: "Xây dựng bằng Next.js và Tailwind CSS.",
    },
};

export default CONTENT_VI;
