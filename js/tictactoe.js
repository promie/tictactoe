$(document).ready(function(){
    startGame();
});

let origBoard,
failSound = new Audio('http://soundbible.com/grab.php?id=836&type=mp3'),
successSound = new Audio('http://soundbible.com/grab.php?id=2103&type=mp3'),
drawSound = new Audio('http://soundbible.com/grab.php?id=499&type=mp3');
const humanPlayer = 'X';
const aiPlayer = 'O';
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
const message = document.getElementById('message');
const human = document.getElementById('human');
const humanScoreText = document.getElementById('human-score');
const computer = document.getElementById('computer');
const computerScoreText = document.getElementById('computer-score');

const startGame = () =>{
    formatFontColour('black');
    message.style.display = 'none';
    humanScoreText.innerHTML = humanScore;
    computerScoreText.innerHTML = computerScore;
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
    message.style.display = 'inline-block';
    message.innerHTML = who;

    if(who === 'You Win!'){
        successSound.play();
        formatFontColour('darkgreen');
        humanScore++;
        humanScoreText.innerHTML = humanScore;
    }else if(who === 'You Lose!'){
        failSound.play();
        formatFontColour('red');
        computerScore++;
        computerScoreText.innerHTML = computerScore;
    }else{
        drawSound.play();
        formatFontColour('lightblue');
    }
}

const emptySquares = () =>{
    return origBoard.filter(s => typeof s == 'number');
}


const bestSpot = () => {
    
    return minimax(origBoard, aiPlayer).index;
    //return emptySquares()[0];
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

const minimax = (newBoard, player) => {
	const availSpots = emptySquares(newBoard);
    
        if (checkWin(newBoard, humanPlayer)) {
            return {score: -10};
        } else if (checkWin(newBoard, aiPlayer)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }
        let moves = [];
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
    
        let bestMove;
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

const formatFontColour = (fontColour) => {
    switch(fontColour){
        case 'black':
            humanScoreText.style.color = fontColour;
            human.style.color = fontColour;
            computerScoreText.style.color = fontColour;
            computer.style.color = fontColour;
            break;
        case 'darkgreen':
            human.style.color = fontColour;
            humanScoreText.style.color = fontColour;
            message.style.backgroundColor = fontColour;
            break;
        case 'red':
            computer.style.color = fontColour;
            computerScoreText.style.color = fontColour;
            message.style.backgroundColor = fontColour;
            break;
        case 'lightblue':
            message.style.backgroundColor = fontColour;
            humanScoreText.style.color = 'black';
            human.style.color = 'black';
            break;
        default:
            break;
    }
}



