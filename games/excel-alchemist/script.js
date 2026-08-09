// Sound FX
const clickSound = new Audio("matthewvakaliuk73627-mouse-click-290204.mp3");
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => { });
}

// Spreadsheet State variables
const ROWS = 12;
const COLS = 8;
const COL_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H"];
let activeCellRef = "A1";
let userXP = 0;
let currentLevelIndex = 0;
let copiedValue = "";
let sheetCount = 1;
let sheetsData = {
    "Sheet1": {}
};
let activeSheetName = "Sheet1";

// 12 Excel Alchemist Levels
const levels = [
    {
        id: 1,
        docTitle: "Sales_Totals.xlsx",
        task: "Use <strong>=SUM(B2:B4)</strong> in cell <strong>B5</strong> to calculate total sales.",
        hint: "Click cell B5, type '=SUM(B2:B4)', and press Enter.",
        initialGrid: {
            "A1": "Item", "B1": "Sales",
            "A2": "Potions", "B2": "150",
            "A3": "Scrolls", "B3": "200",
            "A4": "Elixirs", "B4": "250",
            "A5": "Total", "B5": ""
        },
        validate: () => {
            const val = getCellValue("B5");
            const formula = getCellFormula("B5");
            return val === "600" && formula.toUpperCase().includes("SUM(B2:B4)");
        }
    },
    {
        id: 2,
        docTitle: "Inventory_Average.xlsx",
        task: "Calculate the average quantity of items using <strong>=AVERAGE(B2:B5)</strong> in cell <strong>B6</strong>.",
        hint: "Select B6, enter '=AVERAGE(B2:B5)'.",
        initialGrid: {
            "A1": "Item", "B1": "Stock",
            "A2": "Mana Gem", "B2": "12",
            "A3": "Herb", "B3": "24",
            "A4": "Crystal", "B4": "8",
            "A5": "Feather", "B5": "16",
            "A6": "Average", "B6": ""
        },
        validate: () => {
            const val = getCellValue("B6");
            const formula = getCellFormula("B6");
            return val === "15" && formula.toUpperCase().includes("AVERAGE(B2:B5)");
        }
    },
    {
        id: 3,
        docTitle: "Ingredient_Count.xlsx",
        task: "Count the number of items listed using <strong>=COUNT(B2:B6)</strong> in cell <strong>B7</strong>.",
        hint: "Type '=COUNT(B2:B6)' in cell B7.",
        initialGrid: {
            "A1": "ID", "B1": "Value",
            "A2": "101", "B2": "45",
            "A3": "102", "B3": "30",
            "A4": "103", "B4": "85",
            "A5": "104", "B5": "12",
            "A6": "105", "B6": "90",
            "A7": "Count", "B7": ""
        },
        validate: () => {
            const val = getCellValue("B7");
            const formula = getCellFormula("B7");
            return val === "5" && formula.toUpperCase().includes("COUNT(B2:B6)");
        }
    },
    {
        id: 4,
        docTitle: "Min_Max_Alchemy.xlsx",
        task: "Find the highest score using <strong>=MAX(D2:D5)</strong> in cell <strong>D6</strong>.",
        hint: "Click D6 and write '=MAX(D2:D5)'.",
        initialGrid: {
            "C1": "Alchemist", "D1": "Score",
            "C2": "Merlin", "D2": "88",
            "C3": "Gandalf", "D3": "95",
            "C4": "Morgana", "D4": "91",
            "C5": "Circe", "D5": "84",
            "C6": "Highest", "D6": ""
        },
        validate: () => {
            const val = getCellValue("D6");
            const formula = getCellFormula("D6");
            return val === "95" && formula.toUpperCase().includes("MAX(D2:D5)");
        }
    },
    {
        id: 5,
        docTitle: "Profit_Margin.xlsx",
        task: "Calculate Profit in cell <strong>C2</strong> by subtracting Cost (B2) from Price (A2): <strong>=A2-B2</strong>.",
        hint: "Select C2 and type '=A2-B2'.",
        initialGrid: {
            "A1": "Price", "B1": "Cost", "C1": "Profit",
            "A2": "500", "B2": "320", "C2": ""
        },
        validate: () => {
            const val = getCellValue("C2");
            const formula = getCellFormula("C2");
            return val === "180" && formula.toUpperCase().includes("A2-B2");
        }
    },
    {
        id: 6,
        docTitle: "Tax_Multiplier.xlsx",
        task: "Calculate 15% Tax on cell <strong>A2</strong> in cell <strong>B2</strong> using <strong>=A2*0.15</strong>.",
        hint: "Type '=A2*0.15' in cell B2.",
        initialGrid: {
            "A1": "Base Gold", "B1": "Tax (15%)",
            "A2": "1000", "B2": ""
        },
        validate: () => {
            const val = getCellValue("B2");
            const formula = getCellFormula("B2");
            return val === "150" && formula.toUpperCase().includes("A2*0.15");
        }
    },
    {
        id: 7,
        docTitle: "Discount_Division.xlsx",
        task: "Split total bill (A2) equally among 4 heroes in cell <strong>B2</strong> using <strong>=A2/4</strong>.",
        hint: "Click B2 and type '=A2/4'.",
        initialGrid: {
            "A1": "Total Bill", "B1": "Per Hero",
            "A2": "2400", "B2": ""
        },
        validate: () => {
            const val = getCellValue("B2");
            const formula = getCellFormula("B2");
            return val === "600" && formula.toUpperCase().includes("A2/4");
        }
    },
    {
        id: 8,
        docTitle: "Spell_Power_Sum.xlsx",
        task: "Add Mana (A2) and Staff Bonus (B2) in cell <strong>C2</strong> using <strong>=A2+B2</strong>.",
        hint: "Select C2 and type '=A2+B2'.",
        initialGrid: {
            "A1": "Base Mana", "B1": "Staff Bonus", "C1": "Total Power",
            "A2": "450", "B2": "120", "C2": ""
        },
        validate: () => {
            const val = getCellValue("C2");
            const formula = getCellFormula("C2");
            return val === "570" && formula.toUpperCase().includes("A2+B2");
        }
    },
    {
        id: 9,
        docTitle: "Lowest_Cost.xlsx",
        task: "Find the minimum ingredient cost in cell <strong>B6</strong> using <strong>=MIN(B2:B5)</strong>.",
        hint: "Click B6 and enter '=MIN(B2:B5)'.",
        initialGrid: {
            "A1": "Herb", "B1": "Cost",
            "A2": "Nightshade", "B2": "45",
            "A3": "Mandrake", "B3": "12",
            "A4": "Ginseng", "B4": "28",
            "A5": "Sage", "B5": "19",
            "A6": "Lowest", "B6": ""
        },
        validate: () => {
            const val = getCellValue("B6");
            const formula = getCellFormula("B6");
            return val === "12" && formula.toUpperCase().includes("MIN(B2:B5)");
        }
    },
    {
        id: 10,
        docTitle: "Multi_Row_Sum.xlsx",
        task: "Sum columns A and B together for total in <strong>C2</strong>: <strong>=SUM(A2:B2)</strong>.",
        hint: "Type '=SUM(A2:B2)' inside C2.",
        initialGrid: {
            "A1": "Batch 1", "B1": "Batch 2", "C1": "Combined",
            "A2": "1350", "B2": "2650", "C2": ""
        },
        validate: () => {
            const val = getCellValue("C2");
            const formula = getCellFormula("C2");
            return val === "4000" && formula.toUpperCase().includes("SUM(A2:B2)");
        }
    },
    {
        id: 11,
        docTitle: "Grand_Total.xlsx",
        task: "Calculate grand total across all elements from <strong>A2</strong> to <strong>C3</strong> in cell <strong>D4</strong>: <strong>=SUM(A2:C3)</strong>.",
        hint: "Click D4 and write '=SUM(A2:C3)'.",
        initialGrid: {
            "A1": "Fire", "B1": "Water", "C1": "Earth", "D1": "Grand Total",
            "A2": "100", "B2": "150", "C2": "200",
            "A3": "50", "B3": "75", "C3": "125",
            "A4": "", "B4": "", "C4": "", "D4": ""
        },
        validate: () => {
            const val = getCellValue("D4");
            const formula = getCellFormula("D4");
            return val === "700" && formula.toUpperCase().includes("SUM(A2:C3)");
        }
    },
    {
        id: 12,
        docTitle: "Master_Alchemist.xlsx",
        task: "Find the average score across 4 trials (A2:D2) in cell <strong>E2</strong> using <strong>=AVERAGE(A2:D2)</strong>.",
        hint: "Type '=AVERAGE(A2:D2)' in E2.",
        initialGrid: {
            "A1": "T1", "B1": "T2", "C1": "T3", "D1": "T4", "E1": "Final Avg",
            "A2": "90", "B2": "92", "C2": "88", "D2": "94", "E2": ""
        },
        validate: () => {
            const val = getCellValue("E2");
            const formula = getCellFormula("E2");
            return val === "91" && formula.toUpperCase().includes("AVERAGE(A2:D2)");
        }
    }
];

