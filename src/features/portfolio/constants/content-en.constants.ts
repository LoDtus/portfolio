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
            "Long Nguyen, a Fullstack Developer in Hanoi: Next.js, NestJS, FastAPI, Docker. Experience at Udata, IRDOP, Lifetex and the projects shipped so far.",
        jobTitle: "Fullstack Developer",
    },
    ui: {
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
        description: "A quick summary of who I am and what I do.",
        paragraphs: [
            `I studied Information Technology at Thang Long University (${EDUCATION.startYear} – ${EDUCATION.endYear}) with a GPA of ${EDUCATION.gpa}/${EDUCATION.gpaScale}.`,
            "I work on both ends of a product: the interface (Next.js, React, React Native) and the services behind it (NestJS, FastAPI, Spring Boot), plus how it is packaged, deployed and operated with Docker, Nginx and Cloudflare.",
        ],
        highlights: ["both ends of a product"],
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
                value: String(PROJECTS.length),
                label: "Projects built",
            },
        ],
    },
    skills: {
        title: "Skills",
        description:
            "Grouped by role in a web product. Only technologies I have used in real projects are listed.",
        groups: {
            languages: "Languages",
            frontend: "Frontend",
            backend: "Backend",
            deploy: "Deployment",
            tools: "Other tools",
            soft: "Soft skills",
        },
        softSkills: [
            "TOEIC 565",
            "Proactive at work",
            "Teamwork and collaboration",
            "Self-learning and research",
            "Experience with workflows in factories, testing, inspection and healthcare",
        ],
    },
    education: {
        title: "Education",
        description:
            "A practice-oriented programme at Vietnam's first non-public university.",
        school: "Thang Long University",
        major: "Information Technology",
        majorLabel: "Major",
        periodLabel: "Period",
        gpaLabel: "GPA",
        summary: `Vietnam's first non-public university, with ${SCHOOL_AGE} of pioneering practice-oriented education.`,
        summaryHighlight: SCHOOL_AGE,
        photoAlts: [
            "Thang Long University students at their graduation ceremony",
            "Students working in the computer lab of the Thang Long University library",
            "A group of Thang Long University students discussing in a study session",
        ],
        viewProgram: "View the programme",
    },
    experience: {
        title: "Experience",
        description: "Where I have worked and what I contributed.",
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
            "Products I built and deployed, listed from the most recent to the oldest.",
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
            "People who can speak to my work and how I work with others.",
        emailLabel: "Email",
        phoneLabel: "Phone",
        linksLabel: "Links",
        items: {
            "nguyen-huy-toan": {
                role: "Chief Technology Officer (CTO), Verysell AI & SmartDev",
                summary:
                    "PhD in Electronics and Computer Engineering (Chonnam National University, Korea) with years of experience in artificial intelligence, Deep Learning and Computer Vision. Leads the AI Engineering team that takes AI solutions from Proof of Concept to real-world operation for customers in Europe, the Middle East and APAC. Verysell AI and SmartDev are two technology companies of Verysell Group (Switzerland).",
                highlights: [
                    "Speaker at the Europe – Vietnam Technovation Forum 2026 (EVTF 2026) on AI in business collaboration and developing the next generation of tech talent.",
                ],
                photoAlts: [
                    "Portrait of Dr. Nguyen Huy Toan",
                    "Dr. Nguyen Huy Toan speaking on stage at a technology forum",
                ],
            },
            "tran-tien-quan": {
                role: "AI Engineer & Consultant",
                summary:
                    "Provides AI consulting and training for individuals and businesses. Over 6 years building production AI systems at VinBrain, MB Bank and a UK multinational, from healthcare AI to banking automation and enterprise GenAI. MSc in Computer Science, Hanoi University of Science and Technology. Focuses on AI agents, MCP, workflow automation with n8n, and Claude.",
                highlights: [
                    "Technical judge at ASCEND Vietnam 2026 (Singapore) and the Swinburne Hackathon.",
                ],
                photoAlts: ["Portrait of Tran Tien Quan"],
            },
        },
    },
    contact: {
        title: "Contact information",
        description:
            "Hiring, or want to talk about a project? Reach me through any of the channels below.",
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
    },
    footer: {
        credit: `Logo and images of ${EDUCATION.schoolName} belong to the university (thanglong.edu.vn). Logos and photos of Udata, IRDOP and Lifetex belong to their respective owners.`,
        builtWith: "Built with Next.js and Tailwind CSS.",
    },
};

export default CONTENT_EN;
