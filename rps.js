// Play game (5 rounds)
// function playGame() {
//     let playerScore = 0;
//     let computerScore = 0;
//     let tie = 0;
//     let cancel = 0;

//     for (let i = 0; i < 5; i++) {
//         let computerChoice = getComputerChoice(allChoices);
//         let playerChoice = getPlayerChoice();
//         if (playerChoice === null) {
//             cancel = 1;
//             break;
//         }
//         let winner = playRound(playerChoice, computerChoice);

//         // Keep score
//         winner === 'player' ? playerScore++ : winner === 'computer' ? computerScore++ : tie++;
//         console.log(`Player: ${playerScore}, Computer: ${computerScore}, Tie: ${tie}`);
//     }
//     // Announce winner
//     if (cancel === 0) {
//         console.log(playerScore === computerScore ? 'Tie!' : playerScore > computerScore ? 'Player wins!' : 'Computer wins!');
//     } else {
//         console.log('The game was canceled.');
//     }
// }

const allChoices = ['rock', 'paper', 'scissors'];
const board = document.querySelector('.board');
const choicesPics = document.querySelector('.graphic');
const endScreen = document.querySelector('.at-end');
const endMessage = document.querySelector('.end-message');
const newGame = document.querySelector('#new-btn');
let playerChoice;
let compChoice;
let playerButtons;


// Convert string to sentence case.
function toSentenceCase(str) {
    if (str) {
        return str[0].toUpperCase() + str.substring(1).toLowerCase();
    } else {
        return str;
    }
} 


// Get computer's choice
function getComputerChoice(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}


// Play round
function getWinner(playerSelection, computerSelection) {
    let winner;
    let mess;
    let selections = [playerSelection, computerSelection];
    switch(true) {
        case (playerSelection === computerSelection):
            mess = "It's a tie!";
            winner = 'tie';
            break;
        case (
            playerSelection === 'rock' && computerSelection === 'scissors' || 
            playerSelection === 'scissors' && computerSelection === 'paper' ||
            playerSelection === 'paper' && computerSelection === 'rock'
            ):
            winner = 'player';
            playerSelection = toSentenceCase(playerSelection);
            computerSelection = toSentenceCase(computerSelection);
            mess = `You win! ${playerSelection} beats ${computerSelection}.`;
            break;
        default:
            winner = 'computer';
            playerSelection = toSentenceCase(playerSelection);
            computerSelection = toSentenceCase(computerSelection);
            mess = `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
    return [winner, mess];
}


function playRound(e) {
    // console.log(e);
    // board.innerHTML ='';
    this.classList.add('onclick');
    playerChoice = this.id;
    compChoice = getComputerChoice(allChoices);
    let winner = getWinner(playerChoice, compChoice)[1];
    // playerButtons.forEach(choice => {choice.setAttribute('disabled', 'true')});
    playerButtons.forEach(choice => {choice.classList.add('inactive')});


    choicesPics.textContent = `${this.id}`;
    endMessage.textContent = `${winner}`;
    endScreen.classList.add('at-end-visible');
        // Blur effect:
        setTimeout(() => {
            choicesPics.classList.add('blur');
        }, 1000);

}


function startNewGame (e) {
    console.log(e);
    playerButtons.forEach(choice => {choice.classList.remove('onclick')});
    choicesPics.classList.remove('blur');
    endScreen.classList.remove('at-end-visible');
    choicesPics.textContent = ``;
    // playerButtons.forEach(choice => {choice.removeAttribute('disabled')});
    playerButtons.forEach(choice => {choice.classList.remove('inactive')});
}


function play() {
    playerButtons = document.querySelectorAll('.player-btn');
    playerButtons.forEach(choice => choice.addEventListener('click', playRound));
    
    // playerButtons.forEach(choice => choice.addEventListener('transitionend', removeTransition));
    newGame.addEventListener('click', startNewGame);
}

play();
