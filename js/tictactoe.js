$(document).ready(function(){

    startGame();
});

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
let humanScore = 0,
    computerScore = 0;
const cells = document.querySelectorAll('.square');

const startGame = () =>{
    document.getElementById('human-score').style.color = 'black';
    document.getElementById('human').style.color = 'black';
    document.getElementById('computer-score').style.color = 'black';
    document.getElementById('computer').style.color = 'black';
    document.getElementById('message').style.display = 'none';
    document.getElementById('human-score').innerHTML = humanScore;
    document.getElementById('computer-score').innerHTML = computerScore;
    origBoard = Array.from(Array(9).keys());
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
        gameWon.player == humanPlayer ? "lightgreen" : "red";
    }

    for(let i=0; i<cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == humanPlayer ? "You Win!" : "You Lose!");
}

const declareWinner = (who) =>{

    document.getElementById('message').style.display = 'inline-block';
    document.getElementById('message').innerHTML = who;

    if(who === 'You Win!'){
        document.getElementById('human').style.color = 'darkgreen';
        document.getElementById('human-score').style.color = 'darkgreen';
        document.getElementById('message').style.backgroundColor = 'darkgreen';
        humanScore++;
        document.getElementById('human-score').innerHTML = humanScore;
    }else if(who === 'You Lose!'){
        document.getElementById('computer').style.color = 'darkgreen';
        document.getElementById('computer-score').style.color = 'darkgreen';
        document.getElementById('message').style.backgroundColor = 'red';
        computerScore++;
        document.getElementById('computer-score').innerHTML = computerScore;
    }else{
        document.getElementById('message').style.backgroundColor = 'lightblue';
    }
}

//Picks the next available square --> Place in the bestSpot() function (return emptySquares()[0])
const emptySquares = () =>{
    return origBoard.filter(s => typeof s == 'number');
}

//Place the empty Squares or MiniMax Algogirthm function
const bestSpot = () => {
    return minimax(origBoard, aiPlayer).index;
}

const checkTie = () => {
    if(emptySquares().length == 0){
        for(let i=0; i<cells.length; i++){
            cells[i].style.backgroundColor = 'lightblue';
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("It's a Tie!");
        return true;
    }
    return false;
}

//The Minimax Algorithm - Unbeatable AI --> --> Place in the bestSpot() function (return minimax(origBoard, aiPlayer).index)
const minimax = (newBoard, player) => {
	const availSpots = emptySquares(newBoard);
    
        if (checkWin(newBoard, humanPlayer)) {
            return {score: -10};
        } else if (checkWin(newBoard, aiPlayer)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }
        var moves = [];
        for (let i = 0; i < availSpots.length; i++) {
            const move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
    
            if (player == aiPlayer) {
                const result = minimax(newBoard, humanPlayer);
                move.score = result.score;
            } else {
                const result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            } 
            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }
    
        var bestMove;
        if(player === aiPlayer) {
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }

const resetPage = () => {
    humanScore = 0;
    computerScore = 0;
    startGame();
}



