// Sound Synthesizer (Web Audio API)
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let isMuted = false;

function playSound(type) {
    if (isMuted) return;
    try {
        if (!audioCtx) audioCtx = new AudioCtx();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;
        if (type === 'click') {
            osc.frequency.setValueAtTime(400, now);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
            osc.start(now);
            osc.stop(now + 0.03);
        } else if (type === 'combo') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.setValueAtTime(900, now + 0.06);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        } else if (type === 'boss_step') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.08);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.setValueAtTime(659.25, now + 0.08);
            osc.frequency.setValueAtTime(783.99, now + 0.16);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.setValueAtTime(120, now + 0.08);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        }
    } catch (e) { }
}

function toggleMute() {
    isMuted = !isMuted;
    document.getElementById("soundIcon").className = isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
}

// OS State Switcher (Windows vs macOS)
let currentOS = "WIN"; // 'WIN' or 'MAC'

function toggleOS() {
    currentOS = currentOS === "WIN" ? "MAC" : "WIN";
    const btn = document.getElementById("osToggleBtn");
    const label = document.getElementById("osLabel");
    const icon = document.getElementById("osIcon");
    const modLeft = document.getElementById("key-ModifierLeft");
    const modRight = document.getElementById("key-ModifierRight");

    if (currentOS === "MAC") {
        label.innerText = "macOS (Cmd ⌘)";
        icon.className = "fa-brands fa-apple";
        modLeft.innerText = "Cmd ⌘";
        modRight.innerText = "Cmd ⌘";
    } else {
        label.innerText = "Windows (Ctrl)";
        icon.className = "fa-brands fa-windows";
        modLeft.innerText = "Ctrl";
        modRight.innerText = "Ctrl";
    }

    playSound("click");
    loadLevel(currentLevelIndex);
}

function getModName() {
    return currentOS === "MAC" ? "Cmd" : "Ctrl";
}

// Speedrun Timer & Combo System
let timerInterval = null;
let timeLeft = 30.0;
const LEVEL_TIME_LIMIT = 30.0;

let lastKeyPressTime = 0;
let comboCount = 0;
let comboMultiplier = 1;

function startSpeedrunTimer() {
    clearInterval(timerInterval);
    timeLeft = LEVEL_TIME_LIMIT;
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(timerInterval);
            handleTimeOut();
        }
        updateTimerUI();
    }, 100);
}

function updateTimerUI() {
    document.getElementById("timerText").innerText = `${timeLeft.toFixed(1)}s`;
    const percent = (timeLeft / LEVEL_TIME_LIMIT) * 100;
    const bar = document.getElementById("timerBar");
    bar.style.width = `${percent}%`;

    if (percent < 25) {
        bar.style.background = "#ff0055";
    } else if (percent < 50) {
        bar.style.background = "#ffb800";
    } else {
        bar.style.background = "linear-gradient(90deg, #00ff9d, #00c3ff)";
    }
}

function handleTimeOut() {
    playSound("error");
    updateStatus("Time's up! Speedrun failed. Click Reset to try again.", "error");
}

function registerComboHit() {
    const now = Date.now();
    if (now - lastKeyPressTime < 1500) {
        comboCount++;
        if (comboCount >= 4) comboMultiplier = 5;
        else if (comboCount >= 2) comboMultiplier = 3;
        else comboMultiplier = 2;

        showComboFloater(`COMBO x${comboMultiplier}!`);
        playSound("combo");
    } else {
        comboCount = 1;
        comboMultiplier = 1;
    }
    lastKeyPressTime = now;
    updateComboBadge();
}

function resetCombo() {
    comboCount = 0;
    comboMultiplier = 1;
    updateComboBadge();
}

function updateComboBadge() {
    const badge = document.getElementById("comboBadge");
    badge.innerHTML = `<i class="fa-solid fa-bolt"></i> ${comboMultiplier}x COMBO`;
    if (comboMultiplier > 1) {
        badge.classList.add("active-combo");
    } else {
        badge.classList.remove("active-combo");
    }
}

function showComboFloater(text) {
    const el = document.getElementById("comboFloater");
    el.innerText = text;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 800);
}

// Game State & Level Definitions
let currentLevelIndex = 0;
let userXP = 0;
let pressedKeys = new Set();
let lastTriggeredAction = "";

// Boss Combo Chain State
let currentBossStep = 0;

