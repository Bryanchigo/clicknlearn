// --- NETIQUETTE QUEST DATABASE ---
const QUESTS = [
    {
        speaker: 'Gamer_X99',
        avatar: '🎮',
        status: 'online',
        incomingMsg: 'You guys are completely terrible at this game! Uninstall right now and never play again, you ruined my score!',
        time: '14:52',
        options: [
            {
                text: 'Everyone makes mistakes. Let’s focus on teamwork next round!',
                isCorrect: true,
                explanation: 'Excellent response! De-escalating anger and focusing on constructive teamwork defuses toxicity in gaming chats.'
            },
            {
                text: 'You are the one who played badly, look at your own stats!',
                isCorrect: false,
                explanation: 'Engaging in "flaming" or fighting back only fuels toxic drama and makes the chat environment worse.'
            },
            {
                text: 'BE QUIET NOOB!! UNINSTALL YOURSELF!',
                isCorrect: false,
                explanation: 'Shouting in ALL-CAPS and slurs violates netiquette rules and lowers overall team morale.'
            }
        ]
    },
    {
        speaker: 'Tiffany',
        avatar: '👧',
        status: 'online',
        incomingMsg: 'I can’t believe Alex wore that ridiculous outfit to school today. Everyone look at this photo I snuck!',
        time: '15:10',
        options: [
            {
                text: 'Hey Tiffany, taking photo without permission isn\'t cool. Please delete it!',
                isCorrect: true,
                explanation: 'Standing up against cyberbullying by asking the sender to remove unauthorized photos shows true digital citizenship!'
            },
            {
                text: 'Hahaha that is hilarious! Send it to the main class group!',
                isCorrect: false,
                explanation: 'Sharing or laughing at embarrassing photos promotes cyberbullying and degrades fellow students.'
            },
            {
                text: 'Tag Alex in the chat so they see what everyone thinks!',
                isCorrect: false,
                explanation: 'Tagging victims into hostile posts creates unnecessary public embarrassment.'
            }
        ]
    },
    {
        speaker: 'Class Group Chat',
        avatar: '👥',
        status: '5 members online',
        incomingMsg: 'Hey, let’s kick Jordan out of this group chat. Nobody likes them anyway and they are quiet.',
        time: '16:04',
        options: [
            {
                text: 'Jordan is part of our team. Everyone deserves a chance to contribute!',
                isCorrect: true,
                explanation: 'Inclusivity and standing up for quieter group members is a mark of an honorable Netiquette Knight!'
            },
            {
                text: 'Yeah bye Jordan',
                isCorrect: false,
                explanation: 'Excluding others maliciously is a form of social cyberbullying that causes real harm.'
            },
            {
                text: '(Say nothing and stay silent)',
                isCorrect: false,
                explanation: 'Being a passive bystander allows unfair exclusion to continue. Speak up kindly!'
            }
        ]
    },
    {
        speaker: 'New_Student_9',
        avatar: '🙋‍♂️',
        status: 'online',
        incomingMsg: 'Can someone explain where to upload the homework assignment? I am confused...',
        time: '17:22',
        options: [
            {
                text: 'Sure! Go to Assignments > Submit. Let me know if you need help!',
                isCorrect: true,
                explanation: 'Helping newcomers politely fosters a supportive and friendly online learning community!'
            },
            {
                text: 'How do you not know this? Read the instructions, it’s so easy lol.',
                isCorrect: false,
                explanation: 'Being condescending discourages others from asking questions and seeking help online.'
            },
            {
                text: 'Click here for help: www.fake-prank-link.com',
                isCorrect: false,
                explanation: 'Pranking someone who asks for genuine help wastes their time and breaks digital trust.'
            }
        ]
    },
    {
        speaker: 'StudyBuddy22',
        avatar: '📚',
        status: 'online',
        incomingMsg: 'Can someone send me the answers to the math quiz? The teacher will never know.',
        time: '18:05',
        options: [
            {
                text: 'I can help you study, but I won’t share quiz answers.',
                isCorrect: true,
                explanation: 'Encouraging honest learning instead of cheating promotes integrity and responsible online behavior.'
            },
            {
                text: 'Sure, I\'ll send you all my answers privately.',
                isCorrect: false,
                explanation: 'Sharing answers for graded work is dishonest and unfair to others.'
            },
            {
                text: 'Everyone cheats online anyway.',
                isCorrect: false,
                explanation: 'Normalizing cheating encourages unethical behavior and damages trust.'
            }
        ]
    },
    {
        speaker: 'Yi Long Musk',
        avatar: '🕵️',
        status: 'online',
        incomingMsg: 'Congratulations! You won a free gaming console! Just tell me your home address and password to claim it!',
        time: '18:34',
        options: [
            {
                text: 'I won’t share personal information. I’ll block and report this message.',
                isCorrect: true,
                explanation: 'Never share personal information or passwords with strangers online.'
            },
            {
                text: 'Here is my address! When will it arrive?',
                isCorrect: false,
                explanation: 'Sharing personal information with strangers puts your privacy and safety at risk.'
            },
            {
                text: 'My password is easy to remember, here it is...',
                isCorrect: false,
                explanation: 'Passwords should never be shared with anyone.'
            }
        ]
    },
    {
        speaker: 'SoccerFan88',
        avatar: '⚽',
        status: 'online',
        incomingMsg: 'LOL! Emma spelled one word wrong in her presentation. Everyone spam laughing emojis! 😂',
        time: '19:11',
        options: [
            {
                text: 'Everyone makes mistakes. Let’s encourage each other instead.',
                isCorrect: true,
                explanation: 'Supporting others instead of mocking them creates a respectful online community.'
            },
            {
                text: 'HAHAHAHA 😂😂😂',
                isCorrect: false,
                explanation: 'Joining in on public ridicule contributes to cyberbullying.'
            },
            {
                text: 'I\'ll post the mistake on every class chat!',
                isCorrect: false,
                explanation: 'Spreading someone’s mistake publicly increases embarrassment and harm.'
            }
        ]
    },
    {
        speaker: 'Group_Project',
        avatar: '📋',
        status: '4 members online',
        incomingMsg: 'Please remember to credit any images or articles you use in the presentation.',
        time: '19:42',
        options: [
            {
                text: 'Good idea! Giving credit shows respect for other people\'s work.',
                isCorrect: true,
                explanation: 'Citing sources is an important part of digital citizenship and academic honesty.'
            },
            {
                text: 'Just copy everything from Google. Nobody checks.',
                isCorrect: false,
                explanation: 'Copying work without credit is plagiarism.'
            },
            {
                text: 'I\'ll remove the author names so nobody knows.',
                isCorrect: false,
                explanation: 'Removing credit from creators is dishonest and disrespectful.'
            }
        ]
    },
    {
        speaker: 'FriendlyGamer',
        avatar: '🎲',
        status: 'online',
        incomingMsg: 'Great game everyone! We lost, but thanks for playing together!',
        time: '20:08',
        options: [
            {
                text: 'GG! Thanks for the positive attitude. Let’s play again sometime!',
                isCorrect: true,
                explanation: 'Positive sportsmanship helps build welcoming online communities.'
            },
            {
                text: 'You still played terribly.',
                isCorrect: false,
                explanation: 'Insulting others after a friendly message creates unnecessary negativity.'
            },
            {
                text: 'Nobody asked for your opinion.',
                isCorrect: false,
                explanation: 'Being rude discourages respectful conversations.'
            }
        ]
    },
    {
        speaker: 'Classmate101',
        avatar: '📱',
        status: 'online',
        incomingMsg: 'Someone accidentally posted their phone number in the chat.',
        time: '20:41',
        options: [
            {
                text: 'You might want to delete that message to protect your privacy.',
                isCorrect: true,
                explanation: 'Helping others protect their personal information is responsible digital citizenship.'
            },
            {
                text: 'Everyone save their number before they delete it!',
                isCorrect: false,
                explanation: 'Encouraging others to collect someone’s personal information is inappropriate.'
            },
            {
                text: 'I\'ll repost it so everyone sees it!',
                isCorrect: false,
                explanation: 'Sharing someone else’s personal information violates their privacy.'
            }
        ]
    },
    {
        speaker: 'Art Club',
        avatar: '🎨',
        status: '12 members online',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFIdL0MwUplo9irISWTFVaIPKs-9_vqecnEeB-VwMQAg&s=10',
        incomingMsg: 'Wow! Jamie drew this amazing picture. Let’s leave some encouraging comments!',
        time: '21:15',
        options: [
            {
                text: 'Great job, Jamie! Your hard work really shows.',
                isCorrect: true,
                explanation: 'Offering kind and genuine encouragement helps create a supportive online environment.'
            },
            {
                text: 'Mine is still better.',
                isCorrect: false,
                explanation: 'Boasting or putting others down discourages participation.'
            },
            {
                text: 'Delete it. It looks terrible.',
                isCorrect: false,
                explanation: 'Harsh insults can hurt confidence and contribute to online bullying.'
            }
        ]
    },
    {
        speaker: 'Moderator',
        avatar: '👨‍💼',
        status: 'online',
        incomingMsg: 'Please remember to keep discussions respectful and follow our community rules.',
        time: '21:47',
        options: [
            {
                text: 'Thanks for the reminder! I’ll help keep the chat respectful.',
                isCorrect: true,
                explanation: 'Following community guidelines helps create a safe and enjoyable space for everyone.'
            },
            {
                text: 'Rules are pointless. I\'ll say whatever I want.',
                isCorrect: false,
                explanation: 'Ignoring community rules often leads to conflict and moderation actions.'
            },
            {
                text: 'Let’s see how many rules we can break.',
                isCorrect: false,
                explanation: 'Encouraging rule-breaking disrupts the community and creates an unsafe environment.'
            }
        ]
    },
    {
        speaker: 'GamerGirl_Sam',
        avatar: '🎧',
        status: 'online',
        incomingMsg: 'Why are girls even playing this game? Go back to playing with dolls lol!',
        time: '22:04',
        options: [
            {
                text: 'Gaming is for everyone regardless of gender. Let’s focus on the match!',
                isCorrect: true,
                explanation: 'Challenging stereotypes and keeping the space inclusive for all players is true digital honor!'
            },
            {
                text: 'Yeah, girls ruin every lobby!',
                isCorrect: false,
                explanation: 'Joining in on discriminatory or sexist remarks promotes toxic exclusion in online spaces.'
            },
            {
                text: 'Go away, nobody asked you!',
                isCorrect: false,
                explanation: 'Dismissing or hostility towards other chat members creates a hostile gaming environment.'
            }
        ]
    },
    {
        speaker: 'Mod_Bot_Delta',
        avatar: '🤖',
        status: 'online',
        incomingMsg: 'Warning: Rumors are spreading about a classmate’s family online. What should you do if you see false gossip being shared?',
        time: '22:30',
        options: [
            {
                text: 'Refuse to spread it, support the person targeted, and report malicious gossip.',
                isCorrect: true,
                explanation: 'Stopping the spread of false rumors prevents emotional harm and stops viral defamation.'
            },
            {
                text: 'Forward it to my close friends so they know the drama!',
                isCorrect: false,
                explanation: 'Sharing unverified rumors or gossip—even privately—helps spread misinformation and cyberbullying.'
            },
            {
                text: 'Add more fake details to make the story sound crazier!',
                isCorrect: false,
                explanation: 'Fabricating or exaggerating rumors intentionally causes severe emotional distress.'
            }
        ]
    },
    {
        speaker: 'Techy_Tom',
        avatar: '💻',
        status: 'online',
        incomingMsg: 'Hey guys, check out this funny meme account that makes fun of our teachers! Drop their names in the comments!',
        time: '23:12',
        options: [
            {
                text: 'Targeting teachers or school staff online is disrespectful. Let’s keep it positive.',
                isCorrect: true,
                explanation: 'Treating educators and authority figures with digital respect upholds good netiquette.'
            },
            {
                text: 'Hahaha I\'ll post all their secrets!',
                isCorrect: false,
                explanation: 'Targeting individuals online with malicious memes crosses into harassment and cyberbullying.'
            },
            {
                text: 'Tag their personal accounts so they see it!',
                isCorrect: false,
                explanation: 'Tagging authority figures or peers into hateful posts constitutes direct online harassment.'
            }
        ]
    },
    {
        speaker: 'Mystery_User',
        avatar: '👤',
        status: 'online',
        incomingMsg: 'Hey, I saw you live near my neighborhood! Which school do you go to and what time do you walk home?',
        time: '23:45',
        options: [
            {
                text: 'I don’t share my personal schedule or location details online with strangers.',
                isCorrect: true,
                explanation: 'Protecting real-life location details from unknown online profiles is vital for personal safety.'
            },
            {
                text: 'I go to Lincoln High and walk home at 3 PM!',
                isCorrect: false,
                explanation: 'Revealing daily routines and exact locations to online strangers poses serious real-world safety risks.'
            },
            {
                text: 'Here is a picture of my exact house front door!',
                isCorrect: false,
                explanation: 'Sharing photos of identifiable locations or homes completely compromises your real-world security.'
            }
        ]
    },
    {
        speaker: 'Drama_Central',
        avatar: '🔥',
        status: 'online',
        incomingMsg: 'VOTE NOW: Who is the ugliest person in our grade? A) Liam B) Chloe C) Marcus',
        time: '00:15',
        options: [
            {
                text: 'Online rating polls designed to put people down are harmful. Delete this!',
                isCorrect: true,
                explanation: 'Calling out malicious ranking polls protects peers from public embarrassment and body-shaming.'
            },
            {
                text: 'Option A for sure, Liam looks ridiculous!',
                isCorrect: false,
                explanation: 'Voting or participating in mean-spirited polls actively reinforces targeted cyberbullying.'
            },
            {
                text: 'Add my name to the list too, I don\'t care!',
                isCorrect: false,
                explanation: 'Normalizing public degradation diminishes the importance of creating safe online spaces.'
            }
        ]
    },
    {
        speaker: 'Science_Lab_Group',
        avatar: '🔬',
        status: '3 members online',
        incomingMsg: 'Guys, Maya didn’t help with the lab slides today because she was sick. Should we take her name off the project?',
        time: '08:30',
        options: [
            {
                text: 'Let’s message Maya to see how she’s feeling and give her a chance to catch up on her part.',
                isCorrect: true,
                explanation: 'Demonstrating empathy and open communication ensures fair and supportive group work.'
            },
            {
                text: 'Yep, remove her immediately! No free grades!',
                isCorrect: false,
                explanation: 'Jumping to conclusions without checking on sick teammates lacks compassion and fairness.'
            },
            {
                text: 'Tell the teacher she lazy-quit the team!',
                isCorrect: false,
                explanation: 'Falsely reporting teammates without understanding their situation breaks trust within group work.'
            }
        ]
    },
    {
        speaker: 'Streamer_Fan_Zone',
        avatar: '🎥',
        status: '128 members online',
        incomingMsg: 'EVERYONE SPAM "TRASH STREAMER" IN THE CHAT TO GET THEIR ATTENTION!',
        time: '09:15',
        options: [
            {
                text: 'Spamming hate text ruins the stream for everyone. Let’s keep chat constructive!',
                isCorrect: true,
                explanation: 'Refusing to participate in chat raids or mass spamming keeps public streams welcoming.'
            },
            {
                text: 'TRASH STREAMER TRASH STREAMER TRASH STREAMER!',
                isCorrect: false,
                explanation: 'Copy-pasting hate raids ruins live events and violates platform service agreements.'
            },
            {
                text: 'I\'ll use multiple accounts to spam faster!',
                isCorrect: false,
                explanation: 'Using alternate accounts to bypass limits or harassment controls damages online communities.'
            }
        ]
    },
    {
        speaker: 'Kind_Stranger',
        avatar: '🌸',
        status: 'online',
        incomingMsg: 'I’ve been feeling really down and stressed about school lately... feeling like quitting everything.',
        time: '10:05',
        options: [
            {
                text: 'I hear you. You’re not alone, and it helps to talk to a trusted adult, teacher, or counselor.',
                isCorrect: true,
                explanation: 'Offering supportive words and encouraging connections to real-world help shows high emotional intelligence.'
            },
            {
                text: 'Stop being dramatic, everyone has stress lol.',
                isCorrect: false,
                explanation: 'Dismissing someone’s mental health struggles or feelings increases their sense of isolation.'
            },
            {
                text: 'Nobody cares, go post that somewhere else.',
                isCorrect: false,
                explanation: 'Responding with cold hostility to someone expressing distress can have severe real-world consequences.'
            }
        ]
    },
    {
        speaker: 'Striker_Sam',
        avatar: '⚽',
        status: 'online',
        incomingMsg: 'I can’t believe I missed that open goal in the final minute of our soccer match... We lost because of me.',
        time: '11:20',
        options: [
            {
                text: 'Don’t beat yourself up! We win and lose as a team. You played a great game overall.',
                isCorrect: true,
                explanation: 'Reassuring a teammate after a mistake builds team spirit and helps them bounce back with confidence.'
            },
            {
                text: 'Yeah, that was an awful miss. How did you even manage to blow that?',
                isCorrect: false,
                explanation: 'Blaming or shaming teammates for mistakes hurts their confidence and creates a toxic atmosphere.'
            },
            {
                text: 'You should probably bench yourself for the next match.',
                isCorrect: false,
                explanation: 'Telling teammates to give up or bench themselves damages morale and discourages improvement.'
            }
        ]
    }
];

