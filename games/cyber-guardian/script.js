// --- CYBER THREAT & SAFETY DATABASE ---
const SCENARIOS = [
    {
        id: 1,
        type: '📧 EMAIL SCAN',
        badgeColor: '#00d4ff',
        sender: 'support@netfl1x-billing.com',
        subject: 'URGENT: Payment Failed!',
        body: 'Your subscription has been suspended due to a declined credit card. Click the link below immediately to update your billing details or your account will be permanently deleted.',
        link: 'http://netfl1x-billing-update.com/login',
        isSafe: false,
        explanation: 'This is a Phishing scam! Look at the domain: it spells Netflix with a "1" (netfl1x). Scammers create false urgency ("permanently deleted") so you panic and type in your credit card without looking closely.'
    },
    {
        id: 2,
        type: '📱 SMS MESSAGE',
        badgeColor: '#6c5ce7',
        sender: '+1 (800) 555-0199',
        subject: 'USPS Delivery Notice',
        body: 'USPS: Your package could not be delivered due to an incomplete street address. Please visit our portal within 24 hours to pay the $1.99 redelivery fee.',
        link: 'http://usps-package-redelivery-portal.net',
        isSafe: false,
        explanation: 'This is an SMS Phishing scam ("Smishing"). Official postal services do not text random links demanding redelivery fees from unofficial domains!'
    },
    {
        id: 3,
        type: '🔑 PASSWORD SETUP',
        badgeColor: '#ffca28',
        sender: 'System Security Prompt',
        subject: 'New Banking Password Selection',
        body: 'You are creating a password for your online bank account. To remember it easily, you decide to use your first name, birth year, and an exclamation mark: "JohnSmith1990!"',
        link: 'Password Strength: 3 / 10 (Predictable)',
        isSafe: false,
        explanation: 'Never use personal information like names, birth years, or pet names in passwords! Hackers can easily find this info on your social media and crack your password in seconds.'
    },
    {
        id: 4,
        type: '🌐 WEB BROWSER',
        badgeColor: '#00ff88',
        sender: 'Official Software Portal',
        subject: 'Adobe Reader Update Available',
        body: 'You navigate directly to the official developer website by typing "https://www.adobe.com" into your address bar to download the latest PDF software update.',
        link: 'https://www.adobe.com/downloads',
        isSafe: true,
        explanation: 'This is Safe! Going directly to the verified, official website (with an encrypted HTTPS connection) is the safest way to download software updates.'
    },
    {
        id: 5,
        type: '📡 WI-FI NETWORK',
        badgeColor: '#ff4757',
        sender: 'Coffee Shop Wireless',
        subject: 'Public Wi-Fi Connection',
        body: 'You sit down at a coffee shop and connect your laptop to an open, unsecured Wi-Fi network called "Free_Public_WiFi". You immediately open your web browser and log into your online banking account.',
        link: 'Network Security: Unencrypted / Open',
        isSafe: false,
        explanation: 'Dangerous! Never check your bank account or enter sensitive passwords on an unsecured public Wi-Fi network. Hackers on the same network can intercept your unencrypted data!'
    },
    {
        id: 6,
        type: '📧 EMAIL SCAN',
        badgeColor: '#00d4ff',
        sender: 'notifications@github.com',
        subject: 'New comment on pull request #42',
        body: 'Hello! Alex has left a review comment on your code repository: "Looks great, approved for merge!" Click below to view the comment thread on GitHub.',
        link: 'https://github.com/techquest/project/pull/42',
        isSafe: true,
        explanation: 'This is a Safe, legitimate notification! The email comes from the real "github.com" domain, uses HTTPS, and does not demand sensitive passwords or money.'
    },
    {
        id: 7,
        type: '🤳 SOCIAL MEDIA',
        badgeColor: '#6c5ce7',
        sender: 'Instagram / TikTok Post',
        subject: 'Driver License Celebration',
        body: 'You finally passed your driving test! To celebrate with your friends, you take an unblurred photo of your shiny new Driver License and post it publicly to your story.',
        link: 'Privacy Setting: Public (Anyone can view)',
        isSafe: false,
        explanation: 'Major Privacy Risk! A driver license contains Personally Identifiable Information (PII) including your full legal name, address, birthdate, and license number—everything a scammer needs to steal your identity!'
    },
    {
        id: 8,
        type: '🛡️ ACCOUNT SECURITY',
        badgeColor: '#00ff88',
        sender: 'Google Account Protection',
        subject: 'Two-Factor Authentication (2FA)',
        body: 'While logging into your email from a new laptop, your phone pings with a 6-digit Two-Factor Authentication code required to complete the login process.',
        link: 'Security Protocol: 2FA Active',
        isSafe: true,
        explanation: 'Safe and Recommended! Two-Factor Authentication (2FA) is an incredible safety habit. Even if a hacker manages to guess your password, they cannot log in without the physical code from your phone.'
    },
    {
        id: 9,
        type: '📧 EMAIL SCAN',
        badgeColor: '#ff4757',
        sender: 'security@paypaI.com',
        subject: 'Your account has been limited',
        body: 'We detected suspicious activity. Verify your account within 12 hours or your account will be permanently suspended.',
        link: 'https://paypaI-secure-login.com',
        isSafe: false,
        explanation: 'This is phishing. The sender uses "paypaI" with a capital "I" instead of a lowercase "l". Attackers often imitate trusted brands and create urgency.'
    },
    {
        id: 10,
        type: '🔐 PASSWORD SETUP',
        badgeColor: '#00ff88',
        sender: 'Password Manager',
        subject: 'Create a New Password',
        body: 'You generate a random password like "fT#8zL!2mQ@7P$wX" using a password manager and save it securely.',
        link: 'Password Strength: 10 / 10',
        isSafe: true,
        explanation: 'Excellent! Long, random passwords generated by a password manager are much harder for attackers to guess or crack.'
    },
    {
        id: 11,
        type: '💬 DIRECT MESSAGE',
        badgeColor: '#6c5ce7',
        sender: 'Friend Request',
        subject: 'Check out this photo!',
        body: 'A friend sends you a message saying, "Is this you in this picture?" with a shortened link you were not expecting.',
        link: 'https://bit.ly/3xyz123',
        isSafe: false,
        explanation: 'Be cautious. Attackers often hijack accounts to send malicious links. Confirm with your friend before clicking unexpected links.'
    },
    {
        id: 12,
        type: '💻 SOFTWARE DOWNLOAD',
        badgeColor: '#00ff88',
        sender: 'Microsoft Store',
        subject: 'Install VLC Media Player',
        body: 'You download VLC directly from the Microsoft Store instead of searching random websites.',
        link: 'Verified Publisher',
        isSafe: true,
        explanation: 'Safe. Downloading software from official stores or verified developer websites reduces the risk of malware.'
    },
    {
        id: 13,
        type: '📱 SMS MESSAGE',
        badgeColor: '#ff4757',
        sender: '+44 7700 900123',
        subject: 'Bank Fraud Alert',
        body: 'URGENT! Your account has been frozen. Reply with your online banking password to restore access.',
        link: 'Reply via SMS',
        isSafe: false,
        explanation: 'Banks will never ask for your password through text messages. This is a scam attempting to steal your credentials.'
    },
    {
        id: 14,
        type: '🌐 WEB BROWSER',
        badgeColor: '#00ff88',
        sender: 'Browser Security',
        subject: 'HTTPS Connection',
        body: 'Before entering your login details, you verify the website address is correct and see the HTTPS padlock.',
        link: 'Secure Connection Established',
        isSafe: true,
        explanation: 'Good habit. Always verify the URL and HTTPS before entering sensitive information.'
    },
    {
        id: 15,
        type: '🎁 ONLINE GIVEAWAY',
        badgeColor: '#ff4757',
        sender: 'Free Gaming Rewards',
        subject: 'Congratulations! You Won!',
        body: 'Claim a free PlayStation 5 by entering your credit card details to cover shipping costs.',
        link: 'https://free-console-win.net',
        isSafe: false,
        explanation: 'Scam. Legitimate giveaways do not require your credit card to claim a prize you never entered to win.'
    },
    {
        id: 16,
        type: '👨‍💼 WORK EMAIL',
        badgeColor: '#ff4757',
        sender: 'ceo.company@gmail.com',
        subject: 'Need Gift Cards ASAP',
        body: 'Your "CEO" asks you to buy $500 worth of gift cards immediately and send the codes by email.',
        link: 'Respond Immediately',
        isSafe: false,
        explanation: 'This is a common Business Email Compromise (BEC) scam. Always verify unusual financial requests through another communication method.'
    },
    {
        id: 17,
        type: '📦 ONLINE SHOPPING',
        badgeColor: '#00ff88',
        sender: 'Order Confirmation',
        subject: 'Your Order Has Shipped',
        body: 'You receive an expected shipping email that matches your recent purchase and links to the retailer\'s official website.',
        link: 'https://amazon.com/orders',
        isSafe: true,
        explanation: 'Safe. The email matches an expected purchase and directs you to the retailer\'s legitimate website.'
    },
    {
        id: 18,
        type: '📞 PHONE CALL',
        badgeColor: '#ff4757',
        sender: 'Unknown Caller',
        subject: 'IRS Tax Refund',
        body: 'Someone claiming to be from the tax office demands immediate payment using gift cards or cryptocurrency.',
        link: 'Payment Required Today',
        isSafe: false,
        explanation: 'Government agencies do not demand payment via gift cards or cryptocurrency over unsolicited phone calls.'
    },
    {
        id: 19,
        type: '☁️ CLOUD STORAGE',
        badgeColor: '#00ff88',
        sender: 'Google Drive',
        subject: 'Shared Document',
        body: 'A coworker shares a document you were expecting, and you verify their email address before opening it.',
        link: 'Shared from your organization',
        isSafe: true,
        explanation: 'Safe. Always verify the sender and only open documents you expect from trusted contacts.'
    },
    {
        id: 20,
        type: '🎮 ONLINE GAMING',
        badgeColor: '#ff4757',
        sender: 'Free Skins Generator',
        subject: 'Unlimited Free Skins',
        body: 'A website promises unlimited game skins if you log in with your gaming account credentials.',
        link: 'Login Required',
        isSafe: false,
        explanation: 'Scam. Free item generators usually steal your gaming account credentials.'
    },
    {
        id: 21,
        type: '🔄 SOFTWARE UPDATE',
        badgeColor: '#00ff88',
        sender: 'Operating System',
        subject: 'Security Update Available',
        body: 'Your computer notifies you of a security update through its built-in update system.',
        link: 'Install Official Update',
        isSafe: true,
        explanation: 'Safe. Keeping your operating system updated helps protect against newly discovered vulnerabilities.'
    },
    {
        id: 22,
        type: '📎 EMAIL ATTACHMENT',
        badgeColor: '#ff4757',
        sender: 'invoice@unknown-company.com',
        subject: 'Outstanding Invoice',
        body: 'You receive an unexpected ZIP attachment labeled "Invoice_2026.zip" from a company you do not recognize.',
        link: 'Download Attachment',
        isSafe: false,
        explanation: 'Unexpected attachments, especially ZIP files, often contain malware. Verify the sender before opening.'
    },
    {
        id: 23,
        type: '🏠 SMART HOME',
        badgeColor: '#00ff88',
        sender: 'Wi-Fi Router',
        subject: 'Router Setup',
        body: 'You change the default administrator password on your new home Wi-Fi router immediately after installation.',
        link: 'Admin Password Updated',
        isSafe: true,
        explanation: 'Excellent security practice. Default router passwords are publicly known and should always be changed.'
    },
    {
        id: 24,
        type: '📸 QR CODE',
        badgeColor: '#ff4757',
        sender: 'Parking Meter Sticker',
        subject: 'Scan to Pay',
        body: 'A sticker with a QR code is placed over the original parking payment code. You scan it without checking if it has been tampered with.',
        link: 'QR Payment Portal',
        isSafe: false,
        explanation: 'QR code scams can redirect you to fake payment sites. Check for signs of tampering and verify the destination before entering payment details.'
    }
];

