// --- GAME CONFIG & SETTINGS ---
const KEY_SETS = {
    home: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    alpha: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    all: 'abcdefghijklmnopqrstuvwxyz0123456789[];\',./'.split('')
};

let activeKeys = KEY_SETS.home;
let score = 0;
let highScore = localStorage.getItem('ninja_highscore') || 0;
let streak = 0;
let maxStreak = 0;
let lives = 3;
let timeLeft = 30;
let isPlaying = false;
let spawnInterval = null;
let physicsLoop = null;
let timerInterval = null;
let spawnRate = 1100; 
let baseGravity = 0.22;
let activeTargets = [];
let slicedHalves = [];
let particles = [];

// --- DOM & CANVAS SETUP ---
const gameContainer = document.getElementById('game-container');
const playArea = document.getElementById('play-area');
const scoreVal = document.getElementById('score-val');
const highScoreVal = document.getElementById('high-score-val');
const timeVal = document.getElementById('time-val');
const streakVal = document.getElementById('streak-val');
const livesVal = document.getElementById('lives-val');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const endTitle = document.getElementById('end-title');
const endReason = document.getElementById('end-reason');
const finalScore = document.getElementById('final-score');
const finalStreak = document.getElementById('final-streak');
const finalHighScore = document.getElementById('final-high-score');

const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = gameContainer.clientWidth;
    canvas.height = gameContainer.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

highScoreVal.textContent = highScore;

// --- EVENT LISTENERS ---
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);

document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        activeKeys = KEY_SETS[e.target.value];
    });
});

// Pure Keydown Typing Listener
document.addEventListener('keydown', (e) => {
    if (!isPlaying) return;
    
    const pressedKey = e.key.toLowerCase();
    
    let matchedIndex = -1;
    let highestY = -1000;

    for (let i = 0; i < activeTargets.length; i++) {
        const target = activeTargets[i];
        if (target.key === pressedKey) {
            if (target.y > highestY) {
                highestY = target.y;
                matchedIndex = i;
            }
        }
    }

    if (matchedIndex !== -1) {
        sliceTarget(activeTargets[matchedIndex], matchedIndex);
    } else {
        triggerShake();
        streak = 0;
        updateHUD();
    }
});

// --- GAME LOGIC ---
function startGame() {
    score = 0;
    streak = 0;
    maxStreak = 0;
    lives = 3;
    timeLeft = 30;
    baseGravity = 0.22;
    spawnRate = 1100;
    activeTargets = [];
    slicedHalves = [];
    particles = [];
    isPlaying = true;

    playArea.querySelectorAll('.key-target, .key-half, .floating-score').forEach(el => el.remove());
    timeVal.classList.remove('warning');
    
    updateHUD();
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');

    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    cancelAnimationFrame(physicsLoop);
    
    spawnInterval = setInterval(spawnKey, spawnRate);
    timerInterval = setInterval(updateTimer, 1000);
    requestAnimationFrame(updatePhysics);
}

function updateTimer() {
    if (!isPlaying) return;

    timeLeft--;
    updateHUD();

    if (timeLeft <= 10 && timeLeft > 0) {
        timeVal.classList.add('warning');
    }

    if (timeLeft <= 0) {
        timeLeft = 0;
        updateHUD();
        gameOver("Time's up! Here is your final performance:");
    }
}

function spawnKey() {
    if (!isPlaying) return;

    const isGold = Math.random() < 0.15;
    const randomKey = activeKeys[Math.floor(Math.random() * activeKeys.length)];

    const el = document.createElement('div');
    el.className = 'key-target';
    if (isGold) el.classList.add('gold');

    el.textContent = randomKey.toUpperCase();
    playArea.appendChild(el);

    const maxLeft = playArea.clientWidth - 100;
    const startX = Math.max(40, Math.floor(Math.random() * maxLeft));
    const startY = playArea.clientHeight;
    const startVY = (Math.random() * -2) - 11.5; 
    const centerX = playArea.clientWidth / 2;
    const startVX = ((centerX - startX) * 0.005) + ((Math.random() - 0.5) * 2); 

    activeTargets.push({
        key: randomKey,
        isGold: isGold,
        el: el,
        x: startX,
        y: startY,
        vx: startVX,
        vy: startVY,
        gravity: baseGravity + (Math.random() * 0.03),
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 5
    });

    if (baseGravity < 0.32) baseGravity += 0.002;
}

