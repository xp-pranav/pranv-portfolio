/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Central Editable Data File (Single Source of Truth)
 * ===========================================
 * Edit this file to update your portfolio content across the entire site.
 * No build tools, bundlers, or frameworks required.
 * Fully compatible with file:/// local browsing.
 */

/*
 * Block: Global Portfolio Data Store
 * Purpose: Central repository exposing all portfolio content on the global window object.
 * What it does: Supplies reactive content for the hero, about, skills, projects, timeline, and terminal components.
 */
window.portfolioData = {

    /*
     * Block: Site Configuration
     * Purpose: Stores core meta parameters for the portfolio website.
     * What it does: Sets the browser document title, active portfolio edition tag, and toggles the custom cursor engine.
     */
    config: {
        siteTitle: "Pranav Sharma — Developer & AI Explorer",
        edition: "2026 // V4.0",
        enableCustomCursor: true
    },

    /*
     * Block: Profile & Hero Section Identity
     * Purpose: Contains biographical identity data displayed in the hero section and terminal bio.
     * What it does: Supplies headline name, role title, status badge, location, introductory bio, and portrait image path.
     */
    profile: {
        name: "Pranav Sharma",
        role: "Developer & AI Explorer",
        tagline: "Building useful software, exploring AI, making tools open source.",
        editionBadge: "EDITION 2026 // V4.0",
        location: "Navi Mumbai, India",
        status: "Open to Internships & Collaborations",
        introduction: "I build useful web software, experiment with AI & LLMs, and practice video editing — passionate about creating free, open-source alternatives to expensive tools. Still learning, always building.",
        // Path to your profile picture (assets/images/profile/profile.jpg)
        profileImage: "assets/images/profile/profile.jpg",
        profileImageAlt: "Stylized neo-retro illustration representing Pranav Sharma"
    },

    /*
     * Block: About Section Content & Learning Interests
     * Purpose: Houses detailed biographical narratives, developer philosophy, and focus tags.
     * What it does: Powers the editorial story blocks, personal interests pill cloud, and active learning highlights.
     */
    about: {
        headline: "Building things, learning always.",
        description: "I'm a 1st-year B.Tech CSE (AI) student at ITM Skills University and self-taught developer. I build practical software to solve everyday problems and explore emerging AI technologies, with a strong focus on releasing free, open-source alternatives to expensive commercial tools so anyone can benefit without paywalls.",
        philosophy: "Great technology shouldn't be locked behind expensive subscriptions. I build tools to scratch real itches, experiment with what AI can do, and share the code openly with the community.",
        interests: [
            "Software Development",
            "Artificial Intelligence",
            "Open Source Software",
            "LLM Applications",
            "DaVinci Resolve",
            "Creative Coding"
        ],
        learning: [
            "AI APIs & practical LLM application architecture",
            "Modern JavaScript & client-side software engineering",
            "Visual storytelling & color grading in DaVinci Resolve"
        ]
    },

    /*
     * Block: Skill Categories Visual Icons & Metadata
     * Purpose: Configures custom icons, emojis, or image paths for each skill category card.
     * What it does: Allows custom retro glyphs or SVG/WebP icons to be displayed beside category headers in the Skills section.
     */
    skillCategories: {
        "Programming": { icon: "</>", iconAlt: "Programming code icon" },
        "Frontend": { icon: "🎨", iconAlt: "Frontend design icon" },
        "Tools": { icon: "⚙", iconAlt: "Tools gear icon" },
        "Video Editing": { icon: "🎬", iconAlt: "Video editing clapperboard icon" },
        "AI & Automation": { icon: "⚡", iconAlt: "AI and Automation icon" }
    },

    /*
     * Block: Skills Inventory & Honest Proficiency Ratings
     * Purpose: Master list of technologies, tools, and workflows mapped to categories.
     * What it does: Dynamically generates the category cards, interactive toolbox chips, and terminal inspection data.
     */
    skills: [
        { name: "JavaScript (ES6+)", category: "Programming", status: "Proficient" },
        { name: "HTML5 & CSS3", category: "Programming", status: "Proficient" },
        { name: "Python", category: "Programming", status: "Working With" },
        { name: "Git & GitHub", category: "Programming", status: "Working With" },

        { name: "Responsive Design", category: "Frontend", status: "Proficient" },
        { name: "DOM Manipulation", category: "Frontend", status: "Proficient" },
        { name: "CSS Grid & Flexbox", category: "Frontend", status: "Proficient" },

        { name: "VS Code", category: "Tools", status: "Proficient" },
        { name: "Terminal / CLI", category: "Tools", status: "Working With" },
        { name: "Figma", category: "Tools", status: "Exploring" },

        { name: "DaVinci Resolve", category: "Video Editing", status: "Learning" },

        { name: "ChatGPT & Claude", category: "AI & Automation", status: "Exploring" },
        { name: "OpenRouter", category: "AI & Automation", status: "Exploring" },
        { name: "n8n Workflows", category: "AI & Automation", status: "Exploring" },
        { name: "Prompt Engineering", category: "AI & Automation", status: "Exploring" }
    ],

    /*
     * Block: Projects Collection Across Creative Domains
     * Purpose: Master portfolio showcase divided into Coding, Video Editing, and AI & Automation tabs.
     * What it does: Renders interactive project cards, tags, links, and detailed modal deep dives.
     */
    projects: {

        /*
         * Block: Coding & Web Development Projects (Primary Focus)
         * Purpose: Contains flagship web engineering projects with live previews and repository links.
         * What it does: Populates the Coding tab grid with responsive cards, media banners, and case study modals.
         */
        coding: [
            {
                id: "better-qr",
                title: "Better QR",
                subtitle: "Feature-Rich QR Code Design Studio",
                description: "A free, open-source QR studio featuring custom styling, bulk generation, batch printing, and multiple export options. Built as an affordable alternative to expensive paid generators.",
                tags: ["JavaScript", "HTML5", "CSS3", "Open Source", "Vercel"],
                github: "https://github.com/xp-pranav/Better-QR",
                live: "https://better-qr-kappa.vercel.app/",
                status: "Completed",
                featured: true,
                image: "assets/images/projects/coding/better-qr.png",
                alt: "Better QR code design studio interface",
                imagePlaceholder: "assets/images/projects/coding/better-qr.png",
                details: {
                    overview: "Better QR was built to eliminate the frustration of paid QR code generators holding basic features hostage behind subscriptions. It provides a full-featured, zero-cost, open-source suite directly in the browser.",
                    challenge: "Integrating multi-type QR generation, visual styling controls, bulk batch workflows, and reliable export formats in pure client-side JavaScript without server overhead.",
                    solution: "Architected a modular vanilla JS application managing SVG/canvas rendering, client-side ZIP packaging for bulk exports, and responsive CSS UI.",
                    highlights: [
                        "100% free and open-source under MIT license",
                        "Multiple QR data formats (URL, WiFi, vCard, Text)",
                        "Full aesthetic customization: colors, shapes, logos, frames",
                        "Bulk generation and print-ready sheet exporting"
                    ]
                }
            },
            {
                id: "portfolio-v4",
                title: "Personal Portfolio V4",
                subtitle: "Neo-Retro Scrapbook Portfolio System",
                description: "An art-directed personal portfolio engineered with warm paper surfaces, asymmetrical bento layouts, an accessible project detail modal, adaptive custom cursor, and zero build tool dependencies. Free and open source.",
                tags: ["HTML5", "CSS3", "Vanilla JS", "Design System", "A11y"],
                github: "https://github.com/xp-pranav/portfolio-v4",
                live: "https://xp-pranav.github.io/portfolio-v4",
                status: "Completed",
                featured: true,
                image: "assets/images/projects/coding/portfolio-v4.png",
                alt: "Preview of Portfolio V4 neo-retro scrapbook interface",
                imagePlaceholder: "assets/images/projects/coding/portfolio-v4.png",
                details: {
                    overview: "Portfolio V4 combines tactile, physical scrapbooking aesthetics with modern web standards, featuring responsive bento grids, a playable Bug Hunter mini-game, and an interactive PRANAV.EXE terminal. Both live site and full source code are publicly accessible.",
                    challenge: "Delivering rich tactile design and interactivity without heavy JS frameworks or bundlers, while maintaining sub-second load times, flawless WCAG contrast, and 100% responsiveness.",
                    solution: "Developed a lightweight component architecture in vanilla JavaScript powered by a single data store (`data.js`). Built an adaptive cursor engine and an accessible dialog modal system.",
                    highlights: [
                        "100% pure HTML5/CSS3/Vanilla JS with zero external dependencies",
                        "Open-source GitHub repository with full source code available",
                        "Dual-element adaptive custom cursor with real-time dark background detection",
                        "Accessible project detail modal with Escape-key handling and focus management",
                        "Content-driven responsive breakpoints delivering zero horizontal scrollbar overflow"
                    ]
                }
            }
        ],

        /*
         * Block: Video Editing & Motion Storytelling Showcase (Learning Track)
         * Purpose: Highlights video editing experiments, narrative pacing studies, and motion design practice.
         * What it does: Renders informational callout banner and honest learning progress state.
         */
        videoEditing: {
            bannerText: "I'm currently exploring video editing and motion design in DaVinci Resolve — studying narrative pacing, rhythmic audio cuts, and cinematic color grading. Published edits coming soon.",
            items: []
        },

        /*
         * Block: AI & Automation Tooling (Workflow Showcase)
         * Purpose: Documents workflow automation scripts, CLI utilities, and LLM integrations.
         * What it does: Renders exploratory automation banner and learning cards.
         */
        automation: {
            bannerText: "Exploring practical AI applications, LLM workflows, and developer automations. I build utility scripts and experiment with tools like n8n, Python, and generative models to make daily workflows faster and smarter.",
            items: []
        }
    },

    /*
     * Block: Journey & Experience Timeline Milestones
     * Purpose: Chronological timeline entries detailing education, self-learning milestones, and projects.
     * What it does: Feeds the interactive timeline cards on the left column of the Experience section and the terminal `journey` command.
     */
    experience: [
        {
            title: "B.Tech CSE (AI Specialization) — 1st Year",
            organization: "ITM Skills University, Kharghar",
            date: "2026 — Present",
            image: "",
            imageAlt: "",
            description: "Commenced formal engineering studies in Computer Science with a specialization in Artificial Intelligence. Focusing on foundational computing, algorithms, and applied AI systems alongside continuous independent project development."
        },
        {
            title: "Data Fundamentals Certification",
            organization: "IBM SkillsBuild",
            date: "2025",
            image: "",
            imageAlt: "",
            description: "Earned industry certification covering fundamental data literacy, data architectures, and foundational concepts supporting data-driven AI applications."
        },
        {
            title: "Self-Directed Developer & Builder",
            organization: "Independent & Open-Source Projects",
            date: "Independent Journey",
            image: "",
            imageAlt: "",
            description: "Exploring programming and software design from first principles. Built and launched Better QR — a free, open-source QR studio — and continuously experimenting with AI tools, LLM workflows, and developer automations."
        }
    ],

    /*
     * Block: Current Focus & Active Learning Tracks
     * Purpose: Summary of current engineering and creative priorities with status indicators.
     * What it does: Powers the Currently Exploring widget in the Skills playground and the focus card beside the terminal.
     */
    currentFocus: [
        {
            id: "01",
            title: "Coding & Development",
            status: "Primary Focus",
            description: "Building useful open-source tools, semantic frontend architecture, and clean vanilla JS components.",
            tagColor: "acid"
        },
        {
            id: "02",
            title: "AI & Automation",
            status: "Active Exploration",
            description: "Experimenting with n8n workflows, practical LLM integrations via OpenRouter, and Python utility scripts.",
            tagColor: "sky"
        },
        {
            id: "03",
            title: "Video Editing",
            status: "Still Learning",
            description: "Studying narrative pacing, rhythmic audio cuts, and cinematic color grading in DaVinci Resolve.",
            tagColor: "coral"
        }
    ],

    /*
     * Block: Social & Professional External Profiles
     * Purpose: External URL endpoints for GitHub, LinkedIn, Twitter, YouTube, and Email.
     * What it does: Populates navigation links, contact section buttons, and footer social anchors. Empty strings are automatically hidden.
     */
    socialLinks: {
        github: "https://github.com/xp-pranav",
        linkedin: "https://www.linkedin.com/in/xp-pranav/",
        twitter: "https://x.com/xp_pranav",
        youtube: "",
        email: "tbh.sharmapranav@gmail.com"
    },

    /*
     * Block: Colophon & Footer Metadata
     * Purpose: Copyright attribution, closing phrase, and version string.
     * What it does: Renders the closing footer bar at the bottom of the page.
     */
    footer: {
        creditText: "Handcrafted with curiosity & code ☕",
        version: "Portfolio V4.0 // 2026"
    }
};