let score = 0;
let streak = 0;
let maxStreak = 0;
let shieldHealth = 100;
let currentCaseIndex = 0;
let shuffledCases = [];
let isHardcore = false;

// --- DOM ELEMENTS ---
const scoreVal = document.getElementById('score-val');
const streakVal = document.getElementById('streak-val');
const shieldFill = document.getElementById('shield-fill');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const feedbackModal = document.getElementById('feedback-modal');

// Case UI Elements
const caseBadge = document.getElementById('case-badge');
const caseId = document.getElementById('case-id');
const metaSender = document.getElementById('meta-sender');
const metaSubject = document.getElementById('meta-subject');
const caseText = document.getElementById('case-text');
const caseLink = document.getElementById('case-link');

// Feedback UI Elements
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackTag = document.getElementById('feedback-tag');
const feedbackDesc = document.getElementById('feedback-desc');

// --- EVENT LISTENERS ---
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);

// --- GAME LOGIC ---
function startGame() {
    isHardcore = document.querySelector('input[name="difficulty"]:checked').value === 'hardcore';
    score = 0;
    streak = 0;
    maxStreak = 0;
    shieldHealth = 100;
    currentCaseIndex = 0;

    // Shuffle scenarios so every playthrough is unique
    shuffledCases = [...SCENARIOS].sort(() => Math.random() - 0.5);

    updateHUD();
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    feedbackModal.classList.add('hidden');

    loadCase();
}

