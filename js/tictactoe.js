
const PLAYER_TOKEN = 'X',
    COMPUTER_TOKEN = 'Y';

$(document).ready(function(){

    const grid = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    const isGameOver = () =>{
        //Check Horizontal
        for(let i=0; i<3; i++){
            if(grid[i][0] !== ' ' &&
            grid[i][0] === grid[i][1] &&
            grid[i][0] === grid[i][2]){
                return grid[i][0];
            }
        }

        //Check Vertical
        for(let j=0; j<3; j++){
            if(grid[0][j] !== ' ' &&
            grid[0][j] === grid[1][j] &&
            grid[0][j] === grid[2][j]){
                return grid[0][j];
            }
        }

        //Check Diagonal - top left bottom right
        if(grid[0][0] !== ' ' &&
            grid[0][0] === grid[1][1] &&
            grid[0][0] === grid[2][2]){
            return grid[0][0];
        }
        

        //Check Diagonal - bottom left bottom right
        if(grid[2][0] !== ' ' &&
            grid[2][0] === grid[1][1] &&
            grid[2][0] === grid[0][2]){
                return grid[2][0];
        }

        //Check if the board is empty or not
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(grid[i][j] === ' '){
                    return false;
                }
            }
        }

        return null;
 
    }

    const moveAI = () =>{
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(grid[i][j] === ' '){
                    return{
                        i: i,
                        j: j
                    };
                }
            }
        }
    }

    $('.square').on('click', function(){
        $(this).html(PLAYER_TOKEN);
        const i = $(this).data('i');
        const j = $(this).data('j');
        grid[i][j] = PLAYER_TOKEN;
        console.log(grid);

        let gameState = isGameOver();
        if(gameState){
            alert(`game over: ${gameState}`);
            return;
        }else{
            const move = moveAI();
            grid[move.i][move.j] = COMPUTER_TOKEN;
           
            
            $('.square[data-i="' + move.i + '" data-j="' + move.j + '"]').html(COMPUTER_TOKEN);
            
        }

        gameState = isGameOver();
        if(gameState){
            alert(`game over: ${gameState}`);
        }

    });


});