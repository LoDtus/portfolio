import {
    EDUCATION,
    EXPERIENCE_YEARS,
    IRDOP,
    LIFETEX,
    PARTICIPATED_PROJECTS,
    PROJECTS,
    UDATA,
} from "@/features/portfolio/constants/profile.constants";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio.types";
import {
    attachPhotoAlts,
    attachProjectTexts,
} from "@/features/portfolio/utils/experience.utils";
import { formatMonthRange } from "@/features/portfolio/utils/period.utils";
import { describeSchoolAge } from "@/features/portfolio/utils/school-age.utils";

const PRESENT = "nay";

// "hơn 40 năm" / "gần 50 năm" / "40 năm", tính theo năm hiện tại lúc build (xem describeSchoolAge).
function schoolAgePhrase(): string {
    const { qualifier, years } = describeSchoolAge(
        EDUCATION.foundedYear,
        new Date().getFullYear(),
    );
    if (qualifier === "over") return `hơn ${years} năm`;
    if (qualifier === "nearly") return `gần ${years} năm`;
    return `${years} năm`;
}
const SCHOOL_AGE = schoolAgePhrase();

// Thời gian của một dự án cá nhân theo thứ tự khai báo trong PROJECTS.
function projectPeriod(index: number): string | null {
    const project = PROJECTS[index];
    if (project === undefined) return null;
    return formatMonthRange(project.startedAt, project.endedAt, PRESENT);
}