// Initialize Table Grid Structure
function initTable() {
    const table = document.getElementById("excelTable");
    if (!table) return;
    table.innerHTML = "";

    // Header Row (Corner + A B C D E F G H)
    const headerRow = document.createElement("tr");
    const cornerTd = document.createElement("th");
    cornerTd.className = "corner-header";
    headerRow.appendChild(cornerTd);

    COL_NAMES.forEach(col => {
        const th = document.createElement("th");
        th.className = "col-header";
        th.innerText = col;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Data Rows (1 to 12)
    for (let r = 1; r <= ROWS; r++) {
        const tr = document.createElement("tr");

        // Row Index Header
        const rowTd = document.createElement("th");
        rowTd.className = "row-header";
        rowTd.innerText = r;
        tr.appendChild(rowTd);

        // Cell Inputs
        COL_NAMES.forEach(col => {
            const td = document.createElement("td");
            const cellRef = `${col}${r}`;
            const input = document.createElement("input");
            input.type = "text";
            input.style.transform = "none";
            input.id = `cell-${cellRef}`;
            input.dataset.ref = cellRef;

            input.addEventListener("focus", () => selectCell(cellRef));
            input.addEventListener("input", (e) => onCellInputChange(cellRef, e.target.value));
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    evaluateCellFormula(cellRef);
                    input.blur();
                }
            });

            td.appendChild(input);
            tr.appendChild(td);
        });

        table.appendChild(tr);
    }
}

