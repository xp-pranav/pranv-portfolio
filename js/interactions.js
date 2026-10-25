/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Interactions, Animations & Tab Switching
 * ===========================================
 */

/*
 * Block: Interactions Module Wrapper
 * Purpose: Isolates UI interaction handlers within an immediate execution scope.
 * What it does: Manages tab switching, mobile navigation drawer, scroll animations, and active nav link highlights.
 */
(function () {
    'use strict';

    /*
     * Block: Tab Switching Manager
     * Purpose: Controls tab switching between Coding, Video Editing, and Automation project showcases.
     * What it does: Updates ARIA selection attributes, toggles CSS visibility, and adapts grid layouts dynamically.
     */
    function initTabs() {
        var tabs = document.querySelectorAll('.project-tab');
        var panels = {
            coding: document.getElementById('coding-projects'),
            video: document.getElementById('video-projects'),
            automation: document.getElementById('automation-projects')
        };

        if (tabs.length === 0) return;

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = tab.getAttribute('data-tab');

                // Sub-block: Tab Buttons State Update
                // Purpose: Updates visual styling and accessibility attributes for active tab button.
                tabs.forEach(function (t) {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                // Sub-block: Project Panels Visibility Toggle
                // Purpose: Shows the selected project category panel and hides inactive panels.
                Object.keys(panels).forEach(function (key) {
                    var panel = panels[key];
                    if (!panel) return;
                    if (key === target) {
                        if (key === 'coding') {
                            panel.style.display = 'grid';
                            panel.style.gridTemplateColumns = 'repeat(auto-fill,minmax(min(340px,100%),1fr))';
                            panel.style.gap = 'var(--space-xl)';
                        } else {
                            panel.style.display = 'block';
                            panel.style.gridTemplateColumns = '';
                            panel.style.gap = '';
                        }
                        panel.classList.add('active');
                    } else {
                        panel.style.display = 'none';
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }

    /*
     * Block: Mobile Navigation Controller
     * Purpose: Powers the responsive mobile hamburger drawer menu.
     * What it does: Handles open/close state transitions, aria-expanded flags, and keyboard dismissal.
     */
    function initMobileNav() {
        var toggle = document.querySelector('.nav-toggle');
        var links = document.getElementById('nav-links');

        if (!toggle || !links) return;

        /*
         * Block: Navigation Drawer Closer
         * Purpose: Closes the active mobile menu overlay.
         * What it does: Resets aria-expanded to false, removes active CSS classes, and restores document body scroll.
         */
        function closeNav() {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.classList.remove('active');
            links.classList.remove('active');
            document.body.classList.remove('nav-open');
        }

        /*
         * Block: Navigation Drawer Opener
         * Purpose: Expands the full-screen mobile menu overlay.
         * What it does: Sets aria-expanded to true, applies active CSS classes, and locks body scroll.
         */
        function openNav() {
            toggle.setAttribute('aria-expanded', 'true');
            toggle.classList.add('active');
            links.classList.add('active');
            document.body.classList.add('nav-open');
        }

        // Sub-block: Toggle Button Click Listener
        toggle.addEventListener('click', function () {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Sub-block: Auto-Close On Navigation Link Click
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeNav);
        });

        // Sub-block: Escape Key Drawer Dismissal
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeNav();
            }
        });
    }

    /*
     * Block: Scroll Reveal Animations
     * Purpose: Progressively fades in sections and cards as they enter the browser viewport.
     * What it does: Utilizes IntersectionObserver for performant, hardware-accelerated scroll-triggered reveals.
     */
    function initScrollAnimations() {
        var observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        var observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
            observer.observe(el);
        });
    }

    /*
     * Block: Active Navigation Scroll Spy
     * Purpose: Automatically synchronizes navigation links with the user's current scroll position.
     * What it does: Calculates section offsets and highlights the matching navigation anchor tag.
     */
    function initActiveNavSpy() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0 || navLinks.length === 0) return;

        window.addEventListener('scroll', function () {
            var scrollY = window.pageYOffset;

            sections.forEach(function (current) {
                var sectionHeight = current.offsetHeight;
                var sectionTop = current.offsetTop - 100;
                var sectionId = current.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { passive: true });
    }

    /*
     * Block: Global Interactions API Export
     * Purpose: Exposes unified initialization hook on window.interactions.
     * What it does: Bundles tab initialization, mobile navigation, scroll reveal, and nav spy into a single method.
     */
    window.interactions = {
        init: function () {
            initTabs();
            initMobileNav();
            initScrollAnimations();
            initActiveNavSpy();
        }
    };
})();
