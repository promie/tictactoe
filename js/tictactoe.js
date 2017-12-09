let origBoard;
const humanPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

const cells = document.querySelectorAll('.square');

const startGame = () =>{
    document.getElementById('winner').style.display = 'none';
    origBoard = Array.from(Array(9).keys());
    console.log(origBoard);
    for(let i=0; i < cells.length; i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

const turnClick = (square) =>{
    if(typeof origBoard[square.target.id] == 'number'){
        turn(square.target.id, humanPlayer);
        if(!checkTie()) turn(bestSpot(), aiPlayer);
    }
}

const turn = (squareID, player) =>{
    origBoard[squareID] = player;
    document.getElementById(squareID).innerHTML = player;

    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon);
}

const checkWin = (board, player) =>{
    let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);

    let gameWon = null;

    for(let [index, win] of winCombos.entries()){
        if(win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player: player};
            break;
        }
    }

    return gameWon;
}

const gameOver = (gameWon) =>{
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == humanPlayer ? "blue" : "red";
    }

    for(let i=0; i<cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }

    declareWinner(gameWon.player == humanPlayer ? "You Win!" : "You Lose!");
}

const declareWinner = (who) =>{
    document.getElementById('winner').style.display = 'block';
    document.getElementById('winner').innerText = who;
}

const emptySquares = () =>{
    return origBoard.filter(s => typeof s == 'number');
}

const bestSpot = () => {
    return emptySquares()[0];
}

const checkTie = () => {
    if(emptySquares().length == 0){
        for(let i=0; i<cells.length; i++){
            cells[i].style.backgroundColor = 'green';
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner('Tie Game!');
        return true;
    }

    return false;
}


//Basic AI



//Function Call
startGame();

