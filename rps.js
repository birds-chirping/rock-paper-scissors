const choices = ['Rock', 'Paper', 'Scissors'];
console.log(choices);


// Convert string to title case.
function toTitleCase(str) {
    if (str) {
        return str[0].toUpperCase() + str.substring(1).toLowerCase();
    } else {
        return str;
    }
} 


// Get computer's choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}


// Get player's choice
function getPlayerChoice() {
    // get input only if valid & convert to lowercase
    let choice;
    while (choice !== null && !choices.includes(choice)) {
        choice = toTitleCase(prompt("Rock, paper, scissors? "));
    }
    return choice;
}


// Play round
function playRound(playerSelection, computerSelection) {
    let winner;
    switch(true) {
        case (playerSelection === computerSelection):
            console.log("It's a tie!");
            break;
        case (
            playerSelection === 'Rock' && computerSelection === 'Scissors' || 
            playerSelection === 'Scissors' && computerSelection === 'Paper' ||
            playerSelection === 'Paper' && computerSelection === 'Rock'
            ):
            winner = 'player';
            console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
            break;
        default:
            winner = 'computer';
            console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
    }
    return winner;
}


// Play game (5 rounds)
function playGame() {
    let playerScore = 0;
    let computerScore = 0;
    let tie = 0;
    let cancel = 0;

    for (let i = 0; i < 5; i++) {
        let computerChoice = getComputerChoice();
        let playerChoice = getPlayerChoice();
        if (playerChoice === null) {
            cancel = 1;
            break;
        }
        let winner = playRound(playerChoice, computerChoice);

        // Keep score
        winner === 'player' ? playerScore++ : winner === 'computer' ? computerScore++ : tie++;
        console.log(`Player: ${playerScore}, Computer: ${computerScore}, Tie: ${tie}`);
    }
    // Announce winner
    if (cancel === 0) {
        console.log(playerScore === computerScore ? 'Tie!' : playerScore > computerScore ? 'Player wins!' : 'Computer wins!');
    } else {
        console.log('The game was canceled.');
    }
}
playGame();

