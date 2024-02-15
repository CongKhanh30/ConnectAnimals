
// Kiểm tra xem còn ô tile nào trên bàn chơi hay không
function checkRemainingTiles() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (board[i][j] !== 0) return true;
        }
    }
    return false;
}


// Kích thước của bàn chơi
const numRows = 7;
const numCols = 10;

// Số loại tile khác nhau
const numTileTypes = 15;

// Tạo một mảng 2D để lưu trữ bàn chơi
let board = [];

function initBoard() {
    let boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.row = i;
            tile.dataset.col = j;
            tile.dataset.type = Math.floor(Math.random() * numTileTypes) + 1;
            tile.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            tile.addEventListener('click', handleTileClick);
            boardElement.appendChild(tile);
        }
        boardElement.appendChild(document.createElement('br'));
    }
}

function handleTileClick(event) {
    let selectedTiles = document.querySelectorAll('.selected');
    if (selectedTiles.length === 0 || selectedTiles.length === 1 && selectedTiles[0] !== event.target) {
        event.target.classList.toggle('selected');
    } else if (selectedTiles.length === 1 && selectedTiles[0] === event.target) {
        event.target.classList.remove('selected');
    } else {
        let firstTile = selectedTiles[0];
        let secondTile = event.target;
        let row1 = parseInt(firstTile.dataset.row);
        let col1 = parseInt(firstTile.dataset.col);
        let row2 = parseInt(secondTile.dataset.row);
        let col2 = parseInt(secondTile.dataset.col);
        if (canConnect(row1, col1, row2, col2)) {

            drawPath(row1, col1, row2, col2);

            setTimeout(() => {
                firstTile.style.visibility = 'hidden';
                secondTile.style.visibility = 'hidden';
                checkGameEnd();
            }, 1000);
        } else {

            firstTile.classList.add('shake');
            secondTile.classList.add('shake');
            setTimeout(() => {
                firstTile.classList.remove('selected', 'shake');
                secondTile.classList.remove('selected', 'shake');
            }, 500);
        }
    }
}

function canConnect(row1, col1, row2, col2) {
    if (board[row1][col1] !== board[row2][col2]) return false;

    return true;
}

function drawPath(row1, col1, row2, col2) {

}

function checkGameEnd() {
    if (!checkRemainingTiles()) {
        document.getElementById('message').innerText = "Congratulations! You won!";
    }
}

function startNewGame() {
    initBoard();
    document.getElementById('message').innerText = '';
}

document.getElementById('newGameBtn').addEventListener('click', startNewGame);
startNewGame();
