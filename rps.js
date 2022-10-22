const allChoices = ['rock', 'paper', 'scissors'];
const playerScore = document.querySelector('#player-score');
const compScore = document.querySelector('#comp-score');
const board = document.querySelector('.board');
const inGameBoard = document.querySelector('.graphic');
const playerChoiceBoard = document.querySelector('.player-choice');
const compChoiceBoard = document.querySelector('.comp-choice');
const endScreen = document.querySelector('.end-screen');
const endMessage = document.querySelector('.end-message');
const playerButtons = document.querySelectorAll('.player-btn');
let playerChoice;
let compChoice;


const newGameBtn = document.createElement('button');
newGameBtn.textContent = 'NEW GAME';
newGameBtn.setAttribute('id', 'new-btn');


function disableButtons(btn) {
    btn.classList.add('clicked');
    playerButtons.forEach(choice => {choice.classList.add('inactive')});
}

function enableButtons() {
        playerButtons.forEach(choice => {choice.classList.remove('inactive', 'clicked')});
}

function resetScreen() {
    inGameBoard.classList.remove('blur');  // remove blur
    endScreen.classList.remove('visible');  // remove endscreen
}


function updateChoicesOnBoard(choice) {
    playerChoiceBoard.textContent = `${choice}`.toUpperCase();
    compChoiceBoard.textContent = `${compChoice}`.toUpperCase();
}

function resetChoicesOnBoard() {
    playerChoiceBoard.textContent = '';
    compChoiceBoard.textContent = ''; 
}


function getComputerChoice(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}


function getWinner(playerSelection, computerSelection) {
    let winner;
    switch(true) {
        case (playerSelection === computerSelection):
            winner = 'tie';
            break;
        case (
            playerSelection === 'rock' && computerSelection === 'scissors' || 
            playerSelection === 'scissors' && computerSelection === 'paper' ||
            playerSelection === 'paper' && computerSelection === 'rock'
            ):
            winner = 'player';
            break;
        default:
            winner = 'computer';
    }
    return winner;
}


function updateScore(winner) {
    if (winner !== 'tie') {
        winner === 'player' ? playerScore.textContent++ : compScore.textContent++;
    }
}


function resetScore () {
    playerScore.textContent = '0';
    compScore.textContent = '0';
    endScreen.removeChild(newGameBtn);
}


function getEndRoundMessage(playerChoice, compChoice, winner) {
    let message;
    playerChoice = playerChoice.toUpperCase();
    compChoice = compChoice.toUpperCase();
    if (winner === 'tie') {
        message = "It's a tie!";
    } else if (winner === 'player') {
        message = `You win! ${playerChoice} beats ${compChoice}.`;
    } else {
        message = `You lose! ${compChoice} beats ${playerChoice}.`;
    }
    return message;
}


function playGame() {
    resetChoicesOnBoard();
    resetScreen();
    disableButtons(this);

    // Get choice & find winner
    playerChoice = this.id;
    compChoice = getComputerChoice(allChoices);
    const winner = getWinner(playerChoice, compChoice);

    // Update board: choices & score
    updateChoicesOnBoard(this.id);
    updateScore(winner);


    // Check end game
    if (playerScore.textContent < 5 && compScore.textContent < 5) {
        endMessage.textContent = getEndRoundMessage(playerChoice, compChoice, winner);
        enableButtons(); 
    } else {
        disableButtons(this);
        playerScore.textContent > compScore.textContent ? 
        endMessage.textContent = 'Human WON!':
        endMessage.textContent = 'Rabbit WON!';

        endScreen.appendChild(newGameBtn);  // add new game option btn
    }

    // End scene
    setTimeout(() => {
        inGameBoard.classList.add('blur'); 
    }, 1000);
    endScreen.classList.add('visible');
}


function play() {
    playerButtons.forEach(choice => choice.addEventListener('click', playGame));
    newGameBtn.addEventListener('click', () => {
        resetScore();
        enableButtons();
        resetChoicesOnBoard();
        resetScreen();
    }); 
}

play();