// --- 60FPS PHYSICS & CANVAS RENDERING ---
function updatePhysics() {
    if (!isPlaying) return;

    const bottomLimit = playArea.clientHeight + 80;

    // Update Targets
    for (let i = activeTargets.length - 1; i >= 0; i--) {
        const target = activeTargets[i];

        target.vy += target.gravity; 
        target.x += target.vx;
        target.y += target.vy;
        target.rotation += target.vr;

        if (target.x <= 0 || target.x >= playArea.clientWidth - 64) {
            target.vx *= -0.8;
        }

        target.el.style.transform = `translate(${target.x}px, ${target.y}px) rotate(${target.rotation}deg)`;

        if (target.y >= bottomLimit && target.vy > 0) {
            target.el.remove();
            activeTargets.splice(i, 1);
            loseLife();
        }
    }

    // Update Sliced Halves
    for (let i = slicedHalves.length - 1; i >= 0; i--) {
        const half = slicedHalves[i];

        half.vy += half.gravity;
        half.x += half.vx;
        half.y += half.vy;
        half.rotation += half.vr;
        half.opacity -= 0.015;

        half.el.style.opacity = Math.max(0, half.opacity);
        half.el.style.transform = `translate(${half.x}px, ${half.y}px) rotate(${half.rotation}deg)`;

        if (half.y >= bottomLimit || half.opacity <= 0) {
            half.el.remove();
            slicedHalves.splice(i, 1);
        }
    }

    renderCanvasFX();
    physicsLoop = requestAnimationFrame(updatePhysics);
}

function renderCanvasFX() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render Particle Burst FX
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
    }
}

function sliceTarget(target, index) {
    target.el.remove();
    activeTargets.splice(index, 1);

    const color = target.isGold ? '#f59e0b' : '#00ff88';
    spawnExplosion(target.x + 32, target.y + 32, color);

    // Create halves on correct keypress
    const leftEl = document.createElement('div');
    leftEl.className = 'key-half left';
    leftEl.textContent = target.key.toUpperCase();
    if (target.isGold) leftEl.style.background = 'linear-gradient(135deg, #f59e0b, #b45309)';
    playArea.appendChild(leftEl);

    const rightEl = document.createElement('div');
    rightEl.className = 'key-half right';
    rightEl.textContent = target.key.toUpperCase();
    if (target.isGold) rightEl.style.background = 'linear-gradient(135deg, #f59e0b, #b45309)';
    playArea.appendChild(rightEl);

    slicedHalves.push(
        { el: leftEl, x: target.x, y: target.y, vx: target.vx - 5, vy: target.vy - 3, gravity: 0.35, rotation: target.rotation, vr: -15, opacity: 1 },
        { el: rightEl, x: target.x + 32, y: target.y, vx: target.vx + 5, vy: target.vy - 3, gravity: 0.35, rotation: target.rotation, vr: 15, opacity: 1 }
    );

    streak++;
    if (streak > maxStreak) maxStreak = streak;
    
    const addedPoints = (10 + Math.floor(streak / 5)) * (target.isGold ? 5 : 1);
    score += addedPoints;

    showFloatingScore(target.x, target.y, `+${addedPoints}`);
    updateHUD();
}

function spawnExplosion(x, y, color) {
    for (let i = 0; i < 16; i++) {
        particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            size: Math.random() * 4 + 2,
            color: color,
            life: 1.0
        });
    }
}

function showFloatingScore(x, y, text) {
    const popup = document.createElement('div');
    popup.className = 'floating-score';
    popup.textContent = text;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    playArea.appendChild(popup);
    setTimeout(() => popup.remove(), 800);
}

function triggerShake() {
    gameContainer.classList.add('shake');
    setTimeout(() => gameContainer.classList.remove('shake'), 250);
}

function loseLife() {
    lives--;
    streak = 0;
    updateHUD();
    triggerShake();

    if (lives <= 0) {
        gameOver("Your blades grew dull! You lost all your lives:");
    }
}

function updateHUD() {
    scoreVal.textContent = score;
    timeVal.textContent = `${timeLeft}s`;
    streakVal.textContent = `${streak}x`;
    
    let hearts = '';
    for (let i = 0; i < lives; i++) hearts += '❤️';
    livesVal.textContent = hearts || '💀';
}

function gameOver(message) {
    isPlaying = false;
    clearInterval(spawnInterval);
    clearInterval(timerInterval);
    cancelAnimationFrame(physicsLoop);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('ninja_highscore', highScore);
        highScoreVal.textContent = highScore;
        endTitle.textContent = "NEW HIGH SCORE!";
        endTitle.style.color = "var(--ninja-green)";
    } else {
        endTitle.textContent = "GAME OVER";
        endTitle.style.color = "var(--error-red)";
    }

    endReason.textContent = message;
    finalScore.textContent = score;
    finalStreak.textContent = `${maxStreak}x`;
    finalHighScore.textContent = highScore;
    endScreen.classList.remove('hidden');
}