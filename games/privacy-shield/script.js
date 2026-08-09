// ==========================================
// 1. PRIVACY SCANNER ENGINE
// ==========================================
// ==========================================
// 1. PRIVACY SCANNER ENGINE (COMPLETE FIX)
// ==========================================
const PrivacyEngine = {
    patterns: {
        phone: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b|\b\d{3}[-.\s]\d{4}\b/g,
        ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
        email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        // Matches password/passcode/pin/secret followed by optional colons/spaces and the value
        password: /\b(password|passcode|pin|secret)\b[:\s]*[^\s,.]+/gi,
        address: /\b\d{1,5}\s+(?:[A-Z][a-z0-9]+\s*){1,3}\b(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr)\b/gi
    },

    scan(text) {
        let leaks = [];
        let redacted = text;

        // 1. Scan Phone Numbers
        if (text.match(this.patterns.phone)) {
            leaks.push({ type: 'Phone Number', icon: '📱' });
            redacted = redacted.replace(this.patterns.phone, '[REDACTED NUMBER]');
        }

        // 2. Scan SSN
        if (text.match(this.patterns.ssn)) {
            leaks.push({ type: 'SSN / ID Leak', icon: '🪪' });
            redacted = redacted.replace(this.patterns.ssn, '[REDACTED SSN]');
        }

        // 3. Scan Passwords / Passcodes / PINs
        if (text.match(this.patterns.password)) {
            leaks.push({ type: 'Password Exposure', icon: '🔑' });
            redacted = redacted.replace(this.patterns.password, '$1: [PROTECTED]');
        }

        // 4. Scan Email Addresses
        if (text.match(this.patterns.email)) {
            leaks.push({ type: 'Email Address', icon: '📧' });
            redacted = redacted.replace(this.patterns.email, '[REDACTED EMAIL]');
        }

        // 5. Scan Physical Addresses
        if (redacted.match(this.patterns.address) || text.match(this.patterns.address)) {
            leaks.push({ type: 'Home Address', icon: '🏠' });
            redacted = redacted.replace(this.patterns.address, '[PROTECTED LOCATION]');
        }

        return {
            hasLeak: leaks.length > 0,
            leaks: leaks,
            redactedText: redacted
        };
    }
};

