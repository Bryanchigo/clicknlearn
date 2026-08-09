import { mathematicsQuestions } from 'js/math.js';
import { chemistryQuestions } from 'js/chem.js';
import { englishQuestions } from 'js/english.js';
import { physicsQuestions } from 'js/phy.js';

window.questionBank = {
    Mathematics: mathematicsQuestions,
    Chemistry: chemistryQuestions,
    English: englishQuestions,
    Physics: physicsQuestions
};

// ==========================================
// 1. GLOBAL STATE & INITIALIZATION
// ==========================================
let state = {
    mode: 'exam',
    questions: [],
    answers: {},
    bookmarks: {},
    currentIndex: 0,
    timeRemaining: 0,
    interval: null
};

// Check Theme & Saved Session on Load
window.onload = () => {
    // Check Theme
    const savedTheme = localStorage.getItem('cbt-theme');
    if (savedTheme) document.body.setAttribute('data-theme', savedTheme);

    // Check Auto-Save
    const savedState = localStorage.getItem('cbt-autosave');
    if (savedState) {
        document.getElementById('resume-btn').style.display = 'block';
    }
};

function toggleTheme() {
    const body = document.body;
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('cbt-theme', newTheme);
}

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ==========================================
// 2. EXAM SETUP & ENGINE
// ==========================================
function initExam() {
    state.mode = document.querySelector('input[name="examMode"]:checked').value;
    const subjects = Array.from(document.querySelectorAll('input[name="subject"]:checked')).map(cb => cb.value);
    const qCount = parseInt(document.getElementById('q-count').value) || 10;
    const timerMins = parseInt(document.getElementById('timer-mins').value) || 30;

    if (subjects.length === 0) return alert("Select at least one subject.");

    state.questions = [];
    subjects.forEach(sub => {
        if (window.questionBank && window.questionBank[sub]) {
            let subQs = shuffleArray([...window.questionBank[sub]]).slice(0, qCount);
            subQs = subQs.map(q => ({ ...q, subject: sub }));
            state.questions = state.questions.concat(subQs);
        }
    });

    if (state.questions.length === 0) return alert("No questions found in the database.");

    shuffleArray(state.questions);

    state.answers = {};
    state.bookmarks = {};
    state.currentIndex = 0;
    state.timeRemaining = timerMins * 60;

    startEngine();
}

function resumeExam() {
    const saved = localStorage.getItem('cbt-autosave');
    if (saved) {
        state = JSON.parse(saved);
        startEngine();
    }
}

function startEngine() {
    buildNavigator();
    loadQuestion();
    startTimer();
    switchScreen('exam-screen');
    setupKeyboard();

    if (state.mode === 'exam') {
        enterFullscreen();
        enableAntiCheat();
    }
}

function autoSave() {
    localStorage.setItem('cbt-autosave', JSON.stringify(state));
}

// ==========================================
// 3. TIMER LOGIC
// ==========================================
function startTimer() {
    clearInterval(state.interval);

    if (state.mode === 'study') {
        document.getElementById('timer-display').innerText = "Study Mode";
        return;
    }

    updateTimerDisplay();

    state.interval = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();

        if (state.timeRemaining % 5 === 0) autoSave(); // Auto save every 5 seconds

        if (state.timeRemaining <= 0) {
            submitExam(true); // Auto submit
        }
    }, 1000);
}

function updateTimerDisplay() {
    const h = Math.floor(state.timeRemaining / 3600).toString().padStart(2, '0');
    const m = Math.floor((state.timeRemaining % 3600) / 60).toString().padStart(2, '0');
    const s = (state.timeRemaining % 60).toString().padStart(2, '0');

    const display = document.getElementById('timer-display');
    if (!display) return;

    display.innerText = `${h}:${m}:${s}`;

    // Gradual Red Color Transition in the last 60 seconds
    if (state.mode !== 'study') {
        if (state.timeRemaining <= 60 && state.timeRemaining > 0) {
            // Calculates percentage of redness: 60s = 0% red, 30s = 50% red, 0s = 100% red
            let redPercentage = ((60 - state.timeRemaining) / 60) * 100;

            // Uses CSS color-mix to blend the theme's text color with the danger color
            display.style.color = `color-mix(in srgb, var(--danger) ${redPercentage}%, var(--text-main))`;
        } else if (state.timeRemaining > 60) {
            // Reset to default if time is above 60s
            display.style.color = 'var(--text-main)';
        }
    }
}

