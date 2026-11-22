import {
    EDUCATION,
    EXPERIENCE_YEARS,
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
import { describeSchoolAge } from "@/features/portfolio/utils/school-age.utils";

const PRESENT = "present";

// "over 40 years" / "nearly 50 years" / "40 years", computed from the current year at build time (see describeSchoolAge).
function schoolAgePhrase(): string {
    const { qualifier, years } = describeSchoolAge(
        EDUCATION.foundedYear,
        new Date().getFullYear(),
    );
    if (qualifier === "over") return `over ${years} years`;
    if (qualifier === "nearly") return `nearly ${years} years`;
    return `${years} years`;
}
const SCHOOL_AGE = schoolAgePhrase();

// Period of a personal project, by its position in PROJECTS.
function projectPeriod(index: number): string | null {
    const project = PROJECTS[index];
    if (project === undefined) return null;
    return formatMonthRange(project.startedAt, project.endedAt, PRESENT);
}

const CONTENT_EN: PortfolioContent = {
    locale: "en",
    meta: {
        title: `${PROFILE.name} | Fullstack Developer`,
        description:
            "Long Nguyen (Nguyễn Trung Long), Fullstack Developer in Hanoi, studied Information Technology at Thang Long University. Next.js, NestJS, FastAPI.",
        jobTitle: "Fullstack Developer",
    },
    ui: {
        switchLanguage: "Switch to Vietnamese",
        topBarLabel: "Quick contact details",
        skipToContent: "Skip navigation, go to main content",
        navLabel: "Main navigation",
        menuOpen: "Open menu",
        menuClose: "Close menu",
        contactCta: "Contact",
        languageLabel: "Language",
        stackLabel: "Tech stack",
        roleLabel: "Team size and role",
        periodLabel: "Duration",
        linkLabels: {
            website: "Website",
            googlePlay: "Google Play",
            appStore: "App Store",
            youtube: "YouTube",
            github: "GitHub",
        },
    },
    nav: {
        about: "About",
        skills: "Skills",
        education: "Education",
        experience: "Experience",
        projects: "Projects",
        references: "References",
        contact: "Contact",
    },
    hero: {
        eyebrow: "Portfolio · Fullstack Developer",
        name: PROFILE.name,
        role: "Fullstack · Deployment · Operations",
        headline:
            "I build and ship web products, from the interface down to the infrastructure that runs them.",
        summary:
            "Information Technology, Thang Long University (2021 – 2026). I work with Next.js, React, NestJS and FastAPI, package with Docker and run on Cloudflare.",
        primaryCta: "View projects",
        secondaryCta: "Contact",
        photoAlt: "Portrait of Long Nguyen",
        headlineHighlight: "the infrastructure that runs them",
    },
    about: {
        title: "About",
        description:
            "A few words about me, what I have done and where I want to go next.",
        paragraphs: [
            "I studied Information Technology and have worked on software projects from the early stages all the way to deployment. I'm good at full-stack development, working with AI tools, connecting different systems, and setting up infrastructure.",
            "I enjoy learning about different problems, understanding what people and businesses really need, and finding ways to solve them. I like thinking things through, looking at problems from different angles, and finding simple ways to make things work better.",
            "I'm interested in many different fields, not just technology, but also mechanical engineering, product development, and business. I enjoy trying new things, learning how different fields work, and taking on new challenges. I also want to keep getting better at what I already know while picking up new skills along the way.",
        ],
        highlights: ["full-stack development"],
        facts: [
            {
                value: `${EDUCATION.startYear} – ${EDUCATION.endYear}`,
                label: "Thang Long University · Information Technology",
            },
            {
                value: `${EDUCATION.gpa} / ${EDUCATION.gpaScale}`,
                label: "GPA",
            },
            {
                value: EXPERIENCE_YEARS,
                label: "Years of experience",
            },
        ],
    },
    skills: {
        title: "Skills",
        description:
            "The skills, technologies and knowledge I have built up through study, work and real product development.",
        groups: {
            languages: "Programming languages",
            frontend: "Frontend",
            backend: "Backend",
            database: "Databases",
            deploy: "Deployment & operations",
            tools: "Development tools",
            design: "Design & content",
            soft: "Soft skills",
        },
        softSkills: [
            "English (TOEIC 565)",
            "Proactive at work",
            "Self-learning and research",
            "Teamwork and collaboration",
            "Experience handling and working with the operations and processes of factories, production facilities, testing, inspection and healthcare",
        ],
    },
    education: {
        title: "Education",
        description:
            "My academic foundation, major and the knowledge I gained during my university studies.",
        school: "Thang Long University",
        major: "Information Technology",
        majorLabel: "Major",
        periodLabel: "Period",
        gpaLabel: "GPA",
        summary: `Vietnam's first non-public university, with ${SCHOOL_AGE} of pioneering practice-oriented education.`,
        photoAlts: [
            "Thang Long University students at their graduation ceremony",
            "Students working in the computer lab of the Thang Long University library",
            "A group of Thang Long University students discussing in a study session",
        ],
        viewProgram: "View the programme",
    },
    experience: {
        title: "Experience",
        description:
            "The most notable places I have worked, the roles I held and what I contributed.",
        entries: [
            {
                ...UDATA,
                role: "Fullstack Developer",
                period: formatMonthRange(UDATA.startedAt, UDATA.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(UDATA.photos, [
                    "Udata memorandum of understanding signing ceremony",
                    "Group photo on site with the Udata sign behind",
                    "Group photo of the on-site team with the Udata sign behind",
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
                role: "Fullstack Developer",
                period: formatMonthRange(IRDOP.startedAt, IRDOP.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(IRDOP.photos, [
                    "Group photo at the IRDOP 10th anniversary ceremony",
                    "Photo from the IRDOP Christmas event",
                    "IRDOP team photo in a Lunar New Year frame",
                ]),
                projects: attachProjectTexts(IRDOP.projects, {
                    "internal-erp": {
                        name: "Internal enterprise ERP system",
                        summary: null,
                        highlights: [
                            "Developed and upgraded ERP modules for managing testing records, document storage, data verification and internal accounting operations.",
                            "Synchronized laboratory technicians' operations on medical devices and IoT devices, and synchronized data, backups and audit logs to Synology NAS and the management system.",
                            "Integrated Gemini AI to automate document processing, handwriting recognition and person recognition from video.",
                        ],
                    },
                }),
            },
            {
                ...LIFETEX,
                role: "Frontend Intern",
                period: formatMonthRange(LIFETEX.startedAt, LIFETEX.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(LIFETEX.photos, [
                    "Team photo at Lifetex",
                ]),
                projects: attachProjectTexts(LIFETEX.projects, {
                    "life-office": {
                        name: "Life Office",
                        summary: null,
                        highlights: [
                            "Contributed to the office management, asset management and vehicle tracking modules on the mobile platform.",
                            "Integrated the Google Maps API to show maps and give directions to users.",
                        ],
                    },
                }),
            },
        ],
        pendingNote:
            "Role, dates and contributions here are being updated.",
        projectsLabel: "Projects I worked on",
        gallery: {
            prev: "Previous photo",
            next: "Next photo",
            bullet: "Show photo {{index}}",
        },
    },
    projects: {
        title: "Projects",
        description:
            "The most notable products and solutions I have built, developed or deployed myself.",
        moreLabel: "See more projects on GitHub",
        items: {
            "location-insight": {
                name: "Location Insight",
                summary: null,
                highlights: [],
                role: "1 person – Fullstack",
                period: projectPeriod(0),
            },
            vinfastreev: {
                name: "Vinfastreev",
                summary:
                    "An introduction and consultation website for electric cars at Vinfast showrooms in Hanoi. Customers can browse the vehicle catalog, choose and compare models, follow the latest news and register for a test drive. Content is managed and published by the dealer. The project runs on a VPS and AWS Lightsail behind Cloudflare Tunnel, with CI/CD through GitHub Actions and Docker, monitoring with Sentry and Better Stack, and an alerting system plus daily reports through Telegram.",
                highlights: [
                    "Serves about 50 people and about 200 visits per day, with about 10 leads per month on average.",
                ],
                role: "1 person – Fullstack",
                period: projectPeriod(1),
            },
            "affiliate-product-catalog": {
                name: "Affiliate Product Catalog",
                summary:
                    "A platform that lets users compare the price and details of a product across several e-commerce marketplaces, and suggests which product to buy so they can earn money from affiliate commissions.",
                highlights: [],
                role: "1 person – Fullstack",
                period: projectPeriod(2),
            },
            "city-incidents-management-system": {
                name: "City Incidents Management System",
                summary:
                    "An application that helps residents, agencies and organizations follow, report and handle incidents around where they live in real time.",
                highlights: [],
                role: "Solo project – came up with the idea, wrote the documentation and built the whole project.",
                period: projectPeriod(3),
            },
        },
    },
    references: {
        title: "References",
        description:
            "People I have worked with who can speak about my abilities and how I work.",
        contactLabel: "Contact",
        emailLabel: "Email",
        phoneLabel: "Phone",
        linksLabel: "Links",
        items: {
            "nguyen-huy-toan": {
                role: "Chief Technology Officer (CTO), Verysell AI & SmartDev",
                summary: null,
                highlights: [
                    "CTO at Verysell AI (05/2025 – present) and SmartDev (11/2025 – present), two technology companies of Verysell Group (Switzerland).",
                    "At SmartDev, works to establish an AI-powered software development company in Vietnam that improves operational efficiency and delivers measurable value to clients across the whole software development lifecycle, from initial concept to final product delivery.",
                    "Leads the AI Engineering team that takes AI solutions from Proof of Concept to real-world operation for customers in Europe, the Middle East and APAC.",
                    "Years of experience in artificial intelligence (AI), Deep Learning and Computer Vision.",
                    "PhD in Electronics and Computer Engineering, Chonnam National University (Korea); postdoctoral researcher 03/2020 – 11/2021, graduate researcher 03/2015 – 02/2020.",
                ],
                photoAlts: [
                    "Portrait of Dr. Nguyen Huy Toan",
                    "Dr. Nguyen Huy Toan speaking on stage at a technology forum",
                ],
            },
            "tran-tien-quan": {
                role: "AI Engineer & Consultant",
                summary: null,
                highlights: [
                    "Technical judge at ASCEND Vietnam 2026 (Singapore) and the Swinburne Hackathon.",
                    "Provides AI consulting and training for individuals and businesses.",
                    "Focuses on AI agents, MCP, workflow automation with n8n, and Claude.",
                    "Over 6 years building production AI systems at VinBrain, MB Bank and a UK multinational, from healthcare AI to banking automation and enterprise GenAI.",
                    "MSc in Computer Science, Hanoi University of Science and Technology.",
                ],
                photoAlts: ["Portrait of Tran Tien Quan"],
            },
        },
    },
    contact: {
        title: "Contact information",
        description:
            "Want to know more about me, or talk about a collaboration? Reach out through the channels below, or download my CV for more detail on my experience and skills.",
        channelsLabel: "Contact channels",
        channels: {
            zalo: { label: "Zalo" },
            phone: { label: "Phone" },
            email: { label: "Gmail" },
            github: { label: "GitHub" },
            facebook: { label: "Facebook" },
            linkedin: { label: "LinkedIn" },
            address: { label: "Address" },
        },
        copyHint: "Click to copy",
        copied: "Copied",
        copyFailed: "Could not copy",
        cv: {
            title: "Download my CV",
            description: "PDF, available in English and Vietnamese.",
            files: {
                en: {
                    label: "Download CV in English",
                    title: "Download my CV in English (PDF)",
                },
                vi: {
                    label: "Download CV in Vietnamese",
                    title: "Download my CV in Vietnamese (PDF)",
                },
            },
        },
    },
    footer: {
        credit: "Logos and images of Thang Long University, Udata, IRDOP and Lifetex belong to their respective owners.",
        builtWith: "Next.js · Tailwind CSS",
    },
};

export default CONTENT_EN;