function loadCase() {
    if (currentCaseIndex >= shuffledCases.length) {
        // Reshuffle and keep playing if they beat all cases!
        shuffledCases = [...SCENARIOS].sort(() => Math.random() - 0.5);
        currentCaseIndex = 0;
    }

    const c = shuffledCases[currentCaseIndex];

    caseBadge.textContent = c.type;
    caseBadge.style.color = c.badgeColor;
    caseBadge.style.borderColor = c.badgeColor;
    caseBadge.style.backgroundColor = `${c.badgeColor}20`; // 20 hex = 12% opacity

    caseId.textContent = `CASE #${(currentCaseIndex + 1).toString().padStart(2, '0')}`;
    metaSender.innerHTML = `<strong>From / Source:</strong> ${c.sender}`;
    metaSubject.innerHTML = `<strong>Subject / Context:</strong> ${c.subject}`;
    caseText.textContent = c.body;
    caseLink.textContent = `🌐 ${c.link}`;

    // Re-trigger slide down animation
    const card = document.getElementById('case-card');
    card.style.animation = 'none';
    card.offsetHeight; // Trigger reflow
    card.style.animation = 'slideDown 0.3s ease-out';
}

function makeDecision(playerChoseSafe) {
    const currentCase = shuffledCases[currentCaseIndex];
    const isCorrect = (playerChoseSafe === currentCase.isSafe);

    if (isCorrect) {
        // Correct Decision!
        score += 10;
        streak++;
        if (streak > maxStreak) maxStreak = streak;

        // Slight shield heal on correct choices
        if (shieldHealth < 100) shieldHealth = Math.min(100, shieldHealth + 5);

        showFeedback(true, currentCase.explanation);
    } else {
        // Wrong Decision!
        streak = 0;
        const damage = isHardcore ? 100 : 34; // 3 mistakes allowed in standard
        shieldHealth = Math.max(0, shieldHealth - damage);

        showFeedback(false, currentCase.explanation);
    }

    updateHUD();
}