let isTimerHidden = false;
function toggleTimerVisibility() {
    isTimerHidden = !isTimerHidden;
    const timerDisplay = document.getElementById('timer-display');
    const toggleBtn = document.getElementById('timer-toggle-btn');

    if (isTimerHidden) {
        timerDisplay.classList.add('timer-hidden');
        toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    } else {
        timerDisplay.classList.remove('timer-hidden');
        toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
}

// ==========================================
// 4. QUESTION RENDERING & NAVIGATION
// ==========================================

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    const q = state.questions[state.currentIndex];

    document.getElementById('q-num').innerText = state.currentIndex + 1;
    document.getElementById('q-total').innerText = state.questions.length;
    document.getElementById('subject-badge').innerText = q.subject;
    document.getElementById('q-text').innerHTML = q.textHTML;

    const hasAnswered = state.answers[state.currentIndex] !== undefined;
    const bmBtn = document.getElementById('bookmark-btn');

    // 3. Visual UI update for the Bookmark Button
    if (hasAnswered) {
        // Disabled state
        bmBtn.innerHTML = '<i class="fa-solid fa-ban"></i> Answered';
        bmBtn.style.color = '#a5a5a5';
        bmBtn.style.cursor = 'not-allowed';
        bmBtn.style.opacity = '0.6';
    } else if (state.bookmarks[state.currentIndex]) {
        // Bookmarked state
        bmBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Bookmarked';
        bmBtn.style.color = 'var(--warning)';
        bmBtn.style.cursor = 'pointer';
        bmBtn.style.opacity = '1';
    } else {
        // Default state
        bmBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Bookmark';
        bmBtn.style.color = 'inherit';
        bmBtn.style.cursor = 'pointer';
        bmBtn.style.opacity = '1';
    }

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    const expBox = document.getElementById('explanation-box');
    expBox.style.display = 'none';

    const labels = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, i) => {
        const isSelected = state.answers[state.currentIndex] === i;
        const div = document.createElement('div');
        div.className = `option ${isSelected ? 'selected' : ''}`;

        if (state.mode === 'study' && hasAnswered) {
            if (i === q.answer) div.classList.add('is-correct');
            else if (isSelected) div.classList.add('is-wrong');
            div.style.pointerEvents = 'none';
        } else {
            div.onclick = () => selectOption(i);
        }

        div.innerHTML = `<div style="font-weight:bold; width:30px;">${labels[i]}.</div> <div style="flex:1;">${opt}</div>`;
        optionsContainer.appendChild(div);
    });

    if (state.mode === 'study' && hasAnswered && q.explanation) {
        expBox.innerHTML = `<strong><i class="fa-solid fa-lightbulb"></i> Explanation:</strong> <br>${q.explanation}`;
        expBox.style.display = 'block';
    }

    updateNavigatorUI();
    autoSave();

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        // If we are on the very last question
        if (state.currentIndex === state.questions.length - 1) {
            nextBtn.innerHTML = 'Submit Exam <i class="fa-solid fa-check"></i>';
            nextBtn.classList.remove('btn-primary');
            nextBtn.classList.add('btn-danger');
            nextBtn.onclick = () => confirmSubmit();
        } else {
            // If we are on any other question, restore the Next button
            nextBtn.innerHTML = 'Next <i class="fa-solid fa-arrow-right"></i>';
            nextBtn.classList.remove('btn-danger');
            nextBtn.classList.add('btn-primary');
            nextBtn.onclick = () => navigate(1);
        }
    }
}

function selectOption(index) {
    if (state.mode === 'study' && state.answers[state.currentIndex] !== undefined) return; // Prevent changing answer in study mode
    state.answers[state.currentIndex] = index;
    if (state.bookmarks[state.currentIndex]) {
        state.bookmarks[state.currentIndex] = false;
    }
    loadQuestion();
}