// ==========================================
// 2. EXPANDED STREAM DATABASE
// ==========================================
const STREAMS = [
    {
        sender: 'Alex Rover',
        handle: '@arover99',
        avatar: '👨‍💻',
        msg: 'Hey man! Call me later at 555-0199 when you arrive at 123 Elm Street.',
        isMalicious: false
    },
    {
        sender: 'System Admin',
        handle: '@support_official',
        avatar: '🤖',
        msg: 'Scheduled maintenance will take place tonight at 02:00 UTC. No downtime expected.',
        isMalicious: false
    },
    {
        sender: 'Unknown User',
        handle: '@crypto_bot_9',
        avatar: '🕵️',
        msg: 'URGENT: Your account was breached! Click here http://fake-login.xyz to verify your password: mysecret123',
        isMalicious: true
    },
    {
        sender: 'Sarah Connor',
        handle: '@s_connor',
        avatar: '👩',
        msg: 'Here is my email sarah.c@netmail.org and SSN 219-00-9481 for the job application.',
        isMalicious: false
    },
    {
        sender: 'Free Rewards',
        handle: '@win_giftcards',
        avatar: '🎁',
        msg: 'CONGRATULATIONS! You won $1000! Just send your phone 555-8831 and home address 742 Evergreen Terrace.',
        isMalicious: true
    },
    {
        sender: 'Gaming Group Chat',
        handle: '@raid_squad',
        avatar: '🎮',
        msg: 'Great match everyone! Same time tomorrow for the raid run?',
        isMalicious: false
    },
    {
        sender: 'HR Onboarding',
        handle: '@hr_dept',
        avatar: '🏢',
        msg: 'Welcome to the team! Please send your passcode: hrPass99 and SSN 482-11-0032 to complete registration.',
        isMalicious: false
    },
    {
        sender: 'Bank Alert Fraud',
        handle: '@security_alert_check',
        avatar: '⚠️',
        msg: 'Suspicious login detected! Reset your account immediately at http://bank-secure-update.phish.com',
        isMalicious: true
    },
    {
        sender: 'David Kim',
        handle: '@dkim_tech',
        avatar: '👨‍🔬',
        msg: 'Can you deliver the prototype package to 450 Innovation Boulevard tomorrow morning?',
        isMalicious: false
    },
    {
        sender: 'Delivery Courier',
        handle: '@fast_parcel',
        avatar: '📦',
        msg: 'Driver cannot find your address: 88 Park Avenue. Please text back at 555-4321 with directions.',
        isMalicious: false
    },
    {
        sender: 'Fake Tech Support',
        handle: '@helpdesk_live_99',
        avatar: '🚨',
        msg: 'Your PC is infected with 5 viruses! Call 555-9999 immediately or your files will be deleted!',
        isMalicious: true
    },
    {
        sender: 'Elena Rostova',
        handle: '@elena_r',
        avatar: '🎨',
        msg: 'Check out the new design mockups on the team drive! Let me know what you think.',
        isMalicious: false
    },
    {
        sender: 'Event Host',
        handle: '@party_planner',
        avatar: '🎉',
        msg: 'RSVP confirmed! Send your contact email team@company.org so we can send the itinerary.',
        isMalicious: false
    },
    {
        sender: 'Phishy Streamer',
        handle: '@free_vbucks_bot',
        avatar: '🤖',
        msg: 'CLAIM 10,000 FREE COINS NOW! Enter your pin: 9942 at http://free-gems-now.net',
        isMalicious: true
    },
    {
        sender: 'Marcus Brody',
        handle: '@brody_m',
        avatar: '📚',
        msg: 'My email address is marcus.b@university.edu if you need the project notes.',
        isMalicious: false
    }
];

// ==========================================
// 3. GAME STATE & DOM CONTROLLER
// ==========================================
let score = 0;
let integrity = 100;
let streamIndex = 0;
let currentScan = null;
let currentStream = null;
let isShieldActive = false;

// DOM Elements
const scoreVal = document.getElementById('score-val');
const levelVal = document.getElementById('level-val');
const integrityBar = document.getElementById('integrity-bar');
const alertBanner = document.getElementById('alert-banner');

const streamIdElem = document.getElementById('stream-id');
const msgTimeElem = document.getElementById('msg-time');
const senderAvatar = document.getElementById('sender-avatar');
const senderName = document.getElementById('sender-name');
const senderHandle = document.getElementById('sender-handle');
const messageText = document.getElementById('message-text');
const detectionChips = document.getElementById('detection-chips');

const shieldBtn = document.getElementById('shield-btn');
const passBtn = document.getElementById('pass-btn');
const blockBtn = document.getElementById('block-btn');

const startOverlay = document.getElementById('start-overlay');
const resultModal = document.getElementById('result-modal');
const gameoverOverlay = document.getElementById('gameover-overlay');

// Event Listeners
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('next-btn').addEventListener('click', nextStream);

shieldBtn.addEventListener('click', toggleShield);
passBtn.addEventListener('click', () => submitAction('pass'));
blockBtn.addEventListener('click', () => submitAction('block'));

function startGame() {
    score = 0;
    integrity = 100;
    streamIndex = 0;
    
    updateHUD();
    startOverlay.classList.add('hidden');
    gameoverOverlay.classList.add('hidden');
    resultModal.classList.add('hidden');

    loadNextStream();
}

