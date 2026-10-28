/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Project Renderer (Coding, Video, Automation)
 * Includes accessible Project Detail Modal System
 * ===========================================
 */

(function () {
    'use strict';

    // Block: UI SVG Icon Assets
    // Purpose: Stores raw SVG markup for UI action buttons and badges.
    // What it does: Provides reusable vector icons (GitHub, external link, play, info, close) without external icon libraries.
    var icons = {
        github: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
        external: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
        play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
        workflow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
        info: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
    };

    /* ----------------------------------------
       Project Detail Modal System (V4)
       ---------------------------------------- */
    var modalOverlay = null;

    // Block: Modal Initialization
    // Purpose: Creates and injects the accessible dialog backdrop into the DOM.
    // What it does: Sets up ARIA dialog attributes, close button listener, backdrop click closing, and Escape key listener.
    function initModal() {
        if (document.getElementById('project-detail-modal')) return;

        modalOverlay = document.createElement('div');
        modalOverlay.id = 'project-detail-modal';
        modalOverlay.className = 'project-modal-overlay';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-modal', 'true');
        modalOverlay.setAttribute('aria-hidden', 'true');

        modalOverlay.innerHTML =
            '<div class="project-modal-container">' +
                '<button class="project-modal-close" aria-label="Close project details">' + icons.close + '</button>' +
                '<div class="project-modal-body" id="project-modal-content"></div>' +
            '</div>';

        document.body.appendChild(modalOverlay);

        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        modalOverlay.querySelector('.project-modal-close').addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // Block: HTML Escaper Utility
    // Purpose: Prevents cross-site scripting by sanitizing user-provided strings.
    // What it does: Converts special characters in titles and descriptions into safe HTML text nodes.
    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /* ----------------------------------------
       Universal Project Media Renderer
       ---------------------------------------- */
    // Block: Project Media & Image Fallback Renderer
    // Purpose: Manages image loading, responsive aspect ratios, and defensive error fallbacks for project cards.
    // What it does: Renders <img> with loading="lazy", swaps to a clean placeholder on broken URLs, and displays zero-shift placeholders when image is unset.
    function renderProjectCardMedia(proj, domain) {
        var domainIcons = {
            coding: '&lt;/&gt;',
            video: '🎬',
            automation: '⚡'
        };
        var domainLabels = {
            coding: 'Coding Project',
            video: 'Video Edit',
            automation: 'AI & Automation'
        };

        var icon = domainIcons[domain] || '●';
        var label = domainLabels[domain] || 'Project Preview';
        var titleText = escapeHtml(proj.title || 'Project');

        var placeholderHtml =
            '<div class="project-media-placeholder">' +
                '<span class="placeholder-icon">' + icon + '</span>' +
                '<span class="placeholder-domain">' + label + '</span>' +
                '<code class="placeholder-badge">' + titleText + '</code>' +
            '</div>';

        // Block: Image Verification & Error Boundary
        // Purpose: Renders semantic image tag with inline onerror fallback.
        // What it does: If the image loads, it covers the container; if it fails (404), it seamlessly shows the retro placeholder with no broken icon.
        if (proj.image && proj.image.trim() !== '') {
            var altText = escapeHtml(proj.alt || ('Preview of ' + (proj.title || 'project')));
            var imgSrc = escapeHtml(proj.image.trim());
            return '<div class="project-card-media">' +
                '<img src="' + imgSrc + '" alt="' + altText + '" loading="lazy" ' +
                'onerror="this.style.display=\'none\'; if(this.nextElementSibling){this.nextElementSibling.style.display=\'flex\';} this.closest(\'.project-card-media\').classList.add(\'has-fallback\');">' +
                '<div class="project-media-placeholder project-media-fallback" style="display:none;">' +
                    '<span class="placeholder-icon">' + icon + '</span>' +
                    '<span class="placeholder-domain">' + label + '</span>' +
                    '<code class="placeholder-badge">' + titleText + '</code>' +
                '</div>' +
            '</div>';
        }

        return '<div class="project-card-media">' + placeholderHtml + '</div>';
    }

    // Block: Project Detail Modal Opener
    // Purpose: Populates and displays the deep-dive project detail dialog.
    // What it does: Injects project overview, challenges, solution, tech highlights, live demo links, and optional preview banner.
    function openModal(project) {
        initModal();
        var contentEl = document.getElementById('project-modal-content');
        if (!contentEl) return;

        var details = project.details || {
            overview: project.description,
            challenge: "Designing and engineering a robust, responsive solution with clean code and high performance.",
            solution: "Implemented using modern vanilla web technologies, responsive CSS grid layout systems, and clean component decoupling.",
            highlights: project.tags || []
        };

        // Block: Modal Preview Image Banner
        // Purpose: Shows full project banner inside the modal dialog if configured.
        // What it does: Renders preview image at the top of the modal with defensive onerror hiding.
        var modalImageHtml = '';
        if (project.image && project.image.trim() !== '') {
            modalImageHtml = '<div class="modal-preview-banner" style="margin-bottom:var(--space-lg);border:var(--border-medium);overflow:hidden;background:var(--paper-surface);max-height:260px;">' +
                '<img src="' + escapeHtml(project.image.trim()) + '" alt="' + escapeHtml(project.alt || project.title) + '" style="width:100%;height:100%;max-height:260px;object-fit:cover;display:block;" onerror="this.parentElement.style.display=\'none\';">' +
            '</div>';
        }

        // Block: Modal Tech Tags Generation
        // Purpose: Formats pill badges for the project's technology stack inside the modal.
        // What it does: Concatenates <span> tags with project-tag styling.
        var tagsHtml = '';
        if (project.tags && project.tags.length > 0) {
            tagsHtml = '<div class="project-tags" style="margin-bottom:var(--space-lg);">';
            project.tags.forEach(function (t) {
                tagsHtml += '<span class="project-tag">' + t + '</span>';
            });
            tagsHtml += '</div>';
        }

        // Block: Key Highlights Bullet List
        // Purpose: Renders bullet points for architectural achievements.
        // What it does: Iterates through details.highlights to generate clean HTML <li> elements.
        var highlightsHtml = '';
        if (details.highlights && details.highlights.length > 0) {
            highlightsHtml = '<h4 style="font-family:var(--font-mono);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-grey);margin-bottom:var(--space-xs);">Key Highlights / Tech Stack</h4>' +
                '<ul style="margin-bottom:var(--space-xl);padding-left:1.25rem;color:var(--charcoal);font-size:0.95rem;line-height:1.6;">';
            details.highlights.forEach(function (h) {
                highlightsHtml += '<li style="margin-bottom:6px;">' + h + '</li>';
            });
            highlightsHtml += '</ul>';
        }

        // Block: Modal External Links & Actions
        // Purpose: Formats GitHub repository and Live Demo buttons.
        // What it does: Checks if links are defined and appends tactile action buttons.
        var actionsHtml = '<div class="project-actions" style="margin-top:var(--space-xl);">';
        if (project.github && project.github.trim() !== '') {
            actionsHtml += '<a href="' + project.github + '" class="project-action-link" target="_blank" rel="noopener noreferrer">' + icons.github + ' View Code</a>';
        }
        var demoUrl = project.live || project.videoUrl || project.link;
        if (demoUrl && demoUrl.trim() !== '') {
            actionsHtml += '<a href="' + demoUrl + '" class="project-action-link primary" target="_blank" rel="noopener noreferrer">' + icons.external + ' Live Demo / Preview</a>';
        }
        actionsHtml += '</div>';

        // Block: Modal Body Assembly & Display
        // Purpose: Assembles all modal content sections and makes the modal visible.
        // What it does: Injects HTML into the modal container, adds the .active class, and locks body scrolling.
        contentEl.innerHTML =
            '<div style="font-family:var(--font-mono);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--muted-grey);margin-bottom:var(--space-xs);">Project Deep Dive</div>' +
            modalImageHtml +
            '<h2 style="font-size:2.2rem;margin-bottom:var(--space-xs);">' + project.title + '</h2>' +
            (project.subtitle ? '<p style="font-family:var(--font-mono);font-size:0.9rem;color:var(--coral);margin-bottom:var(--space-md);">' + project.subtitle + '</p>' : '') +
            tagsHtml +
            '<div style="margin-bottom:var(--space-lg);">' +
                '<h4 style="font-family:var(--font-mono);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-grey);margin-bottom:var(--space-xs);">Overview</h4>' +
                '<p style="color:var(--charcoal);font-size:1rem;line-height:1.7;">' + details.overview + '</p>' +
            '</div>' +
            '<div style="margin-bottom:var(--space-lg);">' +
                '<h4 style="font-family:var(--font-mono);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-grey);margin-bottom:var(--space-xs);">The Challenge</h4>' +
                '<p style="color:var(--charcoal);font-size:1rem;line-height:1.7;">' + details.challenge + '</p>' +
            '</div>' +
            '<div style="margin-bottom:var(--space-lg);">' +
                '<h4 style="font-family:var(--font-mono);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-grey);margin-bottom:var(--space-xs);">Architecture &amp; Solution</h4>' +
                '<p style="color:var(--charcoal);font-size:1rem;line-height:1.7;">' + details.solution + '</p>' +
            '</div>' +
            highlightsHtml +
            actionsHtml;

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        // Block: Custom Cursor Re-binding for Modal
        // Purpose: Notifies the custom cursor loop of newly injected interactive modal buttons.
        // What it does: Attaches mouseover/mouseout listeners to the newly rendered links inside the modal.
        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    // Block: Modal Closer
    // Purpose: Hides the active project detail modal.
    // What it does: Removes .active class, sets aria-hidden="true", and restores body scrolling.
    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    /* ----------------------------------------
       Render Coding Projects
       ---------------------------------------- */
    // Block: Coding Projects Renderer
    // Purpose: Generates project cards for the Coding & Dev domain tab.
    // What it does: Iterates through portfolioData.projects.coding to render asymmetrical bento cards with image support and detail modal triggers.
    function renderCodingProjects() {
        var container = document.getElementById('coding-projects');
        if (!container) return;

        var projects = window.portfolioData && window.portfolioData.projects && window.portfolioData.projects.coding;
        if (!projects || projects.length === 0) {
            container.innerHTML = '<p style="font-family:var(--font-mono);color:var(--muted-grey);padding:var(--space-md);">No coding projects added yet.</p>';
            return;
        }

        container.innerHTML = '';
        projects.forEach(function (proj, idx) {
            var card = document.createElement('div');
            var isFeatured = proj.featured || idx === 0;
            card.className = 'project-card' + (isFeatured ? ' featured-bento' : '') + (proj.featured ? ' card-dark' : '');

            // Block: Media Block Generation
            // Purpose: Generates thumbnail image or defensive placeholder for the card.
            // What it does: Calls renderProjectCardMedia with domain 'coding'.
            var mediaHtml = renderProjectCardMedia(proj, 'coding');

            // Block: Status Badge Resolver
            // Purpose: Determines badge styling class based on status text.
            // What it does: Assigns in-progress, learning, or coming-soon CSS classes.
            var badgeClass = 'status-badge';
            var s = (proj.status || '').toLowerCase();
            if (s.includes('progress') || s.includes('learning')) badgeClass += ' in-progress';
            else if (s.includes('soon')) badgeClass += ' coming-soon';
            else if (s.includes('learning')) badgeClass += ' learning';

            var badgeHtml = proj.status ? '<span class="' + badgeClass + '">' + proj.status + '</span>' : '';

            // Block: Project Tags Generation
            // Purpose: Renders list of tech tags for each coding project.
            // What it does: Maps each tag into a monospace badge.
            var tagsHtml = '';
            if (proj.tags && proj.tags.length > 0) {
                tagsHtml = '<div class="project-tags">';
                proj.tags.forEach(function (t) {
                    tagsHtml += '<span class="project-tag">' + t + '</span>';
                });
                tagsHtml += '</div>';
            }

            // Block: Card Actions Generation
            // Purpose: Renders action buttons at the bottom of the card.
            // What it does: Generates 'Details' modal button, 'Code' GitHub link, and 'Live Demo' link.
            var actionsHtml = '<div class="project-actions">';
            actionsHtml += '<button class="project-action-link details-btn" data-project-id="' + (proj.id || idx) + '">' + icons.info + ' Details</button>';
            if (proj.github && proj.github.trim() !== '') {
                actionsHtml += '<a href="' + proj.github + '" class="project-action-link" target="_blank" rel="noopener noreferrer">' + icons.github + ' Code</a>';
            }
            if (proj.live && proj.live.trim() !== '') {
                actionsHtml += '<a href="' + proj.live + '" class="project-action-link primary" target="_blank" rel="noopener noreferrer">' + icons.external + ' Live Demo</a>';
            }
            actionsHtml += '</div>';

            card.innerHTML = mediaHtml +
                '<div class="project-card-content">' +
                    '<div class="project-header-row">' +
                        '<h3 class="project-title">' + proj.title + '</h3>' +
                        badgeHtml +
                    '</div>' +
                    (proj.subtitle ? '<p style="font-family:var(--font-mono);font-size:0.8rem;color:var(--coral);margin-bottom:var(--space-xs);">' + proj.subtitle + '</p>' : '') +
                    '<p class="project-description">' + proj.description + '</p>' +
                    tagsHtml +
                    actionsHtml +
                '</div>';

            // Block: Card Details Click Handler
            // Purpose: Opens deep-dive modal when Details button is clicked.
            // What it does: Safely binds click listener to trigger openModal(proj).
            var detailsBtn = card.querySelector('.details-btn');
            if (detailsBtn) {
                detailsBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    openModal(proj);
                });
            }

            container.appendChild(card);
        });

        initModal();
    }

    /* ----------------------------------------
       Render Video Editing Projects
       ---------------------------------------- */
    // Block: Video Editing Projects Renderer
    // Purpose: Renders the Video Editing & Motion learning showcase.
    // What it does: Outputs filmstrip banner, timeline mockup, and project cards with video preview image support.
    function renderVideoProjects() {
        var container = document.getElementById('video-projects');
        if (!container) return;

        var videoData = window.portfolioData && window.portfolioData.projects && window.portfolioData.projects.videoEditing;
        if (!videoData) return;

        var bannerText = (typeof videoData === 'object' && !Array.isArray(videoData) && videoData.bannerText)
            ? videoData.bannerText
            : "I'm currently exploring video editing and motion design in DaVinci Resolve — focusing on narrative pacing, cuts, and cinematic color grading.";
        var projects = Array.isArray(videoData) ? videoData : (videoData.items || []);

        var html = '<div class="video-section-banner animate-on-scroll">' +
            '<div class="film-perforations"><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div></div>' +
            '<div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-sm);">' +
                '<span class="editorial-stamp">Learning Workspace</span>' +
                '<h3 style="margin:0;font-size:1.4rem;">Video Editing &amp; Motion</h3>' +
            '</div>' +
            '<p style="color:var(--charcoal);line-height:1.6;margin-bottom:var(--space-md);">' + bannerText + '</p>' +
            '<div class="video-timeline-mock">' +
                '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--muted-grey);">00:00</span>' +
                '<div class="timeline-playhead"></div>' +
                '<div class="timeline-track-bar"></div>' +
                '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--muted-grey);">02:45</span>' +
            '</div>' +
        '</div>';

        // Block: Video Project Cards Loop
        // Purpose: Loops through video projects to build thumbnail cards.
        // What it does: Renders preview media, breakdown action button, and external video link button.
        if (projects.length > 0) {
            html += '<div class="project-grid">';
            projects.forEach(function (proj, idx) {
                var badgeClass = 'status-badge in-progress';
                var tagsHtml = '';
                if (proj.tags && proj.tags.length > 0) {
                    tagsHtml = '<div class="project-tags">';
                    proj.tags.forEach(function (t) { tagsHtml += '<span class="project-tag">' + t + '</span>'; });
                    tagsHtml += '</div>';
                }

                var actionsHtml = '<div class="project-actions">';
                actionsHtml += '<button class="project-action-link details-btn-video" data-idx="' + idx + '">' + icons.info + ' Breakdown</button>';
                var previewUrl = proj.videoUrl || proj.link;
                if (previewUrl && previewUrl.trim() !== '') {
                    actionsHtml += '<a href="' + previewUrl + '" class="project-action-link primary" target="_blank" rel="noopener noreferrer">' + icons.play + ' Watch Preview</a>';
                }
                actionsHtml += '</div>';

                var mediaHtml = renderProjectCardMedia(proj, 'video');

                html += '<div class="project-card">' +
                    mediaHtml +
                    '<div class="project-card-content">' +
                        '<div class="project-header-row"><h3 class="project-title">' + proj.title + '</h3><span class="' + badgeClass + '">' + (proj.status || 'Learning') + '</span></div>' +
                        '<p class="project-description">' + proj.description + '</p>' +
                        tagsHtml +
                        actionsHtml +
                    '</div>' +
                '</div>';
            });
            html += '</div>';
        } else {
            html += '<div class="learning-callout-card animate-on-scroll">' +
                '<div class="callout-badge">Learning in Progress</div>' +
                '<h3 style="margin-bottom:var(--space-sm);">Practicing Cuts &amp; Color Grading</h3>' +
                '<p style="color:var(--muted-grey);max-width:500px;margin:0 auto;line-height:1.6;">Check back soon for sample edits, montage practice, and short-form video experiments in DaVinci Resolve.</p>' +
            '</div>';
        }

        container.innerHTML = html;

        // Block: Video Breakdown Click Listeners
        // Purpose: Attaches click handlers to video Breakdown buttons.
        // What it does: Opens project deep dive modal for the selected video item.
        container.querySelectorAll('.details-btn-video').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(btn.getAttribute('data-idx'), 10);
                openModal(projects[idx]);
            });
        });
    }

    /* ----------------------------------------
       Render Automation Projects
       ---------------------------------------- */
    // Block: Automation Projects Renderer
    // Purpose: Renders Python automation scripts and developer tooling workflows.
    // What it does: Outputs the interactive node flow diagram, script cards, and workflow specifications.
    function renderAutomationProjects() {
        var container = document.getElementById('automation-projects');
        if (!container) return;

        var autoData = window.portfolioData && window.portfolioData.projects && window.portfolioData.projects.automation;
        if (!autoData) return;

        var bannerText = (typeof autoData === 'object' && !Array.isArray(autoData) && autoData.bannerText)
            ? autoData.bannerText
            : "Exploring workflow automation, Python utility scripts, and AI integrations to automate repetitive tasks.";
        var projects = Array.isArray(autoData) ? autoData : (autoData.items || []);

        var html = '<div class="automation-banner animate-on-scroll">' +
            '<div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-sm);">' +
                '<span class="editorial-stamp" style="border-color:var(--sky-blue);color:var(--sky-blue);">AI &amp; Workflows</span>' +
                '<h3 style="margin:0;font-size:1.4rem;">AI &amp; Automation</h3>' +
            '</div>' +
            '<p style="color:var(--charcoal);line-height:1.6;margin-bottom:var(--space-md);">' + bannerText + '</p>' +
            '<div class="workflow-node-diagram">' +
                '<div class="diagram-node trigger">⚡ Trigger (Webhook)</div>' +
                '<div class="diagram-connector">→</div>' +
                '<div class="diagram-node action">⚙ Python Script</div>' +
                '<div class="diagram-connector">→</div>' +
                '<div class="diagram-node ai">🤖 LLM API</div>' +
                '<div class="diagram-connector">→</div>' +
                '<div class="diagram-node action" style="background:var(--acid-lime);">📁 Output</div>' +
            '</div>' +
        '</div>';

        // Block: Automation Project Cards Loop
        // Purpose: Loops through automation scripts to render preview media and actions.
        // What it does: Renders workflow diagram thumbnails, code links, and modal triggers.
        if (projects.length > 0) {
            html += '<div class="project-grid">';
            projects.forEach(function (proj, idx) {
                var tagsHtml = '';
                if (proj.tags && proj.tags.length > 0) {
                    tagsHtml = '<div class="project-tags">';
                    proj.tags.forEach(function (t) { tagsHtml += '<span class="project-tag">' + t + '</span>'; });
                    tagsHtml += '</div>';
                }

                var actionsHtml = '<div class="project-actions">';
                actionsHtml += '<button class="project-action-link details-btn-auto" data-idx="' + idx + '">' + icons.info + ' Workflow Spec</button>';
                if (proj.github && proj.github.trim() !== '') {
                    actionsHtml += '<a href="' + proj.github + '" class="project-action-link primary" target="_blank" rel="noopener noreferrer">' + icons.github + ' View Script</a>';
                }
                actionsHtml += '</div>';

                var mediaHtml = renderProjectCardMedia(proj, 'automation');

                html += '<div class="project-card">' +
                    mediaHtml +
                    '<div class="project-card-content">' +
                        '<div class="project-header-row"><h3 class="project-title">' + proj.title + '</h3><span class="status-badge learning">' + (proj.status || 'Exploring') + '</span></div>' +
                        '<p class="project-description">' + proj.description + '</p>' +
                        tagsHtml +
                        actionsHtml +
                    '</div>' +
                '</div>';
            });
            html += '</div>';
        } else {
            html += '<div class="learning-callout-card animate-on-scroll" style="background:var(--warm-white);">' +
                '<div class="callout-badge automation">AI &amp; Automation in Development</div>' +
                '<h3 style="margin-bottom:var(--space-sm);">Building Practical AI Tooling &amp; Workflows</h3>' +
                '<p style="color:var(--muted-grey);max-width:500px;margin:0 auto;line-height:1.6;">Currently experimenting with LLM integrations, n8n automations, Python utilities, and developer productivity tools.</p>' +
            '</div>';
        }

        container.innerHTML = html;

        // Block: Automation Spec Click Listeners
        // Purpose: Attaches click handlers to automation Workflow Spec buttons.
        // What it does: Opens deep-dive modal showing architecture and highlights for scripts.
        container.querySelectorAll('.details-btn-auto').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(btn.getAttribute('data-idx'), 10);
                openModal(projects[idx]);
            });
        });
    }

    // Block: Global Project Renderer Interface
    // Purpose: Exposes render methods globally for application initialization.
    // What it does: Provides a unified window.projectRenderer.render() entry point.
    window.projectRenderer = {
        render: function () {
            renderCodingProjects();
            renderVideoProjects();
            renderAutomationProjects();
        }
    };
})();
