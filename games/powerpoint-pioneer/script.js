// Preload uploaded audio effect
const clickSound = new Audio("matthewvakaliuk73627-mouse-click-290204.mp3");

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => { });
}

// Selection preservation state
let savedRange = null;

function saveSelection() {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const container = document.getElementById('slideContainer');
        if (container && container.contains(range.commonAncestorContainer)) {
            savedRange = range.cloneRange();
        }
    }
}

function restoreSelection() {
    if (savedRange) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange);
    }
}

// Game State & Variables
let userXP = 0;
let currentLevelIndex = 0;
let currentSlidesData = [];
let activeSlideIndex = 0;

// Game Levels Definition (12 Classic PowerPoint Levels)
const levels = [
    {
        id: 1, docTitle: "Q1_Review.pptx",
        task: "Make the main title <strong>'Q1 Earnings Report'</strong> <em>Bold</em>.",
        hint: "Select the text 'Q1 Earnings Report' on the slide and click the Bold (B) button.",
        slides: [{ html: `<h1>Q1 Earnings Report</h1><p>A summary of our performance.</p>` }],
        validate: () => {
            const h1 = document.querySelector(".slide.active h1");
            if (!h1) return false;
            
            let isBold = false;
            
            // 1. Check if the H1 itself became bold
            const h1Style = window.getComputedStyle(h1);
            if (h1Style.fontWeight === "700" || h1Style.fontWeight === "bold") {
                isBold = true;
            }
            
            // 2. Check if any generated child element (like a <span> or <b>) inside the H1 is bold
            h1.querySelectorAll("*").forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.fontWeight === "700" || style.fontWeight === "bold" || el.tagName === "B" || el.tagName === "STRONG") {
                    isBold = true;
                }
            });
            
            return isBold;
        }
    },
    {
        id: 2, docTitle: "Q1_Review.pptx",
        task: "Presentations need multiple pages. Go to the Home or Insert tab and add a <strong>New Slide</strong>.",
        hint: "Click the 'New Slide' button.",
        slides: [{ html: `<h1>Revenue Stats</h1><p>We grew by 15%.</p>` }],
        validate: () => currentSlidesData.length >= 2
    },
    {
        id: 3, docTitle: "Agenda.pptx",
        task: "Let's organize. <strong>Center Align</strong> the subtitle 'Quarterly Overview'.",
        hint: "Highlight 'Quarterly Overview' and click the Center Align paragraph button.",
        slides: [{ html: `<h1>Agenda</h1><p style="text-align: left;">Quarterly Overview</p>` }],
        validate: () => {
            const p = document.querySelector(".slide.active p");
            if (!p) return false;
            const style = window.getComputedStyle(p);
            return style.textAlign === "center" || style.textAlign === "-webkit-center";
        }
    },
    {
        id: 4, docTitle: "Points.pptx",
        task: "Convert the topics into a <strong>Bullet List</strong>.",
        hint: "Highlight the 3 items on the slide and click the Bullet List icon.",
        slides: [{ html: `<h1>Key Topics</h1><p>Marketing</p><p>Sales</p><p>Engineering</p>` }],
        validate: () => {
            const ul = document.querySelector(".slide.active ul");
            return ul && ul.querySelectorAll("li").length >= 3;
        }
    },
    {
        id: 5, docTitle: "Alert.pptx",
        task: "Draw attention by changing the text color of <strong>'URGENT'</strong> to <strong>Red</strong>.",
        hint: "Highlight 'URGENT' and pick Red from the Font Color palette.",
        slides: [{ html: `<h1>Project Status</h1><p><span>URGENT</span>: Delivery is delayed.</p>` }],
        validate: () => {
            let found = false;
            document.querySelectorAll(".slide.active span, .slide.active font").forEach(el => {
                if (el.innerText.includes("URGENT")) {
                    const color = window.getComputedStyle(el).color;
                    if (color.includes("255, 0, 0") || color.includes("red") || color.includes("192, 0, 0")) found = true;
                }
            });
            return found;
        }
    },
    {
        id: 6, docTitle: "Highlights.pptx",
        task: "Highlight the phrase <strong>'Record Profits'</strong> in Yellow.",
        hint: "Select 'Record Profits', open the Highlight Color tool, and pick Yellow.",
        slides: [{ html: `<h1>Success Story</h1><p>We achieved Record Profits this month.</p>` }],
        validate: () => {
            let found = false;
            document.querySelectorAll(".slide.active mark, .slide.active span").forEach(el => {
                if (el.innerText.includes("Record Profits")) {
                    const bg = window.getComputedStyle(el).backgroundColor;
                    if (bg.includes("255, 255, 0") || bg.includes("yellow")) found = true;
                }
            });
            return found;
        }
    },
    {
        id: 7, docTitle: "Diagram.pptx",
        task: "Go to the <strong>Insert</strong> tab and add a <strong>Shape</strong>.",
        hint: "Click the Insert tab, then click the Shapes button to spawn a shape.",
        slides: [{ html: `<h1>Visuals</h1><p>Insert a shape below.</p>` }],
        validate: () => document.querySelector(".slide.active .ppt-shape") !== null
    },
    {
        id: 8, docTitle: "Brand.pptx",
        task: "Change the font of the title to <strong>Arial</strong>.",
        hint: "Select the title text and choose 'Arial' from the Font Family dropdown.",
        slides: [{ html: `<h1>Brand Strategy</h1><p>Consistency is key.</p>` }],
        validate: () => {
            const h1 = document.querySelector(".slide.active h1");
            if (!h1) return false;

            let isArial = false;

            // 1. Check if the H1 itself changed to Arial
            const h1Font = window.getComputedStyle(h1).fontFamily.toLowerCase();
            if (h1Font.includes("arial")) {
                isArial = true;
            }

            // 2. Check if the browser generated an inner tag (span or font) with Arial
            h1.querySelectorAll("*").forEach(el => {
                const childFont = window.getComputedStyle(el).fontFamily.toLowerCase();
                // Some browsers use the face attribute for the font command
                const faceAttr = el.getAttribute("face") ? el.getAttribute("face").toLowerCase() : "";
                
                if (childFont.includes("arial") || faceAttr.includes("arial")) {
                    isArial = true;
                }
            });

            return isArial;
        }
    },
    {
        id: 9, docTitle: "Transitions.pptx",
        task: "Let's get dynamic! Go to the <strong>Transitions</strong> tab and apply the <strong>Push</strong> transition to this slide.",
        hint: "Click the Transitions tab, then click 'Push'. Watch the slide animate!",
        slides: [{ html: `<h1>Slide Entry</h1><p>Transitions control how the slide appears.</p>` }],
        validate: () => {
            const slide = document.querySelector(".slide.active");
            return slide && slide.classList.contains("trans-push");
        }
    },
    {
        id: 10, docTitle: "Animations.pptx",
        task: "Now animate the text! Go to the <strong>Animations</strong> tab and apply the <strong>Fly In</strong> effect.",
        hint: "Click the Animations tab, then click 'Fly In'.",
        slides: [{ html: `<h1>Element Animation</h1><p>Animations move individual text boxes.</p>` }],
        validate: () => {
            const slide = document.querySelector(".slide.active");
            if (!slide) return false;
            let animated = false;
            for(let i=0; i<slide.children.length; i++) {
                if (slide.children[i].className.includes("anim-flyin")) animated = true;
            }
            return animated;
        }
    },
    {
        id: 11, docTitle: "Underline.pptx",
        task: "<strong>Underline</strong> the word 'Confidential'.",
        hint: "Select 'Confidential' and click the Underline (U) button.",
        slides: [{ html: `<h1>Data Review</h1><p>This information is Confidential.</p>` }],
        validate: () => {
            let found = false;
            document.querySelectorAll(".slide.active u, .slide.active span").forEach(el => {
                if (el.innerText.includes("Confidential")) {
                    if (window.getComputedStyle(el).textDecorationLine.includes("underline") || el.tagName === "U") found = true;
                }
            });
            return found;
        }
    },
    {
        id: 12, docTitle: "Final_Deck.pptx",
        task: "Final task! Add a <strong>New Slide</strong>, type 'Thank You', and make it <em>Italic</em>.",
        hint: "Click New Slide. Type 'Thank You', highlight it, and click Italic (I).",
        slides: [{ html: `<h1>Conclusion</h1><p>That wraps up the presentation.</p>` }],
        validate: () => {
            if (currentSlidesData.length < 2) return false;
            const slide2 = document.getElementById("slide-1");
            if (!slide2) return false;
            let foundItalic = false;
            slide2.querySelectorAll("em, i, span, font").forEach(el => {
                if (el.innerText.includes("Thank You")) {
                    if (window.getComputedStyle(el).fontStyle === "italic" || el.tagName === "EM" || el.tagName === "I") foundItalic = true;
                }
            });
            return foundItalic;
        }
    }
];

