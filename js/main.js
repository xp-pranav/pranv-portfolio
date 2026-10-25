/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Main JavaScript (Initialization & Rendering)
 * ===========================================
 */

(function () {
    'use strict';

    // Block: Social & Contact Vector Icons
    // Purpose: Defines inline SVG vector markup for social buttons.
    // What it does: Supplies GitHub, LinkedIn, Twitter/X, YouTube, and Email icons with consistent stroke and fill styling.
    var socialIcons = {
        github: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
        twitter: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
        youtube: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98" fill="white"/></svg>',
        email: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>'
    };

    /* ----------------------------------------
       Render profile / hero data
       ---------------------------------------- */
    // Block: Profile & Hero Data Binding
    // Purpose: Populates personal details into the Hero and About sections.
    // What it does: Injects name, role, tagline, bio, and handles polaroid image rendering with zero-delay loading and fallback handling.
    function renderProfile() {
        var p = window.portfolioData && window.portfolioData.profile;
        if (!p) return;

        // Block: Document Title Update
        // Purpose: Sets dynamic browser tab title.
        // What it does: Prepends developer name to the browser window title.
        document.title = p.name + ' — Portfolio';

        // Block: Text Field Bindings
        // Purpose: Populates data-field text attributes across the DOM.
        // What it does: Injects name, role, tagline, and introduction strings into corresponding tags.
        bind('name', p.name);
        bind('role', p.role);
        bind('tagline', p.tagline);
        bind('introduction', p.introduction);

        // Block: Polaroid Image Renderer
        // Purpose: Renders portrait image inside the About polaroid frame.
        // What it does: Uses decoding="async" (avoiding lazy-load above fold), and includes onerror fallback to the retro polaroid prompt.
        var altText = p.profileImageAlt || ('Portrait of ' + p.name);
        document.querySelectorAll('[data-field="profileImage"]').forEach(function (el) {
            if (p.profileImage && p.profileImage.trim() !== '') {
                el.innerHTML =
                    '<img src="' + p.profileImage + '" alt="' + altText + '" decoding="async" ' +
                    'onerror="this.style.display=\'none\'; if(this.nextElementSibling){this.nextElementSibling.style.display=\'flex\';}">' +
                    '<span class="polaroid-placeholder-fallback" style="display:none;font-family:var(--font-hand);font-size:1.1rem;color:var(--muted-grey);text-align:center;line-height:1.4;">' +
                        'your photo here<br><span style="font-size:0.8rem;">' + p.profileImage + '</span>' +
                    '</span>';
            } else {
                el.innerHTML = '<span style="font-family:var(--font-hand);font-size:1.1rem;color:var(--muted-grey);text-align:center;line-height:1.4;">your photo here<br><span style="font-size:0.8rem;">assets/images/profile/profile.jpg</span></span>';
            }
        });

        // Block: Geographic Location Tag
        // Purpose: Displays location pill in the hero area if configured.
        // What it does: Shows location with pin emoji or hides the element if empty.
        document.querySelectorAll('[data-field="location"]').forEach(function (el) {
            if (p.location && p.location.trim()) {
                el.textContent = '📍 ' + p.location;
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    }

    /* ----------------------------------------
       Render about section
       ---------------------------------------- */
    // Block: About Section Renderer
    // Purpose: Renders personal background description, interests, and learning goals.
    // What it does: Injects bio paragraph, creates tilted interest tags, and outputs currently learning list items.
    function renderAbout() {
        var about = window.portfolioData && window.portfolioData.about;
        if (!about) return;

        bind('aboutDescription', about.description);

        // Block: Interests Tag Cloud Generator
        // Purpose: Renders playful scrapbook interest tags with alternating rotation angles.
        // What it does: Loops through interests array and applies alternating CSS custom property --rot (-1.5deg / 1deg).
        var interestsEl = document.getElementById('interests-list');
        if (interestsEl && about.interests) {
            interestsEl.innerHTML = '';
            about.interests.forEach(function (item, i) {
                var span = document.createElement('span');
                span.className = 'interest-tag';
                if (span.style && span.style.setProperty) {
                    span.style.setProperty('--rot', ((i % 2 === 0) ? '-1.5' : '1') + 'deg');
                }
                span.textContent = item;
                interestsEl.appendChild(span);
            });
        }

        // Block: Currently Learning Goals Generator
        // Purpose: Renders list of active technical study topics.
        // What it does: Maps learning goals into pills with coral arrow pointers.
        var learningEl = document.getElementById('learning-list');
        if (learningEl && about.learning) {
            learningEl.innerHTML = '';
            about.learning.forEach(function (item) {
                var div = document.createElement('div');
                div.className = 'learning-pill';
                div.innerHTML = '<span style="color:var(--coral);font-weight:700;margin-right:6px;">→</span>' + item;
                learningEl.appendChild(div);
            });
        }
    }

    /* ----------------------------------------
       Render skills
       ---------------------------------------- */
    // Block: Skills Dashboard Hook
    // Purpose: Triggers the dedicated skills dashboard renderer.
    // What it does: Calls window.renderSkillsDashboard() if available.
    function renderSkills() {
        if (window.renderSkillsDashboard) {
            window.renderSkillsDashboard();
        }
    }

    /* ----------------------------------------
       Render experience timeline
       ---------------------------------------- */
    // Block: Experience Timeline Renderer
    // Purpose: Builds the vertical milestone timeline in the Journey section.
    // What it does: Loops over portfolioData.experience to render dated cards with optional preview images.
    function renderTimeline() {
        var experience = window.portfolioData && window.portfolioData.experience;
        if (!experience || experience.length === 0) return;

        var container = document.getElementById('experience-timeline');
        if (!container) return;
        container.innerHTML = '';

        experience.forEach(function (item) {
            var block = document.createElement('div');
            block.className = 'timeline-block animate-on-scroll';

            // Block: Timeline Optional Thumbnail
            // Purpose: Checks if timeline milestone has an optional image attached.
            // What it does: Outputs preview image with lazy-loading and defensive error hiding if given.
            var imageHtml = '';
            if (item.image && item.image.trim() !== '') {
                var imgAlt = item.imageAlt || (item.title + ' preview');
                imageHtml = '<div class="timeline-image-wrapper" style="margin-bottom:var(--space-sm);border:var(--border-thin);overflow:hidden;max-height:160px;background:var(--paper-surface);">' +
                    '<img src="' + item.image.trim() + '" alt="' + imgAlt + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.parentElement.style.display=\'none\';">' +
                '</div>';
            }

            block.innerHTML =
                '<div class="timeline-date">' + (item.date || '') + '</div>' +
                '<div class="timeline-card">' +
                    imageHtml +
                    '<h4 style="margin-bottom:var(--space-xs);">' + item.title + '</h4>' +
                    (item.organization ? '<p style="font-family:var(--font-mono);font-size:0.8rem;color:var(--muted-grey);margin-bottom:var(--space-sm);">' + item.organization + '</p>' : '') +
                    (item.description ? '<p style="font-size:0.95rem;color:var(--charcoal);margin:0;">' + item.description + '</p>' : '') +
                '</div>';
            container.appendChild(block);
        });
    }

    /* ----------------------------------------
       Render current focus workspace
       ---------------------------------------- */
    // Block: Current Focus Workspace Renderer
    // Purpose: Renders priority focus cards in the right column of the Experience section.
    // What it does: Maps portfolioData.currentFocus items into cards with numerical IDs, titles, and colored status tags.
    function renderCurrentFocus() {
        var focusData = window.portfolioData && window.portfolioData.currentFocus;
        var container = document.getElementById('current-focus-list');
        if (!focusData || !container) return;

        container.innerHTML = '';
        focusData.forEach(function (item) {
            var el = document.createElement('div');
            el.className = 'focus-item-card';

            var tagClass = 'tag-acid';
            if (item.tagColor === 'coral') tagClass = 'tag-coral';
            else if (item.tagColor === 'sky') tagClass = 'tag-sky';

            el.innerHTML =
                '<div class="focus-item-top">' +
                    '<div class="focus-item-left">' +
                        '<span class="focus-item-id">' + (item.id || '●') + '</span>' +
                        '<h5 class="focus-item-title">' + (item.title || '') + '</h5>' +
                    '</div>' +
                    '<span class="focus-status-tag ' + tagClass + '">' + (item.status || 'Active') + '</span>' +
                '</div>' +
                '<p class="focus-item-desc">' + (item.description || '') + '</p>';

            container.appendChild(el);
        });
    }

    /* ----------------------------------------
       Render contact links
       ---------------------------------------- */
    // Block: Contact Links & Social Buttons Renderer
    // Purpose: Generates social network links and email buttons in the Contact section.
    // What it does: Checks configured URLs, appends styled SVG buttons, and displays plain-text mailto fallback.
    function renderContact() {
        var links = window.portfolioData && window.portfolioData.socialLinks;
        if (!links) return;

        var container = document.getElementById('contact-links');
        if (!container) return;
        container.innerHTML = '';

        var defs = [
            { key: 'github', label: 'GitHub', icon: socialIcons.github },
            { key: 'linkedin', label: 'LinkedIn', icon: socialIcons.linkedin },
            { key: 'twitter', label: 'Twitter / X', icon: socialIcons.twitter },
            { key: 'youtube', label: 'YouTube', icon: socialIcons.youtube }
        ];

        // Block: Social Links Injection
        // Purpose: Loops through social link definitions and injects anchor buttons.
        // What it does: Ignores empty URLs and appends interactive links opening in new tabs.
        defs.forEach(function (d) {
            var url = links[d.key];
            if (!url || url.trim() === '') return;
            var a = document.createElement('a');
            a.href = url;
            a.className = 'contact-btn';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.innerHTML = d.icon + ' ' + d.label;
            container.appendChild(a);
        });

        // Block: Email Contact Button
        // Purpose: Appends mailto button if email address is configured.
        // What it does: Adds direct mail button and updates the contact email fallback line.
        if (links.email && links.email.trim() !== '') {
            var emailBtn = document.createElement('a');
            emailBtn.href = 'mailto:' + links.email;
            emailBtn.className = 'contact-btn';
            emailBtn.innerHTML = socialIcons.email + ' Email Me';
            container.appendChild(emailBtn);
        }

        var emailLine = document.getElementById('contact-email-line');
        if (emailLine) {
            if (links.email && links.email.trim() !== '') {
                emailLine.innerHTML = 'or write to <a href="mailto:' + links.email + '" style="color:var(--acid-lime);text-decoration:underline;text-underline-offset:3px;">' + links.email + '</a>';
                emailLine.style.display = '';
            } else {
                emailLine.style.display = 'none';
            }
        }
    }

    /* ----------------------------------------
       Render footer
       ---------------------------------------- */
    // Block: Footer Metadata Renderer
    // Purpose: Injects copyright name and footer credit text.
    // What it does: Binds footerName and creditText to data-field elements and populates minimal social links.
    function renderFooter() {
        var data = window.portfolioData;
        if (!data) return;

        bind('footerName', data.profile.name);
        if (data.footer && data.footer.creditText) {
            bind('creditText', data.footer.creditText);
        }

        var footerSocial = document.getElementById('footer-social');
        if (footerSocial && data.socialLinks) {
            footerSocial.innerHTML = '';
            var ls = data.socialLinks;
            if (ls.github && ls.github.trim()) footerSocial.innerHTML += '<a href="' + ls.github + '" target="_blank" rel="noopener noreferrer" style="color:var(--muted-grey);transition:color 0.15s;">GitHub</a>';
            if (ls.linkedin && ls.linkedin.trim()) footerSocial.innerHTML += '<a href="' + ls.linkedin + '" target="_blank" rel="noopener noreferrer" style="color:var(--muted-grey);transition:color 0.15s;">LinkedIn</a>';
            if (ls.email && ls.email.trim()) footerSocial.innerHTML += '<a href="mailto:' + ls.email + '" style="color:var(--muted-grey);transition:color 0.15s;">Email</a>';
        }
    }

    /* ----------------------------------------
       Utility: bind data-field attributes
       ---------------------------------------- */
    // Block: Data-Field DOM Binding Utility
    // Purpose: Helper function to populate text into matching [data-field] selector elements.
    // What it does: Queries all elements with data-field="field" and sets their textContent.
    function bind(field, value) {
        document.querySelectorAll('[data-field="' + field + '"]').forEach(function (el) {
            el.textContent = value || '';
        });
    }

    /* ----------------------------------------
       INIT
       ---------------------------------------- */
    // Block: Master Initialization Coordinator
    // Purpose: Coordinates sequential rendering of all page sections.
    // What it does: Runs profile, about, skills, timeline, projects, interactions, and cursor setup.
    function init() {
        renderProfile();
        renderAbout();
        renderSkills();
        renderTimeline();
        renderCurrentFocus();
        renderContact();
        renderFooter();

        if (window.projectRenderer) window.projectRenderer.render();
        if (window.interactions) window.interactions.init();
        if (window.customCursor) window.customCursor.init();

        setTimeout(function () {
            if (window.customCursor && window.customCursor.refresh) window.customCursor.refresh();
        }, 200);
    }

    // Block: Application Startup Event Listener
    // Purpose: Boots the application as soon as the DOM tree is available.
    // What it does: Attaches init() to DOMContentLoaded or executes immediately if document is ready.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