const levels = [
    {
        id: 1,
        title: "Mission 1: The Copy Scroll",
        docTitle: "Secret_Technique.txt",
        getTask: () => `Select text below and press <strong>${getModName()} + C</strong> to copy it.`,
        hint: `Highlight text in editor, hold ${getModName()} and press C.`,
        initialHTML: "SHADOW_STEALTH_TECHNIQUE_8923",
        requiredShortcut: "COPY",
        validate: () => lastTriggeredAction === "COPY"
    },
    {
        id: 2,
        title: "Mission 2: Paste the Scroll",
        docTitle: "Destination_Scroll.txt",
        getTask: () => `Click inside box and press <strong>${getModName()} + V</strong> to paste.`,
        hint: `Click editor box and press ${getModName()} + V.`,
        initialHTML: "Paste copied scroll here -> ",
        requiredShortcut: "PASTE",
        validate: () => lastTriggeredAction === "PASTE" || document.getElementById("editor").innerText.includes("SHADOW")
    },
    {
        id: 3,
        title: "Mission 3: Undo Corruption",
        docTitle: "Scroll_Recovery.txt",
        getTask: () => `The scroll was corrupted! Press <strong>${getModName()} + Z</strong> to undo.`,
        hint: `Press ${getModName()} + Z to restore initial text.`,
        initialHTML: "CORRUPTED_POISON_DATA_ERROR!",
        requiredShortcut: "UNDO",
        validate: () => lastTriggeredAction === "UNDO"
    },
    {
        id: 4,
        title: "Mission 4: Select All Scrolls",
        docTitle: "Scroll_Vault.txt",
        getTask: () => `Press <strong>${getModName()} + A</strong> to highlight all technique scrolls.`,
        hint: `Click editor text and press ${getModName()} + A.`,
        initialHTML: "Scroll 1: Fireball\nScroll 2: Shadow Step\nScroll 3: Wind Blade\nScroll 4: Water Shield",
        requiredShortcut: "SELECT_ALL",
        validate: () => lastTriggeredAction === "SELECT_ALL"
    },
    {
        id: 5,
        title: "Mission 5: Cut and Relocate",
        docTitle: "Key_Relocation.txt",
        getTask: () => `Highlight 'GOLDEN_KEY' and press <strong>${getModName()} + X</strong> to cut it.`,
        hint: `Highlight 'GOLDEN_KEY' and press ${getModName()} + X.`,
        initialHTML: "Remove this item: GOLDEN_KEY",
        requiredShortcut: "CUT",
        validate: () => lastTriggeredAction === "CUT"
    },
    {
        id: 6,
        title: "Mission 6: Save the Scroll",
        docTitle: "Ancient_Mastery.txt",
        getTask: () => `Save progress! Press <strong>${getModName()} + S</strong>.`,
        hint: `Press ${getModName()} + S to save scroll.`,
        initialHTML: "Master Level Ninja Document - Status: Unsaved",
        requiredShortcut: "SAVE",
        validate: () => lastTriggeredAction === "SAVE"
    },
    {
        id: 7,
        title: "Mission 7: Bold Formatting",
        docTitle: "Header_Format.txt",
        getTask: () => `Select text and press <strong>${getModName()} + B</strong> to make it Bold.`,
        hint: `Highlight text and press ${getModName()} + B.`,
        initialHTML: "NINJA MASTER TECHNIQUE",
        requiredShortcut: "BOLD",
        validate: () => lastTriggeredAction === "BOLD" || document.queryCommandState("bold")
    },
    {
        id: 8,
        title: "Mission 8: Redo Restore",
        docTitle: "Tab_Manager.sys",
        getTask: () => `Restore deleted memory! Press <strong>${getModName()} + Shift + Z</strong>.`,
        hint: `Hold ${getModName()} + Shift and press Z.`,
        initialHTML: "[DELETED DATA] - Press restore shortcut.",
        requiredShortcut: "REDO",
        validate: () => lastTriggeredAction === "REDO"
    },
    {
        id: 9,
        title: "Mission 9: Command Palette",
        docTitle: "Command_Center.sys",
        getTask: () => `Open Command Palette by pressing <strong>${getModName()} + K</strong>.`,
        hint: `Press ${getModName()} + K to open modal overlay.`,
        initialHTML: "Accessing Command Palette system...",
        requiredShortcut: "COMMAND_PALETTE",
        validate: () => lastTriggeredAction === "COMMAND_PALETTE"
    },
    {
        id: 10,
        title: "Mission 10: Find Keyword",
        docTitle: "Database_Search.txt",
        getTask: () => `Press <strong>${getModName()} + F</strong> to trigger search mode.`,
        hint: `Press ${getModName()} + F.`,
        initialHTML: "Searching secret ninja database...",
        requiredShortcut: "FIND",
        validate: () => lastTriggeredAction === "FIND"
    },
    {
        id: 11,
        title: "Mission 11: Print Scroll Order",
        docTitle: "Print_Order.docx",
        getTask: () => `Print the diploma! Press <strong>${getModName()} + P</strong>.`,
        hint: `Press ${getModName()} + P.`,
        initialHTML: "NINJA DOJO DIPLOMA - Ready for print.",
        requiredShortcut: "PRINT",
        validate: () => lastTriggeredAction === "PRINT"
    },
    {
        id: 12,
        title: "BOSS BATTLE: The Shadow Shogun",
        docTitle: "Shogun_Challenge.sys",
        isBossLevel: true,
        getTask: () => `Execute 4-Step Combo: 1. <strong>${getModName()}+A</strong>, 2. <strong>${getModName()}+C</strong>, 3. <strong>${getModName()}+K</strong>, 4. <strong>${getModName()}+V & Enter</strong>`,
        hint: "Follow the sequence pill indicators at the top!",
        initialHTML: "SHOGUN_FINAL_BOSS_CORE_SEAL_DATA",
        bossSteps: [
            { id: "SELECT_ALL", label: "1. Select All", shortcut: "SELECT_ALL" },
            { id: "COPY", label: "2. Copy", shortcut: "COPY" },
            { id: "COMMAND_PALETTE", label: "3. Open Palette", shortcut: "COMMAND_PALETTE" },
            { id: "EXECUTE", label: "4. Paste & Execute", shortcut: "PASTE_EXECUTE" }
        ],
        validate: () => currentBossStep >= 4
    }
];

