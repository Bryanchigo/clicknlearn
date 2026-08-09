// --- EXPANDED FILE DATABASE ---
const FILE_TYPES = [
    // Documents
    { type: 'doc', ext: '.docx', icon: '📝', names: ['Essay_Final_v2', 'History_Notes', 'Resume_2026', 'Project_Proposal', 'Lecture_Notes'] },
    { type: 'doc', ext: '.pdf', icon: '📕', names: ['Science_Syllabus', 'Lab_Report', 'Permission_Slip', 'Study_Guide', 'Tax_Form_2026'] },
    { type: 'doc', ext: '.txt', icon: '📄', names: ['Passwords_Secret', 'To_Do_List', 'Meeting_Minutes', 'Idea_Scratchpad'] },
    
    // Images
    { type: 'img', ext: '.png', icon: '🖼️', names: ['Screenshot_01', 'Avatar_Cool', 'Banner_Logo', 'Chart_Graph'] },
    { type: 'img', ext: '.jpg', icon: '📸', names: ['Vacation_Pic', 'Dog_Photo', 'Class_Group', 'Selfie_04'] },
    
    // Audio & Video
    { type: 'audio', ext: '.mp3', icon: '🎵', names: ['Podcast_Ep1', 'Afrobeat_Mix', 'Guitar_Solo', 'LoFi_Beats'] },
    { type: 'img', ext: '.mp4', icon: '🎬', names: ['GTA_VI_Trailer', 'Cat_Memes_Comp', 'Gameplay_Highlight', 'Project_Demo'] },
    { type: 'audio', ext: '.wav', icon: '🎧', names: ['Vocal_Stem', 'Bass_Drop', 'Synth_Loop_120BPM', 'Podcast_Raw'] },
    
    // Applications & Archives
    { type: 'app', ext: '.exe', icon: '⚽', names: ['EA SPORTS FC 26', 'VLC Media Player', 'Google Chrome', 'Visual Studio Code', 'Spotify', 'Discord'] },
    { type: 'app', ext: '.zip', icon: '📦', names: ['Backup_Files', 'Textures_Pack', 'HW_Submission', 'Project_Archive', 'Mods_Folder'] }
];

const SPECIAL_TYPES = {
    vip: { type: 'vip', ext: '', icon: '⭐', name: 'VIP_FILE_2x.vip', isSpecial: true },
    cleaner: { type: 'cleaner', ext: '', icon: '🧹', name: 'DiskCleaner.exe', isSpecial: true },
    virus: { type: 'virus', ext: '.exe', icon: '🦠', name: 'TROJAN_VIRUS', isSpecial: true }
};

let sortedCount = 0;
let totalAttempts = 0;
let timeLeft = 45;
let isPlaying = false;
let spawnTimer = null;
let countdownTimer = null;
let maxClutter = 12;
let spawnRate = 2000;
let selectedFile = null;

let combo = 1;
let comboStreak = 0;

let highScore = localStorage.getItem('folder_frenzy_highscore') || 0;

// --- WEB AUDIO API SYNTH ---
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
    
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playSound(type) {
    if (type === 'spawn') playTone(300, 'sine', 0.05, 450);
    else if (type === 'success') {
        playTone(523.25, 'triangle', 0.08);
        setTimeout(() => playTone(659.25, 'triangle', 0.1), 60);
    } else if (type === 'vip') {
        playTone(523.25, 'sine', 0.08);
        setTimeout(() => playTone(659.25, 'sine', 0.08), 60);
        setTimeout(() => playTone(783.99, 'sine', 0.15), 120);
    } else if (type === 'error') playTone(180, 'sawtooth', 0.22, 80);
    else if (type === 'gameover') {
        playTone(220, 'sawtooth', 0.15);
        setTimeout(() => playTone(180, 'sawtooth', 0.15), 120);
        setTimeout(() => playTone(140, 'sawtooth', 0.3), 240);
    }
}

// --- DOM ELEMENTS ---
const gameContainer = document.getElementById('game-container');
const fileZone = document.getElementById('file-zone');
const scoreVal = document.getElementById('score-val');
const comboVal = document.getElementById('combo-val');
const timeVal = document.getElementById('time-val');
const clutterFill = document.getElementById('clutter-fill');

const startScreen = document.getElementById('start-screen');
const helpModal = document.getElementById('help-modal');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const helpBtn = document.getElementById('help-btn');
const closeHelpBtn = document.getElementById('close-help-btn');

const folders = document.querySelectorAll('.folder');
const startHighScore = document.getElementById('start-high-score');