function toggleBookmark() {
    if (state.answers[state.currentIndex] != undefined) {
        return;
    }

    state.bookmarks[state.currentIndex] = !state.bookmarks[state.currentIndex];
    loadQuestion();
}

function navigate(direction) {
    const newIndex = state.currentIndex + direction;
    if (newIndex >= 0 && newIndex < state.questions.length) {
        state.currentIndex = newIndex;
        loadQuestion();
    }
}

// Keyboard Navigation
function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('exam-screen').classList.contains('active')) return;

        const key = e.key.toLowerCase();
        if (key === 'a') selectOption(0);
        if (key === 'b') selectOption(1);
        if (key === 'c') selectOption(2);
        if (key === 'd') selectOption(3);
        if (key === 'arrowright') navigate(1);
        if (key === 'arrowleft') navigate(-1);
    });
}

function buildNavigator() {
    const grid = document.getElementById('nav-grid');
    grid.innerHTML = '';
    state.questions.forEach((_, i) => {
        const box = document.createElement('div');
        box.id = `nav-${i}`;
        box.innerText = i + 1;
        box.onclick = () => { state.currentIndex = i; loadQuestion(); };
        grid.appendChild(box);
    });
}

function updateNavigatorUI() {
    state.questions.forEach((_, i) => {
        const box = document.getElementById(`nav-${i}`);
        box.className = 'nav-box'; // reset
        if (state.bookmarks[i]) box.classList.add('bookmarked');
        else if (state.answers[i] !== undefined) box.classList.add('answered');

        if (i === state.currentIndex) box.classList.add('active');
    });
}

function changeNumber(id, amount) {
    const input = document.getElementById(id);

    let value = parseInt(input.value) || 0;
    let min = parseInt(input.min) || 0;
    let max = parseInt(input.max) || Infinity;

    value += amount;
    value = Math.max(min, Math.min(max, value));

    input.value = value;
}

// ==========================================
// 5. SUBMISSION & ANALYTICS
// ==========================================
function confirmSubmit() {
    const answeredCount = Object.keys(state.answers).length;
    const total = state.questions.length;
    if (answeredCount < total) {
        if (confirm(`⚠️ You have ${total - answeredCount} unanswered questions. Are you sure you want to submit?`)) {
            submitExam(false);
        }
    } else {
        if (confirm("Are you sure you want to submit your exam?")) submitExam(false);
    }
}

function submitExam(autoSubmitted) {
    clearInterval(state.interval);
    localStorage.removeItem('cbt-autosave'); // Clear session

    if (state.mode === 'exam') {
        exitFullscreen();
        disableAntiCheat();
    }

    if (autoSubmitted) alert("Time is up! Your exam was automatically submitted.");

    let totalScore = 0;
    let topicAnalysis = {};

    state.questions.forEach((q, i) => {
        let t = q.topic || "General Concepts";
        if (!topicAnalysis[t]) topicAnalysis[t] = { correct: 0, total: 0 };
        topicAnalysis[t].total++;

        if (state.answers[i] === q.answer) {
            totalScore++;
            topicAnalysis[t].correct++;
        }
    });

    const percent = Math.round((totalScore / state.questions.length) * 100);

    document.getElementById('score-raw').innerText = totalScore;
    document.getElementById('score-total').innerText = state.questions.length;
    document.getElementById('final-score').innerText = percent + '%';
    document.getElementById('final-score').style.color = percent >= 50 ? 'var(--success)' : 'var(--danger)';

    const breakdown = document.getElementById('topic-breakdown');
    breakdown.innerHTML = '<h3>Topic Weakness Analysis</h3>';
    for (const [topic, data] of Object.entries(topicAnalysis)) {
        const topicPct = Math.round((data.correct / data.total) * 100);
        let color = topicPct >= 70 ? 'var(--success)' : topicPct >= 40 ? 'var(--warning)' : 'var(--danger)';
        breakdown.innerHTML += `<div style="margin-top:15px;">
            <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:0.9rem;"><span>${topic}</span> <span>${data.correct}/${data.total}</span></div>
            <div style="width:100%; background:var(--glass-border); height:10px; border-radius:5px; margin-top:5px;">
                <div style="width:${topicPct}%; background:${color}; height:100%; border-radius:5px;"></div>
            </div>
        </div>`;
    }

    saveAndRenderChart(percent);
    switchScreen('result-screen');
}

