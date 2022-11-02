const allChoices = ['rock', 'paper', 'scissors'];
const playerScore = document.querySelector('#player-score');
const compScore = document.querySelector('#comp-score');
const roundMessage = document.querySelector('.round-message');
const inGameBoard = document.querySelector('.graphic');
const playerChoiceBoard = document.querySelector('.player-choice');
const compChoiceBoard = document.querySelector('.comp-choice');
const endScreen = document.querySelector('.end-screen');
const endMessage = document.querySelector('.end-message');
const newGameBtn = document.querySelector('button');
const playerButtons = document.querySelectorAll('.player-btn');
let playerChoice;
let compChoice;



function disableButtons(btn) {
    playerButtons.forEach(choice => {choice.classList.add('inactive')});
    btn.classList.add('clicked');
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


    roundMessage.classList.add('visible');

    // Check end game
    if (playerScore.textContent > 4 || compScore.textContent > 4) {
        disableButtons(this);
        roundMessage.textContent = getEndRoundMessage(playerChoice, compChoice, winner);
        playerScore.textContent > compScore.textContent ? 
            endMessage.textContent = 'Human WON!':
            endMessage.textContent = 'Rabbit WON!';
        setTimeout(function() {
            endScreen.classList.add('visible');  // winner message & new game button
            inGameBoard.classList.add('blur');   // add blur over board
        }, 1500);
    } else {
        roundMessage.textContent = getEndRoundMessage(playerChoice, compChoice, winner);
        enableButtons(); 
    }
}


function play() {
    playerButtons.forEach(choice => choice.addEventListener('click', playGame));
    newGameBtn.addEventListener('click', () => {
        resetScore();
        enableButtons();
        resetChoicesOnBoard();
        resetScreen();
        roundMessage.classList.remove('visible'); //remove end round message
    }); 
}

play();
