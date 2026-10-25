/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Custom Cursor Implementation
 * Detects dark sections (.bg-dark, .contact-box, .footer, .card-dark)
 * and toggles high-contrast neon styling automatically.
 * ===========================================
 */

/*
 * Block: Custom Cursor Module Wrapper
 * Purpose: Encapsulates adaptive dual-ring custom cursor tracking within an isolated IIFE.
 * What it does: Tracks pointer movement, smooths trailing motion, and adjusts cursor contrast dynamically.
 */
(function () {
    'use strict';

    /*
     * Block: Cursor State Variables
     * Purpose: Holds references to DOM cursor nodes and tracking coordinates.
     * What it does: Stores instantaneous mouse positions, smoothed trailing positions, and device enablement flags.
     */
    var cursorEl = null;
    var followerEl = null;
    var posX = 0, posY = 0;
    var mouseX = 0, mouseY = 0;
    var enabled = true;

    /*
     * Block: Custom Cursor Initialization
     * Purpose: Verifies device capabilities and creates cursor DOM elements.
     * What it does: Skips touchscreens and reduced-motion preferences, mounts cursor elements, and binds mouse listeners.
     */
    function init() {
        // Sub-block: Touch & Accessibility Guard
        // Purpose: Disables custom cursor on mobile touchscreens or when reduced-motion is requested.
        if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            enabled = false;
            return;
        }

        // Sub-block: Cursor DOM Element Injection
        // Purpose: Creates and appends the central dot and trailing follower ring to document body.
        cursorEl = document.createElement('div');
        cursorEl.className = 'custom-cursor';
        document.body.appendChild(cursorEl);

        followerEl = document.createElement('div');
        followerEl.className = 'custom-cursor-follower';
        document.body.appendChild(followerEl);

        // Sub-block: Event Listeners Binding
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        refresh();
        loop();
    }

    /*
     * Block: Mouse Movement & Real-time Background Contrast Detection
     * Purpose: Repositions the primary cursor dot and detects background luminosity underneath the pointer.
     * What it does: Applies 3D hardware-accelerated transforms and toggles .on-dark neon styling over dark sections.
     */
    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorEl) {
            cursorEl.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0)';
        }

        // Sub-block: Dynamic Contrast Detector
        // Purpose: Samples DOM element directly below cursor coordinates.
        // What it does: Checks for dark containers (.bg-dark, .contact-box, modal backdrops) and inverts cursor colors.
        var target = document.elementFromPoint(mouseX, mouseY);
        if (target && cursorEl && followerEl) {
            var isOverModalContent = target.closest('.project-modal-container');
            var darkContainer = !isOverModalContent && target.closest('.project-modal-overlay, .bg-dark, .contact-box, .footer, .card-dark');
            if (darkContainer) {
                cursorEl.classList.add('on-dark');
                followerEl.classList.add('on-dark');
            } else {
                cursorEl.classList.remove('on-dark');
                followerEl.classList.remove('on-dark');
            }
        }
    }

    /*
     * Block: Mouse Down Click Handler
     * Purpose: Provides physical haptic feedback when user clicks the mouse button.
     * What it does: Adds the .active class to contract the follower ring tightly around the cursor dot.
     */
    function onMouseDown() {
        if (cursorEl) cursorEl.classList.add('active');
        if (followerEl) followerEl.classList.add('active');
    }

    /*
     * Block: Mouse Up Release Handler
     * Purpose: Restores cursor dimensions when mouse click is released.
     * What it does: Removes the .active class to allow the follower ring to expand back to normal size.
     */
    function onMouseUp() {
        if (cursorEl) cursorEl.classList.remove('active');
        if (followerEl) followerEl.classList.remove('active');
    }

    /*
     * Block: Smooth Animation Frame Lerp Loop
     * Purpose: Drives the fluid physics-based motion of the follower ring.
     * What it does: Performs linear interpolation (lerp) toward the target coordinate on every display refresh.
     */
    function loop() {
        if (!enabled) return;

        // Linear interpolation for smooth trailing follower
        posX += (mouseX - posX) * 0.18;
        posY += (mouseY - posY) * 0.18;

        if (followerEl) {
            followerEl.style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0)';
        }

        requestAnimationFrame(loop);
    }

    /*
     * Block: Interactive Hover Element Binder
     * Purpose: Connects custom cursor expansion animations to clickable elements across the site.
     * What it does: Queries links, buttons, cards, and modal triggers to enlarge the cursor on hover.
     */
    function refresh() {
        if (!enabled) return;

        var selectors = 'a, button, .project-card, .domain-preview-card, .skill-pill, .interest-tag, .project-modal-close, .project-action-link, .toolbox-chip, .term-chip';
        document.querySelectorAll(selectors).forEach(function (el) {
            if (el.dataset.cursorBound) return;
            el.dataset.cursorBound = 'true';

            el.addEventListener('mouseenter', function () {
                if (cursorEl) cursorEl.classList.add('hover');
                if (followerEl) followerEl.classList.add('hover');
            });

            el.addEventListener('mouseleave', function () {
                if (cursorEl) cursorEl.classList.remove('hover');
                if (followerEl) followerEl.classList.remove('hover');
            });
        });
    }

    /*
     * Block: Public Custom Cursor API Export
     * Purpose: Exposes cursor controls on the global window object.
     * What it does: Allows other dynamic scripts (projects, terminal, arcade) to trigger cursor hover rebinding.
     */
    window.customCursor = {
        init: init,
        refresh: refresh
    };

    /*
     * Block: Lifecycle DOM Ready Dispatcher
     * Purpose: Automatically starts the custom cursor once the HTML document is ready.
     * What it does: Hooks into DOMContentLoaded or initializes immediately if already complete.
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
