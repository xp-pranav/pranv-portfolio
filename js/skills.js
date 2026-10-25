/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Skills Dashboard & Tech Stack Playground Renderer
 * ===========================================
 */

(function () {
    'use strict';

    /*
     * Block: Main Skills Dashboard Renderer
     * Purpose: Reads portfolio data and constructs the complete HTML layout for the skills dashboard.
     * What it does: Dynamically generates the left-side category cards and right-side interactive playground widgets.
     */
    function renderSkillsDashboard() {
        // Block: DOM Container Check
        // Purpose: Retrieves the #skills-container element.
        // What it does: Exits early if the skills container is missing from the document to avoid runtime errors.
        var container = document.getElementById('skills-container');
        if (!container) return;

        // Block: Data Extraction & Fallback Defaults
        // Purpose: Extracts skills and active learning tracks from window.portfolioData.
        // What it does: Sets safe default focus tracks if currentFocus data is undefined.
        var data = window.portfolioData || {};
        var skills = data.skills || [];
        var exploreItems = data.currentFocus || [
            { id: "01", title: "Coding & Development", status: "Primary Focus", tagColor: "acid" },
            { id: "02", title: "Video Editing", status: "Still Learning", tagColor: "coral" },
            { id: "03", title: "Automation & AI", status: "Still Learning", tagColor: "sky" }
        ];

        if (skills.length === 0) return;

        // Block: Skills Grouping by Category
        // Purpose: Organizes the flat array of skills into grouped lists by category name.
        // What it does: Creates a hash map of categories (Programming, Frontend, Tools, Video Editing, Automation).
        var categories = {};
        skills.forEach(function (s) {
            if (!categories[s.category]) categories[s.category] = [];
            categories[s.category].push(s);
        });

        // Block: Category Icon Fallback Mapping
        // Purpose: Defines default retro text glyphs and emojis for each category.
        // What it does: Provides fallback visual indicators when custom category icons are not configured.
        var catIcons = {
            'Programming': '&lt;/&gt;',
            'Frontend': '🎨',
            'Tools': '⚙',
            'Video Editing': '🎬',
            'Automation': '⚡'
        };
        var configuredCatData = data.skillCategories || {};

        // Block: Dashboard Layout Wrapper
        // Purpose: Starts the outer HTML container for the two-column dashboard.
        // What it does: Appends the parent grid element with scroll-reveal animation classes.
        var html = '<div class="skills-dashboard-layout animate-on-scroll">';

        // ----------------------------------------
        // LEFT COLUMN: Balanced Category Cards Grid
        // ----------------------------------------
        // Block: Left Column Structure
        // Purpose: Initializes the container holding the 5 skill category boxes.
        // What it does: Prepares the left-column flex wrapper and category cards CSS grid.
        html += '<div class="skills-left-column">';
        html += '<div class="skills-cards-grid">';

        // Block: Category Cards Loop
        // Purpose: Iterates through each skill category to generate its card.
        // What it does: Generates the card header, optional icon/image, and the list of interactive skill pills.
        Object.keys(categories).forEach(function (cat) {
            var catId = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
            var catConfig = configuredCatData[cat] || {};
            var iconDisplay = '';

            // Block: Category Icon Resolver
            // Purpose: Checks if the category has an image or SVG icon configured.
            // What it does: Renders an <img> tag if an image file path is given, or falls back to text/emoji glyphs.
            if (catConfig.icon && (catConfig.icon.endsWith('.webp') || catConfig.icon.endsWith('.png') || catConfig.icon.endsWith('.jpg') || catConfig.icon.endsWith('.svg'))) {
                iconDisplay = '<img src="' + escapeHtml(catConfig.icon) + '" alt="' + escapeHtml(catConfig.iconAlt || cat) + '" class="skill-category-icon-img" loading="lazy" onerror="this.style.display=\'none\';">';
            } else if (catConfig.icon) {
                iconDisplay = '<span class="skill-category-icon-text">' + escapeHtml(catConfig.icon) + '</span>';
            } else {
                iconDisplay = '<span class="skill-category-icon-text">' + (catIcons[cat] || '●') + '</span>';
            }

            html += '<div class="skill-category-box" data-category-card="' + catId + '">';
            html += '<div class="skill-category-header">';
            html += '<h3>' + escapeHtml(cat) + '</h3>';
            html += '<div class="skill-category-icon-wrap">' + iconDisplay + '</div>';
            html += '</div>';
            html += '<div class="skill-pills">';

            // Block: Individual Skill Pills Generation
            // Purpose: Loops through the skills inside the current category.
            // What it does: Determines status tag colors and outputs clickable pill buttons with data attributes.
            categories[cat].forEach(function (skill) {
                var mappedClass = 'status-learning';
                var s = skill.status ? skill.status.toUpperCase() : '';
                if (s === 'FAMILIAR' || s === 'WORKING WITH') mappedClass = 'status-familiar';
                else if (s === 'PROFICIENT') mappedClass = 'status-proficient';
                else if (s === 'EXPLORING' || s === 'EXPERIMENTING' || s === 'INTERESTED' || s === 'STILL LEARNING') mappedClass = 'status-exploring';

                html += '<button type="button" class="skill-pill" data-skill-name="' + escapeHtml(skill.name) + '" data-skill-cat="' + escapeHtml(cat) + '" data-skill-status="' + escapeHtml(skill.status) + '">';
                html += escapeHtml(skill.name);
                html += '<span class="skill-status-tag ' + mappedClass + '">' + escapeHtml(skill.status) + '</span>';
                html += '</button>';
            });

            html += '</div></div>';
        });

        html += '</div></div>'; // End left column

        // ----------------------------------------
        // RIGHT COLUMN: Tech Stack Playground
        // ----------------------------------------
        // Block: Right Column Wrapper
        // Purpose: Houses Currently Exploring, Interactive Toolbox, and Skill Terminal widgets.
        // What it does: Starts the right-hand column container with sticky positioning on desktop.
        html += '<div class="skills-right-column">';

        // Block: Area A - Currently Exploring Widget
        // Purpose: Shows active learning domains and focus tracks.
        // What it does: Renders focus tracks from portfolioData.currentFocus with bold status tags.
        html += '<div class="playground-box currently-exploring-widget">';
        html += '<div class="playground-header"><span class="playground-title">🔥 Currently Exploring</span></div>';
        html += '<div class="explore-pills-list">';
        exploreItems.forEach(function (item) {
            html += '<div class="explore-item"><span>' + escapeHtml(item.title) + '</span> <span class="explore-status-tag">' + escapeHtml(item.status) + '</span></div>';
        });
        html += '</div></div>';

        // Block: Area B - Interactive Toolbox Selector Widget
        // Purpose: Provides a clickable chip selector for all individual technologies.
        // What it does: Generates unclipped wrapping chips allowing users to click and inspect any tool.
        html += '<div class="playground-box toolbox-widget">';
        html += '<div class="playground-header"><span class="playground-title">🧰 Interactive Toolbox Selector</span><span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--muted-grey);">Click tool to inspect</span></div>';
        html += '<div class="toolbox-selector-grid" id="toolbox-selector-grid">';
        skills.forEach(function (skill) {
            html += '<button type="button" class="toolbox-chip" data-toolbox-name="' + escapeHtml(skill.name) + '" data-toolbox-cat="' + escapeHtml(skill.category) + '" data-toolbox-status="' + escapeHtml(skill.status) + '">' + escapeHtml(skill.name) + '</button>';
        });
        html += '</div></div>';

        // Block: Area C - Live Skill Terminal Panel
        // Purpose: Live terminal emulator outputting tool specs and details.
        // What it does: Displays window dots, interactive output screen, and a reset button.
        html += '<div class="skill-terminal-panel">';
        html += '<div class="skill-terminal-header">';
        html += '<div class="skill-terminal-dots"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span></div>';
        html += '<span class="skill-terminal-title">SKILL_TERMINAL.EXE</span>';
        html += '<button type="button" class="term-reset-btn" id="term-reset-btn">Reset</button>';
        html += '</div>';
        html += '<div class="skill-terminal-body" id="skill-terminal-body">';
        html += '<div class="term-output-title"><span>STATUS: READY</span></div>';
        html += '<div class="term-output-content">Select any skill pill or toolbox chip on the left to inspect proficiency, category data, and specs.</div>';
        html += '</div>';
        html += '</div>';

        html += '</div>'; // End right column
        html += '</div>'; // End dashboard layout

        // Block: DOM Injection
        // Purpose: Inserts the generated HTML string into #skills-container.
        // What it does: Mounts the entire skills dashboard to the document.
        container.innerHTML = html;

        // ----------------------------------------
        // Interactivity Bindings
        // ----------------------------------------
        var terminalBody = document.getElementById('skill-terminal-body');
        var resetBtn = document.getElementById('term-reset-btn');
        var allSkillPills = container.querySelectorAll('.skill-pill, .toolbox-chip');
        var categoryBoxes = container.querySelectorAll('.skill-category-box');

        // Block: Skill Inspection Action Handler
        // Purpose: Updates the UI when a skill pill or toolbox chip is clicked.
        // What it does: Synchronizes active pill highlights, highlights the category card, and writes tool telemetry to the terminal.
        function inspectSkill(name, cat, status) {
            allSkillPills.forEach(function (el) {
                if (el.getAttribute('data-skill-name') === name || el.getAttribute('data-toolbox-name') === name) {
                    el.classList.add('selected');
                } else {
                    el.classList.remove('selected');
                }
            });

            var catId = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
            categoryBoxes.forEach(function (box) {
                if (box.getAttribute('data-category-card') === catId) {
                    box.classList.add('active-category');
                } else {
                    box.classList.remove('active-category');
                }
            });

            if (terminalBody) {
                terminalBody.innerHTML =
                    '<div class="term-output-title"><span>TOOL SPEC: ' + escapeHtml(name.toUpperCase()) + '</span></div>' +
                    '<div class="term-output-content">' +
                        '<div style="margin-bottom:4px;"><strong>Category:</strong> ' + escapeHtml(cat) + '</div>' +
                        '<div style="margin-bottom:6px;"><strong>Proficiency / Status:</strong> <span style="color:var(--acid-lime);font-weight:700;">' + escapeHtml(status) + '</span></div>' +
                        '<div style="font-size:0.8rem;color:var(--warm-white);opacity:0.9;border-top:1px dashed #333;padding-top:6px;margin-top:6px;">' +
                            'Active component in Pranav\'s creative tech stack. Verified for production workflows and continuous learning.' +
                        '</div>' +
                    '</div>';
            }
        }

        // Block: Pill & Chip Click Listeners
        // Purpose: Attaches click handlers to all interactive skill items.
        // What it does: Triggers inspectSkill() with name, category, and status data.
        allSkillPills.forEach(function (el) {
            el.addEventListener('click', function () {
                var name = el.getAttribute('data-skill-name') || el.getAttribute('data-toolbox-name');
                var cat = el.getAttribute('data-skill-cat') || el.getAttribute('data-toolbox-cat');
                var status = el.getAttribute('data-skill-status') || el.getAttribute('data-toolbox-status');
                inspectSkill(name, cat, status);
            });
        });

        // Block: Terminal Reset Listener
        // Purpose: Attaches click handler to the terminal Reset button.
        // What it does: Clears all selection highlights and resets terminal text to the ready state.
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                allSkillPills.forEach(function (el) { el.classList.remove('selected'); });
                categoryBoxes.forEach(function (box) { box.classList.remove('active-category'); });
                if (terminalBody) {
                    terminalBody.innerHTML =
                        '<div class="term-output-title"><span>STATUS: READY</span></div>' +
                        '<div class="term-output-content">Select any skill pill or toolbox chip on the left to inspect proficiency, category data, and specs.</div>';
                }
            });
        }

        // Block: Cursor Bindings Refresh
        // Purpose: Informs the adaptive custom cursor about newly rendered DOM buttons.
        // What it does: Re-binds mouseover and mouseleave hover animations for newly generated elements.
        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    // Block: HTML Sanitizer Helper
    // Purpose: Escapes untrusted text before injecting into HTML strings.
    // What it does: Converts special characters to HTML entities to prevent XSS vulnerabilities.
    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Block: Global Export & Lifecycle Auto-Init
    // Purpose: Exposes renderSkillsDashboard globally and runs it on DOMContentLoaded.
    // What it does: Ensures skills dashboard is mounted immediately when the page loads.
    window.renderSkillsDashboard = renderSkillsDashboard;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderSkillsDashboard);
    } else {
        renderSkillsDashboard();
    }
})();