// Initialize Game
document.addEventListener("DOMContentLoaded", () => {
    loadLevel(0);
    setupKeyListeners();
});

function loadLevel(index) {
    currentLevelIndex = index;
    const level = levels[index];

    document.getElementById("levelIndicator").innerText = `Mission ${index + 1} of ${levels.length}`;
    document.getElementById("taskTitle").innerText = level.title;
    document.getElementById("docTitle").innerHTML = `<i class="fa-solid fa-scroll"></i> ${level.docTitle}`;
    document.getElementById("taskDesc").innerHTML = level.getTask();

    const editor = document.getElementById("editor");
    editor.innerHTML = level.initialHTML;

    closeCommandPalette();
    lastTriggeredAction = "";
    currentBossStep = 0;

    // Handle Boss UI vs Normal UI
    const bossStepper = document.getElementById("bossStepper");
    if (level.isBossLevel) {
        bossStepper.style.display = "block";
        renderBossSteps(level);
    } else {
        bossStepper.style.display = "none";
    }

    startSpeedrunTimer();
    updateStatus("Perform requested shortcut to execute your ninja move.", "info");
}

function renderBossSteps(level) {
    const container = document.getElementById("bossStepsContainer");
    container.innerHTML = level.bossSteps.map((step, idx) => {
        let statusClass = "";
        let icon = "fa-circle-notch";
        if (idx < currentBossStep) {
            statusClass = "completed";
            icon = "fa-circle-check";
        } else if (idx === currentBossStep) {
            statusClass = "active";
            icon = "fa-spinner fa-spin";
        }
        return `<div class="boss-step-pill ${statusClass}"><i class="fa-solid ${icon}"></i> ${step.label}</div>`;
    }).join("");
}

function setupKeyListeners() {
    window.addEventListener("keydown", (e) => {
        const isMod = (currentOS === "MAC" ? e.metaKey : e.ctrlKey) || e.ctrlKey || e.metaKey;
        const keyLower = e.key.toLowerCase();

        highlightVirtualKey(e.code, true);
        pressedKeys.add(getCleanKeyName(e.key));
        updateComboDisplay();

        // Intercept Web-Safe Shortcuts
        if (isMod) {
            if (['c', 'v', 'z', 'a', 'x', 's', 'f', 'p', 'b', 'k'].includes(keyLower)) {
                e.preventDefault();
            }

            if (e.shiftKey && keyLower === 'z') {
                e.preventDefault();
                handleShortcutTrigger("REDO");
            } else if (keyLower === 'c') {
                handleShortcutTrigger("COPY");
            } else if (keyLower === 'v') {
                handleShortcutTrigger("PASTE");
            } else if (keyLower === 'z') {
                handleShortcutTrigger("UNDO");
                document.getElementById("editor").innerText = levels[currentLevelIndex].initialHTML;
            } else if (keyLower === 'a') {
                handleShortcutTrigger("SELECT_ALL");
                selectElementText(document.getElementById("editor"));
            } else if (keyLower === 'x') {
                handleShortcutTrigger("CUT");
            } else if (keyLower === 's') {
                handleShortcutTrigger("SAVE");
            } else if (keyLower === 'f') {
                handleShortcutTrigger("FIND");
                openCommandPalette("Search query...");
            } else if (keyLower === 'p') {
                handleShortcutTrigger("PRINT");
            } else if (keyLower === 'b') {
                handleShortcutTrigger("BOLD");
                document.execCommand("bold", false, null);
            } else if (keyLower === 'k') {
                handleShortcutTrigger("COMMAND_PALETTE");
                openCommandPalette("Type command or scroll seal...");
            }
        }
    });

    window.addEventListener("keyup", (e) => {
        highlightVirtualKey(e.code, false);
        pressedKeys.delete(getCleanKeyName(e.key));
        updateComboDisplay();
    });
}

