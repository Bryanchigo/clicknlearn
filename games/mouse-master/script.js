// Game State
let score = 0;
let highScore = localStorage.getItem('mouse_master_highscore') || 0;
let timeLeft = 30;
let lives = 3;
let gameActive = false;
let gameTimer;
let spawnTimer;

// Sound FX Engine (Web Audio API Synth)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration, rampTo = null) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    if (rampTo) {
        osc.frequency.exponentialRampToValueAtTime(rampTo, audioCtx.currentTime + duration);
    }
    
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playSound(effect) {
    if (effect === 'hit') playTone(587.33, 'sine', 0.1, 880);
    else if (effect === 'double') {
        playTone(523.25, 'triangle', 0.08);
        setTimeout(() => playTone(659.25, 'triangle', 0.1), 60);
    }
    else if (effect === 'bonus') {
        playTone(440, 'sine', 0.08);
        setTimeout(() => playTone(554.37, 'sine', 0.08), 50);
        setTimeout(() => playTone(659.25, 'sine', 0.15), 100);
    }
    else if (effect === 'hazard' || effect === 'miss') {
        playTone(150, 'sawtooth', 0.25, 60);
    }
}

// DOM Elements
const gameContainer = document.getElementById('game-container');
const gameArea = document.getElementById('game-area');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const livesEl = document.getElementById('lives');
const highScoreHud = document.getElementById('high-score-hud');
const startHighScore = document.getElementById('start-high-score');

const startScreen = document.getElementById('start-screen');
const helpModal = document.getElementById('help-modal');
const endScreen = document.getElementById('end-screen');
const hud = document.getElementById('hud');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const helpBtn = document.getElementById('help-btn');
const closeHelpBtn = document.getElementById('close-help-btn');

// Initial Setup
highScoreHud.innerText = highScore;
startHighScore.innerText = highScore;

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);
helpBtn.addEventListener('click', () => helpModal.classList.remove('hidden'));
closeHelpBtn.addEventListener('click', () => helpModal.classList.add('hidden'));

function startGame() {
    score = 0;
    timeLeft = 45;
    lives = 3;
    gameActive = true;

    helpModal.classList.add('hidden');
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    hud.classList.remove('hidden');
    
    updateUI();
    runGameClock();
    gameLoop();
}

function gameLoop() {
    if (!gameActive) return;

    if (timeLeft > 30) {
        spawnClickTarget();
    } else if (timeLeft > 15) {
        spawnClickTarget(true); // Allows double-clicks & special targets
    } else {
        spawnDragDrop();
        return; 
    }

    // Dynamic Difficulty: faster spawning as score increases
    let speed = Math.max(450, 1000 - Math.floor(score / 50) * 80);
    spawnTimer = setTimeout(gameLoop, speed);
}

function spawnClickTarget(allowSpecial = false) {
    const target = document.createElement('div');
    const rand = Math.random();

    let type = 'normal';
    if (allowSpecial && rand < 0.15) type = 'hazard';
    else if (allowSpecial && rand < 0.35) type = 'bonus';
    else if (allowSpecial && rand < 0.65) type = 'double';

    if (type === 'normal') {
        target.className = 'target click-me';
        target.innerText = '1x';
    } else if (type === 'double') {
        target.className = 'target double-click-me';
        target.innerText = '2x';
    } else if (type === 'bonus') {
        target.className = 'target bonus-me';
        target.innerText = '⭐';
    } else if (type === 'hazard') {
        target.className = 'target hazard-me';
        target.innerText = '💣';
    }

    const x = Math.random() * 720 + 20;
    const y = Math.random() * 380 + 100;
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    // Click Handlers
    if (type === 'double') {
        target.addEventListener('dblclick', (e) => handleSuccess(target, 20, e, 'double'));
    } else if (type === 'hazard') {
        target.addEventListener('click', (e) => {
            playSound('hazard');
            showFloatingText(e.clientX, e.clientY, '-1 LIFE', '#ff3366');
            target.remove();
            loseLife();
        });
    } else if (type === 'bonus') {
        target.addEventListener('click', (e) => {
            timeLeft += 3;
            handleSuccess(target, 30, e, 'bonus');
        });
    } else {
        target.addEventListener('click', (e) => handleSuccess(target, 10, e, 'hit'));
    }

    gameArea.appendChild(target);

    // Lifespan before disappearing
    const lifespan = Math.max(1100, 2000 - Math.floor(score / 40) * 100);
    target.classList.add('shrinking');
    target.style.animationDuration = `${lifespan}ms`;
    setTimeout(() => {
        if (target.parentNode && gameActive) {
            target.remove();
            if (type !== 'hazard') loseLife(); // Missing a hazard is good!
        }
    }, lifespan);
}

