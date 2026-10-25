/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Bug Hunter Mini-Game Logic (Vanilla JS)
 * ===========================================
 */

/*
 * Block: Mini-Game Module Wrapper
 * Purpose: Encapsulates Bug Hunter arcade gameplay logic within an isolated IIFE.
 * What it does: Prevents variable collisions with other scripts and isolates game loop timers.
 */
(function () {
    'use strict';

    /*
     * Block: Game State Variables
     * Purpose: Holds the active state of the 30-second arcade mini-game.
     * What it does: Tracks active intervals, remaining countdown seconds, player score, and game play status.
     */
    var gameInterval = null;
    var spawnInterval = null;
    var timeLeft = 30;
    var score = 0;
    var isPlaying = false;

    /*
     * Block: Mini-Game Initialization
     * Purpose: Locates the hero arcade wrapper container on page load.
     * What it does: Renders the default idle arcade state with scrapbook badges and start button.
     */
    function initMiniGame() {
        var wrapper = document.getElementById('hero-arcade-wrapper');
        if (!wrapper) return;

        renderIdleState(wrapper);
    }

    /*
     * Block: Idle State Renderer
     * Purpose: Displays the hero arcade waiting screen before a user starts playing.
     * What it does: Resets timers, clears playfields, and renders decorative geometric accents, stickers, and the PLAY button.
     */
    function renderIdleState(container) {
        isPlaying = false;
        clearInterval(gameInterval);
        clearInterval(spawnInterval);

        container.innerHTML =
            '<div class="arcade-idle-container" id="arcade-idle">' +
                '<!-- Subtle background connectors -->' +
                '<svg class="arcade-connectors-svg" viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M 60 70 Q 200 120 200 180" stroke="#141412" stroke-width="2" stroke-dasharray="4 4" />' +
                    '<path d="M 330 80 Q 250 140 200 180" stroke="#141412" stroke-width="2" stroke-dasharray="4 4" />' +
                    '<path d="M 70 280 Q 150 240 200 180" stroke="#141412" stroke-width="2" stroke-dasharray="4 4" />' +
                    '<path d="M 330 270 Q 260 230 200 180" stroke="#141412" stroke-width="2" stroke-dasharray="4 4" />' +
                '</svg>' +

                '<!-- Geometric accents -->' +
                '<div class="arcade-geo-dots"></div>' +
                '<div class="arcade-geo-ring"></div>' +
                '<div class="arcade-geo-cross">+</div>' +

                '<!-- Floating developer & bug badges -->' +
                '<div class="arcade-float-badge badge-bug-py"><span>🐛</span> bug.py:42</div>' +
                '<div class="arcade-float-badge badge-404"><span>🐞</span> 404: bug_found</div>' +
                '<div class="arcade-float-badge badge-syntax-err"><span>⚡</span> SyntaxError</div>' +
                '<div class="arcade-float-badge badge-null-ptr"><span>👾</span> null_pointer</div>' +

                '<!-- Scrapbook stickers -->' +
                '<div class="arcade-sticker-hunter">🐛 Bug Hunter</div>' +
                '<div class="arcade-sticker-blitz">30s Sprint ⚡</div>' +

                '<!-- Central PLAY GAME button trigger -->' +
                '<div class="arcade-play-trigger-wrap">' +
                    '<button class="btn-play-game" id="arcade-start-btn" aria-label="Start Bug Hunter Mini-Game">' +
                        '<span>▶ PLAY GAME</span>' +
                    '</button>' +
                    '<div class="arcade-trigger-subtext">Click to start 30s bug hunt</div>' +
                '</div>' +
            '</div>';

        // Sub-block: Start Game Button Listener
        var startBtn = document.getElementById('arcade-start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', startActiveGame);
        }

        // Sub-block: Cursor Hover Refresh
        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    /*
     * Block: Active Game Start Handler
     * Purpose: Transitions the arcade component into the active gameplay state.
     * What it does: Resets score to 0, starts the 30-second countdown, mounts the playfield, and schedules bug spawns.
     */
    function startActiveGame() {
        var container = document.getElementById('hero-arcade-wrapper');
        if (!container) return;

        isPlaying = true;
        timeLeft = 30;
        score = 0;

        container.innerHTML =
            '<div class="arcade-game-container" id="arcade-active">' +
                '<div class="arcade-game-header">' +
                    '<div class="arcade-stat-item">SCORE: <span class="arcade-stat-value" id="arcade-score">0</span></div>' +
                    '<div class="arcade-stat-item">TIME: <span class="arcade-stat-value" id="arcade-time">30s</span></div>' +
                    '<button class="arcade-close-btn" id="arcade-exit-btn" aria-label="Close game and return to portfolio">✕ Exit</button>' +
                '</div>' +
                '<div class="arcade-playfield" id="arcade-playfield" aria-label="Game play area"></div>' +
            '</div>';

        // Sub-block: Exit Game Button Listener
        document.getElementById('arcade-exit-btn').addEventListener('click', function () {
            renderIdleState(container);
        });

        var playfield = document.getElementById('arcade-playfield');

        // Sub-block: 30-Second Countdown Timer Loop
        // Purpose: Decrements the remaining game time once per second.
        // What it does: Updates the timer readout and triggers game over when timeLeft hits 0.
        gameInterval = setInterval(function () {
            timeLeft--;
            var timeEl = document.getElementById('arcade-time');
            if (timeEl) timeEl.textContent = timeLeft + 's';

            if (timeLeft <= 0) {
                endActiveGame(container);
            }
        }, 1000);

        // Sub-block: Adaptive Bug Spawn Scheduler
        // Purpose: Modulates bug appearance frequency based on player score.
        // What it does: Decreases delay between spawns as score increases, adding progressive difficulty.
        function scheduleNextSpawn() {
            if (!isPlaying) return;
            var delay = Math.max(450, 950 - Math.floor(score / 30) * 100);
            spawnInterval = setTimeout(function () {
                spawnBug(playfield);
                scheduleNextSpawn();
            }, delay);
        }

        spawnBug(playfield);
        scheduleNextSpawn();

        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    /*
     * Block: Dynamic Bug Spawning Engine
     * Purpose: Creates and positions a bug target within the bounding box of the playfield.
     * What it does: Calculates random collision-safe coordinates, injects emoji sprites, and handles click/touch catch events.
     */
    function spawnBug(playfield) {
        if (!isPlaying || !playfield) return;

        var rect = playfield.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        var bugEl = document.createElement('div');
        bugEl.className = 'bug-target';
        bugEl.setAttribute('role', 'button');
        bugEl.setAttribute('aria-label', 'Catch bug');
        bugEl.setAttribute('tabindex', '0');

        // Sub-block: Boundary-Safe Coordinate Calculation
        var minX = 40;
        var maxX = Math.max(minX + 10, rect.width - 40);
        var minY = 40;
        var maxY = Math.max(minY + 10, rect.height - 40);

        var posX = Math.random() * (maxX - minX) + minX;
        var posY = Math.random() * (maxY - minY) + minY;

        bugEl.style.left = posX + 'px';
        bugEl.style.top = posY + 'px';

        var bugEmojis = ['🐛', '🐞', '👾', '🐜', '⚡'];
        bugEl.textContent = bugEmojis[Math.floor(Math.random() * bugEmojis.length)];

        /*
         * Block: Bug Catch & Score Handler
         * Purpose: Responds to mouse click or keyboard activation on a spawned bug.
         * What it does: Increments score by 10, triggers burst animation, updates HUD readout, and removes the node.
         */
        function catchBug(e) {
            e.stopPropagation();
            if (!isPlaying || bugEl.dataset.caught) return;
            bugEl.dataset.caught = 'true';

            score += 10;
            var scoreEl = document.getElementById('arcade-score');
            if (scoreEl) scoreEl.textContent = score;

            // Catch burst animation
            bugEl.style.transform = 'translate(-50%, -50%) scale(1.35)';
            bugEl.style.backgroundColor = 'var(--coral)';
            bugEl.style.opacity = '0';

            setTimeout(function () {
                if (bugEl.parentNode) bugEl.parentNode.removeChild(bugEl);
            }, 180);
        }

        bugEl.addEventListener('click', catchBug);
        bugEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                catchBug(e);
            }
        });

        playfield.appendChild(bugEl);

        // Sub-block: Auto-Despawn Timeout
        // Purpose: Removes uncaught bugs after 2.2 seconds to keep the playfield clear.
        setTimeout(function () {
            if (bugEl.parentNode && !bugEl.dataset.caught) {
                bugEl.parentNode.removeChild(bugEl);
            }
        }, 2200);
    }

    /*
     * Block: Game Over State Handler
     * Purpose: Halts gameplay and displays the final score summary overlay.
     * What it does: Clears game timers, renders the score billboard, and provides buttons to replay or return to portfolio.
     */
    function endActiveGame(container) {
        isPlaying = false;
        clearInterval(gameInterval);
        clearTimeout(spawnInterval);

        var playfield = document.getElementById('arcade-playfield');
        if (!playfield) return;

        playfield.innerHTML = '';

        var overlay = document.createElement('div');
        overlay.className = 'arcade-game-over-overlay';
        overlay.innerHTML =
            '<h3>GAME OVER</h3>' +
            '<p>You caught the bugs and scored <span style="color:var(--acid-lime);font-weight:700;font-size:1.4rem;">' + score + '</span> points!</p>' +
            '<button class="btn-play-game" id="arcade-replay-btn" style="font-size:1.4rem;padding:12px 28px;">' +
                '<span>▶ PLAY AGAIN</span>' +
            '</button>' +
            '<button class="arcade-close-btn" id="arcade-back-btn" style="margin-top:var(--space-md);padding:6px 16px;font-size:0.8rem;">' +
                '← Back to Portfolio' +
            '</button>';

        playfield.appendChild(overlay);

        document.getElementById('arcade-replay-btn').addEventListener('click', startActiveGame);
        document.getElementById('arcade-back-btn').addEventListener('click', function () {
            renderIdleState(container);
        });

        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    /*
     * Block: Lifecycle DOM Ready Dispatcher
     * Purpose: Boots the mini-game component once document markup is parsed.
     * What it does: Hooks into DOMContentLoaded or invokes immediately if document has loaded.
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMiniGame);
    } else {
        initMiniGame();
    }
})();