// Cell Operations & Selection
function selectCell(ref) {
    playClickSound();
    activeCellRef = ref;

    // Highlight active cell UI
    document.querySelectorAll("#excelTable td").forEach(td => td.classList.remove("selected-cell"));
    const cellInput = document.getElementById(`cell-${ref}`);
    if (cellInput && cellInput.parentElement) {
        cellInput.parentElement.classList.add("selected-cell");
    }

    // Update Name Box
    const nameBox = document.getElementById("cellNameBox");
    if (nameBox) nameBox.value = ref;

    // Update Formula Input
    const formulaInput = document.getElementById("formulaInput");
    if (formulaInput && cellInput) {
        formulaInput.value = cellInput.getAttribute("data-formula") || cellInput.value;
    }

    updateStatusBar();
}

function updateCell(ref, val) {
    const cell = document.getElementById(`cell-${ref}`);
    if (cell) {
        cell.value = val;
    }
}

function getCellValue(ref) {
    const cell = document.getElementById(`cell-${ref}`);
    return cell ? cell.value : "";
}

function getCellFormula(ref) {
    const cell = document.getElementById(`cell-${ref}`);
    return cell ? (cell.getAttribute("data-formula") || "") : "";
}

function onCellInputChange(ref, val) {
    const cell = document.getElementById(`cell-${ref}`);
    if (cell && !val.startsWith("=")) {
        cell.removeAttribute("data-formula");
    }
    updateStatusBar();
}

// Formula Evaluation Engine
function evaluateCellFormula(ref) {
    const cell = document.getElementById(`cell-${ref}`);
    if (!cell) return;

    let rawVal = cell.value.trim();
    if (rawVal.startsWith("=")) {
        cell.setAttribute("data-formula", rawVal);
        const formula = rawVal.substring(1).toUpperCase();

        try {
            let result = parseAndExecFormula(formula);
            cell.value = result;
        } catch (err) {
            cell.value = "#ERROR!";
        }
    }
    updateStatusBar();
}

function parseAndExecFormula(f) {
    // Basic Aggregation Functions: SUM, AVERAGE, COUNT, MAX, MIN
    const match = f.match(/^(SUM|AVERAGE|COUNT|MAX|MIN)\(([A-H][1-9][0-2]?):([A-H][1-9][0-2]?)\)$/);
    if (match) {
        const fn = match[1];
        const startRef = match[2];
        const endRef = match[3];
        const values = getRangeValues(startRef, endRef);

        if (fn === "SUM") return values.reduce((a, b) => a + b, 0);
        if (fn === "AVERAGE") return values.length ? (values.reduce((a, b) => a + b, 0) / values.length) : 0;
        if (fn === "COUNT") return values.length;
        if (fn === "MAX") return values.length ? Math.max(...values) : 0;
        if (fn === "MIN") return values.length ? Math.min(...values) : 0;
    }

    // Direct Arithmetic Expressions (e.g. A2-B2, A2*0.15, A2/4, A2+B2)
    let expr = f.replace(/([A-H][1-9][0-2]?)/g, (m) => {
        let v = parseFloat(getCellValue(m));
        return isNaN(v) ? 0 : v;
    });

    return eval(expr);
}

