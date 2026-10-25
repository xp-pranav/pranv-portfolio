# Pranav Sharma — Portfolio V4 Master Reference (`list.md`)

This document is the comprehensive single-source technical reference for the **V4** portfolio codebase. It details all design language decisions, V4 editorial enhancements, accessible project detail modals, asymmetrical bento project layouts, features, content structures, and responsive audits.

---

## Table of Contents
1. [Project Overview & V4 Objectives](#1-project-overview--v4-objectives)
2. [Design Language & Aesthetics](#2-design-language--aesthetics)
   - [Core Philosophy](#core-philosophy)
   - [Color Palette & Design Tokens](#color-palette--design-tokens)
   - [Typography System](#typography-system)
   - [Visual Motifs & Physicality](#visual-motifs--physicality)
3. [Architecture & File Inventory](#3-architecture--file-inventory)
4. [Features & Functional Breakdown (V4)](#4-features--functional-breakdown-v4)
   - [Navigation & Mobile Drawer](#navigation--mobile-drawer)
   - [Hero Section & Bug Hunter Mini-Game Arcade](#hero-section--bug-hunter-mini-game-arcade)
   - [About & Polaroid Frame](#about--polaroid-frame)
   - [Three Creative Domains & Tab Switching](#three-creative-domains--tab-switching)
   - [Asymmetrical Bento Project Grid & Modal System](#asymmetrical-bento-project-grid--modal-system)
   - [Defensive Project Media & Fallback Architecture](#defensive-project-media--fallback-architecture)
   - [Skills Dashboard & Tech Stack Playground](#skills-dashboard--tech-stack-playground-v4-redesign)
   - [Experience Section, PRANAV.EXE Terminal & Current Focus](#experience-section-redesign-two-column-layout)
   - [Contact Section & Social Connectors](#contact-section--social-connectors)
   - [Adaptive Custom Scrapbook Cursor](#adaptive-custom-scrapbook-cursor)
   - [Scroll Animations & Scroll Spy](#scroll-animations--scroll-spy)
5. [Complete Content System (`js/data.js`)](#5-complete-content-system-jsdatajs)
6. [Responsive Design & Breakpoint Matrix (320px – 1440px+)](#6-responsive-design--breakpoint-matrix-320px--1440px)
7. [V4 Upgrade Log & Improvements](#7-v4-upgrade-log--improvements)
8. [Accessibility (a11y) & Usability Checklist](#8-accessibility-a11y--usability-checklist)

---

## 1. Project Overview & V4 Objectives

- **Owner**: Pranav Sharma
- **Role**: Developer & Creative Technologist
- **Version**: **V4.0** (Major editorial layout evolution, asymmetrical bento grid, accessible project detail modals, enhanced hero visual hierarchy, refined film/workflow workspaces, rigorous zero-dependency audit)
- **Core Concept**: An art-directed personal portfolio showcasing three distinct creative domains:
  1. **Coding & Development** (Primary: web development, frontend architecture, interactive applications)
  2. **Video Editing** (Learning: pacing, rhythmic cuts, storytelling, color grading in Premiere Pro & DaVinci Resolve)
  3. **Automation & AI** (Exploring: Python utility scripts, developer CLI tools, LLM workflows)
- **Technical Constraint**: 100% pure HTML5, CSS3, and Vanilla JavaScript (ES6+). Zero build tools, no Node.js/npm dependencies, zero external framework overhead, fully functional via direct browser file access (`file:///`).

---

## 2. Design Language & Aesthetics

### Core Philosophy
- **Light-First & High Contrast**: Built on warm, off-white, tactile paper-like surfaces (`#F9F7F2`, `#FFFEF9`) with ink-black high-contrast text (`#141412`). Avoids oppressive pure-black backgrounds while maintaining full WCAG AAA/AA readability.
- **Neo-Retro Scrapbook Editorial (V4 Enhanced)**: Combines modern Swiss editorial asymmetry with tangible physical artifacts:
  - Washi tape strips on cards
  - Tilting sticker labels with hard offset retro drop shadows (`5px 5px 0 #141412`)
  - Polaroid photo frames with tape bindings
  - Asymmetrical bento grid layouts highlighting primary work
  - Film strip perforations & timeline playheads for video
  - Node graph flowcharts for automation
  - Rubber stamp / editorial badges rotated at subtle angles

### Color Palette & Design Tokens
All color variables are established in `css/style.css` on `:root`:

| Token Name | Hex Code | Role & Usage | Contrast / WCAG |
|---|---|---|---|
| `--paper-surface` | `#F9F7F2` | Base body background (warm paper tone) | Base surface |
| `--warm-white` | `#FFFEF9` | Elevated card surfaces, nav, containers | Surface accent |
| `--light-grey` | `#EBE8E0` | Subdued borders, divider lines, placeholders | 1.3:1 vs surface |
| `--muted-grey` | `#7A7570` | Secondary metadata, dates, labels | 4.8:1 vs paper (AA compliant) |
| `--charcoal` | `#2D2A26` | Body paragraph text, subheaders | 12.8:1 vs paper (AAA compliant) |
| `--ink-black` | `#141412` | Primary headings, prominent borders, primary buttons | 16.5:1 vs paper (AAA compliant) |
| `--acid-lime` | `#C8FF35` | Primary high-energy accent, active states, tape | High visibility punch |
| `--acid-lime-dark` | `#A8E010` | Darkened lime for high-contrast border states | Accent variant |
| `--soft-lavender` | `#E5D8FF` | Scrapbook sticker accent, familiar skills | Pastel secondary |
| `--coral` | `#FF6B4A` | "Learning in progress" alerts, primary actions | Warm punchy accent |
| `--sky-blue` | `#A8E8F2` | "Exploring" status, automation badges | Cool secondary |
| `--pale-yellow` | `#FFE57A` | Hero stickers, "coming soon" badge | Warm retro highlight |

### Typography System
Google Fonts loaded asynchronously in `<head>`:
- **Display Heading Font**: `'Bebas Neue', sans-serif`
  - All-caps, condensed, high-impact neo-retro header styling (`h1`, `h2`, `h3`).
  - Fluid sizing via `clamp()` (e.g., `clamp(2.8rem, 13vw, 8rem)`).
- **Body & Editorial Font**: `'Space Grotesk', sans-serif`
  - High-legibility geometric sans-serif for comfortable paragraph reading (`line-height: 1.6–1.7`).
- **Monospace Font**: `'Space Mono', monospace`
  - Section numbers, dates, technical tags, CTA buttons, status labels.
- **Handwritten Accent Font**: `'Caveat', cursive`
  - Polaroid captions, scrapbook stickers, notes.

---

## 3. Architecture & File Inventory

```
portfolio/
├── index.html            # Semantic HTML5 single-page application
├── README.md             # Project summary, setup guide, and V4 documentation
├── customize.md          # Comprehensive A-to-Z customization manual
├── list.md               # Master technical reference & audit log (this file)
├── css/
│   ├── style.css         # Tokens, typography, base layout, hero, about, timeline, contact, footer
│   ├── components.css    # Buttons, asymmetrical bento cards, modal dialog, badges, stickers, banners
│   ├── responsive.css    # Content-driven media queries across 320px–1440px+
│   ├── cursor.css        # Custom dual-element adaptive scrapbook cursor styles
│   ├── mini-game.css     # Hero Bug Hunter arcade floating stickers and active game styling
│   ├── terminal.css      # Experience section PRANAV.EXE terminal & Current Focus workspace
│   └── skills.css        # Skills dashboard & Tech Stack Playground styling
├── js/
│   ├── data.js           # Central editable data store (single source of truth with V4 project details)
│   ├── main.js           # App bootstrapping, DOM data-binding, skills & timeline renderer
│   ├── projects.js       # Dynamic multi-domain project renderer + accessible Project Detail Modal system
│   ├── interactions.js   # Navigation drawer, tab switcher, IntersectionObserver, scroll spy
│   ├── cursor.js         # Custom cursor requestAnimationFrame loop, hover bindings, and dark detection
│   ├── mini-game.js      # Hero arcade 30s Bug Hunter game loop and spawn mechanics
│   ├── terminal.js       # PRANAV.EXE terminal command parser and suggestion chip interactions
│   └── skills.js         # Skills dashboard & interactive Tech Stack Playground engine
└── assets/
    ├── images/
    │   ├── profile/      # Profile picture folder (profile.jpg)
    │   ├── projects/     # Categorized project preview images
    │   │   ├── coding/        # Screenshots for web applications & tools
    │   │   ├── video-editing/ # Video preview stills and montage covers
    │   │   └── automation/    # Workflow diagrams & CLI terminal previews
    │   ├── certificates/ # Course badges and educational credentials
    │   └── gallery/      # Desk setup, photography, and creative assets
    └── textures/         # Background paper and grain textures
```

---

## 4. Features & Functional Breakdown (V4)

### Navigation & Mobile Drawer
- **Desktop**: Fixed top bar (`height: 70px`), brand initials with lime square indicator, navigation links with lime animated underlines, and "Let's Talk" CTA button.
- **Mobile Drawer**:
  - Hamburger menu transforms into an 'X' using CSS transforms.
  - Full-screen slide-down panel with warm-white background and light grey dividers.
  - Body scroll lock toggled via `body.nav-open` (`overflow: hidden`).
  - Accessible keyboard control: closes on `Escape` key press.
  - Auto-closes immediately upon clicking any navigation anchor.
  - Minimum 44×44px touch target compliance for mobile buttons and links.

### Hero Section & Bug Hunter Mini-Game Arcade
- **Editorial Typography**: Bold two-tone typography: "PRANAV" on line 1, "SHARMA" on line 2 highlighted inside an acid-lime block with a retro border and hard drop shadow (`5px 5px 0 #141412`).
- **Responsive Typography**: Fluid scaling smoothly using `clamp()` down to small 320px screens without clipping or layout overflow.
- **Hero Scrapbook Idle State**: Floating interactive developer badges (`🐛 bug.py:42`, `🐞 404: bug_found`, `⚡ SyntaxError`, `👾 null_pointer`) and scrapbook stickers (`🐛 Bug Hunter`, `30s Sprint ⚡`) connected by playful dashed SVG connector curves.
- **Hero Bug Hunter Mini-Game Arcade (`js/mini-game.js`, `css/mini-game.css`)**:
  - Embedded directly into the hero layout (`#hero-arcade-wrapper`) with non-intrusive idle state.
  - User starts the game on-demand via the central `▶ PLAY GAME` button.
  - **Game Mechanics**: 30-second rapid sprint. Randomly spawns bugs (`['🐛', '🐞', '👾', '🐜', '⚡']`) within the bounding arcade boundary. Each bug has a dynamic 2.2-second lifespan before disappearing.
  - **Scoring**: Catching a bug grants +10 points with animated popping effects and updates the live scoreboard HUD.
  - **Game Over State**: Displays final score summary, celebratory feedback, `▶ PLAY AGAIN` button, and `← Back to Portfolio` return button that seamlessly restores the idle hero stickers.
- **Multi-tier CTA Buttons**: High-contrast primary "View My Work ↓" and secondary "Get In Touch".

### About & Polaroid Frame
- Tactile polaroid-style card featuring simulated washi tape, photo boundary, and handwritten caption.
- Dynamic fallback: Displays an instructional placeholder if `profileImage` in `data.js` is empty.
- Dynamic interest tags rendered as rotated stickers (`.interest-tag`).
- "Currently Learning" panel with coral label and arrow list items.

### Asymmetrical Bento Project Grid & Modal System (V4)
- **Asymmetrical Bento Layout**:
  - In desktop views (`min-width: 968px`), the first featured coding project spans 2 columns with a side-by-side media/content split, creating a striking editorial anchor.
  - Secondary projects form a clean 2-column auto-fill grid.
- **Accessible Project Detail Modal System**:
  - Clicking "Details", "Breakdown", or "Workflow Spec" on any project card instantly triggers a modal dialog (`role="dialog"`, `aria-modal="true"`).
  - Displays deep-dive information including project overview, technical challenge, architectural solution, and key tech stack highlights sourced from `js/data.js`.
  - Accessible interaction: Closes via close button, clicking the backdrop overlay, or pressing the `Escape` key. Automatically locks body scroll (`body.modal-open`).

### Defensive Project Media & Fallback Architecture
- **Zero-Shift Error Handling**: Implemented via `renderProjectCardMedia` in `js/projects.js` with semantic `<img>` tags loaded lazily (`loading="lazy"`).
- **Graceful Image Error Recovery**: Inline `onerror` handler automatically hides broken or missing image files without ugly broken image icons and reveals an art-directed neo-retro domain placeholder (`</>`, `🎬`, `⚡`) with project badge, avoiding layout jumps.
- **Modal Preview Banners**: When an image is configured in `data.js`, the project detail modal renders a responsive top preview banner with defensive onerror handling.

### Three Creative Domains & Tab Switching
- **Domain Preview Cards**: High-level introductory cards distinguishing primary focus (Coding) from active learning areas (Video Editing, Automation & AI).
- **Interactive Tab Controller**:
  - Semantic tab buttons (`role="tab"`, `aria-selected`, `aria-controls`).
  - Seamless switching between Coding, Video Editing, and Automation panels without page reload.
  - Panel restoration logic: Coding panel restores its responsive grid layout (`display: grid; grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr))`), while banner panels display as blocks.

### Skills Dashboard & Tech Stack Playground (V4 Redesign)
- **Two-Column Composition**:
  - **Left Column (approx. 62%)**: Balanced category cards grid (Programming, Frontend, Tools, Video Editing, Automation) featuring interactive skill pills with honest status badges (`Proficient`, `Working With`, `Learning`, `Exploring`).
  - **Right Column (approx. 38%)**: Integrated **Tech Stack Playground** containing:
    1. **Currently Exploring**: Active learning focus tracking (`Coding & Development`, `Video Editing`, `Automation & AI`).
    2. **Interactive Toolbox Selector**: Compact chip grid for quick tool and technology selection.
    3. **Live Skill Terminal**: High-contrast information panel (`SKILL_TERMINAL.EXE`) that updates in real-time when clicking any skill pill or toolbox chip, displaying technical specs, categories, proficiencies, and a reset control.
- **Accessibility & Responsiveness**: Fully keyboard navigable, touch-friendly, respects `prefers-reduced-motion`, and scales smoothly across all viewports from 320px to 1440px+.

### Experience Section Redesign (Two-Column Layout)
- **Left Column — Journey Timeline**: High-contrast vertical milestone tracker (`01 // Timeline`) rendered from `portfolioData.experience`.
- **Right Column Component A — PRANAV.EXE Terminal**:
  - Interactive vanilla JavaScript CLI emulator with retro window styling, green/yellow/red traffic light dots, and live status badge.
  - Command interpreter supporting commands: `help`, `about`, `skills`, `projects`, `journey`, `clear`.
  - Clickable quick-action suggestion chips (`help`, `about`, `skills`, `projects`, `journey`, `clear`) that auto-execute commands on click.
  - Auto-scrolling output container and defensive input handling.
- **Right Column Component B — Current Focus Workspace**:
  - "What I'm Working On" focus workspace rendered dynamically from `portfolioData.currentFocus`.
  - Cards featuring index numbers (`01`, `02`, `03`), titles, status tags with color coding (`Primary Focus`, `Still Learning`), and descriptive summaries.

### Contact Section & Social Connectors
- High-contrast card with deep ink-black background and an acid-lime offset shadow.
- Dynamic social link buttons with embedded SVG icons (GitHub, LinkedIn, Twitter/X, YouTube, Email).
- Defensive URL check: Links with empty strings in `data.js` are automatically hidden rather than creating broken buttons.

### Adaptive Custom Scrapbook Cursor
- Dual-element setup:
  - Center dot (`.custom-cursor`): 10px with acid-lime border and shadow.
  - Trailing follower (`.custom-cursor-follower`): 32px ring with smooth linear interpolation (`lerp` factor: 0.18).
- **Dark Section Auto-Detection**:
  - Uses `document.elementFromPoint(mouseX, mouseY)` on mousemove.
  - Instantly detects when the pointer is over `.bg-dark`, `.contact-box`, `.footer`, or `.card-dark`.
  - Applies `.on-dark` state: switches center dot to glowing acid-lime neon (`box-shadow: 0 0 10px rgba(200, 255, 53, 0.8)`) and brightens the follower ring, ensuring 100% visibility over black surfaces.
- Touch & Accessibility Safety:
  - Automatically disabled on touchscreens (`@media (hover: none), (pointer: coarse)`).
  - Automatically disabled when `prefers-reduced-motion` is active.

---

## 5. Complete Content System (`js/data.js`)

All portfolio content is decoupled from layout and managed in a clean JavaScript data structure:

```javascript
window.portfolioData = {
    config: {
        siteTitle: "Pranav Sharma — Developer & Creative Technologist",
        edition: "2025 // V4.0",
        enableCustomCursor: true
    },
    profile: {
        name: "Pranav Sharma",
        role: "Developer & Creative Technologist",
        tagline: "Building things that live on the web",
        editionBadge: "EDITION 2025 // V4.0",
        location: "India",
        status: "Available for Projects & Collaborations",
        introduction: "I build creative, high-performance web experiences and am actively expanding into video editing and automation workflows. Still learning, still building.",
        profileImage: "assets/images/profile/profile.jpg",
        profileImageAlt: "Portrait of Pranav Sharma"
    },
    about: {
        headline: "Building things, learning always.",
        description: "I'm a student and self-taught developer passionate about creating tactile, engaging web experiences...",
        philosophy: "I believe the most compelling digital experiences live at the intersection of robust engineering and thoughtful visual storytelling.",
        interests: ["Web Development", "UI / UX Design", "Creative Coding", "Video Editing", "AI Workflows", "Open Source"],
        learning: [
            "Advanced JavaScript & Frontend Architecture",
            "Video editing workflows & Premiere Pro / DaVinci Resolve",
            "Python automation scripts & LLM integrations"
        ]
    },
    skillCategories: {
        "Programming": { icon: "</>", iconAlt: "Programming code icon" },
        "Frontend": { icon: "🎨", iconAlt: "Frontend design icon" },
        "Tools": { icon: "⚙", iconAlt: "Tools gear icon" },
        "Video Editing": { icon: "🎬", iconAlt: "Video editing clapperboard icon" },
        "Automation": { icon: "⚡", iconAlt: "Automation lightning bolt icon" }
    },
    skills: [
        { name: "JavaScript (ES6+)", category: "Programming", status: "Proficient" },
        { name: "Premiere Pro", category: "Video Editing", status: "Learning" },
        { name: "Python Automation", category: "Automation", status: "Exploring" }
        // ... complete skills inventory
    ],
    projects: {
        coding: [
            {
                id: "portfolio-v4",
                title: "Personal Portfolio V4",
                subtitle: "Neo-Retro Scrapbook Portfolio System",
                description: "An art-directed personal portfolio engineered with warm paper surfaces, asymmetrical bento layouts, an accessible project detail modal, adaptive custom cursor, and zero build tool dependencies.",
                tags: ["HTML5", "CSS3", "Vanilla JS", "Design System", "A11y"],
                github: "https://github.com/pranavsharma",
                live: "#home",
                status: "Completed",
                featured: true,
                image: "assets/images/projects/coding/portfolio-v4.webp",
                alt: "Preview of Portfolio V4 neo-retro scrapbook interface",
                imagePlaceholder: "assets/images/projects/portfolio.jpg",
                details: {
                    overview: "Portfolio V4 represents an evolution in creative frontend craftsmanship...",
                    challenge: "Designing a rich, interactive scrapbook aesthetic without relying on heavy frameworks...",
                    solution: "Developed a lightweight component architecture in vanilla JavaScript...",
                    highlights: [
                        "100% pure HTML5/CSS3/Vanilla JS with zero external dependencies",
                        "Dual-element adaptive custom cursor with real-time dark background detection",
                        "Accessible project detail modal with Escape-key handling and focus management"
                    ]
                }
            }
            // ... additional coding projects
        ],
        videoEditing: {
            bannerText: "I'm currently exploring video editing and motion design...",
            items: [ /* video project items with deep dive details */ ]
        },
        automation: {
            bannerText: "Building utility scripts, web scrapers, and AI-powered workflow automations...",
            items: [ /* automation script items with details */ ]
        }
    },
    experience: [
        {
            title: "Self-Taught Web Developer",
            organization: "Independent Projects & Creative Exploration",
            date: "2023 — Present",
            description: "Diving deep into modern JavaScript (ES6+), responsive CSS architecture..."
        }
        // ... additional timeline items
    ],
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
    socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        youtube: "https://youtube.com",
        email: "pranav@example.com"
    },
    footer: {
        creditText: "Handcrafted with curiosity & code ☕",
        version: "Portfolio V4.0"
    }
};
```

---

## 6. Responsive Design & Breakpoint Matrix (320px – 1440px+)

The layout is tested and hardened across all standard viewports:

| Viewport Width | Device Target | Key Layout Adaptations |
|---|---|---|
| **1400px+** | Ultra-wide / 4K | Max-width clamped to 1400px; generous margins. |
| **1024px – 1280px** | Laptops / Desktops | Asymmetrical bento grid active; 2-column hero grid. |
| **769px – 1024px** | Tablets (Landscape) | Reduced grid gaps; stickers contained; hero spacing scaled down. |
| **max 968px** | Tablets (Portrait) | Hero switches to single-column; bento span collapses to single columns. |
| **max 768px** | Standard Mobile Phones | Mobile drawer enabled; single-column project grid; full-width stacked buttons; touch padding. |
| **max 480px** | Compact Mobile Phones | Washi tape hidden on small cards; sticker sizes reduced; typography scaled via clamp. |
| **max 360px** | Small Phones (e.g. Galaxy S) | Node diagram stacks vertically; container padding 12px; compact project tabs. |
| **max 320px** | Ultra-narrow (iPhone SE 1st gen) | Hero stickers hidden; filmstrip perforations hidden; container padding 10px; zero horizontal scroll. |

---

## 7. V4 Upgrade Log & Improvements

### 1. Asymmetrical Bento Grid Integration
- **Enhancement**: Evolved standard uniform project cards into an asymmetrical bento layout (`.featured-bento` spanning 2 columns with side-by-side media and content on desktop), creating a strong visual focal point for primary work.

### 2. Accessible Project Detail Modal System
- **Enhancement**: Added a robust vanilla JavaScript dialog modal system. Each project card includes a "Details" / "Breakdown" action button opening an accessible modal (`role="dialog"`) detailing project overviews, technical challenges, solutions, and tech stack highlights. Supports Escape key closing, backdrop clicking, and body scroll locking.

### 3. Hero Bug Hunter Mini-Game Arcade
- **Enhancement**: Embedded a 30-second interactive bug-hunting arcade directly in the hero scrapbook section (`mini-game.js`, `mini-game.css`), featuring randomized bug spawning, popping score increments, game-over screen, and seamless replayability without interrupting site flow.

### 4. Modular Codebase Architecture
- **Enhancement**: Decoupled monolithic scripts and styles into clean, dedicated modules (`skills.js`/`skills.css`, `terminal.js`/`terminal.css`, `mini-game.js`/`mini-game.css`, `cursor.js`/`cursor.css`), dramatically improving maintainability and isolation.

### 5. Zero-Shift Defensive Media & Image Fallback System
- **Enhancement**: Engineered `renderProjectCardMedia` in `js/projects.js` with defensive inline `onerror` fallback recovery. Missing or broken images cleanly fall back to retro domain placeholders with zero layout shifts (zero CLS).

### 6. Interactive Tech Stack Playground & Live Skill Terminal
- **Enhancement**: Replaced static progress bars with an honest two-column skills dashboard featuring interactive category cards, active learning badges, interactive toolbox chips, and a real-time `SKILL_TERMINAL.EXE` tool inspector.

### 7. Data Schema Expansion & Decoupling
- **Enhancement**: Centralized all content into `js/data.js` with structured payloads for `skillCategories`, `currentFocus`, `details`, and social endpoints.

### 8. Adaptive Dark-Background Custom Cursor & Touch Safety
- **Enhancement**: Retained real-time element sampling (`document.elementFromPoint`) for smooth neon acid-lime cursor visibility over dark surfaces (`.bg-dark`, `.contact-box`, `.footer`), with complete touch device safety (`@media (hover: none)`).

---

## 8. Accessibility (a11y) & Usability Checklist

- [x] **Semantic Landmarks**: Semantic `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>` elements used throughout.
- [x] **Keyboard Navigation**: All links, modal triggers, terminal inputs, and buttons possess distinct `:focus-visible` styling (`outline: 3px solid var(--acid-lime)`).
- [x] **ARIA Roles & Dialogs**: Project tabs utilize `role="tab"`, `aria-selected`, and `aria-controls`. Project detail modal uses `role="dialog"` and `aria-modal="true"`.
- [x] **Touch Target Sizes**: All interactive elements (links, buttons, tab headers, terminal chips) provide at least 44×44px hit areas on mobile devices.
- [x] **Motion Safety**: Full support for `@media (prefers-reduced-motion: reduce)` — disables transitions, cursor animations, mini-game animations, and scroll transforms.
- [x] **Responsive Images**: Profile and project images feature `loading="lazy"`, `decoding="async"`, and descriptive `alt` tags.
- [x] **Defensive Error Handling**: Zero broken image icons or collapsed layout states upon missing image assets.
- [x] **WCAG Contrast**: Body text, headers, and buttons consistently exceed minimum WCAG AA/AAA contrast ratios against their respective backgrounds.
- [x] **Adaptive Pointer**: Custom cursor automatically switches to high-visibility neon over dark sections.
