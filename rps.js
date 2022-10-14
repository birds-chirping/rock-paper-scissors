const choices = ['rock', 'paper', 'scissors'];
console.log(choices);

// Get computer's choice
function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}
console.log(getComputerChoice());


// Get player's choice
function getPlayerChoice() {
    // get input only if valid & convert to lowercase
    let choice;
    while (!choices.includes(choice)) {
        choice = prompt("Rock, paper, scissors? ").toLowerCase();
    }
    return choice;
}
console.log("Player: " + getPlayerChoice());


// Play round
function playRound(playerSelection, computerSelection) {
    // code
    // print message
    // return winner
}

// Play game (5 rounds)
function playGame() {
    // code
    // keep score
    // return winner
}

