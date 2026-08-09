// --- PHISHING CASES DATABASE ---
const CASES = [
    {
        category: '🌐 WEBSITE INSPECTION',
        url: 'https://www.paypaI-security-update.com/login',
        ssl: '🔒 HTTPS',
        isSslSafe: true,
        sender: 'security@paypaI-security-update.com',
        title: 'Action Required: Verify Account Access',
        body: 'Your account was accessed from an unrecognized device in Tokyo. Click below to verify your credentials immediately or your account will be locked.',
        isLegitimate: false,
        explanation: 'Scam detected! Look closely at "paypaI-security-update.com". It uses a capital letter "I" instead of a lowercase "l" in Paypal, and uses a fake domain suffix.'
    },
    {
        category: '📧 OFFICIAL EMAIL',
        url: 'https://accounts.google.com/signin/v2',
        ssl: '🔒 HTTPS',
        isSslSafe: true,
        sender: 'no-reply@accounts.google.com',
        title: 'Security alert for your linked Google account',
        body: 'A new sign-in was detected on a Windows PC in Seattle. If this was you, no further action is needed. If not, check your activity log.',
        isLegitimate: true,
        explanation: 'Legitimate email! The URL domain is the official "google.com", sent from a verified Google subdomain with an active SSL certificate.'
    },
    {
        category: '💻 BROWSER POP-UP',
        url: 'http://system-virus-alert-99.net/clean',
        ssl: '⚠️ UNENCRYPTED',
        isSslSafe: false,
        sender: 'CRITICAL SYSTEM WARNING',
        title: 'YOUR COMPUTER IS INFECTED WITH 5 VIRUSES!',
        body: 'Immediate action required! Your files will be wiped in 02:00 minutes. Click below to download AntiVirusPro Cleaner immediately.',
        isLegitimate: false,
        explanation: 'Fake Virus Scam! Browsers cannot scan your hard drive for viruses from a website page. The site lacks HTTPS and creates artificial panic.'
    },
    {
        category: '📱 BANK TEXT MESSAGE',
        url: 'https://www.chase.com/secure/login',
        ssl: '🔒 HTTPS',
        isSslSafe: true,
        sender: 'Chase Mobile Alerts (242-73)',
        title: 'Fraud Alert Confirmation',
        body: 'Chase: Did you attempt a $142.50 charge at Target? Reply YES or NO. (We will never text you links asking for your password).',
        isLegitimate: true,
        explanation: 'Legitimate text alert! Official banks alert you via shortcode and explicitly tell you NOT to click random links or share passwords.'
    },
    {
        category: '🎮 GAMING PROMO',
        url: 'http://free-vbucks-generator-2026.org/claim',
        ssl: '⚠️ UNENCRYPTED',
        isSslSafe: false,
        sender: 'admin@free-vbucks-generator.org',
        title: 'CLAIM YOUR 10,000 FREE V-BUCKS NOW!',
        body: 'Congratulations! You have been selected to win 10,000 game coins. Just enter your account username and password to claim!',
        isLegitimate: false,
        explanation: 'Scam! "Free currency generators" are always account theft tricks. Official game studios never ask for your password on third-party sites.'
    }
];

let score = 0;
let trustGauge = 100;
let caseIndex = 0;
let shuffledCases = [];
let isMasterSleuth = false;

// --- DOM ELEMENTS ---
const scoreVal = document.getElementById('score-val');
const rankVal = document.getElementById('rank-val');
const gaugeFill = document.getElementById('gauge-fill');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const feedbackModal = document.getElementById('feedback-modal');

// Case Elements
const caseCategory = document.getElementById('case-category');
const caseId = document.getElementById('case-id');
const sslIcon = document.getElementById('ssl-icon');
const urlAddress = document.getElementById('url-address');
const senderDisplay = document.getElementById('sender-display');
const titleDisplay = document.getElementById('title-display');
const evidenceText = document.getElementById('evidence-text');

// Feedback Elements
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackTag = document.getElementById('feedback-tag');
const feedbackDesc = document.getElementById('feedback-desc');

// --- EVENT LISTENERS ---
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);

function startGame() {
    isMasterSleuth = document.querySelector('input[name="difficulty"]:checked').value === 'detective';
    score = 0;
    trustGauge = 100;
    caseIndex = 0;

    shuffledCases = [...CASES].sort(() => Math.random() - 0.5);

    updateHUD();
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    feedbackModal.classList.add('hidden');

    loadCase();
}

function loadCase() {
    if (caseIndex >= shuffledCases.length) {
        shuffledCases = [...CASES].sort(() => Math.random() - 0.5);
        caseIndex = 0;
    }

    const c = shuffledCases[caseIndex];

    caseCategory.textContent = c.category;
    caseId.textContent = `CASE #${(caseIndex + 1).toString().padStart(2, '0')}`;
    urlAddress.textContent = c.url;

    sslIcon.textContent = c.ssl;
    if (c.isSslSafe) {
        sslIcon.className = 'ssl-badge';
    } else {
        sslIcon.className = 'ssl-badge unsafe';
    }

    senderDisplay.textContent = c.sender;
    titleDisplay.textContent = c.title;
    evidenceText.textContent = c.body;
}

function makeVerdict(choseLegitimate) {
    const currentCase = shuffledCases[caseIndex];
    const isCorrect = (choseLegitimate === currentCase.isLegitimate);

    if (isCorrect) {
        score += 10;
        if (trustGauge < 100) trustGauge = Math.min(100, trustGauge + 10);
        showFeedback(true, currentCase.explanation);
    } else {
        const damage = isMasterSleuth ? 100 : 34;
        trustGauge = Math.max(0, trustGauge - damage);
        showFeedback(false, currentCase.explanation);
    }

    updateHUD();
}

function showFeedback(isCorrect, explanation) {
    if (isCorrect) {
        feedbackIcon.textContent = '🔍';
        feedbackTitle.textContent = 'VERDICT CORRECT!';
        feedbackTitle.style.color = 'var(--safe-green)';
        feedbackTag.textContent = '+10 DETECTIVE POINTS';
        feedbackTag.className = 'tag-correct';
    } else {
        feedbackIcon.textContent = '🚨';
        feedbackTitle.textContent = 'INSPECTION MISTAKE!';
        feedbackTitle.style.color = 'var(--error-red)';
        feedbackTag.textContent = isMasterSleuth ? 'CASE BLOWN' : '-34% TRUST GAUGE';
        feedbackTag.className = 'tag-wrong';
    }

    feedbackDesc.textContent = explanation;
    feedbackModal.classList.remove('hidden');
}

function nextCase() {
    feedbackModal.classList.add('hidden');

    if (trustGauge <= 0) {
        gameOver();
    } else {
        caseIndex++;
        loadCase();
    }
}

function updateHUD() {
    scoreVal.textContent = score;

    // Calculate detective rank
    if (score >= 40) rankVal.textContent = 'Senior Investigator 🏆';
    else if (score >= 20) rankVal.textContent = 'Link Sleuth 🕵️‍♂️';
    else rankVal.textContent = 'Rookie Hunter 🔍';

    gaugeFill.style.width = `${trustGauge}%`;
    if (trustGauge > 60) gaugeFill.style.backgroundColor = 'var(--safe-green)';
    else if (trustGauge > 30) gaugeFill.style.backgroundColor = 'var(--hunter-amber)';
    else gaugeFill.style.backgroundColor = 'var(--error-red)';
}

function gameOver() {
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-rank').textContent = rankVal.textContent;
    endScreen.classList.remove('hidden');
}