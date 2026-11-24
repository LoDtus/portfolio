import {
    EDUCATION,
    EXPERIENCE_YEARS,
    IRDOP,
    LIFETEX,
    PARTICIPATED_PROJECTS,
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
        title: `${PROFILE.name} | Fullstack & AI Developer in Hanoi`,
        description:
            "Portfolio of Long Nguyen (Nguyễn Trung Long), a Fullstack Developer in Hanoi who builds AI-powered software for factories, manufacturing, lab testing and healthcare. Next.js, NestJS, FastAPI.",
        jobTitle: "Fullstack Developer",
    },
    ui: {
        switchLanguage: "Switch to Vietnamese",
        topBarLabel: "Quick contact info",
        skipToContent: "Skip to main content",
        navLabel: "Main menu",
        menuOpen: "Open menu",
        menuClose: "Close menu",
        contactCta: "Contact",
        languageLabel: "Language",
        stackLabel: "Tech stack",
        roleLabel: "Team size and role",
        periodLabel: "Timeline",
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
        eyebrow: "Portfolio · Technology & Engineering",
        name: PROFILE.name,
        role: "Technology · Software · Engineering · Product & Business",
        intro:
            "I want to grow by bringing together technology, AI, engineering, product thinking and business. I care about how to use them to build products that matter, make work run better and solve real problems.",
        primaryCta: "See my projects",
        secondaryCta: "Contact",
        photoAlt: "Portrait of Long Nguyen",
        introHighlight: "technology, AI, engineering, product thinking and business",
    },
    about: {
        title: "About",
        description:
            "A bit about me, what I've done and where I want to go next.",
        paragraphs: [
            "I have a background in IT and experience building software from design all the way to launch. My strengths are Fullstack Development, using AI in day-to-day work, connecting systems together and setting up infrastructure.",
            "I like to get to the root of a problem and really understand what customers and businesses need, and what gets in their way. I think in systems and like to break things down, so I always look for the right solution that makes work smoother, gets more done and is actually useful for the people using it.",
            "I want to learn, take part and grow in many fields, from technology, AI and engineering to product and business. I'm always open to learning, trying new roles and new paths, going deeper into what I already know, and helping solve real problems in each field.",
        ],
        highlights: ["Fullstack Development"],
        facts: [
            {
                value: `${EDUCATION.startYear} - ${EDUCATION.endYear}`,
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
            {
                value: PARTICIPATED_PROJECTS,
                label: "Projects worked on",
            },
        ],
    },
    skills: {
        title: "Skills",
        description:
            "The skills, tools and know-how I've picked up from school, work and building real products.",
        groups: {
            languages: "Programming languages",
            frontend: "Frontend",
            backend: "Backend",
            database: "Databases",
            deploy: "Deployment & Operations",
            tools: "Development tools",
            design: "Design & Content",
            soft: "Soft skills",
        },
        softSkills: [
            "English (TOEIC 565)",
            "Takes initiative at work",
            "Learns and looks things up on my own",
            "Works well in a team",
            "Hands-on experience with how factories, manufacturing sites, lab testing, inspection and healthcare work day to day",
        ],
    },
    education: {
        title: "Education",
        description:
            "Where I studied, my major and what I learned at university.",
        school: "Thang Long University",
        major: "Information Technology",
        majorLabel: "Major",
        periodLabel: "Years",
        gpaLabel: "GPA",
        summary: `Vietnam's first private university, with ${SCHOOL_AGE} of hands-on, practical teaching.`,
        photoAlts: [
            "Thang Long University students at their graduation",
            "Students using computers in the Thang Long University library",
            "Thang Long University students talking in a group study session",
        ],
        viewProgram: "See the program",
    },
    experience: {
        title: "Experience",
        description:
            "The main places I've worked, the roles I had and what I did there.",
        entries: [
            {
                ...UDATA,
                company: "Udata Joint Stock Company",
                role: "Fullstack Developer",
                period: formatMonthRange(UDATA.startedAt, UDATA.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(UDATA.photos, [
                    "Signing ceremony for a cooperation agreement",
                    "Group photo at the project site",
                    "The engineering team at the project site",
                ]),
                projects: attachProjectTexts(UDATA.projects, {
                    "uboard-esg": {
                        name: "Uboard ESG - Carbon emissions tracking system for factories",
                        summary:
                            "A platform that tracks and reports greenhouse gas emissions (carbon, ESG) for manufacturers, with a focus on cement plants.",
                        highlights: [
                            "Automated data entry, cross-checking and validation of Scope 1-2 emissions data based on the categories in Decision 2626, so the numbers are easy to manage, trace and explain.",
                            "Built a dynamic permission system (DRBAC) by role and department with SSO; designed a multi-tenant setup with a shared core that can also be deployed separately for each organization.",
                        ],
                    },
                    uleadgen: {
                        name: "UleadGen - AI customer care platform",
                        summary:
                            "Businesses upload documents or pull in their website content, then add a chat widget to their site. The agent answers from the real content and shows where each answer comes from.",
                        highlights: [
                            "Built chat and lead scoring, plus automatic handoff of customers to the right salesperson.",
                            "Built real-time voice calls from the website to Zalo and Facebook Messenger, turning speech into text messages.",
                        ],
                    },
                    ugate: {
                        name: "Ugate - AI agent for warehouse monitoring and cash flow management",
                        summary:
                            "An AI platform that brings together data from ERP, warehouse, accounting and email to warn early about cash shortages, slow-moving stock and running out of stock. It helps CEOs and CFOs see what's going on in a few minutes instead of spending hours putting it together from different systems.",
                        highlights: [
                            "Designed and built an API Gateway for a multi-tenant SaaS system that handles routing and connects the ERP, AI analytics and finance modules.",
                            "Built a central admin dashboard with charts and alerts that makes data easy to see; added an AI agent that helps businesses get insights, keep an eye on operations and manage data from many different sources.",
                        ],
                    },
                }),
            },
            {
                ...IRDOP,
                company: "Institute for Research & Development of Organic Products (IRDOP)",
                role: "Fullstack Developer",
                period: formatMonthRange(IRDOP.startedAt, IRDOP.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(IRDOP.photos, [
                    "Group photo at a 10th anniversary celebration",
                    "Photo at a Christmas party",
                    "Team photo in a New Year photo frame",
                ]),
                projects: attachProjectTexts(IRDOP.projects, {
                    "internal-erp": {
                        name: "Internal ERP system",
                        summary: null,
                        highlights: [
                            "Built and improved ERP modules for lab testing in the pharmaceutical field: managing test records under ISO/IEC 17025, storing and checking documents, and helping with internal accounting.",
                            "Added AI services for text processing, reading handwritten documents (OCR) and spotting people in video.",
                            "Synced lab technicians' work on medical and IoT devices, and set up data sync and backups to a Synology NAS and the management system.",
                            "Set up and configured internal infrastructure with Tailscale, Headscale and a Synology NAS for networking, storage and file sharing.",
                            "The system serves more than 80 internal users and outside partners. It automated document and sample record management, cut the manual operations team from 5 people to 1, made work faster and reduced data entry mistakes.",
                        ],
                    },
                }),
            },
            {
                ...LIFETEX,
                company: "LifeteX Joint Stock Company",
                role: "Frontend Intern",
                period: formatMonthRange(LIFETEX.startedAt, LIFETEX.endedAt, PRESENT),
                summary: null,
                highlights: [],
                photos: attachPhotoAlts(LIFETEX.photos, [
                    "Team photo at the office",
                ]),
                projects: attachProjectTexts(LIFETEX.projects, {
                    "life-office": {
                        name: "Life Office - Enterprise Management System for URENCO (Hanoi Urban Environment Company)",
                        summary: null,
                        highlights: [
                            "Built mobile modules for managing documents, assets and vehicle tracking.",
                            "Added the Google Maps API for maps, routes and turn-by-turn directions.",
                            "Built a personal schedule tracking feature.",
                            "Built and released the app on the App Store and Google Play.",
                        ],
                    },
                }),
            },
        ],
        pendingNote:
            "The role, dates and work here are being updated.",
        projectsLabel: "Projects I worked on",
        gallery: {
            prev: "Previous photo",
            next: "Next photo",
            bullet: "Show photo {{index}}",
        },
    },
    projects: {
        title: "Personal projects",
        description:
            "The main products and solutions I've built, developed or launched on my own.",
        moreLabel: "See more projects on GitHub",
        items: {
            "location-insight": {
                name: "Location Insight - Real estate analysis and pricing platform",
                summary:
                    "A real estate platform that analyzes locations on a map, estimates a price range and lets people list homes for sale or rent. Buyers can see the pros and cons of each property based on real data, and search and browse current listings.",
                facts: [],
                role: "1 person - Fullstack",
                period: projectPeriod(0),
            },
            vinfastreev: {
                name: "Vinfastreev - VinFast electric car showroom website",
                summary:
                    "A website for VinFast showrooms in Hanoi to show off and give advice on electric cars. Customers can browse the cars, pick and compare models, read the latest news and sign up for a test drive. Admins can also update the content and follow up on potential customers through the CMS.",
                facts: [
                    {
                        label: "Real-world figures",
                        value: "serves about 50 people and about 200 visits a day, with about 10 leads a month on average",
                    },
                ],
                role: "1 person - Fullstack",
                period: projectPeriod(1),
            },
            "affiliate-product-catalog": {
                name: "Affiliate Product Catalog",
                summary:
                    "A platform that lets people compare the price and details of a product across different online marketplaces, and suggests what to buy, earning money through affiliate links.",
                facts: [],
                role: "1 person - Fullstack",
                period: projectPeriod(2),
            },
            "city-incidents-management-system": {
                name: "CIMS - City Incidents Management System",
                summary:
                    "A real-time system that helps people and local authorities keep track of, report and handle incidents around the city.",
                facts: [],
                role: "1 person - Fullstack",
                period: projectPeriod(3),
            },
        },
    },
    references: {
        title: "References",
        description:
            "People I've worked with who can tell you more about my skills and how I work.",
        contactLabel: "Contact",
        emailLabel: "Email",
        phoneLabel: "Phone",
        linksLabel: "Links",
        items: {
            "nguyen-huy-toan": {
                role: "Chief Technology Officer (CTO), Verysell AI & SmartDev",
                summary: null,
                highlights: [
                    "CTO at Verysell AI (05/2025 - present) and SmartDev (11/2025 - present), two tech companies under Verysell Group (Switzerland).",
                    "At SmartDev, he is building an AI-first software company in Vietnam that helps clients work more efficiently and get real, measurable results across the whole software process, from the first idea to the finished product.",
                    "Leads the AI Engineering team that takes AI solutions from proof of concept to real use for clients in Europe, the Middle East and APAC.",
                    "Many years of experience in artificial intelligence (AI), Deep Learning and Computer Vision.",
                    "PhD in Electronics and Computer Engineering from Chonnam National University (Korea); postdoctoral researcher 03/2020 - 11/2021, graduate researcher 03/2015 - 02/2020.",
                ],
                photoAlts: [
                    "Portrait of Dr. Nguyen Huy Toan",
                    "Dr. Nguyen Huy Toan speaking on stage at a tech forum",
                ],
            },
            "tran-tien-quan": {
                role: "AI Engineer & Consultant",
                summary: null,
                highlights: [
                    "Technical judge at ASCEND Vietnam 2026 (Singapore) and the Swinburne Hackathon.",
                    "Gives AI consulting and training to people and businesses.",
                    "Focuses on AI agents, MCP, workflow automation with n8n, and Claude.",
                    "Over 6 years building real AI systems at VinBrain, MB Bank and a UK multinational, from healthcare AI to banking automation and enterprise GenAI.",
                    "Master's in Computer Science from Hanoi University of Science and Technology.",
                ],
                photoAlts: ["Portrait of Tran Tien Quan"],
            },
        },
    },
    contact: {
        title: "Contact info",
        description:
            "Want to know more about me or work together? Reach out through any of the channels below, or download my CV to see more about my experience and skills.",
        channelsLabel: "Ways to reach me",
        channels: {
            zalo: { label: "Zalo" },
            phone: { label: "Phone" },
            email: { label: "Gmail" },
            github: { label: "GitHub" },
            facebook: { label: "Facebook" },
            linkedin: { label: "LinkedIn" },
            address: { label: "Address", value: "Vinh Hung Ward, Ha Noi" },
        },
        copyHint: "Click to copy",
        copied: "Copied",
        copyFailed: "Couldn't copy",
        cv: {
            title: "Download my CV",
            description: "PDF, in English and Vietnamese.",
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
        credit: "Logos and photos of Thang Long University and the places in the Experience section belong to their owners.",
        builtWith: "Next.js · Tailwind CSS",
    },
};

export default CONTENT_EN;