// Initialize Game on Page Load
document.addEventListener("DOMContentLoaded", () => {
    loadLevel(0);
});

function loadLevel(index) {
    if (index < 0 || index >= levels.length) return;
    currentLevelIndex = index;
    const level = levels[index];

    document.getElementById("doc-title").innerText = level.docTitle;
    document.getElementById("task-instruction").innerHTML = level.task;
    
    // Reset and load fresh slides for the level
    initSlides(JSON.parse(JSON.stringify(level.slides)));

    document.getElementById("status-message").innerText = "";
    document.getElementById("status-message").className = "status-message";
    document.getElementById("system-feedback").innerText = "Ready";
}

// --- SLIDE ENGINE ---
function initSlides(slides) {
    currentSlidesData = slides;
    const thumbPane = document.getElementById('thumbnailPane');
    const slideContainer = document.getElementById('slideContainer');
    
    thumbPane.innerHTML = '';
    slideContainer.innerHTML = '';

    slides.forEach((slide, idx) => {
        const thumbWrap = document.createElement('div');
        thumbWrap.className = `thumbnail-wrapper ${idx === 0 ? 'active' : ''}`;
        thumbWrap.id = `thumb-wrap-${idx}`;
        thumbWrap.onclick = () => switchSlide(idx);
        thumbWrap.innerHTML = `
            <span class="thumbnail-number">${idx+1}</span>
            <div class="thumbnail">
                <div class="thumbnail-content" id="thumb-content-${idx}">${slide.html}</div>
            </div>
        `;
        thumbPane.appendChild(thumbWrap);

        const slideEl = document.createElement('div');
        slideEl.className = `slide ${idx === 0 ? 'active' : ''}`;
        slideEl.id = `slide-${idx}`;
        slideEl.contentEditable = true;
        slideEl.spellcheck = false;
        slideEl.innerHTML = slide.html;
        slideContainer.appendChild(slideEl);
    });

    activeSlideIndex = 0;
    updateSlideCountUI();
}

