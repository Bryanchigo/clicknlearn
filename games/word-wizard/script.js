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
        const editor = document.getElementById("editor");
        if (editor && editor.contains(range.commonAncestorContainer)) {
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

// Game Levels Definition (12 Levels)
const levels = [
    {
        id: 1,
        docTitle: "School_Report.docx",
        task: "Make the title <strong>'SCIENCE FAIR PROJECT'</strong> <em>Bold</em> and <em>Center Aligned</em>.",
        hint: "Highlight 'SCIENCE FAIR PROJECT', click Bold (B), and then Center alignment.",
        initialHTML: `<h1 style="font-weight: normal; text-align: left;">SCIENCE FAIR PROJECT</h1><p>This experiment tests the effect of natural sunlight on plant growth rates over four weeks.</p>`,
        validate: () => {
            const h1 = document.querySelector("#editor h1");
            if (!h1) return false;
            const style = window.getComputedStyle(h1);
            const isCentered = style.textAlign === "center" || style.textAlign === "-webkit-center";
            const isBold = style.fontWeight === "700" || style.fontWeight === "bold" || h1.querySelector("b") !== null || h1.querySelector("strong") !== null;
            return isCentered && isBold;
        }
    },
    {
        id: 2,
        docTitle: "Grocery_List.docx",
        task: "Convert the items into a <strong>Bullet List</strong>.",
        hint: "Highlight all three grocery items, then click the Bullet List icon.",
        initialHTML: `<h1>Shopping List</h1><p>Fresh Apples</p><p>Whole Milk</p><p>Whole Wheat Bread</p>`,
        validate: () => {
            const ul = document.querySelector("#editor ul");
            return ul && ul.querySelectorAll("li").length >= 3;
        }
    },
    {
        id: 3,
        docTitle: "Meeting_Notes.docx",
        task: "Change the text color of <strong>'URGENT DEADLINE'</strong> to <strong>Red</strong>.",
        hint: "Highlight 'URGENT DEADLINE' and pick Red from the Font Color palette.",
        initialHTML: `<p>Project update meeting at 10 AM. <span>URGENT DEADLINE</span>: All reports due Friday.</p>`,
        validate: () => {
            const spans = document.querySelectorAll("#editor span, #editor font");
            for (let el of spans) {
                if (el.innerText.includes("URGENT DEADLINE")) {
                    const color = window.getComputedStyle(el).color;
                    if (color.includes("255, 0, 0") || color.includes("192, 0, 0") || color.includes("red")) return true;
                }
            }
            return false;
        }
    },
    {
        id: 4,
        docTitle: "Essay_Draft.docx",
        task: "Underline the book title <strong>'To Kill a Mockingbird'</strong>.",
        hint: "Select 'To Kill a Mockingbird' and click Underline (U).",
        initialHTML: `<p>In the classic novel To Kill a Mockingbird, Harper Lee explores empathy and justice.</p>`,
        validate: () => {
            const u = document.querySelectorAll("#editor u, #editor span[style*='underline']");
            for (let el of u) {
                if (el.innerText.includes("To Kill a Mockingbird")) return true;
            }
            return false;
        }
    },
    {
        id: 5,
        docTitle: "Recipe_Card.docx",
        task: "Italicize the word <strong>'secret ingredient'</strong> and right-align the author line.",
        hint: "Highlight 'secret ingredient' for Italic (I). Then click the author line and Right Align.",
        initialHTML: `<p>Grandma's secret ingredient makes this pie special.</p><p id="author" style="text-align: left;">— Chef Maria</p>`,
        validate: () => {
            const em = document.querySelector("#editor em, #editor i, #editor span[style*='italic']");
            const author = document.getElementById("author") || document.querySelector("#editor p:last-child");
            const isItalic = em && em.innerText.includes("secret ingredient");
            const isRight = author && window.getComputedStyle(author).textAlign === "right";
            return isItalic && isRight;
        }
    },
    {
        id: 6,
        docTitle: "History_Paper.docx",
        task: "Highlight <strong>'1945'</strong> with Yellow text highlight color.",
        hint: "Select '1945' and pick Yellow from Text Highlight Color.",
        initialHTML: `<p>World War II officially ended in 1945 after global peace agreements.</p>`,
        validate: () => {
            const mark = document.querySelectorAll("#editor mark, #editor span");
            for (let el of mark) {
                if (el.innerText.includes("1945")) {
                    const bg = window.getComputedStyle(el).backgroundColor;
                    if (bg.includes("255, 255, 0") || bg.includes("yellow")) return true;
                }
            }
            return false;
        }
    },
    {
        id: 7,
        docTitle: "Chem_Notes.docx",
        task: "Format <strong>'H2O'</strong> with subscript <strong>'2'</strong>.",
        hint: "Highlight the number '2' in H2O and click the Subscript icon.",
        initialHTML: `<h1>WATER</h1><p>Water molecular structure, which consists of two hydrogen atoms and one oxygen atom, is written as H2O.</p>`,
        validate: () => {
            const sub = document.querySelector("#editor sub");
            return sub && sub.innerText === "2";
        }
    },
    {
        id: 8,
        docTitle: "Article_Draft.docx",
        task: "Change font of the headline <strong>'TECH BREAKTHROUGH'</strong> to <strong>Arial</strong>.",
        hint: "Highlight the headline and select 'Arial' from Font Family dropdown.",
        initialHTML: `<h1>TECH BREAKTHROUGH</h1><p>Engineers have unveiled a new solar cell design.</p>`,
        validate: () => {
            const h1 = document.querySelector("#editor h1");
            if (!h1) return false;
    
            // Check the h1 element or any styled child element inside h1
            const target = h1.querySelector("font, span") || h1;
            const font = window.getComputedStyle(target).fontFamily.toLowerCase();
            
            return font.includes("arial");
        }
    },
    {
        id: 9,
        docTitle: "Party_Invite.docx",
        task: "Insert a <strong>Horizontal Line</strong> below the title.",
        hint: "Click below 'JOIN OUR PARTY' and click Insert > Horizontal Line.",
        initialHTML: `<h2>JOIN OUR PARTY</h2><p>Date: Saturday, 8 PM. Location: Central Park.</p>`,
        validate: () => {
            return document.querySelector("#editor hr") !== null;
        }
    },
    {
        id: 10,
        docTitle: "Syllabus.docx",
        task: "Strike through <strong>'Class canceled on Monday'</strong>.",
        hint: "Select 'Class canceled on Monday' and click Strikethrough.",
        initialHTML: `<p>Class canceled on Monday. Regular schedule resumes Wednesday.</p>`,
        validate: () => {
            const s = document.querySelector("#editor strike, #editor s, #editor span[style*='line-through']");
            return s && s.innerText.includes("Class canceled on Monday");
        }
    },
    {
        id: 11,
        docTitle: "Newsletter.docx",
        task: "Convert the steps into a <strong>Numbered List</strong>.",
        hint: "Highlight all three steps and click Numbered List.",
        initialHTML: `<p>Mix dry ingredients</p><p>Add warm milk</p><p>Bake at 350 degrees</p>`,
        validate: () => {
            const ol = document.querySelector("#editor ol");
            return ol && ol.querySelectorAll("li").length >= 3;
        }
    },
    {
        id: 12,
        docTitle: "Graduation_Speech.docx",
        task: "Center align the entire document and make the final word <strong>'Congratulations!'</strong> Bold.",
        hint: "Select all text for Center Alignment, then highlight 'Congratulations!' for Bold.",
        initialHTML: `<p>Welcome graduates, families, and honored guests.</p><p>Congratulations!</p>`,
        validate: () => {
            const paragraphs = document.querySelectorAll("#editor p");
            let allCentered = paragraphs.length > 0;
            paragraphs.forEach(p => {
                if (window.getComputedStyle(p).textAlign !== "center") allCentered = false;
            });
            const boldElem = document.querySelector("#editor b, #editor strong, #editor span[style*='700']");
            const hasBold = boldElem && boldElem.innerText.includes("Congratulations!");
            return allCentered && hasBold;
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
    document.getElementById("editor").innerHTML = level.initialHTML;
    document.getElementById("status-message").innerText = "";
    document.getElementById("status-message").className = "status-message";

    updateWordCount();
    saveSelection();
}

// Formatting Core Engine
async function formatDoc(cmd, value = null) {
    playClickSound();
    restoreSelection();
    
    // Handle paste using the Clipboard API
    if (cmd === 'paste') {
        try {
            const text = await navigator.clipboard.readText();
            const editor = document.getElementById("editor");
            editor.focus();
            
            // Insert text at cursor position or selection
            if (savedRange) {
                restoreSelection();
                const sel = window.getSelection();
                if (sel.rangeCount > 0) {
                    const range = sel.getRangeAt(0);
                    range.deleteContents();
                    
                    // Create text node and insert
                    const textNode = document.createTextNode(text);
                    range.insertNode(textNode);
                    
                    // Move cursor to end of pasted text
                    range.setStartAfter(textNode);
                    range.setEndAfter(textNode);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            } else {
                // Fallback: append if no selection
                document.execCommand('insertText', false, text);
            }
            updateWordCount();
        } catch (err) {
            console.error('Failed to read clipboard:', err);
            alert("Clipboard access blocked. Please use Ctrl+V to paste or allow clipboard permissions in your browser.");
        }
        return;
    }

    // Handle all other execCommands
    document.execCommand(cmd, false, value);
    const editor = document.getElementById("editor");
    if (editor) editor.focus();
}

// Custom Word-Style Dropdown Handlers
function toggleColorMenu(menuId, event) {
    playClickSound();
    event.stopPropagation();

    document.querySelectorAll(".color-menu-popup").forEach(menu => {
        if (menu.id !== menuId) menu.classList.remove("show");
    });

    const targetMenu = document.getElementById(menuId);
    if (targetMenu) {
        targetMenu.classList.toggle("show");
    }
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
    if (color === "transparent") {
        formatDoc("hiliteColor", "rgba(0, 0, 0, 0)");
    } else {
        formatDoc("hiliteColor", color);
    }

    const indicator = document.getElementById("highlightColorIndicator");
    if (indicator) {
        indicator.style.backgroundColor = (color === "transparent") ? "#ffff00" : color;
    }

    closeAllColorMenus();
}

function closeAllColorMenus() {
    document.querySelectorAll(".color-menu-popup").forEach(menu => {
        menu.classList.remove("show");
    });
}

window.addEventListener("click", () => {
    closeAllColorMenus();
});

// Ribbon Tab Switching
function switchTab(tabElement, tabId) {
    playClickSound(); // Optional: Keep if you have sound enabled

    // 1. Remove 'active-tab' from all menu tabs
    const allTabs = document.querySelectorAll('.tab-item');
    allTabs.forEach(tab => tab.classList.remove('active-tab'));

    // 2. Add 'active-tab' to the clicked tab
    tabElement.classList.add('active-tab');

    // 3. Hide all tab ribbons
    const allRibbons = document.querySelectorAll('.tab-ribbon');
    allRibbons.forEach(ribbon => {
        ribbon.style.display = 'none';
    });

    // 4. Show the specifically requested ribbon
    const activeRibbon = document.getElementById(tabId);
    if (activeRibbon) {
        activeRibbon.style.display = 'flex'; // Use flex to maintain ribbon formatting
    }
}

// Word Count & Editor Logic
function updateWordCount() {
    const text = document.getElementById("editor").innerText.trim();
    const words = text ? text.split(/\s+/).length : 0;
    document.getElementById("word-count").innerText = `${words} words`;
}

// Insert Elements
function insertElement(type) {
    playClickSound();
    const editor = document.getElementById("editor");
    editor.focus();
    restoreSelection();

    if (type === "table") {
        document.execCommand("insertHTML", false, `<table border="1" style="border-collapse:collapse;width:100%;margin:10px 0;"><tr><td>Cell 1</td><td>Cell 2</td></tr><tr><td>Cell 3</td><td>Cell 4</td></tr></table>`);
    } else if (type === "image") {
        document.execCommand("insertHTML", false, `<img src="https://cdn-icons-png.flaticon.com/512/3176/3176298.png" style="width:80px;height:80px;display:block;margin:10px auto;">`);
    } else if (type === "hr") {
        document.execCommand("insertHorizontalRule", false, null);
    }

    saveSelection();
    updateWordCount();
}

// Page Setup & View
function changeMargins(type) {
    playClickSound();
    const page = document.getElementById("pageContainer");
    page.style.padding = (type === "narrow") ? "20px" : "50px";
}

function toggleRuler(show) {
    playClickSound();
    const page = document.getElementById("pageContainer");
    page.style.borderTop = show ? "18px solid #e1dfdd" : "none";
}

// Hints & Validation
function showHint() {
    playClickSound();
    const hint = levels[currentLevelIndex].hint;
    const statusMsg = document.getElementById("status-message");
    statusMsg.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3176/3176298.png" style="width:16px;vertical-align:middle;"> <strong>Hint:</strong> ${hint}`;
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
            statusMsg.innerHTML = `<i class="fa-solid fa-trophy"></i> Outstanding! You completed all 12 Word Wizard levels!`;
            statusMsg.className = "status-message success";
        }
    } else {
        statusMsg.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Formatting doesn't match yet. Try again or check the hint!`;
        statusMsg.className = "status-message error";
    }
}

// Title Bar Quick Actions
function saveDocument() {
    playClickSound();
    const text = document.getElementById("editor").innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const anchor = document.createElement("a");
    anchor.download = document.getElementById("doc-title").innerText.replace(".docx", ".txt");
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
}

function printDocument() {
    playClickSound();
    window.print();
}

function searchDocument(query) {
    if (!query) return;
    if (window.find) window.find(query);
}

// Function to insert a custom image via URL
function insertPicture() {
    playClickSound();
    restoreSelection();
    const url = prompt("Enter the image URL (e.g., https://example.com/image.jpg):");
    if (url) {
        formatDoc('insertImage', url);
    }
}

// Function to insert a hyperlink
function insertLink() {
    playClickSound();
    restoreSelection();
    const url = prompt("Enter the link URL (e.g., https://google.com):");
    if (url) {
        formatDoc('createLink', url);
    }
}

// Function to insert a generic shape (fixes the car picture issue)
function insertShape() {
    playClickSound();
    restoreSelection();
    // Inserts a blue square that acts as a shape container
    const shapeHTML = `<div class="inserted-shape shape" style="width: 100px; height: 100px; background-color: #106ebe; border-radius: 4px; display: inline-block; margin: 10px;"></div>&nbsp;`;
    
    // Modern browsers support insertHTML
    document.execCommand('insertHTML', false, shapeHTML);
    const editor = document.getElementById("editor");
    if (editor) editor.focus();
}

// Function to insert a page break
function insertPageBreak() {
    playClickSound();
    restoreSelection();
    const pageBreakHTML = `<hr style="page-break-after: always; border: 0; border-top: 2px dashed #ccc; margin: 20px 0;" title="Page Break">&nbsp;`;
    document.execCommand('insertHTML', false, pageBreakHTML);
}

// Zoom & View
function changeZoom(val) {
    const page = document.querySelector(".editor");
    const zoomVal = document.getElementById("zoomVal");
    if (page) page.style.transform = `scale(${val / 100})`;
    if (zoomVal) zoomVal.innerText = `${val}%`;
}

function adjustZoom(delta) {
    const slider = document.getElementById("zoomRange");
    if (!slider) return;
    let currentVal = parseInt(slider.value);
    let newVal = Math.min(150, Math.max(50, currentVal + delta));
    slider.value = newVal;
    changeZoom(newVal);
}

function toggleFocusMode() {
    playClickSound();
    const ribbon = document.querySelector(".ribbon-container");
    const taskBanner = document.querySelector(".task-banner");
    if (ribbon.style.display === "none") {
        ribbon.style.display = "block";
        taskBanner.style.display = "flex";
    } else {
        ribbon.style.display = "none";
        taskBanner.style.display = "none";
    }
}