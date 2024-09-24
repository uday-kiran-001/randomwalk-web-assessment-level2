const board = document.getElementById('board')
const boxes = document.getElementsByClassName('box')
const players = ['X', 'O']
// To track player scores dynamically
const playersScore = {'X': document.querySelector('.playercard.player1 h1'), 'O': document.querySelector('.playercard.player2 h1')};
// Color codes for players
const playerColors = ['#7b95ff', '#ff7b7b'] 
let currentPlayer = players[0] // X always starts
const captions = document.getElementById('captions') // Game status text
var someoneWon = false; // Flag to track if a win occurred


// Add event listeners to all boxes
for(let i = 0; i < boxes.length; i++){
    boxes[i].addEventListener('click', () => {
        if(someoneWon) return; // Stop clicks if the game is over
        if(boxes[i].textContent !== ''){ // Ignore already filled boxes
            return
        }
        boxes[i].textContent = currentPlayer

        // Apply shadow based on the player
        boxes[i].style["boxShadow"] = `${currentPlayer === players[0] ? playerColors[0] : playerColors[1]} 0px -23px 25px 0px inset`;

        // Check if current move caused a win
        if(checkWin(currentPlayer)) {
            someoneWon = true;
            captions.textContent=`Game over! ${currentPlayer} wins!!!`
            
            // Increment score for the current player
            var score = parseInt(playersScore[currentPlayer].textContent, 10);
            score += 1;
            playersScore[currentPlayer].textContent = score;
            return
        }

        // Check if the game resulted in a tie
        if(checkTie()) {
            someoneWon = true;
            captions.textContent= `Draw!!!`
            return
        }

        // Switch to the other player
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0] 
        
        // Update the board's box shadow based on the current player
        board.style["boxShadow"] = `0 0 100px ${currentPlayer === players[0] ? playerColors[0] : playerColors[1]}`;
        
        // Update game status message
        captions.textContent= currentPlayer === players[0] ? `X's turn` : `O's turn`;
    })   
}

// Check if the current player has won
function checkWin(currentPlayer) {
    for(let i = 0; i < winning_combinations.length; i++){
        const [a, b, c] = winning_combinations[i]
        // Check if all boxes in the combination are filled by the current player
        if(boxes[a].textContent === currentPlayer && boxes[b].textContent === currentPlayer && boxes[c].textContent === currentPlayer){
            return true
        }
    }
    return false
}

// All possible winning combinations
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Check if the game is a tie
function checkTie(){
    for(let i = 0; i < boxes.length; i++) {
        // If any box is empty, it's not a tie
        if(boxes[i].textContent === '') {
            return false;
        }
    }
    return true
}

// Restart game logic
function restartButton() {
    someoneWon = false;
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = "" // Clear the board
        boxes[i].style["boxShadow"] = 'none'
    }
    currentPlayer = players[0] // X starts again
    board.style["boxShadow"] = `0 0 100px ${currentPlayer === players[0] ? playerColors[0] : playerColors[1]}`;
    captions.textContent = `X's turn` // Reset caption
}