function switchSlide(idx) {
    playClickSound();
    document.querySelectorAll('.thumbnail-wrapper').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.slide').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`thumb-wrap-${idx}`).classList.add('active');
    document.getElementById(`slide-${idx}`).classList.add('active');
    
    activeSlideIndex = idx;
    updateSlideCountUI();
}

function addNewSlide() {
    playClickSound();
    const idx = currentSlidesData.length;
    const newSlideData = { html: `<h1>Click to add title</h1><p>Click to add text</p>` };
    currentSlidesData.push(newSlideData);
    
    const thumbPane = document.getElementById('thumbnailPane');
    const slideContainer = document.getElementById('slideContainer');

    const thumbWrap = document.createElement('div');
    thumbWrap.className = `thumbnail-wrapper`;
    thumbWrap.id = `thumb-wrap-${idx}`;
    thumbWrap.onclick = () => switchSlide(idx);
    thumbWrap.innerHTML = `
        <span class="thumbnail-number">${idx+1}</span>
        <div class="thumbnail">
            <div class="thumbnail-content" id="thumb-content-${idx}">${newSlideData.html}</div>
        </div>
    `;
    thumbPane.appendChild(thumbWrap);

    const slideEl = document.createElement('div');
    slideEl.className = `slide`;
    slideEl.id = `slide-${idx}`;
    slideEl.contentEditable = true;
    slideEl.spellcheck = false;
    slideEl.innerHTML = newSlideData.html;
    slideContainer.appendChild(slideEl);

    switchSlide(idx);
}

function updateThumbnails() {
    const activeSlide = document.getElementById(`slide-${activeSlideIndex}`);
    const activeThumb = document.getElementById(`thumb-content-${activeSlideIndex}`);
    if (activeSlide && activeThumb) {
        activeThumb.innerHTML = activeSlide.innerHTML;
        currentSlidesData[activeSlideIndex].html = activeSlide.innerHTML;
    }
}

function updateSlideCountUI() {
    document.getElementById("slide-count").innerText = `Slide ${activeSlideIndex + 1} of ${currentSlidesData.length}`;
}

// --- FORMATTING LOGIC ---
function formatDoc(cmd, value = null) {
    playClickSound();
    const activeSlide = document.getElementById(`slide-${activeSlideIndex}`);
    if(activeSlide) activeSlide.focus();
    restoreSelection();

    try { document.execCommand("styleWithCSS", false, true); } catch (e) { }

    if (cmd === "hiliteColor" || cmd === "backColor") {
        let success = document.execCommand("hiliteColor", false, value);
        if (!success) document.execCommand("backColor", false, value);
    } else {
        document.execCommand(cmd, false, value);
    }

    saveSelection();
    updateThumbnails();
}