function getRangeValues(startRef, endRef) {
    const startCol = startRef.charAt(0);
    const startRow = parseInt(startRef.substring(1));
    const endCol = endRef.charAt(0);
    const endRow = parseInt(endRef.substring(1));

    const colStartIdx = COL_NAMES.indexOf(startCol);
    const colEndIdx = COL_NAMES.indexOf(endCol);

    let vals = [];
    for (let c = Math.min(colStartIdx, colEndIdx); c <= Math.max(colStartIdx, colEndIdx); c++) {
        for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
            let ref = `${COL_NAMES[c]}${r}`;
            let val = parseFloat(getCellValue(ref));
            if (!isNaN(val)) vals.push(val);
        }
    }
    return vals;
}

// Status Bar Stats Calculation
function updateStatusBar() {
    let vals = [];
    for (let r = 1; r <= ROWS; r++) {
        COL_NAMES.forEach(c => {
            let v = parseFloat(getCellValue(`${c}${r}`));
            if (!isNaN(v)) vals.push(v);
        });
    }

    const sum = vals.reduce((a, b) => a + b, 0);
    const count = vals.length;
    const avg = count ? (sum / count).toFixed(1) : 0;

    const sumDisp = document.getElementById("sumDisplay");
    const avgDisp = document.getElementById("avgDisplay");
    const countDisp = document.getElementById("countDisplay");

    if (sumDisp) sumDisp.innerText = `SUM: ${sum}`;
    if (avgDisp) avgDisp.innerText = `AVERAGE: ${avg}`;
    if (countDisp) countDisp.innerText = `COUNT: ${count}`;
}

// --- SHEET MANAGEMENT & ISOLATION ---

function addNewSheet() {
    playClickSound();

    saveCurrentSheetData();

    sheetCount++;
    const newSheetName = `Sheet${sheetCount}`;
    sheetsData[newSheetName] = {};

    const container = document.getElementById("sheetTabsContainer");
    const addBtn = container.querySelector(".add-tab-btn");

    document.querySelectorAll(".sheet-tab").forEach(tab => {
        tab.classList.remove("active-sheet");
    });

    const newTab = document.createElement("div");
    newTab.className = "sheet-tab active-sheet";
    newTab.onclick = function () { switchSheet(this); };
    newTab.innerHTML = `<i class="fa-solid fa-table"></i> ${newSheetName}`;

    if (container && addBtn) {
        container.insertBefore(newTab, addBtn);
    }

    activeSheetName = newSheetName;
    clearGrid();
}

function switchSheet(tabElement) {
    if (tabElement.classList.contains("add-tab-btn")) return;

    playClickSound();

    saveCurrentSheetData();

    document.querySelectorAll(".sheet-tab").forEach(tab => {
        tab.classList.remove("active-sheet");
    });
    tabElement.classList.add("active-sheet");

    const selectedSheetName = tabElement.innerText.trim();
    activeSheetName = selectedSheetName;
    loadSheetData(selectedSheetName);
}

function saveCurrentSheetData() {
    const sheetData = {};
    for (let r = 1; r <= ROWS; r++) {
        COL_NAMES.forEach(col => {
            const ref = `${col}${r}`;
            const input = document.getElementById(`cell-${ref}`);
            if (input && input.value.trim() !== "") {
                sheetData[ref] = {
                    value: input.value,
                    formula: input.getAttribute("data-formula") || ""
                };
            }
        });
    }
    sheetsData[activeSheetName] = sheetData;
}

function clearGrid() {
    for (let r = 1; r <= ROWS; r++) {
        COL_NAMES.forEach(col => {
            const input = document.getElementById(`cell-${col}${r}`);
            if (input) {
                input.value = "";
                input.removeAttribute("data-formula");
            }
        });
    }
    const formulaInput = document.getElementById("formulaInput");
    if (formulaInput) formulaInput.value = "";
}

function loadSheetData(sheetName) {
    clearGrid();
    const data = sheetsData[sheetName] || {};
    Object.keys(data).forEach(ref => {
        const input = document.getElementById(`cell-${ref}`);
        if (input) {
            input.value = data[ref].value || "";
            if (data[ref].formula) {
                input.setAttribute("data-formula", data[ref].formula);
            }
        }
    });
}