function handleShortcutTrigger(action) {
    lastTriggeredAction = action;
    registerComboHit();

    const currentLevel = levels[currentLevelIndex];

    // Handle Boss Combo Chain
    if (currentLevel.isBossLevel) {
        const expectedStep = currentLevel.bossSteps[currentBossStep];
        if (expectedStep && expectedStep.shortcut === action) {
            currentBossStep++;
            playSound("boss_step");
            renderBossSteps(currentLevel);
        }
    } else {
        playSound("click");
    }

    setTimeout(checkAnswer, 100);
}

function highlightVirtualKey(code, isActive) {
    let elId = "key-" + code;
    if (code === "ControlLeft" || code === "MetaLeft") elId = "key-ModifierLeft";
    if (code === "ControlRight" || code === "MetaRight") elId = "key-ModifierRight";

    const el = document.getElementById(elId);
    if (el) {
        if (isActive) el.classList.add("active");
        else el.classList.remove("active");
    }
}

function getCleanKeyName(key) {
    if (key === "Control" || key === "Meta") return getModName();
    if (key === "Shift") return "Shift";
    if (key === "Alt") return "Alt";
    if (key === " ") return "Space";
    return key.toUpperCase();
}

function updateComboDisplay() {
    const display = document.getElementById("comboDisplay");
    if (pressedKeys.size === 0) {
        display.innerHTML = `<span class="key-cap placeholder-key">Press keys...</span>`;
        return;
    }

    display.innerHTML = Array.from(pressedKeys)
        .map(k => `<span class="key-cap">${k}</span>`)
        .join(" <span style='color:#718096;'>+</span> ");
}

function selectElementText(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function openCommandPalette(placeholder) {
    const modal = document.getElementById("commandPaletteModal");
    const input = document.getElementById("commandInput");
    modal.style.display = "flex";
    if (placeholder) input.placeholder = placeholder;
    input.focus();
}

function closeCommandPalette() {
    document.getElementById("commandPaletteModal").style.display = "none";
}

function handleCommandKey(e) {
    if (e.key === "Enter") {
        executeCommandPalette();
    }
}

function executeCommandPalette() {
    const input = document.getElementById("commandInput");
    const feedback = document.getElementById("commandFeedback");
    feedback.innerText = `Executed command: "${input.value || 'SEAL_RELEASE'}"`;

    if (levels[currentLevelIndex].isBossLevel && currentBossStep === 3) {
        currentBossStep = 4;
        renderBossSteps(levels[currentLevelIndex]);
    }

    playSound("click");
    setTimeout(() => {
        closeCommandPalette();
        checkAnswer();
    }, 300);
}

function checkAnswer() {
    const currentLevel = levels[currentLevelIndex];
    const isSuccess = currentLevel.validate();

    if (isSuccess) {
        clearInterval(timerInterval);
        playSound("success");

        const pointsEarned = 100 * comboMultiplier;
        userXP += pointsEarned;
        document.getElementById("xpBadge").innerHTML = `<i class="fa-solid fa-star"></i> XP: ${userXP}`;
        updateNinjaRank();

        if (currentLevelIndex + 1 < levels.length) {
            updateStatus(`Technique Mastered! (+${pointsEarned} XP) Loading next level...`, "success");
            setTimeout(() => {
                loadLevel(currentLevelIndex + 1);
            }, 1200);
        } else {
            updateStatus("GRANDMASTER UNLOCKED! You completed all Shortcut Ninja missions!", "success");
        }
    }
}

function updateNinjaRank() {
    const rankBadge = document.getElementById("rankBadge");
    if (userXP >= 2000) {
        rankBadge.innerHTML = `<i class="fa-solid fa-crown"></i> Rank: Grandmaster`;
    } else if (userXP >= 1000) {
        rankBadge.innerHTML = `<i class="fa-solid fa-shield"></i> Rank: Shadow Blade`;
    } else if (userXP >= 500) {
        rankBadge.innerHTML = `<i class="fa-solid fa-user-ninja"></i> Rank: Apprentice`;
    }
}

function updateStatus(msg, type) {
    const statusEl = document.getElementById("statusMessage");
    const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-circle-info";
    statusEl.className = `status-message ${type}`;
    statusEl.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
}

function showHint() {
    playSound("click");
    updateStatus(`Hint: ${levels[currentLevelIndex].hint}`, "info");
}

function resetCurrentLevel() {
    playSound("click");
    loadLevel(currentLevelIndex);
}

function prevLevel() {
    if (currentLevelIndex > 0) {
        playSound("click");
        loadLevel(currentLevelIndex - 1);
    }
}