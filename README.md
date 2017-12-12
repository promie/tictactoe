# Tic Tac Toe
Free Code Camp Advanced Project.
This has been the longest and the most difficult project that I have encounter as trying to build an algorithm for the unbeatable AI and understanding the minimax algorithm has been a long and painful process. This project is purely written in ES6.

See below the code for the minimax algorithm.
```
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
```

### Project

Check out the completed projected - [Tic Tac Toe](https://promie.github.io/tictactoe/)

### APP Preview

![alt text](https://github.com/promie/tictactoe/blob/master/img/preview.JPG "Main App")

### Minimax Algorithm

![alt text](https://github.com/promie/tictactoe/blob/master/img/minimax.png "Minimax Algorithm")
![alt text](https://github.com/promie/tictactoe/blob/master/img/minimax2.png "Minimax Algorithm")
![alt text](https://github.com/promie/tictactoe/blob/master/img/minimax3.JPG "Minimax Algorithm")
