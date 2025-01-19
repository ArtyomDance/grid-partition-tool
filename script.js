const gridContainer = document.getElementById("grid");
const generateButton = document.getElementById("generate");
const calculateButton = document.getElementById("calculate");
const resultElement = document.getElementById("result");

generateButton.addEventListener("click", generateGrid);
calculateButton.addEventListener("click", calculateParts);

function generateGrid() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    gridContainer.innerHTML = "";
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;

            cell.addEventListener("click", () => {
                cell.classList.toggle("deleted");
            });

            gridContainer.appendChild(cell);
        }
    }
}

function calculateParts() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

    document.querySelectorAll(".cell").forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if (cell.classList.contains("deleted")) {
            grid[row][col] = 1; 
        }
    });

    let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    let parts = 0;

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || grid[r][c] === 1) {
            return;
        }
        visited[r][c] = true;
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!visited[i][j] && grid[i][j] === 0) {
                parts++;
                dfs(i, j);
            }
        }
    }

    resultElement.textContent = `The grid is divided into ${parts} part(s).`;
}