function insertElement(type) {
    playClickSound();
    restoreSelection();
    
    if (type === 'shape') {
        const shapeHTML = `<div class="ppt-shape" style="width:120px; height:120px; background:#c43e1c; margin:10px auto; border: 2px solid #9c3115;"></div>&nbsp;`;
        document.execCommand('insertHTML', false, shapeHTML);
    } else if (type === 'table') {
        document.execCommand('insertHTML', false, `<table border="1" style="width:80%; margin: 20px auto; border-collapse:collapse; text-align:center;"><tr><td style="padding:10px;">Cell 1</td><td style="padding:10px;">Cell 2</td></tr><tr><td style="padding:10px;">Cell 3</td><td style="padding:10px;">Cell 4</td></tr></table>&nbsp;`);
    } else if (type === 'textbox') {
        document.execCommand('insertHTML', false, `<div style="border:1px dashed #ccc; padding:15px; display:inline-block; margin: 20px;">Type here</div>&nbsp;`);
    }
    
    const activeSlide = document.getElementById(`slide-${activeSlideIndex}`);
    if(activeSlide) activeSlide.focus();
    updateThumbnails();
}

// --- TRANSITIONS & ANIMATIONS ---
function applyTransition(type) {
    playClickSound();
    const slide = document.getElementById(`slide-${activeSlideIndex}`);
    if (!slide) return;
    
    // Remove old transition classes
    slide.className = slide.className.replace(/\btrans-\S+/g, '');
    
    // Trigger CSS reflow to restart animation
    void slide.offsetWidth;
    
    if (type !== 'none') {
        slide.classList.add(`trans-${type}`);
    }
    
    document.getElementById("system-feedback").innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Transition Applied`;
    updateThumbnails();
}

function applyAnimation(type) {
    playClickSound();
    const slide = document.getElementById(`slide-${activeSlideIndex}`);
    if (!slide) return;
    
    // Apply animation directly to all main elements inside the slide (h1, p, etc)
    const children = slide.children;
    for(let i=0; i<children.length; i++) {
        children[i].className = children[i].className.replace(/\banim-\S+/g, '');
        void children[i].offsetWidth; // trigger reflow
        
        if (type !== 'none') {
            children[i].classList.add(`anim-${type}`);
        }
    }
    
    document.getElementById("system-feedback").innerHTML = `<i class="fa-solid fa-star"></i> Animation Applied`;
    updateThumbnails();
}

// --- DROPDOWN MENUS ---
function toggleColorMenu(menuId, event) {
    playClickSound();
    event.stopPropagation();
    document.querySelectorAll(".color-menu-popup").forEach(menu => {
        if (menu.id !== menuId) menu.classList.remove("show");
    });
    const targetMenu = document.getElementById(menuId);
    if (targetMenu) targetMenu.classList.toggle("show");
}

function applyFontColor(color) {
    playClickSound();
    formatDoc("foreColor", color);
    const indicator = document.getElementById("fontColorIndicator");
    if (indicator) indicator.style.backgroundColor = color;
    closeAllColorMenus();
}

function applyHighlightColor(color) {
    playClickSound();
    formatDoc("hiliteColor", color === "transparent" ? "rgba(0, 0, 0, 0)" : color);
    const indicator = document.getElementById("highlightColorIndicator");
    if (indicator) indicator.style.backgroundColor = (color === "transparent") ? "#ffff00" : color;
    closeAllColorMenus();
}

function closeAllColorMenus() {
    document.querySelectorAll(".color-menu-popup").forEach(menu => menu.classList.remove("show"));
}
window.addEventListener("click", closeAllColorMenus);

// --- NAVIGATION & UTILS ---
function switchTab(element, tabId) {
    playClickSound();
    // Remove active state from all tab buttons and containers
    document.querySelectorAll(".tab-item").forEach(t => t.classList.remove("active-tab"));
    document.querySelectorAll(".tab-ribbon").forEach(r => r.classList.remove("active"));
    
    // Add active state to clicked elements
    element.classList.add("active-tab");
    document.getElementById(tabId).classList.add("active");
}

function showHint() {
    playClickSound();
    const hint = levels[currentLevelIndex].hint;
    const statusMsg = document.getElementById("status-message");
    statusMsg.innerHTML = `<i class="fa-regular fa-lightbulb"></i> <strong>Hint:</strong> ${hint}`;
    statusMsg.className = "status-message";
}

function checkAnswer() {
    playClickSound();
    const currentLevel = levels[currentLevelIndex];
    const isSuccess = currentLevel.validate();
    const statusMsg = document.getElementById("status-message");

    if (isSuccess) {
        userXP += 100;
        document.getElementById("score-badge").innerHTML = `<i class="fa-solid fa-star"></i> XP: ${userXP}`;

        if (currentLevelIndex + 1 < levels.length) {
            statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Great job! Loading Level ${currentLevelIndex + 2}...`;
            statusMsg.className = "status-message success";

            setTimeout(() => {
                currentLevelIndex++;
                loadLevel(currentLevelIndex);
            }, 1400);
        } else {
            statusMsg.innerHTML = `<i class="fa-solid fa-trophy"></i> Outstanding! You completed all 12 PowerPoint Pioneer levels!`;
            statusMsg.className = "status-message success";
        }
    } else {
        statusMsg.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Formatting doesn't match yet. Try again or check the hint!`;
        statusMsg.className = "status-message error";
    }
}