function saveAndRenderChart(latestScore) {
    let history = JSON.parse(localStorage.getItem('cbtHistory') || '[]');
    history.push(latestScore);
    if (history.length > 10) history.shift();
    localStorage.setItem('cbtHistory', JSON.stringify(history));

    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: history.map((_, i) => `Test ${i + 1}`),
            datasets: [{
                label: 'Score (%)',
                data: history,
                borderColor: '#3182ce',
                backgroundColor: 'rgba(49, 130, 206, 0.4)',
                tension: 0.4,
                fill: true
            }]
        },
        options: { scales: { y: { min: 0, max: 100 } }, plugins: { legend: { display: false } } }
    });
}

// ==========================================
// 6. ON-SCREEN TOOLS (SCRATCHPAD & IOS CALC)
// ==========================================

// --- Scratchpad Logic ---
let isDrawing = false;
let ctx;
function toggleScratchpad() {
    const el = document.getElementById('scratchpad-modal');
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
    if (!ctx) {
        const canvas = document.getElementById('scratch-canvas');
        ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';

        canvas.addEventListener('mousedown', (e) => { isDrawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); });
        canvas.addEventListener('mousemove', (e) => { if (isDrawing) { ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); } });
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);
    }
}
function clearScratchpad() { if (ctx) ctx.clearRect(0, 0, 300, 300); }


// --- iOS Calculator Logic ---
let currentInput = '0';
let previousInput = '';
let operator = null;
let awaitingNextNum = false;

function toggleCalculator() {
    const el = document.getElementById('calc-modal');
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
    if (el.style.display === 'block') {
        updateDisplay();
    }
}

function updateDisplay() {
    const display = document.getElementById('ios-display');
    const acBtn = document.getElementById('ac-btn');
    if (!display || !acBtn) return; // Prevent errors if DOM isn't ready

    let displayStr = currentInput;
    if (!currentInput.includes('.')) {
        displayStr = Number(currentInput).toLocaleString('en-US');
    } else {
        const parts = currentInput.split('.');
        displayStr = Number(parts[0]).toLocaleString('en-US') + '.' + parts[1];
    }

    display.innerText = displayStr;

    const len = displayStr.length;
    if (len < 7) display.style.fontSize = '5rem';
    else if (len === 7) display.style.fontSize = '4.3rem';
    else if (len === 8) display.style.fontSize = '3.8rem';
    else if (len === 9) display.style.fontSize = '3.3rem';
    else if (len === 10) display.style.fontSize = '2.9rem';
    else if (len === 11) display.style.fontSize = '2.6rem';
    else display.style.fontSize = '2.3rem';

    // Toggle AC to C if there is input
    if (currentInput !== '0' || previousInput !== '') {
        acBtn.innerText = 'C';
    } else {
        acBtn.innerText = 'AC';
    }
}

function clearCalc() {
    const acBtn = document.getElementById('ac-btn');
    if (acBtn && acBtn.innerText === 'C') {
        currentInput = '0';
        if (acBtn) acBtn.innerText = 'AC';
    } else {
        currentInput = '0';
        previousInput = '';
        operator = null;
    }
    resetOperatorVisuals();
    updateDisplay();
}

function appendNum(num) {
    if (awaitingNextNum) {
        currentInput = num;
        awaitingNextNum = false;
        resetOperatorVisuals();
    } else {
        if (num === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        } else {
            if (currentInput === '0') {
                currentInput = num;
            } else {
                currentInput += num;
            }
        }
    }
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function applyPercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function setOperator(op, btnId) {
    if (operator !== null && !awaitingNextNum) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    awaitingNextNum = true;

    // Visual toggle for active operator
    resetOperatorVisuals();
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add('active-op');
}

function calculate() {
    if (operator === null || awaitingNextNum) return;

    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
    }

    currentInput = parseFloat(result.toPrecision(12)).toString(); // prevents floating point weirdness
    operator = null;
    awaitingNextNum = true;
    resetOperatorVisuals();
    updateDisplay();
}