let score = 0;
let shieldGauge = 100;
let questIndex = 0;
let shuffledQuests = [];
let isPaladin = false;

// Typing effect variables
let typingTimeout = null;
let isTyping = false;
let currentFullMsg = "";

// --- DOM ELEMENTS ---
const scoreVal = document.getElementById('score-val');
const rankVal = document.getElementById('rank-val');
const gaugeFill = document.getElementById('gauge-fill');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const feedbackModal = document.getElementById('feedback-modal');

// Chat UI Elements
const speakerAvatar = document.getElementById('speaker-avatar');
const speakerName = document.getElementById('speaker-name');
const speakerStatus = document.getElementById('speaker-status');
const messageFeed = document.getElementById('message-feed');
const choicesContainer = document.getElementById('choices-container');
const chatWindow = document.getElementById('chat-window');

// Feedback Elements
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackTag = document.getElementById('feedback-tag');
const feedbackDesc = document.getElementById('feedback-desc');

// --- EVENT LISTENERS ---
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);

// Allow clicking chat window to instantly finish typing animation
chatWindow.addEventListener('click', () => {
    if (isTyping) {
        completeTypingInstantly();
    }
});

function startGame() {
    isPaladin = document.querySelector('input[name="difficulty"]:checked').value === 'paladin';
    score = 0;
    shieldGauge = 100;
    questIndex = 0;

    shuffledQuests = [...QUESTS].sort(() => Math.random() - 0.5);

    updateHUD();
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    feedbackModal.classList.add('hidden');

    loadQuest();
}

