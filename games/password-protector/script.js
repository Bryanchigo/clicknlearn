// --- THREAT BOT CHALLENGES ---
const BOT_CHALLENGES = [
    {
        botPwd: 'password123',
        prompt: 'Fix weak password "password123"! Make it 8+ chars with uppercase, numbers & symbols.',
        baseText: 'Password123!'
    },
    {
        botPwd: 'admin2026',
        prompt: 'Upgrade "admin2026"! Add capital letters and special symbols like @ or #.',
        baseText: 'Admin2026#'
    },
    {
        botPwd: 'ilovecats',
        prompt: 'Strengthen "ilovecats"! Include numbers, symbols, and uppercase characters.',
        baseText: 'ILoveCats!99'
    },
    {
        botPwd: '12345678',
        prompt: 'Transform sequential digits "12345678" into a complex, multi-case password!',
        baseText: 'SafePass99$'
    },
    {
        botPwd: 'qwertyuiop',
        prompt: 'Replace keyboard pattern "qwertyuiop" with a strong password containing symbols!',
        baseText: 'Qwerty#2026'
    }
];

let score = 0;
let level = 1;
let vaultHealth = 100;
let isPlaying = false;
let currentBot = null;
let botTopPos = 10;
let botSpeed = 0.5;
let gameLoopTimer = null;

// --- DOM ELEMENTS ---
const radarScreen = document.getElementById('radar-screen');
const threatZone = document.getElementById('threat-zone');
const pwdInput = document.getElementById('password-input');
const targetPrompt = document.getElementById('target-prompt');
const scoreVal = document.getElementById('score-val');
const levelVal = document.getElementById('level-val');
const vaultFill = document.getElementById('vault-fill');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');

// Checklist Elements
const chkLen = document.getElementById('chk-len');
const chkUpper = document.getElementById('chk-upper');
const chkNum = document.getElementById('chk-num');
const chkSym = document.getElementById('chk-sym');

// --- EVENT LISTENERS ---
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
pwdInput.addEventListener('input', validatePassword);
pwdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fireLaser();
});

// --- GAME LOGIC ---
function startGame() {
    const isCommander = document.querySelector('input[name="difficulty"]:checked').value === 'commander';
    botSpeed = isCommander ? 0.8 : 0.4;

    score = 0;
    level = 1;
    vaultHealth = 100;
    isPlaying = true;

    updateHUD();
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');

    spawnNextBot();

    clearInterval(gameLoopTimer);
    gameLoopTimer = setInterval(gameLoop, 50);
}

function spawnNextBot() {
    threatZone.innerHTML = '';
    botTopPos = 10;

    const template = BOT_CHALLENGES[Math.floor(Math.random() * BOT_CHALLENGES.length)];
    currentBot = { ...template };

    targetPrompt.textContent = currentBot.prompt;
    pwdInput.value = '';
    validatePassword();

    const botEl = document.createElement('div');
    botEl.className = 'threat-bot';
    botEl.id = 'active-bot';
    botEl.style.top = `${botTopPos}px`;
    botEl.innerHTML = `
        <span class="bot-icon">🤖</span>
        <span class="bot-pwd">${currentBot.botPwd}</span>
    `;

    threatZone.appendChild(botEl);
    pwdInput.focus();
}

function gameLoop() {
    if (!isPlaying) return;

    botTopPos += botSpeed;
    const botEl = document.getElementById('active-bot');
    if (botEl) {
        botEl.style.top = `${botTopPos}px`;
    }

    // Check if bot reached vault core (bottom of radar is ~230px)
    if (botTopPos >= 220) {
        vaultHealth = Math.max(0, vaultHealth - 34);
        updateHUD();

        // Screen shake on breach
        document.getElementById('game-container').style.transform = 'translate(-6px, 0)';
        setTimeout(() => document.getElementById('game-container').style.transform = 'translate(6px, 0)', 50);
        setTimeout(() => document.getElementById('game-container').style.transform = 'none', 100);

        if (vaultHealth <= 0) {
            gameOver();
        } else {
            spawnNextBot();
        }
    }
}

function validatePassword() {
    const val = pwdInput.value;

    const hasLen = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val) && /[a-z]/.test(val);
    const hasNum = /[0-9]/.test(val);
    const hasSym = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    updateCheckItem(chkLen, hasLen, '8+ Chars');
    updateCheckItem(chkUpper, hasUpper, 'Upper & Lower');
    updateCheckItem(chkNum, hasNum, 'Number (0-9)');
    updateCheckItem(chkSym, hasSym, 'Symbol (!@#$)');

    return hasLen && hasUpper && hasNum && hasSym;
}

function updateCheckItem(el, isValid, label) {
    if (isValid) {
        el.className = 'check-item valid';
        el.textContent = `✅ ${label}`;
    } else {
        el.className = 'check-item';
        el.textContent = `❌ ${label}`;
    }
}

function fireLaser() {
    if (!isPlaying) return;

    const isPasswordStrong = validatePassword();

    if (isPasswordStrong) {
        // Visual Laser Shot
        const botEl = document.getElementById('active-bot');
        if (botEl) {
            const beam = document.createElement('div');
            beam.className = 'laser-beam';
            beam.style.top = `${botTopPos + 40}px`;
            beam.style.height = `${240 - botTopPos}px`;
            beam.style.left = '50%';
            beam.style.transform = 'translateX(-50%)';

            radarScreen.appendChild(beam);

            setTimeout(() => beam.remove(), 150);
        }

        score += 10;
        if (score % 30 === 0) {
            level++;
            botSpeed += 0.15; // Speed increases as level grows
        }

        updateHUD();
        spawnNextBot();
    } else {
        // Input shake animation if requirements aren't met
        pwdInput.style.borderColor = 'var(--error-red)';
        setTimeout(() => pwdInput.style.borderColor = 'var(--border-color)', 300);
    }
}

function updateHUD() {
    scoreVal.textContent = score;
    levelVal.textContent = level;

    vaultFill.style.width = `${vaultHealth}%`;
    if (vaultHealth > 60) vaultFill.style.backgroundColor = 'var(--vault-green)';
    else if (vaultHealth > 30) vaultFill.style.backgroundColor = 'var(--warn-yellow)';
    else vaultFill.style.backgroundColor = 'var(--error-red)';
}

function gameOver() {
    isPlaying = false;
    clearInterval(gameLoopTimer);

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-wave').textContent = level;
    endScreen.classList.remove('hidden');
}