function applyScientific(func) {
    let val = parseFloat(currentInput);

    // WAEC Math is primarily done in Degrees, so we convert Rads to Degs for Trig
    const degToRad = Math.PI / 180;

    switch (func) {
        case 'sin': val = Math.sin(val * degToRad); break;
        case 'cos': val = Math.cos(val * degToRad); break;
        case 'tan': val = Math.tan(val * degToRad); break;
        case 'log': val = Math.log10(val); break;
        case 'sqrt': val = Math.sqrt(val); break;
        case 'sq': val = Math.pow(val, 2); break;
        case 'cube': val = Math.pow(val, 3); break;
        case 'pi':
            val = Math.PI;
            awaitingNextNum = true;
            break;
    }

    // Fix floating point precision errors (e.g., sin(30) returning 0.499999999994)
    val = parseFloat(val.toPrecision(12));

    currentInput = val.toString();
    awaitingNextNum = true;
    updateDisplay();
}

function resetOperatorVisuals() {
    document.querySelectorAll('.op-btn').forEach(btn => {
        btn.classList.remove('active-op');
    });
}

let isStrictExamMode = false;
let strikeCount = 0;

function enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => console.log(err));
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
}

function preventCheating(e) {
    e.preventDefault();
}

function blockShortcuts(e) {
    if (!isStrictExamMode) return;

    // Block F12 (DevTools), F11 (Browser Fullscreen), and Ctrl combinations
    const forbiddenKeys = ['F12', 'F11'];
    if (forbiddenKeys.includes(e.key) || (e.ctrlKey && ['r', 'p', 'c', 'v', 't', 'w', 's'].includes(e.key.toLowerCase()))) {
        e.preventDefault();
        alert("⚠️ Keyboard shortcuts are disabled during the exam!");
    }
}

function handleFullscreenExit() {
    if (!isStrictExamMode) return;

    // If the browser reports we are no longer in fullscreen...
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        strikeCount++;

        if (strikeCount >= 2) {
            alert("🚨 EXAM TERMINATED: You attempted to exit the testing environment multiple times.");
            submitExam(true); // Auto-submit
        } else {
            alert("⚠️ WARNING: You must remain in fullscreen! Leaving again will auto-submit your exam.");
            enterFullscreen(); // Force them back in
        }
    }
}

function handleTabSwitch() {
    if (!isStrictExamMode) return;

    // If the user minimizes the browser or switches to another tab
    if (document.hidden || !document.hasFocus()) {
        alert("🚨 EXAM TERMINATED: You left the exam window. This is a severe violation.");
        submitExam(true); // Immediate Auto-submit
    }
}

function enableAntiCheat() {
    document.body.classList.add('anti-cheat');
    isStrictExamMode = true;
    strikeCount = 0;

    // Block Right Click, Copy, Paste
    document.addEventListener('contextmenu', preventCheating);
    document.addEventListener('copy', preventCheating);
    document.addEventListener('cut', preventCheating);
    document.addEventListener('paste', preventCheating);

    // Traps
    document.addEventListener('keydown', blockShortcuts);
    document.addEventListener('fullscreenchange', handleFullscreenExit);
    document.addEventListener('webkitfullscreenchange', handleFullscreenExit);

    // Tab switching detection
    document.addEventListener('visibilitychange', handleTabSwitch);
    window.addEventListener('blur', handleTabSwitch);
}

function disableAntiCheat() {
    document.body.classList.remove('anti-cheat');
    isStrictExamMode = false;

    // Remove all blocks
    document.removeEventListener('contextmenu', preventCheating);
    document.removeEventListener('copy', preventCheating);
    document.removeEventListener('cut', preventCheating);
    document.removeEventListener('paste', preventCheating);
    document.removeEventListener('keydown', blockShortcuts);
    document.removeEventListener('fullscreenchange', handleFullscreenExit);
    document.removeEventListener('webkitfullscreenchange', handleFullscreenExit);
    document.removeEventListener('visibilitychange', handleTabSwitch);
    window.removeEventListener('blur', handleTabSwitch);
}