function spawnDragDrop() {
    gameArea.innerHTML = '';
    
    const dropZone = document.createElement('div');
    dropZone.className = 'drop-target';
    dropZone.innerText = "DROP MODULE";
    gameArea.appendChild(dropZone);

    const item = document.createElement('div');
    item.className = 'draggable';
    item.innerText = "📦";
    item.draggable = true;
    item.style.left = (Math.random() * 620 + 40) + "px";
    item.style.top = "140px";
    gameArea.appendChild(item);

    item.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', ''));
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('hover');
    });

    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('hover'));

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        handleSuccess(item, 50, e, 'bonus');
        setTimeout(() => {
            if (gameActive && timeLeft <= 15) spawnDragDrop();
        }, 400);
    });
}

function spawnRipple(x, y, color = '#00f3ff') {
    const rect = gameContainer.getBoundingClientRect();
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.borderColor = color;
    ripple.style.left = `${x - rect.left - 30}px`;
    ripple.style.top = `${y - rect.top - 30}px`;
    gameContainer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
}

function handleSuccess(element, points, event, soundType) {
    playSound(soundType);
    
    // Ripple FX at click location
    const color = soundType === 'bonus' ? '#00ff88' : '#00f3ff';
    spawnRipple(event.clientX, event.clientY, color);

    // Calculate score bonus if target is smaller/clicked quickly
    let finalPoints = points;
    if (element.classList.contains('shrinking')) {
        const currentScale = element.getBoundingClientRect().width / 60;
        if (currentScale > 0.8) finalPoints += 10; // Extra points for fast reaction!
    }

    score += finalPoints;
    showFloatingText(event.clientX, event.clientY, `+${finalPoints}`, color);
    
    element.remove();
    updateUI();
}

function showFloatingText(x, y, text, color) {
    const rect = gameContainer.getBoundingClientRect();
    const popup = document.createElement('div');
    popup.className = 'floating-score';
    popup.innerText = text;
    popup.style.color = color;
    popup.style.left = `${x - rect.left - 15}px`;
    popup.style.top = `${y - rect.top - 15}px`;
    gameContainer.appendChild(popup);
    setTimeout(() => popup.remove(), 800);
}

function loseLife() {
    playSound('miss');
    lives--;
    gameContainer.classList.add('shake');
    setTimeout(() => gameContainer.classList.remove('shake'), 250);
    updateUI();
    if (lives <= 0) endGame();
}

function updateUI() {
    scoreEl.innerText = score;
    timerEl.innerText = timeLeft;
    
    let hearts = '';
    for (let i = 0; i < lives; i++) hearts += '❤️';
    livesEl.innerText = hearts || '💀';

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('mouse_master_highscore', highScore);
        highScoreHud.innerText = highScore;
        startHighScore.innerText = highScore;
    }
}

function runGameClock() {
    gameTimer = setInterval(() => {
        timeLeft--;
        updateUI();
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    clearTimeout(spawnTimer);
    
    hud.classList.add('hidden');
    endScreen.classList.remove('hidden');
    
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-best').innerText = highScore;
    gameArea.innerHTML = '';
}

function resetGame() {
    startGame();
}