const CONTENT_VI: PortfolioContent = {
    locale: "vi",
    meta: {
        title: "Nguyễn Trung Long | Lập trình viên Fullstack & AI tại Hà Nội",
        description:
            "Portfolio của Nguyễn Trung Long (Long Nguyen), lập trình viên Fullstack tại Hà Nội, xây dựng phần mềm ứng dụng AI cho nhà máy, sản xuất, kiểm nghiệm và y tế. Next.js, NestJS, FastAPI.",
        jobTitle: "Lập trình viên Fullstack",
    },
    ui: {
        switchLanguage: "Chuyển sang tiếng Anh",
        topBarLabel: "Thông tin liên hệ nhanh",
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
            website: "Website",
            googlePlay: "Google Play",
            appStore: "App Store",
            youtube: "YouTube",
            github: "GitHub",
        },
    },
    nav: {
        about: "Giới thiệu",
        skills: "Năng lực",
        education: "Học vấn",
        experience: "Kinh nghiệm",
        projects: "Dự án",
        references: "Tham chiếu",
        contact: "Liên hệ",
    },
    hero: {
        eyebrow: "Portfolio · Technology & Engineering",
        // Tiêu đề hero dùng tên đầy đủ có dấu; thanh điều hướng và chân trang vẫn dùng PROFILE.name.
        name: "Nguyễn Trung Long",
        role: "Technology · Software · Engineering · Product & Business",
        intro:
            "Tôi định hướng phát triển theo hướng kết hợp giữa công nghệ, AI, kỹ thuật, tư duy sản phẩm và kinh doanh. Tôi quan tâm đến cách vận dụng những yếu tố này để xây dựng sản phẩm có giá trị, tối ưu hoạt động và giải quyết các vấn đề thực tiễn.",
        primaryCta: "Xem các dự án của tôi",
        secondaryCta: "Liên hệ",
        photoAlt: "Chân dung Nguyễn Trung Long",
        introHighlight: "công nghệ, AI, kỹ thuật, tư duy sản phẩm và kinh doanh",
    },
    about: {
        title: "Giới thiệu",
        description:
            "Đôi nét về tôi, những gì tôi đã làm và những điều tôi muốn hướng tới trong tương lai.",
        paragraphs: [
            "Tôi có nền tảng Công nghệ thông tin và kinh nghiệm phát triển sản phẩm phần mềm từ khâu thiết kế đến triển khai thực tế, với thế mạnh và kinh nghiệm về Fullstack Development, ứng dụng AI vào quy trình làm việc, tích hợp hệ thống và triển khai hạ tầng.",
            "Tôi quan tâm đến việc hiểu rõ bản chất vấn đề, nhu cầu nghiệp vụ cũng như những khó khăn thực tế của khách hàng và doanh nghiệp. Với tư duy hệ thống cùng khả năng phân tích, tôi luôn muốn tìm kiếm những giải pháp phù hợp nhằm tối ưu quy trình, nâng cao hiệu suất và tạo ra giá trị có lợi cho người dùng.",
            "Mong muốn của tôi là tìm hiểu, tham gia và phát triển trong nhiều lĩnh vực khác nhau, từ công nghệ, AI, kỹ thuật đến sản phẩm và kinh doanh. Tôi luôn sẵn sàng học hỏi, bắt đầu với những vai trò và hướng đi mới, đào sâu vào chuyên môn hiện tại, đóng góp và giải quyết những bài toán trong từng lĩnh vực.",
        ],
        highlights: ["Fullstack Development"],
        facts: [
            {
                value: `${EDUCATION.startYear} - ${EDUCATION.endYear}`,
                label: "Đại học Thăng Long · Công nghệ thông tin",
            },
            {
                value: `${EDUCATION.gpa} / ${EDUCATION.gpaScale}`,
                label: "GPA",
            },
            {
                value: EXPERIENCE_YEARS,
                label: "Năm kinh nghiệm",
            },
            {
                value: PARTICIPATED_PROJECTS,
                label: "Dự án đã tham gia",
            },
        ],
    },
    skills: {
        title: "Năng lực",
        description:
            "Những kỹ năng, công nghệ và kiến thức tôi đã tích lũy qua quá trình học tập, làm việc và phát triển sản phẩm thực tế.",
        groups: {
            languages: "Ngôn ngữ lập trình",
            frontend: "Frontend",
            backend: "Backend",
            database: "Cơ sở dữ liệu",
            deploy: "Triển khai & Vận hành",
            tools: "Công cụ phát triển",
            design: "Thiết kế & Nội dung",
            soft: "Kỹ năng mềm",
        },
        softSkills: [
            "Tiếng Anh (TOEIC 565)",
            "Chủ động trong công việc",
            "Tự học và tra cứu",
            "Phối hợp làm việc nhóm",
            "Có kinh nghiệm xử lý và làm việc với nghiệp vụ, quy trình của nhà máy, cơ sở sản xuất, kiểm nghiệm, kiểm định, y tế",
        ],
    },
    education: {
        title: "Học vấn",
        description:
            "Nền tảng học tập, chuyên ngành và những kiến thức tôi đã tích lũy trong quá trình học đại học.",
        school: "Trường Đại học Thăng Long",
        major: "Công nghệ thông tin",
        majorLabel: "Ngành",
        periodLabel: "Thời gian",
        gpaLabel: "GPA",
        summary: `Trường đại học ngoài công lập đầu tiên tại Việt Nam, với ${SCHOOL_AGE} tiên phong đào tạo ứng dụng thực tiễn.`,
        photoAlts: [
            "Sinh viên Đại học Thăng Long trong lễ tốt nghiệp",
            "Sinh viên thực hành tại phòng máy tính của thư viện Đại học Thăng Long",
            "Nhóm sinh viên Đại học Thăng Long thảo luận trong giờ học nhóm",
        ],
        viewProgram: "Xem ngành học",
    },
    experience: {
        title: "Kinh nghiệm",
        description:
            "Những nơi tôi từng làm việc tiêu biểu nhất, các vai trò đã đảm nhận và những đóng góp của tôi.",
        entries: [
            {
                ...UDATA,
                company: "Công ty cổ phần Udata",
                role: "Lập trình viên Fullstack",
                period: formatMonthRange(UDATA.startedAt, UDATA.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(UDATA.photos, [
                    "Lễ ký kết biên bản ghi nhớ hợp tác (Bao gồm có Lại Vân Anh, Hà Pie - Phạm Khánh Hà)",
                    "Ảnh nhóm tại hiện trường triển khai dự án",
                    "Ảnh nhóm kỹ sư tại hiện trường triển khai dự án",
                ]),
                projects: attachProjectTexts(UDATA.projects, {
                    "uboard-esg": {
                        name: "Uboard ESG - Hệ thống kiểm kê khí thải carbon cho nhà máy",
                        summary:
                            "Nền tảng kiểm kê và báo cáo khí nhà kính (carbon, ESG) cho doanh nghiệp sản xuất công nghiệp, tập trung vào nhà máy xi măng.",
                        highlights: [
                            "Tự động hóa quy trình nhập liệu, đối soát, kiểm tra và xác thực dữ liệu phát thải Scope 1-2 theo danh mục Quyết định 2626, hỗ trợ quản lý, truy vết và giải trình số liệu kiểm kê.",
                            "Xây dựng hệ thống phân quyền động DRBAC theo vai trò và đơn vị, tích hợp SSO; thiết kế kiến trúc multi-tenant với lõi dùng chung và khả năng triển khai độc lập cho từng tổ chức.",
                        ],
                    },
                    uleadgen: {
                        name: "UleadGen - Nền tảng AI chăm sóc khách hàng",
                        summary:
                            "Doanh nghiệp tải tài liệu hoặc thu thập nội dung website, rồi nhúng widget chat vào trang của mình. Agent trả lời dựa trên nội dung thật và có trích dẫn nguồn.",
                        highlights: [
                            "Xây dựng tính năng trò chuyện và chấm điểm khách hàng tiềm năng, cùng với cơ chế bàn giao khách hàng tự động tới sales phù hợp.",
                            "Phát triển tính năng gọi thoại thời gian thực từ Website tới Zalo và Facebook Messenger, chuyển lời thoại thành tin nhắn.",
                        ],
                    },
                    ugate: {
                        name: "Ugate - AI Agent giám sát kho vận & quản lý dòng tiền cho doanh nghiệp",
                        summary:
                            "Nền tảng AI hợp nhất dữ liệu từ ERP, kho, kế toán và email để cảnh báo sớm rủi ro thiếu hụt dòng tiền, hàng tồn đọng và đứt hàng. Mục tiêu là giúp CEO/CFO nắm tình hình trong vài phút thay vì mất hàng giờ tổng hợp từ nhiều hệ thống.",
                        highlights: [
                            "Thiết kế và phát triển API Gateway cho hệ thống multi-tenant SaaS, xử lý routing và điều phối các dịch vụ ERP, AI analytics và các modules tài chính.",
                            "Xây dựng giao diện quản trị tập trung, trực quan hóa dữ liệu qua dashboard, biểu đồ và hệ thống cảnh báo; tích hợp AI Agent, hỗ trợ doanh nghiệp khai thác thông tin, theo dõi hoạt động và quản lý từ nhiều nguồn dữ liệu khác nhau.",
                        ],
                    },
                }),
            },
            {
                ...IRDOP,
                company: "Viện nghiên cứu và phát triển sản phẩm thiên nhiên (IRDOP)",
                role: "Lập trình viên Fullstack",
                period: formatMonthRange(IRDOP.startedAt, IRDOP.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(IRDOP.photos, [
                    "Ảnh tập thể tại lễ kỷ niệm 10 năm thành lập",
                    "Ảnh chụp tại sự kiện Giáng sinh",
                    "Ảnh tập thể đội ngũ trong khung chúc mừng năm mới",
                ]),
                projects: attachProjectTexts(IRDOP.projects, {
                    "internal-erp": {
                        name: "Hệ thống ERP quản lý doanh nghiệp nội bộ",
                        summary: null,
                        highlights: [
                            "Phát triển và nâng cấp các module ERP phục vụ quy trình kiểm nghiệm trong lĩnh vực dược phẩm: quản lý hồ sơ kiểm nghiệm theo ISO/IEC 17025, lưu trữ và xác thực tài liệu, cùng các nghiệp vụ hỗ trợ kế toán nội bộ.",
                            "Tích hợp các dịch vụ AI để xử lý văn bản, nhận dạng chữ viết tay (OCR) và phát hiện người trong video.",
                            "Đồng bộ các thao tác của kiểm nghiệm viên trên các thiết bị y tế, các thiết bị IoT và đồng bộ dữ liệu, backup lên NAS Synology và hệ thống quản lý.",
                            "Triển khai và cấu hình hạ tầng nội bộ với Tailscale, Headscale và NAS Synology cho kết nối mạng, lưu trữ và chia sẻ dữ liệu.",
                            "Hệ thống phục vụ hơn 80 người dùng nội bộ và cộng tác viên bên ngoài, góp phần tự động hóa quy trình quản lý tài liệu, hồ sơ mẫu, giảm quy mô nhân sự vận hành thủ công từ 5 người xuống còn 1 người, đồng thời nâng cao hiệu quả xử lý và giảm sai sót nhập liệu.",
                        ],
                    },
                }),
            },
            {
                ...LIFETEX,
                company: "Công ty cổ phần LifeteX",
                role: "Thực tập sinh Frontend",
                period: formatMonthRange(LIFETEX.startedAt, LIFETEX.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(LIFETEX.photos, [
                    "Ảnh tập thể đội ngũ tại nơi làm việc",
                ]),
                projects: attachProjectTexts(LIFETEX.projects, {
                    "life-office": {
                        name: "Life Office - Hệ thống quản trị doanh nghiệp của Công ty Môi trường đô thị Hà Nội Urenco",
                        summary: null,
                        highlights: [
                            "Phát triển các module trên ứng dụng di động phục vụ quản lý văn bản, tài sản và theo dõi phương tiện.",
                            "Tích hợp Google Maps API để hiển thị bản đồ, tìm đường và dẫn đường.",
                            "Xây dựng tính năng theo dõi lịch làm việc cá nhân.",
                            "Build và phát hành ứng dụng lên App Store và Google Play.",
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
        title: "Dự án cá nhân",
        description:
            "Những sản phẩm và giải pháp tiêu biểu nhất mà tôi từng tham gia xây dựng, phát triển hoặc trực tiếp triển khai.",
        moreLabel: "Xem thêm dự án khác trên GitHub",
        items: {
            "location-insight": {
                name: "Location Insight - Nền tảng phân tích và định giá bất động sản",
                summary:
                    "Nền tảng bất động sản kết hợp phân tích vị trí trên bản đồ, ước lượng khoảng giá và cho phép người dùng rao bán/cho thuê. Người mua xem được ưu nhược điểm của các bất động sản dựa trên dữ liệu thực tế và có thể tìm kiếm, tham khảo các tin đang rao bán.",
                facts: [],
                role: "1 người - Fullstack",
                period: projectPeriod(0),
            },
            vinfastreev: {
                name: "Vinfastreev - Website showroom xe điện VinFast",
                summary:
                    "Website giới thiệu, tư vấn xe điện cho các showroom Vinfast tại Hà Nội. Khách hàng có thể xem danh mục các xe, lựa chọn, so sánh, theo dõi các tin tức mới nhất và đăng ký tham gia lái thử. Đồng thời, quản trị viên có thể tự cập nhật các thông tin và theo dõi khách hàng tiềm năng qua CMS.",
                facts: [
                    {
                        label: "Số liệu thực tế",
                        value: "phục vụ khoảng 50 người, khoảng 200 lượt truy cập mỗi ngày, trung bình khoảng 10 lead mỗi tháng",
                    },
                ],
                role: "1 người - Fullstack",
                period: projectPeriod(1),
            },
            "affiliate-product-catalog": {
                name: "Website gợi ý và điều hướng sản phẩm thương mại điện tử",
                summary:
                    "Nền tảng giúp người dùng so sánh giá và thông tin của một sản phẩm từ nhiều sàn thương mại điện tử khác nhau, đồng thời gợi ý giúp người dùng chọn mua sản phẩm và kiếm được tiền từ affiliate.",
                facts: [],
                role: "1 người - Fullstack",
                period: projectPeriod(2),
            },
            "city-incidents-management-system": {
                name: "CIMS - Website quản lý sự cố trong thành phố",
                summary:
                    "Ứng dụng hỗ trợ người dân và các cơ quan, tổ chức có thể theo dõi, báo cáo và xử lý các sự cố diễn ra xung quanh khu vực sinh sống theo thời gian thực.",
                facts: [],
                role: "1 người - Fullstack",
                period: projectPeriod(3),
            },
        },
    },
    references: {
        title: "Người tham chiếu",
        description:
            "Những người từng làm việc cùng tôi và có thể chia sẻ thêm về năng lực cũng như quá trình làm việc của tôi.",
        contactLabel: "Liên hệ",
        emailLabel: "Email",
        phoneLabel: "Điện thoại",
        linksLabel: "Liên kết",
        items: {
            "nguyen-huy-toan": {
                role: "Giám đốc Công nghệ (CTO), Verysell AI & SmartDev",
                summary: null,
                highlights: [
                    "CTO tại Verysell AI (05/2025 - nay) và SmartDev (11/2025 - nay), hai công ty công nghệ thuộc Verysell Group (Thụy Sĩ).",
                    "Tại SmartDev, định hướng xây dựng công ty phát triển phần mềm ứng dụng AI tại Việt Nam, tối ưu hiệu suất vận hành và mang lại giá trị đo lường được cho khách hàng trong toàn bộ vòng đời phát triển phần mềm, từ ý tưởng đến bàn giao sản phẩm.",
                    "Dẫn dắt đội ngũ AI Engineering triển khai các giải pháp AI từ giai đoạn Proof of Concept đến vận hành thực tế cho khách hàng tại châu Âu, Trung Đông và khu vực APAC.",
                    "Nhiều năm kinh nghiệm về trí tuệ nhân tạo (AI), Deep Learning và Computer Vision.",
                    "Tiến sĩ Điện tử và Kỹ thuật máy tính, Đại học Quốc gia Chonnam (Hàn Quốc); nghiên cứu sau tiến sĩ 03/2020 - 11/2021, nghiên cứu sinh 03/2015 - 02/2020.",
                ],
                photoAlts: [
                    "Chân dung TS. Nguyễn Huy Toán",
                    "TS. Nguyễn Huy Toán phát biểu trên sân khấu tại một diễn đàn công nghệ",
                ],
            },
            "tran-tien-quan": {
                role: "AI Engineer & Consultant",
                summary: null,
                highlights: [
                    "Giám khảo kỹ thuật tại ASCEND Vietnam 2026 (Singapore) và Swinburne Hackathon.",
                    "Tư vấn và đào tạo AI cho cá nhân, doanh nghiệp.",
                    "Chuyên về AI agent, MCP, tự động hóa quy trình với n8n và Claude.",
                    "Hơn 6 năm xây dựng hệ thống AI chạy thật tại VinBrain, MB Bank và một tập đoàn đa quốc gia của Anh, từ AI y tế đến tự động hóa ngân hàng và GenAI doanh nghiệp.",
                    "Thạc sĩ Khoa học máy tính, Đại học Bách khoa Hà Nội.",
                ],
                photoAlts: ["Chân dung Trần Tiến Quân"],
            },
        },
    },
    contact: {
        title: "Thông tin liên hệ",
        description:
            "Bạn muốn tìm hiểu thêm về tôi hoặc trao đổi về một cơ hội hợp tác? Hãy liên hệ qua các kênh dưới đây hoặc tải xuống CV để xem chi tiết hơn về kinh nghiệm và năng lực của tôi.",
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
        copyHint: "Bấm để sao chép",
        copied: "Đã sao chép",
        copyFailed: "Không sao chép được",
        cv: {
            title: "Tải xuống CV",
            description: "Bản PDF, có sẵn bằng tiếng Việt và tiếng Anh.",
            files: {
                vi: {
                    label: "Tải CV tiếng Việt",
                    title: "Tải xuống CV tiếng Việt (PDF)",
                },
                en: {
                    label: "Tải CV tiếng Anh",
                    title: "Tải xuống CV tiếng Anh (PDF)",
                },
            },
        },
    },
    footer: {
        credit: "Logo và hình ảnh của Đại học Thăng Long và các đơn vị trong mục Kinh nghiệm thuộc về chủ sở hữu tương ứng.",
        builtWith: "Next.js · Tailwind CSS",
    },
};

export default CONTENT_VI;