function showFeedback(isCorrect, explanation) {
    if (isCorrect) {
        feedbackIcon.textContent = '🛡️';
        feedbackTitle.textContent = 'THREAT INTERCEPTED!';
        feedbackTitle.style.color = 'var(--shield-green)';
        feedbackTag.textContent = '+10 POINTS (CORRECT)';
        feedbackTag.className = 'tag-correct';
    } else {
        feedbackIcon.textContent = '🚨';
        feedbackTitle.textContent = 'SECURITY FAILURE!';
        feedbackTitle.style.color = 'var(--error-red)';
        feedbackTag.textContent = isHardcore ? 'FATAL BREACH' : '-34% SHIELD DAMAGE';
        feedbackTag.className = 'tag-wrong';

        // Screen shake effect on error
        document.getElementById('game-container').style.transform = 'translate(-6px, 0)';
        setTimeout(() => document.getElementById('game-container').style.transform = 'translate(6px, 0)', 50);
        setTimeout(() => document.getElementById('game-container').style.transform = 'none', 100);
    }

    feedbackDesc.textContent = explanation;
    feedbackModal.classList.remove('hidden');
}

function nextCase() {
    feedbackModal.classList.add('hidden');

    if (shieldHealth <= 0) {
        gameOver();
    } else {
        currentCaseIndex++;
        loadCase();
    }
}

function updateHUD() {
    scoreVal.textContent = score;
    streakVal.textContent = `${streak}x`;

    shieldFill.style.width = `${shieldHealth}%`;
    if (shieldHealth > 60) shieldFill.style.backgroundColor = 'var(--shield-green)';
    else if (shieldHealth > 30) shieldFill.style.backgroundColor = 'var(--warn-yellow)';
    else shieldFill.style.backgroundColor = 'var(--error-red)';
}

function gameOver() {
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-streak').textContent = `${maxStreak}x`;
    endScreen.classList.remove('hidden');
}