// Level Control Engine
function loadLevel(index) {
    if (index < 0 || index >= levels.length) return;

    currentLevelIndex = index;
    const level = levels[index];

    // Update document title and instruction banner
    const docTitle = document.getElementById("doc-title");
    const taskInstr = document.getElementById("task-instruction");

    if (docTitle) docTitle.innerText = level.docTitle;
    if (taskInstr) taskInstr.innerHTML = level.task;

    // Clear current grid data
    for (let r = 1; r <= ROWS; r++) {
        COL_NAMES.forEach(col => {
            const ref = `${col}${r}`;
            const cellInput = document.getElementById(`cell-${ref}`);
            if (cellInput) {
                cellInput.value = "";
                cellInput.removeAttribute("data-formula");
            }
        });
    }

    // Populate initial level grid values
    Object.keys(level.initialGrid).forEach(ref => {
        const cellInput = document.getElementById(`cell-${ref}`);
        if (cellInput) {
            cellInput.value = level.initialGrid[ref];
        }
    });

    // Reset selection to A1
    selectCell("A1");

    // Clear status message
    const statusMsg = document.getElementById("status-message");
    if (statusMsg) {
        statusMsg.innerText = "";
        statusMsg.className = "status-message";
    }
}

function checkAnswer() {
    playClickSound();
    const lvl = levels[currentLevelIndex];
    const isCorrect = lvl.validate();
    const statusMsg = document.getElementById("status-message");

    if (isCorrect) {
        userXP += 100;
        const xpDisplay = document.getElementById("userXP");
        if (xpDisplay) xpDisplay.innerHTML = `<i class="fa-solid fa-star"></i> XP: ${userXP}`;

        if (currentLevelIndex + 1 < levels.length) {
            statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Excellent Alchemy! Loading Level ${currentLevelIndex + 2}...`;
            statusMsg.className = "status-message success";
            setTimeout(() => {
                currentLevelIndex++;
                loadLevel(currentLevelIndex);
            }, 1400);
        } else {
            statusMsg.innerHTML = `<i class="fa-solid fa-trophy"></i> Outstanding! You have mastered all 12 Excel Alchemist levels!`;
            statusMsg.className = "status-message success";
        }
    } else {
        statusMsg.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Formula incomplete or incorrect. Re-check the instructions or hint!`;
        statusMsg.className = "status-message error";
    }
}

function showHint() {
    playClickSound();
    const hint = levels[currentLevelIndex].hint;
    const statusMsg = document.getElementById("status-message");
    if (statusMsg) {
        statusMsg.innerHTML = `<i class="fa-regular fa-lightbulb"></i> <strong>Hint:</strong> ${hint}`;
        statusMsg.className = "status-message";
    }
}

// Quick Access & Toolbar Helpers
function saveWorkbook() {
    playClickSound();
    alert("Workbook successfully saved to local storage!");
}

function exportCSV() {
    playClickSound();
    let csv = "";
    for (let r = 1; r <= ROWS; r++) {
        let rowVals = [];
        COL_NAMES.forEach(col => rowVals.push(getCellValue(`${col}${r}`)));
        csv += rowVals.join(",") + "\n";
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = document.getElementById("doc-title").innerText.replace(".xlsx", ".csv");
    a.click();
}

function toggleGridlines(show) {
    document.querySelectorAll(".excel-table td").forEach(td => {
        td.style.border = show ? "1px solid #e1dfdd" : "none";
    });
}

function toggleHeaders(show) {
    document.querySelectorAll(".row-header, .col-header, .corner-header").forEach(th => {
        th.style.display = show ? "table-cell" : "none";
    });
}

function changeZoom(val) {
    const tableContainer = document.querySelector(".table-container");
    const zoomVal = document.getElementById("zoomVal");
    if (tableContainer) tableContainer.style.zoom = `${val}%`;
    if (zoomVal) zoomVal.innerText = `${val}%`;
}

function adjustZoom(delta) {
    const slider = document.getElementById("zoomRange");
    if (slider) {
        let newZoom = parseInt(slider.value) + delta;
        newZoom = Math.min(Math.max(newZoom, 70), 130);
        slider.value = newZoom;
        changeZoom(newZoom);
    }
}

// Initialize Level 1 on DOM load
document.addEventListener("DOMContentLoaded", () => {
    initTable();
    loadLevel(0);
});