/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Interactive Terminal (PRANAV.EXE v4.0)
 * Pure Vanilla JavaScript — Zero Dependencies
 * ===========================================
 */

/*
 * Block: Terminal Module Wrapper
 * Purpose: Encapsulates terminal logic within an immediately invoked function expression (IIFE).
 * What it does: Prevents variable leakage into the global scope and enforces strict JavaScript runtime execution.
 */
(function () {
    'use strict';

    /*
     * Block: Terminal Initialization
     * Purpose: Locates terminal DOM elements and binds input handling and command routing.
     * What it does: Sets up the CLI emulator, suggestions bar, and registers interactive terminal commands.
     */
    function initTerminal() {
        var form = document.getElementById('terminal-form');
        var input = document.getElementById('terminal-input');
        var output = document.getElementById('terminal-output');
        var suggestions = document.getElementById('terminal-suggestions');

        // Block: Element Guard Clause
        // Purpose: Ensures critical terminal DOM nodes exist before running listeners.
        // What it does: Exits early if the terminal form or inputs are missing from the page.
        if (!form || !input || !output) return;

        /*
         * Block: Command Handlers Map
         * Purpose: Dictionary associating CLI command names with dynamic HTML generation functions.
         * What it does: Routes user inputs ('about', 'skills', 'projects', 'journey', 'clear', 'help') to respective formatters.
         */
        var commands = {
            /*
             * Block: 'help' Command
             * Purpose: Displays the full list of available terminal commands.
             * What it does: Formats a clean monospace table of supported commands and brief explanations.
             */
            help: function () {
                return '<div class="term-res-block">' +
                    '<div class="term-res-heading">AVAILABLE COMMANDS:</div>' +
                    '<div class="term-res-table">' +
                        '<div><span class="term-highlight">about</span>    — Developer background, status &amp; bio</div>' +
                        '<div><span class="term-highlight">skills</span>   — Technical toolkit with honest proficiencies</div>' +
                        '<div><span class="term-highlight">projects</span> — Coding, Video &amp; AI/Automation projects</div>' +
                        '<div><span class="term-highlight">journey</span>  — Milestones &amp; learning timeline</div>' +
                        '<div><span class="term-highlight">clear</span>    — Reset terminal console</div>' +
                    '</div>' +
                '</div>';
            },

            /*
             * Block: 'about' Command
             * Purpose: Retrieves personal developer identity data from portfolioData.profile.
             * What it does: Prints the developer name, role, geographic location, availability badge, and philosophy quote.
             */
            about: function () {
                var p = (window.portfolioData && window.portfolioData.profile) || {};
                var intro = p.introduction || "Developer & creative technologist building things for the web.";
                return '<div class="term-res-block">' +
                    '<div class="term-res-heading">IDENTITY PROFILE:</div>' +
                    '<div><strong>Name:</strong> ' + (p.name || 'Pranav Sharma') + '</div>' +
                    '<div><strong>Role:</strong> ' + (p.role || 'Developer & AI Explorer') + '</div>' +
                    '<div><strong>Location:</strong> ' + (p.location || 'India') + '</div>' +
                    '<div><strong>Status:</strong> <span class="term-badge-acid">' + (p.status || 'Available') + '</span></div>' +
                    '<div style="margin-top:8px;line-height:1.6;color:var(--warm-white);font-style:italic;">&ldquo;' + intro + '&rdquo;</div>' +
                '</div>';
            },

            /*
             * Block: 'skills' Command
             * Purpose: Queries window.portfolioData.skills and groups entries by category.
             * What it does: Formats and prints skills categorized under Programming, Frontend, Tools, Video, and Automation.
             */
            skills: function () {
                var skills = (window.portfolioData && window.portfolioData.skills) || [];
                if (skills.length === 0) return '<div>No skills data available.</div>';

                var categories = {};
                skills.forEach(function (s) {
                    if (!categories[s.category]) categories[s.category] = [];
                    categories[s.category].push(s);
                });

                var html = '<div class="term-res-block"><div class="term-res-heading">TOOLKIT &amp; PROFICIENCIES:</div>';
                Object.keys(categories).forEach(function (cat) {
                    html += '<div style="margin-top:6px;"><span class="term-highlight">[' + cat + ']</span> ';
                    var items = categories[cat].map(function (s) {
                        return s.name + ' <span style="opacity:0.65;font-size:0.75rem;">(' + s.status + ')</span>';
                    });
                    html += items.join(', ') + '</div>';
                });
                html += '</div>';
                return html;
            },

            /*
             * Block: 'projects' Command
             * Purpose: Summarizes portfolio projects across Coding, Video Editing, and Automation domains.
             * What it does: Outputs formatted bullet lists of project titles, descriptions, and a navigational hint.
             */
            projects: function () {
                var data = (window.portfolioData && window.portfolioData.projects) || {};
                var html = '<div class="term-res-block"><div class="term-res-heading">PROJECT CATALOGUE:</div>';

                // Sub-block: Coding Projects List
                if (data.coding && data.coding.length > 0) {
                    html += '<div style="margin-top:6px;"><span class="term-highlight">[Coding &amp; Web Dev]</span></div>';
                    data.coding.forEach(function (c) {
                        html += '<div style="padding-left:12px;">• <strong>' + c.title + '</strong> — ' + (c.subtitle || c.description) + '</div>';
                    });
                }

                // Sub-block: Video Editing Projects List
                if (data.videoEditing && data.videoEditing.items) {
                    html += '<div style="margin-top:6px;"><span class="term-highlight">[Video Editing &amp; Motion]</span></div>';
                    data.videoEditing.items.forEach(function (v) {
                        html += '<div style="padding-left:12px;">• <strong>' + v.title + '</strong> — ' + v.description + '</div>';
                    });
                }

                // Sub-block: Automation Projects List
                if (data.automation && data.automation.items) {
                    html += '<div style="margin-top:6px;"><span class="term-highlight">[AI &amp; Automation]</span></div>';
                    data.automation.items.forEach(function (a) {
                        html += '<div style="padding-left:12px;">• <strong>' + a.title + '</strong> — ' + a.description + '</div>';
                    });
                }

                html += '<div style="margin-top:8px;font-size:0.8rem;opacity:0.7;">Tip: Explore the Work section above for interactive deep dive modals.</div></div>';
                return html;
            },

            /*
             * Block: 'journey' Command
             * Purpose: Extracts milestone entries from window.portfolioData.experience.
             * What it does: Formats chronological career and learning milestones into an editorial terminal feed.
             */
            journey: function () {
                var exp = (window.portfolioData && window.portfolioData.experience) || [];
                if (exp.length === 0) return '<div>No timeline data available.</div>';

                var html = '<div class="term-res-block"><div class="term-res-heading">MILESTONES &amp; JOURNEY:</div>';
                exp.forEach(function (e) {
                    html += '<div style="margin-top:6px;">' +
                        '<span class="term-highlight">[' + (e.date || '') + ']</span> ' +
                        '<strong>' + e.title + '</strong>' +
                        (e.organization ? ' — <span style="opacity:0.8;">' + e.organization + '</span>' : '') +
                        '<div style="padding-left:12px;font-size:0.85rem;opacity:0.85;line-height:1.5;">' + (e.description || '') + '</div>' +
                    '</div>';
                });
                html += '</div>';
                return html;
            },

            /*
             * Block: 'clear' Command
             * Purpose: Clears all historical input/output lines from the terminal body.
             * What it does: Resets terminal output element innerHTML to an empty string.
             */
            clear: function () {
                output.innerHTML = '';
                return null;
            }
        };

        /*
         * Block: Command Execution Engine
         * Purpose: Parses submitted user commands and appends input echos and responses to the terminal stream.
         * What it does: Dispatches known commands, returns error messages for unrecognized inputs, and scrolls to bottom.
         */
        function executeCommand(rawCmd) {
            var cmd = (rawCmd || '').trim().toLowerCase();
            if (!cmd) return;

            // Sub-block: Command Echoing
            // Purpose: Prints the user's typed command with a retro terminal prompt prefix.
            var echoEl = document.createElement('div');
            echoEl.className = 'terminal-line';
            echoEl.innerHTML = '<span class="term-prompt">guest@pranav:~$</span> <span class="term-cmd">' + escapeHtml(rawCmd.trim()) + '</span>';
            output.appendChild(echoEl);

            // Sub-block: Command Execution & Error Boundary
            // Purpose: Executes the matched command or prints an error message.
            if (commands.hasOwnProperty(cmd)) {
                var result = commands[cmd]();
                if (result !== null) {
                    var resEl = document.createElement('div');
                    resEl.className = 'terminal-response';
                    resEl.innerHTML = result;
                    output.appendChild(resEl);
                }
            } else {
                var errEl = document.createElement('div');
                errEl.className = 'terminal-response term-error';
                errEl.innerHTML = 'command not found: <span class="term-highlight">' + escapeHtml(rawCmd.trim()) + '</span>. Type <span class="term-highlight">help</span> or click a suggestion below.';
                output.appendChild(errEl);
            }

            // Sub-block: Auto-Scroll to Bottom
            // Purpose: Ensures newest output is always visible after running commands.
            output.scrollTop = output.scrollHeight;

            // Sub-block: Custom Cursor Refresh
            // Purpose: Updates hover listeners for dynamically generated buttons and links.
            if (window.customCursor && window.customCursor.refresh) {
                window.customCursor.refresh();
            }
        }

        /*
         * Block: HTML Sanitization Helper
         * Purpose: Escapes untrusted user input before injecting into DOM innerHTML.
         * What it does: Converts special characters (&, <, >, ", ') into safe HTML entities to prevent XSS.
         */
        function escapeHtml(str) {
            var div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        /*
         * Block: Terminal Form Submit Listener
         * Purpose: Intercepts CLI form submission events.
         * What it does: Prevents page reload, extracts input value, clears the textfield, and executes the command.
         */
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var val = input.value;
            input.value = '';
            executeCommand(val);
        });

        /*
         * Block: Suggestion Chips Click Listener
         * Purpose: Enables one-click command execution for mobile users and quick browsing.
         * What it does: Reads data-cmd attribute from clicked chip and passes it directly to executeCommand.
         */
        if (suggestions) {
            suggestions.addEventListener('click', function (e) {
                var btn = e.target.closest('.term-chip');
                if (!btn) return;
                var cmd = btn.getAttribute('data-cmd');
                if (cmd) {
                    input.value = cmd;
                    executeCommand(cmd);
                    input.value = '';
                }
            });
        }
    }

    /*
     * Block: Lifecycle DOM Ready Dispatcher
     * Purpose: Ensures terminal initializes only after DOM elements are fully loaded.
     * What it does: Listens for DOMContentLoaded or executes immediately if document is already ready.
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTerminal);
    } else {
        initTerminal();
    }
})();