// Title Bar Actions
function saveDocument() {
    playClickSound();
    let fullHTML = "";
    currentSlidesData.forEach((slide, idx) => {
        fullHTML += `--- SLIDE ${idx + 1} ---\n${document.getElementById(`slide-${idx}`).innerText}\n\n`;
    });
    
    const blob = new Blob([fullHTML], { type: "text/plain" });
    const anchor = document.createElement("a");
    anchor.download = document.getElementById("doc-title").innerText.replace(".pptx", ".txt");
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
}

function searchDocument(query) {
    if (!query) return;
    if (window.find) window.find(query);
}

// Zoom & View
function changeZoom(val) {
    const container = document.getElementById("slideContainer");
    if (container) container.style.transform = `scale(${val / 100})`;
    document.getElementById("zoomVal").innerText = `${val}%`;
}
function adjustZoom(delta) {
    const slider = document.getElementById("zoomRange");
    if (!slider) return;
    slider.value = Math.min(150, Math.max(30, parseInt(slider.value) + delta));
    changeZoom(slider.value);
}

let presSlideIndex = 0;

function startPresentation() {
    playClickSound();
    updateThumbnails();

    const overlay = document.getElementById("presentationOverlay");
    overlay.style.display = "flex";
    presSlideIndex = activeSlideIndex;

    renderPresSlide();

    if (overlay.requestFullscreen) {
        overlay.requestFullscreen().catch(err => console.log("Fullscreen denied by browser."));
    }

    document.addEventListener("keydown", handlePresKeys);
}

function renderPresSlide() {
    const presContainer = document.getElementById("presentationSlide");
    
    // Reset container classes to clear old transitions
    presContainer.className = "presentation-slide";
    
    if (currentSlidesData[presSlideIndex]) {
        // 1. Inject the HTML
        presContainer.innerHTML = currentSlidesData[presSlideIndex].html;
        
        // 2. Clone the transition class from the actual DOM
        const actualSlide = document.getElementById(`slide-${presSlideIndex}`);
        if (actualSlide) {
            const transClass = Array.from(actualSlide.classList).find(c => c.startsWith('trans-'));
            if (transClass) {
                // Force a reflow so the transition animation replays
                void presContainer.offsetWidth; 
                presContainer.classList.add(transClass);
            }
            
            // 3. Clone animation classes to inner children (h1, p, etc)
            const actualChildren = actualSlide.children;
            const presChildren = presContainer.children;
            for (let i = 0; i < actualChildren.length; i++) {
                if (presChildren[i]) {
                    const animClass = Array.from(actualChildren[i].classList).find(c => c.startsWith('anim-'));
                    if (animClass) presChildren[i].classList.add(animClass);
                }
            }
        }
    }
}

function nextPresSlide() {
    if (presSlideIndex < currentSlidesData.length - 1) {
        playClickSound();
        presSlideIndex++;
        renderPresSlide();
    } else {
        exitPresentation();
    }
}

function prevPresSlide() {
    if (presSlideIndex > 0) {
        playClickSound();
        presSlideIndex--;
        renderPresSlide();
    }
}

function exitPresentation() {
    const overlay = document.getElementById("presentationOverlay");
    overlay.style.display = "none";
    
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {});
    }
    
    document.removeEventListener("keydown", handlePresKeys);
    
    // Switch the editor back to wherever the user left off in the presentation
    switchSlide(presSlideIndex);
}

function handlePresKeys(e) {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        nextPresSlide();
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPresSlide();
    } else if (e.key === "Escape") {
        e.preventDefault();
        exitPresentation();
    }
}