function loadQuest() {
    if (questIndex >= shuffledQuests.length) {
        shuffledQuests = [...QUESTS].sort(() => Math.random() - 0.5);
        questIndex = 0;
    }

    const q = shuffledQuests[questIndex];

    speakerAvatar.textContent = q.avatar;
    speakerName.textContent = q.speaker;
    speakerStatus.textContent = 'typing...';

    // Reset feed and hide options while typing
    choicesContainer.style.opacity = '0';
    choicesContainer.style.pointerEvents = 'none';

    // Renders time metadata hidden via inline style initially
    if (q.image) {
        messageFeed.innerHTML = `
            <div class="message-bubble incoming image-message-bubble">
                <img src="${q.image}" class="chat-attachment-img" alt="Chat attachment" />
                <span class="bubble-meta">${q.time}</span>
            </div>
            <div class="message-bubble incoming" id="incoming-bubble">
                <span id="typed-text"></span>
                <span class="bubble-meta" id="incoming-meta" style="opacity: 0; transition: opacity 0.3s ease;">${q.time}</span>
            </div>
        `;
    } else {
        messageFeed.innerHTML = `
            <div class="message-bubble incoming" id="incoming-bubble">
                <span id="typed-text"></span>
                <span class="bubble-meta" id="incoming-meta" style="opacity: 0; transition: opacity 0.3s ease;">${q.time}</span>
            </div>
        `;
    }

    choicesContainer.innerHTML = '';

    // Prepare choices
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<span>${opt.text}</span> <span>➔</span>`;
        btn.onclick = () => makeChoice(opt, q);
        choicesContainer.appendChild(btn);
    });

    // Start typing effect for text message
    currentFullMsg = q.incomingMsg;
    startTypingEffect(q.incomingMsg, q.status);
}

function startTypingEffect(fullText, finalStatus) {
    let charIndex = 0;
    isTyping = true;
    const typedTextElem = document.getElementById('typed-text');

    function typeNextChar() {
        if (charIndex < fullText.length) {
            typedTextElem.textContent += fullText.charAt(charIndex);
            charIndex++;
            chatWindow.scrollTop = chatWindow.scrollHeight;
            typingTimeout = setTimeout(typeNextChar, 30);
        } else {
            finishTyping(finalStatus);
        }
    }

    typeNextChar();
}

function finishTyping(finalStatus) {
    isTyping = false;
    speakerStatus.textContent = finalStatus;

    // Show timestamp after typing finishes
    const incomingMeta = document.getElementById('incoming-meta');
    if (incomingMeta) {
        incomingMeta.style.opacity = '1';
    }

    // Reveal choice options with smooth fade in
    choicesContainer.style.transition = 'opacity 0.3s ease';
    choicesContainer.style.opacity = '1';
    choicesContainer.style.pointerEvents = 'all';
}

function makeChoice(option, currentQuest) {
    if (isTyping) return;

    // Lock input and hide choices
    isTyping = true; 
    choicesContainer.style.opacity = '0';
    choicesContainer.style.pointerEvents = 'none';

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Append empty Outgoing Bubble with hidden metadata
    const outgoingBubble = document.createElement('div');
    outgoingBubble.className = 'message-bubble outgoing';
    
    outgoingBubble.innerHTML = `
        <span id="player-typed-text"></span>
        <span class="bubble-meta" id="player-meta" style="opacity: 0; transition: opacity 0.3s ease;">${timeStr} <span class="read-check">✓✓</span></span>
    `;
    messageFeed.appendChild(outgoingBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    currentFullMsg = option.text;

    // Run character incremental loop for the player selection
    let charIndex = 0;
    const playerTextElem = document.getElementById('player-typed-text');

    function typePlayerChar() {
        if (charIndex < option.text.length) {
            playerTextElem.textContent += option.text.charAt(charIndex);
            charIndex++;
            chatWindow.scrollTop = chatWindow.scrollHeight;
            typingTimeout = setTimeout(typePlayerChar, 20);
        } else {
            // Player typing finished: reveal time & blue ticks
            isTyping = false;
            const playerMeta = document.getElementById('player-meta');
            if (playerMeta) {
                playerMeta.style.opacity = '1';
            }

            setTimeout(() => {
                if (option.isCorrect) {
                    score += 10;
                    if (shieldGauge < 100) shieldGauge = Math.min(100, shieldGauge + 10);
                    showFeedback(true, option.explanation);
                } else {
                    const damage = isPaladin ? 100 : 34;
                    shieldGauge = Math.max(0, shieldGauge - damage);
                    showFeedback(false, option.explanation);
                }
                updateHUD();
            }, 400);
        }
    }

    typePlayerChar();
}

function completeTypingInstantly() {
    const typedTextElem = document.getElementById('typed-text');
    if (!typedTextElem) return; 

    clearTimeout(typingTimeout);
    typedTextElem.textContent = currentFullMsg;
    const q = shuffledQuests[questIndex];
    finishTyping(q.status);
}

function showFeedback(isCorrect, explanation) {
    if (isCorrect) {
        feedbackIcon.textContent = '🛡️';
        feedbackTitle.textContent = 'VALIANT RESPONSE!';
        feedbackTitle.style.color = 'var(--honor-green)';
        feedbackTag.textContent = '+10 HONOR POINTS';
        feedbackTag.className = 'tag-honor';
    } else {
        feedbackIcon.textContent = '💥';
        feedbackTitle.textContent = 'HONOR VIOLATION!';
        feedbackTitle.style.color = 'var(--error-red)';
        feedbackTag.textContent = isPaladin ? 'REALM FALLEN' : '-34% SHIELD INTEGRITY';
        feedbackTag.className = 'tag-penalty';
    }

    feedbackDesc.textContent = explanation;
    feedbackModal.classList.remove('hidden');
}

function nextQuest() {
    feedbackModal.classList.add('hidden');

    if (shieldGauge <= 0) {
        gameOver();
    } else {
        questIndex++;
        loadQuest();
    }
}

function updateHUD() {
    scoreVal.textContent = score;

    if (score >= 40) rankVal.textContent = 'Paladin Champion 👑';
    else if (score >= 20) rankVal.textContent = 'Realm Guardian 🛡️';
    else rankVal.textContent = 'Squire ⚔️';

    gaugeFill.style.width = `${shieldGauge}%`;
    if (shieldGauge > 60) gaugeFill.style.backgroundColor = 'var(--honor-green)';
    else if (shieldGauge > 30) gaugeFill.style.backgroundColor = 'var(--knight-gold)';
    else gaugeFill.style.backgroundColor = 'var(--error-red)';
}

function gameOver() {
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-rank').textContent = rankVal.textContent;
    endScreen.classList.remove('hidden');
}