startHighScore.textContent = highScore;

// --- EVENT LISTENERS ---
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
helpBtn.addEventListener('click', () => helpModal.classList.remove('hidden'));
closeHelpBtn.addEventListener('click', () => helpModal.classList.add('hidden'));

folders.forEach(folder => {
    folder.addEventListener('dragover', (e) => {
        e.preventDefault();
        folder.classList.add('drag-over');
        const iconEl = folder.querySelector('.folder-icon');
        iconEl.textContent = folder.dataset.type === 'virus' ? '🗑️' : '📂';
    });

    folder.addEventListener('dragleave', () => {
        folder.classList.remove('drag-over');
        const iconEl = folder.querySelector('.folder-icon');
        iconEl.textContent = folder.dataset.type === 'virus' ? '🗑️' : '📁';
    });

    folder.addEventListener('drop', (e) => {
        e.preventDefault();
        folder.classList.remove('drag-over');
        const iconEl = folder.querySelector('.folder-icon');
        iconEl.textContent = folder.dataset.type === 'virus' ? '🗑️' : '📁';
        
        const fileId = e.dataTransfer.getData('text/plain');
        const fileElement = document.getElementById(fileId);
        
        if (fileElement) {
            handleFileSort(fileElement, folder.dataset.type, e.clientX, e.clientY);
        }
    });

    folder.addEventListener('click', (e) => {
        if (selectedFile) {
            handleFileSort(selectedFile, folder.dataset.type, e.clientX, e.clientY);
            selectedFile = null;
        }
    });
});

function startGame() {
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    timeLeft = difficulty === 'hard' ? 30 : 45;
    spawnRate = difficulty === 'hard' ? 1300 : 2000;
    
    sortedCount = 0;
    totalAttempts = 0;
    combo = 1;
    comboStreak = 0;
    isPlaying = true;
    selectedFile = null;

    fileZone.innerHTML = '';
    timeVal.classList.remove('warning');
    
    updateHUD();
    startScreen.classList.add('hidden');
    helpModal.classList.add('hidden');
    endScreen.classList.add('hidden');

    clearInterval(spawnTimer);
    clearInterval(countdownTimer);

    for(let i=0; i<3; i++) spawnFile();

    spawnTimer = setInterval(() => {
        if (isPlaying) spawnFile();
    }, spawnRate);

    countdownTimer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!isPlaying) return;
    timeLeft--;
    updateHUD();

    if (timeLeft <= 10 && timeLeft > 0) timeVal.classList.add('warning');

    if (timeLeft <= 0) {
        gameOver("TIME UP!", "You survived the workday! Here is your organization report:");
    }
}

function spawnFile() {
    const currentFiles = fileZone.querySelectorAll('.file-item').length;
    if (currentFiles >= maxClutter) {
        gameOver("CRASH!", "Your desktop got too cluttered and your computer froze!");
        return;
    }

    playSound('spawn');
    
    let fileData = {};
    const rand = Math.random();

    if (rand < 0.12) fileData = { ...SPECIAL_TYPES.virus };
    else if (rand < 0.22) fileData = { ...SPECIAL_TYPES.vip };
    else if (rand < 0.28) fileData = { ...SPECIAL_TYPES.cleaner };
    else {
        const template = FILE_TYPES[Math.floor(Math.random() * FILE_TYPES.length)];
        const randomName = template.names[Math.floor(Math.random() * template.names.length)];
        fileData = {
            type: template.type,
            icon: template.icon,
            name: `${randomName}${template.ext}`
        };
    }

    const el = document.createElement('div');
    const id = `file-${Date.now()}-${Math.random()}`;
    el.id = id;
    el.className = 'file-item';
    if (fileData.type === 'virus') el.classList.add('virus-file');
    if (fileData.type === 'vip') el.classList.add('special-vip');
    if (fileData.type === 'cleaner') el.classList.add('special-cleaner');

    el.draggable = true;
    el.dataset.type = fileData.type;

    el.innerHTML = `
        <span class="file-icon">${fileData.icon}</span>
        <span class="file-name">${fileData.name}</span>
    `;

    const maxLeft = fileZone.clientWidth - 100;
    const maxTop = fileZone.clientHeight - 100;
    el.style.left = `${Math.max(10, Math.floor(Math.random() * maxLeft))}px`;
    el.style.top = `${Math.max(10, Math.floor(Math.random() * maxTop))}px`;

    el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', id);
        setTimeout(() => el.style.opacity = '0.4', 0);
    });

    el.addEventListener('dragend', () => el.style.opacity = '1');

    el.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.file-item').forEach(f => f.classList.remove('selected'));
        selectedFile = el;
        el.classList.add('selected');
    });

    fileZone.appendChild(el);
    updateClutterMeter();
}

