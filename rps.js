const allChoices = ['rock', 'paper', 'scissors'];
const playerScore = document.querySelector('#player-score');
const compScore = document.querySelector('#comp-score');
const board = document.querySelector('.board');
const choicesPics = document.querySelector('.graphic');
const playerChoiceBoard = document.querySelector('.player-choice');
const compChoiceBoard = document.querySelector('.comp-choice');
const endScreen = document.querySelector('.at-end');
const endMessage = document.querySelector('.end-message');
const newGame = document.querySelector('#new-btn');
const playerButtons = document.querySelectorAll('.player-btn');
let playerChoice;
let compChoice;


// Get computer's choice
function getComputerChoice(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}


// Play round
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
    newGame.removeEventListener('click', resetScore);
}


function getMessage(playerChoice, compChoice, winner) {
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
    this.classList.add('onclick');
    playerButtons.forEach(choice => {choice.classList.add('inactive')});  //disable buttons

    playerChoice = this.id;
    compChoice = getComputerChoice(allChoices);
    const winner = getWinner(playerChoice, compChoice);

    playerChoiceBoard.textContent = `${this.id}`.toUpperCase();
    compChoiceBoard.textContent = `${compChoice}`.toUpperCase();

    setTimeout(() => {
        choicesPics.classList.add('blur');      // Add blur on board
        updateScore(winner);

        // Reset score after 5 winning rounds
        if (playerScore.textContent < 5 && compScore.textContent < 5) {
            endMessage.textContent = getMessage(playerChoice, compChoice, winner);
        } else {
            playerScore.textContent > compScore.textContent ? 
            endMessage.textContent = 'Human WON!':
            endMessage.textContent = 'Rabbit WON!';
            newGame.addEventListener('click', resetScore);  
        }
        endScreen.classList.add('visible');
    }, 300);
}


function startNewGame () {
    // Remove blur, clear board
    playerButtons.forEach(choice => {choice.classList.remove('onclick')});
    choicesPics.classList.remove('blur');
    playerChoiceBoard.textContent = '';
    compChoiceBoard.textContent = '';
    endScreen.classList.remove('visible');

    // Make buttons active again
    playerButtons.forEach(choice => {choice.classList.remove('inactive')});
}


function play() {
    playerButtons.forEach(choice => choice.addEventListener('click', playGame));
    newGame.addEventListener('click', startNewGame);    
}

play();
