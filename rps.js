const choices = ['Rock', 'Paper', 'Scissors'];
console.log(choices);


// Convert string to title case
function toTitleCase(str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
} 


// Get computer's choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}


// Get player's choice
function getPlayerChoice() {
    // get input only if valid & convert to lowercase
    let choice;
    while (!choices.includes(choice)) {
        choice = toTitleCase(prompt("Rock, paper, scissors? "));
    }
    return choice;
}



// Play round
function playRound(playerSelection, computerSelection) {
    switch(true) {
        case (playerSelection === computerSelection):
            return ("It's a tie!");
        case (
            playerSelection === 'Rock' && computerSelection === 'Scissors'
            || playerSelection === 'Scissors' && computerSelection === 'Paper' ||
            playerSelection === 'Paper' && computerSelection === 'Rock'
            ):
            return `You win! ${playerSelection} beats ${computerSelection}.`;
        default:
            return `You lose!  ${computerSelection} beats ${playerSelection}.`;
    }
}

// Play game (5 rounds)
function playGame() {
    // code
    // for (let i = 0; i < 5; i++)
    let winner = playRound(getPlayerChoice(), getComputerChoice());
    alert(winner);
    console.log(winner);
    // keep score
    // return winner
}

playGame();