function loadNextStream() {
    isShieldActive = false;
    shieldBtn.style.opacity = '1';
    shieldBtn.innerHTML = `<span class="btn-icon">🛡️</span> Activate Privacy Shield (Redact)`;

    currentStream = STREAMS[streamIndex % STREAMS.length];
    currentScan = PrivacyEngine.scan(currentStream.msg);

    // Update Header Meta
    streamIdElem.textContent = Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    msgTimeElem.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Sender Info
    senderAvatar.textContent = currentStream.avatar;
    senderName.textContent = currentStream.sender;
    senderHandle.textContent = currentStream.handle;
    messageText.textContent = currentStream.msg;

    // Detection Banner & Chips
    detectionChips.innerHTML = '';
    if (currentScan.hasLeak) {
        alertBanner.classList.remove('hidden');
        document.getElementById('banner-title').textContent = 'DATA LEAK DETECTED';
        document.getElementById('banner-subtitle').textContent = `Found ${currentScan.leaks.length} sensitive item(s) in payload!`;

        currentScan.leaks.forEach(leak => {
            const chip = document.createElement('span');
            chip.className = 'chip';
            chip.textContent = `${leak.icon} ${leak.type}`;
            detectionChips.appendChild(chip);
        });
    } else {
        alertBanner.classList.add('hidden');
    }
}

function toggleShield() {
    if (!currentScan.hasLeak) return;

    isShieldActive = true;
    messageText.innerHTML = currentScan.redactedText.replace(/\[([^\]]+)\]/g, `<span class="redacted-tag">[$1]</span>`);
    shieldBtn.style.opacity = '0.6';
    shieldBtn.innerHTML = `<span class="btn-icon">🔒</span> Privacy Shield Active`;
}

function submitAction(action) {
    let isCorrect = false;
    let feedbackDesc = "";

    if (action === 'pass') {
        if (!currentStream.isMalicious && (!currentScan.hasLeak || isShieldActive)) {
            isCorrect = true;
            feedbackDesc = isShieldActive 
                ? "Excellent! You shielded personal data before letting the message pass."
                : "Good job! The message was safe and contained no leaks.";
        } else if (currentScan.hasLeak && !isShieldActive) {
            feedbackDesc = "Violation! You let raw personal data leak into the network stream.";
        } else {
            feedbackDesc = "Security Breach! You allowed a malicious scam/phishing message through!";
        }
    } else if (action === 'block') {
        if (currentStream.isMalicious) {
            isCorrect = true;
            feedbackDesc = "Great catch! You blocked a malicious scam attempt.";
        } else {
            feedbackDesc = "False Alarm! Blocking safe user messages causes service disruption.";
        }
    }

    if (isCorrect) {
        score += 15;
        if (integrity < 100) integrity = Math.min(100, integrity + 10);
        showModal(true, "SECURITY MAINTAINED", feedbackDesc);
    } else {
        integrity = Math.max(0, integrity - 35);
        showModal(false, "PRIVACY BREACH!", feedbackDesc);
    }

    updateHUD();
}

function showModal(success, title, desc) {
    document.getElementById('result-icon').textContent = success ? '🛡️' : '💥';
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-title').style.color = success ? 'var(--green-shield)' : 'var(--red-alert)';
    document.getElementById('result-desc').textContent = desc;
    resultModal.classList.remove('hidden');
}

function nextStream() {
    resultModal.classList.add('hidden');
    if (integrity <= 0) {
        gameOver();
    } else {
        streamIndex++;
        loadNextStream();
    }
}

function updateHUD() {
    scoreVal.textContent = score;

    if (score >= 60) levelVal.textContent = 'Level 3 - Privacy Lead 👑';
    else if (score >= 30) levelVal.textContent = 'Level 2 - Data Guard 🛡️';
    else levelVal.textContent = 'Level 1 - Trainee 🔰';

    integrityBar.style.width = `${integrity}%`;
    if (integrity > 60) integrityBar.style.backgroundColor = 'var(--green-shield)';
    else if (integrity > 30) integrityBar.style.backgroundColor = 'var(--gold-warn)';
    else integrityBar.style.backgroundColor = 'var(--red-alert)';
}

function gameOver() {
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-rank').textContent = levelVal.textContent;
    gameoverOverlay.classList.remove('hidden');
}