//converts updated gameBoard to a string and returns it
function getBoardString(gameBoard){
    let boardString = '';
    for(let i=0; i<gameBoard.length; i+=3){
        boardString += `${gameBoard[i] ?? i+1}${gameBoard[i+1] ?? i+2}${gameBoard[i+2] ?? i+3}\n`
    }
    return boardString;
}

//gets a number input from user 
function getUserInput(nextPlayerSymbol, gameBoard) {
    return +prompt(`Board: \n${getBoardString(gameBoard)}\n Enter ${nextPlayerSymbol}'s next move 1-9'`);
}

//checks whether the move is valid or not
//shouldnt allow them to overwrite eachother
function isMoveValid(coordinates, gameBoard) {
    let index = coordinates -1;
    return (
        typeof coordinates === 'number' &&
        coordinates >=1 && coordinates <=9 &&
        gameBoard[index] === null
    );
}

//makes the move onto the board and updates it
function makeAMove(gameBoard, nextPlayerSymbol) {
    // clone the game board before placing moves in it
    let newBoard = JSON.parse(JSON.stringify(gameBoard));
    let coordinates;
    do {
        coordinates = getUserInput(nextPlayerSymbol, gameBoard);
    } while (!isMoveValid(coordinates, gameBoard) );
    newBoard[coordinates-1] = nextPlayerSymbol;
    // return newGameBoard;
    return newBoard;
}

//checks if the user has won or not 
//lastMove is X or O
function hasLastMoverWon(lastMove, gameBoard) {
    let winnerCombos = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6]
    ];
    for (let [i1, i2, i3] of winnerCombos) {
        if (gameBoard[i1] === lastMove &&
            gameBoard[i1] === gameBoard[i2] && 
            gameBoard[i1] === gameBoard[i3] 
           ) {
            return true;
        }
    }
    return false;
}

//checks for the end of the game
function isGameOver(gameBoard, currentPlayerSymbol) {
    // 1. check if there is a winner
    let lastMove = currentPlayerSymbol;
    if (hasLastMoverWon(lastMove, gameBoard) ) {
        // Write a message that last mover has won the game
        alert(`Congratulations, ${currentPlayerSymbol} has won the game`);
        return true;
    }
    // 2. check if the board is full
    if(fullBoard(gameBoard)){
        alert('Stalemate!');
        return true;
    }
    // Return: winner/draw OR game is still in progress
    return false;
}

//checks whether the board is full
function fullBoard(gameBoard){
    for(let element of gameBoard){
        if(element === null){
            return false;
        }
    }
    return true;
}

//initiates the game
function ticTacToe() {
    // State space 
    let gameBoard = new Array(9).fill(null);
    let players = ['X', 'O'];
    let nextPlayerIndex = 0;
    let currentPlayerSymbol;

    // Computations
    
   
   do {
        if(nextPlayerIndex % 2 === 0){
        currentPlayerSymbol = players[0];
         } else if(nextPlayerIndex % 2 === 1){
        currentPlayerSymbol = players[1];
        } 
        gameBoard = makeAMove(gameBoard, currentPlayerSymbol);
        nextPlayerIndex+=1;
    } while ( !isGameOver(gameBoard, currentPlayerSymbol) );
    
    
} 