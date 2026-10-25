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
        siteTitle: "Pranav Sharma — Developer & Creative Technologist",
        edition: "2025 // V4.0",
        enableCustomCursor: true
    },

    /*
     * Block: Profile & Hero Section Identity
     * Purpose: Contains biographical identity data displayed in the hero section and terminal bio.
     * What it does: Supplies headline name, role title, status badge, location, introductory bio, and portrait image path.
     */
    profile: {
        name: "Pranav Sharma",
        role: "Developer & Creative Technologist",
        tagline: "Building things that live on the web",
        editionBadge: "EDITION 2025 // V4.0",
        location: "India",
        status: "Available for Projects & Collaborations",
        introduction: "I build creative, high-performance web experiences and am actively expanding into video editing and automation workflows. Still learning, still building.",
        // Path to your profile picture (e.g. assets/images/profile/profile.jpg, or leave empty to show the polaroid placeholder)
        profileImage: "assets/images/profile/profile.jpg",
        profileImageAlt: "Portrait of Pranav Sharma"
    },

    /*
     * Block: About Section Content & Learning Interests
     * Purpose: Houses detailed biographical narratives, developer philosophy, and focus tags.
     * What it does: Powers the editorial story blocks, personal interests pill cloud, and active learning highlights.
     */
    about: {
        headline: "Building things, learning always.",
        description: "I'm a student and self-taught developer passionate about creating tactile, engaging web experiences. My journey started with pure curiosity about how the web works, which evolved into a focus on frontend architecture, creative interactions, and modern web standards. Today, I'm bridging traditional code with visual storytelling and workflow automation.",
        philosophy: "I believe the most compelling digital experiences live at the intersection of robust engineering and thoughtful visual storytelling.",
        interests: [
            "Web Development",
            "UI / UX Design",
            "Creative Coding",
            "Video Editing",
            "AI Workflows",
            "Open Source"
        ],
        learning: [
            "Advanced JavaScript & Frontend Architecture",
            "Video editing workflows & Premiere Pro / DaVinci Resolve",
            "Python automation scripts & LLM integrations"
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
        "Automation": { icon: "⚡", iconAlt: "Automation lightning bolt icon" }
    },

    /*
     * Block: Skills Inventory & Honest Proficiency Ratings
     * Purpose: Master list of technologies, tools, and workflows mapped to categories.
     * What it does: Dynamically generates the 5 category cards, interactive toolbox chips, and terminal inspection data.
     */
    skills: [
        { name: "JavaScript (ES6+)", category: "Programming", status: "Proficient" },
        { name: "HTML5 & CSS3", category: "Programming", status: "Proficient" },
        { name: "Python", category: "Programming", status: "Working With" },
        { name: "Git & GitHub", category: "Programming", status: "Working With" },

        { name: "Responsive Design", category: "Frontend", status: "Proficient" },
        { name: "DOM Manipulation", category: "Frontend", status: "Proficient" },
        { name: "CSS Grid & Flexbox", category: "Frontend", status: "Proficient" },
        { name: "Tailwind CSS", category: "Frontend", status: "Exploring" },

        { name: "VS Code", category: "Tools", status: "Proficient" },
        { name: "Terminal / CLI", category: "Tools", status: "Working With" },
        { name: "Figma", category: "Tools", status: "Exploring" },

        { name: "Premiere Pro", category: "Video Editing", status: "Learning" },
        { name: "DaVinci Resolve", category: "Video Editing", status: "Exploring" },
        { name: "Color Grading & Pacing", category: "Video Editing", status: "Learning" },

        { name: "Python Automation", category: "Automation", status: "Exploring" },
        { name: "API Integration", category: "Automation", status: "Working With" },
        { name: "Prompt Engineering", category: "Automation", status: "Exploring" }
    ],

    /*
     * Block: Projects Collection Across Creative Domains
     * Purpose: Master portfolio showcase divided into Coding, Video Editing, and Automation tabs.
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
                id: "portfolio-v4",
                title: "Personal Portfolio V4",
                subtitle: "Neo-Retro Scrapbook Portfolio System",
                description: "An art-directed personal portfolio engineered with warm paper surfaces, asymmetrical bento layouts, an accessible project detail modal, adaptive custom cursor, and zero build tool dependencies.",
                tags: ["HTML5", "CSS3", "Vanilla JS", "Design System", "A11y"],
                github: "https://github.com/pranavsharma",
                live: "https://github.com/xp-pranav",
                status: "Completed",
                featured: true,
                image: "assets/images/projects/coding/portfolio-v4.webp",
                alt: "Preview of Portfolio V4 neo-retro scrapbook interface",
                imagePlaceholder: "assets/images/projects/portfolio.jpg",
                details: {
                    overview: "Portfolio V4 represents an evolution in creative frontend craftsmanship. The goal was to build a distinctive digital identity combining mid-century editorial typography with tangible physical motifs (washi tape, polaroid frames, rubber stamps) while strictly adhering to pure web standards.",
                    challenge: "Designing a rich, interactive scrapbook aesthetic without relying on heavy frameworks (React, Next.js) or bundlers (Vite, Webpack), while maintaining sub-second load times, flawless WCAG AAA/AA contrast, and 100% responsiveness from 320px to 4K displays.",
                    solution: "Developed a lightweight component architecture in vanilla JavaScript powered by a single data store (`data.js`). Built an adaptive cursor engine that samples DOM layers to maintain contrast over dark sections, and engineered an accessible dialog modal system with keyboard trapping and scroll management.",
                    highlights: [
                        "100% pure HTML5/CSS3/Vanilla JS with zero external dependencies",
                        "Dual-element adaptive custom cursor with real-time dark background detection",
                        "Accessible project detail modal with Escape-key handling and focus management",
                        "Content-driven responsive breakpoints delivering zero horizontal scrollbar overflow",
                        "Decoupled data architecture enabling one-file content customization"
                    ]
                }
            },
            {
                id: "todo-habit-tracker",
                title: "Interactive Todo & Habit Tracker",
                subtitle: "Minimalist Productivity Application",
                description: "A minimalist local-storage task manager featuring custom categories, streak counters, completion audio cues, and satisfying micro-interactions.",
                tags: ["JavaScript", "LocalStorage", "CSS Grid", "Micro-interactions"],
                github: "https://github.com/pranavsharma",
                live: "",
                status: "Completed",
                featured: false,
                image: "assets/images/projects/coding/todo-tracker.webp",
                alt: "Preview of Interactive Todo and Habit Tracker application",
                imagePlaceholder: "assets/images/projects/todo.jpg",
                details: {
                    overview: "A lightweight productivity tool built for keyboard-driven efficiency. Designed for daily task tracking, recurring habit monitoring, and streak visualizations without sending data to third-party cloud servers.",
                    challenge: "Creating an instantaneous, tactile user experience with zero server latency while handling state persistence and schema migrations cleanly in browser LocalStorage.",
                    solution: "Engineered an event-driven vanilla JS state manager that syncs tasks with LocalStorage on every mutation. Designed tactile retro checkbox controls and dynamic day streak calculation algorithms.",
                    highlights: [
                        "Zero-latency client-side persistence using LocalStorage",
                        "Custom streak calculation algorithm for tracking daily habits",
                        "Fluid drag-and-drop task prioritization and custom categories",
                        "Satisfying CSS keyframe micro-interactions on task completion"
                    ]
                }
            },
            {
                id: "weather-dashboard",
                title: "Weather Dashboard App",
                subtitle: "Dynamic Meteorological Interface",
                description: "Clean weather forecasting web application utilizing open meteorological APIs with dynamic atmospheric backgrounds, UV indexing, and hourly forecast sliders.",
                tags: ["API Integration", "Async JS", "CSS Variables", "Geolocation"],
                github: "https://github.com/pranavsharma",
                live: "",
                status: "In Progress",
                featured: false,
                image: "assets/images/projects/coding/weather-dashboard.webp",
                alt: "Preview of Weather Dashboard dynamic meteorological interface",
                imagePlaceholder: "assets/images/projects/weather.jpg",
                details: {
                    overview: "An atmospheric dashboard that translates raw weather telemetry into clear, visual forecasts. Pulls real-time temperature, wind speed, humidity, and UV indexes from open meteorological services.",
                    challenge: "Gracefully managing asynchronous network states, rate limits, geolocation permissions, and varying weather icon sets without visual flashes or layout shifts.",
                    solution: "Implemented an async fetch pipeline with localStorage caching, defensive error boundaries for API downtime, and dynamic CSS variable theme shifting based on day/night and precipitation states.",
                    highlights: [
                        "Real-time geolocation lookup with graceful fallback to manual search",
                        "Dynamic background hue shifting based on ambient weather and time of day",
                        "5-day forecast visualization and hourly precipitation charts",
                        "Defensive API caching to prevent rate-limit throttling"
                    ]
                }
            }
        ],

        /*
         * Block: Video Editing & Motion Storytelling Showcase (Learning Track)
         * Purpose: Highlights video editing experiments, narrative pacing studies, and motion design practice.
         * What it does: Renders informational callout banner and responsive video project cards with deep dive modals.
         */
        videoEditing: {
            bannerText: "I'm currently exploring video editing and motion design — studying narrative pacing, rhythmic audio cuts, and cinematic color grading in Premiere Pro and DaVinci Resolve.",
            items: [
                {
                    id: "cinematic-montage",
                    title: "Cinematic Travel Montage",
                    description: "Practice edit exploring speed ramping, rhythmic beat-matching audio cues, and warm film-look color grading.",
                    image: "assets/images/projects/video-editing/travel-montage.webp",
                    alt: "Preview frame from Cinematic Travel Montage video edit",
                    tags: ["Premiere Pro", "Color Grading", "Sound Design"],
                    status: "Still Learning",
                    link: "",
                    videoUrl: "",
                    details: {
                        overview: "A 60-second exercise in rhythmic editing and sensory sound design. Focused on pairing cut transitions precisely with drum transients and ambient soundscapes.",
                        challenge: "Maintaining visual momentum while transitioning between radically different lighting environments without jarring the viewer.",
                        solution: "Applied LUT balancing and manual color correction curves in Premiere Pro's Lumetri Color panel, layering whooshes, risers, and Foley audio to smooth every cut.",
                        highlights: [
                            "Precise audio transient cut points synchronized to percussion",
                            "Color palette normalization across multiple camera sources",
                            "Layered ambient audio soundscape with sub-bass swells"
                        ]
                    }
                },
                {
                    id: "coding-vlog",
                    title: "Coding Vlog / Dev Diary #1",
                    description: "Short-form documentary style edit documenting a weekend coding sprint with animated typography and dynamic captions.",
                    image: "assets/images/projects/video-editing/coding-vlog.webp",
                    alt: "Preview frame from Coding Vlog and Dev Diary video edit",
                    tags: ["DaVinci Resolve", "Subtitles", "Storytelling"],
                    status: "Practice In Progress",
                    link: "",
                    videoUrl: "",
                    details: {
                        overview: "A behind-the-scenes dev diary capturing the rhythm of problem solving, debugging sessions, and breakthrough moments.",
                        challenge: "Transforming static screen recordings and desk footage into an engaging, fast-paced educational story.",
                        solution: "Used jump cuts to eliminate filler speech, added kinetic captions via DaVinci Resolve Text+, and integrated retro UI sound effects on key code highlights.",
                        highlights: [
                            "Kinetic word-by-word subtitle styling for retention",
                            "Screen recording pan-and-crop transitions focusing on key code blocks",
                            "Retro mechanical keyboard sound design accents"
                        ]
                    }
                }
            ]
        },

        /*
         * Block: Automation, Python Scripts & AI Tooling (Workflow Showcase)
         * Purpose: Documents workflow automation scripts, CLI utilities, and LLM integrations.
         * What it does: Renders exploratory automation cards with technology tags and architectural deep dive modals.
         */
        automation: {
            bannerText: "Building utility scripts, web scrapers, and AI-powered workflow automations to streamline repetitive developer tasks and boost productivity.",
            items: [
                {
                    id: "git-summary-cli",
                    title: "Git Commit Auto-Summary CLI",
                    description: "A lightweight Python utility script that analyzes staged git diffs and drafts structured, conventional commit messages.",
                    image: "assets/images/projects/automation/git-summary-cli.webp",
                    alt: "Preview diagram of Git Commit Auto-Summary CLI workflow",
                    tags: ["Python", "Git API", "CLI", "LLM Workflows"],
                    status: "Still Learning",
                    github: "https://github.com/pranavsharma",
                    details: {
                        overview: "A developer CLI tool that automates the friction of writing detailed, structured git commit messages across multi-file diffs.",
                        challenge: "Parsing raw diff chunks without exceeding API token limits while generating concise Conventional Commit compliant headers.",
                        solution: "Constructed a Python script using `subprocess` and git plumbing commands (`git diff --staged`), filtering non-semantic whitespace and piping compressed diffs to local or remote LLM endpoints.",
                        highlights: [
                            "Adheres to the Conventional Commits specification (feat, fix, refactor)",
                            "Diff token compression algorithm to minimize latency and token usage",
                            "Interactive CLI prompt allowing instant confirmation or message edits"
                        ]
                    }
                },
                {
                    id: "doc-link-validator",
                    title: "Markdown Asset Link Validator",
                    description: "Automation script that crawls local repository files, validates markdown image and link references, and reports broken paths.",
                    image: "assets/images/projects/automation/doc-link-validator.webp",
                    alt: "Preview diagram of Markdown Asset Link Validator workflow",
                    tags: ["Python", "File System", "Automation", "CI Tooling"],
                    status: "Working",
                    github: "https://github.com/pranavsharma",
                    details: {
                        overview: "A zero-dependency Python script designed for local documentation maintenance and pre-commit verification.",
                        challenge: "Accurately resolving relative paths, URI encoded filenames, and anchor tags across deep directory hierarchies.",
                        solution: "Built a recursive AST-like regex scanner in Python that verifies each referenced file against the actual disk filesystem, outputting a colorized terminal report.",
                        highlights: [
                            "Zero external pip dependencies — runs on standard Python 3.8+",
                            "Recursive directory scanning with ignore-pattern support (.git, node_modules)",
                            "Clear CLI error reporting highlighting exact line numbers and broken paths"
                        ]
                    }
                }
            ]
        }
    },

    /*
     * Block: Journey & Experience Timeline Milestones
     * Purpose: Chronological timeline entries detailing education, self-learning milestones, and projects.
     * What it does: Feeds the interactive timeline cards on the left column of the Experience section and the terminal `journey` command.
     */
    experience: [
        {
            title: "Self-Taught Web Developer",
            organization: "Independent Projects & Creative Exploration",
            date: "2023 — Present",
            image: "",
            imageAlt: "",
            description: "Diving deep into modern JavaScript (ES6+), responsive CSS architecture, semantic HTML5, Git version control, and building accessible web applications from first principles."
        },
        {
            title: "Exploring Creative Technologies",
            organization: "Video Editing & Workflow Automation",
            date: "2024 — Present",
            description: "Expanding creative toolkit into rhythmic video editing, motion design in Premiere Pro & DaVinci Resolve, and authoring Python developer utility scripts."
        },
        {
            title: "Student & Technology Enthusiast",
            organization: "Academic Studies",
            date: "Ongoing",
            description: "Balancing academic rigor with continuous hands-on project building, exploring the intersections of design, code, and user interaction."
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
            description: "Building art-directed web experiences, semantic frontend architecture, and clean vanilla JS components.",
            tagColor: "acid"
        },
        {
            id: "02",
            title: "Video Editing",
            status: "Still Learning",
            description: "Studying narrative pacing, rhythmic audio cuts, and cinematic color grading in Premiere Pro and DaVinci Resolve.",
            tagColor: "coral"
        },
        {
            id: "03",
            title: "Automation & AI",
            status: "Still Learning",
            description: "Authoring Python utility scripts, CLI developer tooling, and exploring local LLM workflow integrations.",
            tagColor: "sky"
        }
    ],

    /*
     * Block: Social & Professional External Profiles
     * Purpose: External URL endpoints for GitHub, LinkedIn, Twitter, YouTube, and Email.
     * What it does: Populates navigation links, contact section buttons, and footer social anchors.
     */
    socialLinks: {
        github: "https://github.com/xp-pranav",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        youtube: "https://youtube.com",
        email: "pranav@example.com"
    },

    /*
     * Block: Colophon & Footer Metadata
     * Purpose: Copyright attribution, closing phrase, and version string.
     * What it does: Renders the closing footer bar at the bottom of the page.
     */
    footer: {
        creditText: "Handcrafted with curiosity & code ☕",
        version: "Portfolio V4.0"
    }
};