function handleFileSort(fileElement, folderType, clickX, clickY) {
    totalAttempts++;
    const fileType = fileElement.dataset.type;

    let isCorrect = false;

    if (fileType === 'virus') isCorrect = (folderType === 'virus');
    else if (fileType === 'vip' || fileType === 'cleaner') isCorrect = (folderType !== 'virus');
    else isCorrect = (fileType === folderType);

    if (isCorrect) {
        comboStreak++;
        if (comboStreak >= 9) combo = 5;
        else if (comboStreak >= 6) combo = 3;
        else if (comboStreak >= 3) combo = 2;
        else combo = 1;

        let addedPoints = 1 * combo;
        let popupMessage = `+${addedPoints} SORTED`;

        if (fileType === 'vip') {
            addedPoints *= 2;
            playSound('vip');
            popupMessage = `⭐ VIP +${addedPoints}!`;
        } else if (fileType === 'cleaner') {
            playSound('success');
            popupMessage = `🧹 DISK CLEANED!`;
            clearClutteredFiles(2);
        } else playSound('success');

        if (combo > 1) popupMessage += ` (${combo}x)`;

        sortedCount += addedPoints;
        showPopupText(clickX, clickY, popupMessage, "#10b981");

        fileElement.style.transform = 'scale(0)';
        setTimeout(() => {
            fileElement.remove();
            updateClutterMeter();
        }, 150);

    } else {
        playSound('error');
        combo = 1;
        comboStreak = 0;

        gameContainer.classList.add('shake');
        setTimeout(() => gameContainer.classList.remove('shake'), 250);

        if (fileType === 'virus') {
            timeLeft = Math.max(0, timeLeft - 5);
            showPopupText(clickX, clickY, "VIRUS ATTACK! -5s", "#ff3366");
        } else {
            showPopupText(clickX, clickY, "MISMATCH!", "#ff4757");
        }

        fileElement.style.borderColor = 'var(--error-red)';
        fileElement.style.transform = 'translate(-6px, 0)';
        setTimeout(() => fileElement.style.transform = 'translate(6px, 0)', 50);
        setTimeout(() => {
            fileElement.style.transform = 'none';
            fileElement.style.borderColor = '#475569';
        }, 150);
    }

    updateHUD();
}

function clearClutteredFiles(amount) {
    const files = Array.from(fileZone.querySelectorAll('.file-item'));
    let removed = 0;
    for (let file of files) {
        if (removed >= amount) break;
        file.remove();
        removed++;
    }
    updateClutterMeter();
}

function showPopupText(x, y, text, color) {
    if (!x || !y) return;
    const popup = document.createElement('div');
    popup.className = 'floating-popup';
    popup.innerText = text;
    popup.style.color = color;
    popup.style.left = `${x - 40}px`;
    popup.style.top = `${y - 20}px`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 800);
}

function updateClutterMeter() {
    const count = fileZone.querySelectorAll('.file-item').length;
    const percentage = Math.min(100, Math.round((count / maxClutter) * 100));
    
    clutterFill.style.width = `${percentage}%`;
    if (percentage > 75) clutterFill.style.backgroundColor = 'var(--error-red)';
    else if (percentage > 50) clutterFill.style.backgroundColor = '#ffca28';
    else clutterFill.style.backgroundColor = '#10b981';
}

function updateHUD() {
    scoreVal.textContent = sortedCount;
    timeVal.textContent = `${timeLeft}s`;
    comboVal.textContent = `${combo}x`;
    comboVal.style.transform = combo > 1 ? 'scale(1.2)' : 'scale(1)';
}

function gameOver(titleText, reasonText) {
    isPlaying = false;
    clearInterval(spawnTimer);
    clearInterval(countdownTimer);
    playSound('gameover');

    if (sortedCount > highScore) {
        highScore = sortedCount;
        localStorage.setItem('folder_frenzy_highscore', highScore);
        startHighScore.textContent = highScore;
    }

    document.getElementById('end-title').textContent = titleText;
    document.getElementById('end-reason').textContent = reasonText;
    document.getElementById('final-score').textContent = sortedCount;
    document.getElementById('final-best').textContent = highScore;
    
    const accuracy = totalAttempts > 0 ? Math.round((sortedCount / totalAttempts) * 100) : 100;
    document.getElementById('final-accuracy').textContent = `${accuracy}%`;

    endScreen.classList.remove('hidden');
}