function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return `It was a draw! You both chose ${playerSelection}.`;
    } else {
        switch (playerSelection) {
            case "rock":
                if (computerSelection === "paper") {
                    return `You lose! ${computerSelection} beats ${playerSelection}.`;
                } else {
                    return `You win! ${playerSelection} beats ${computerSelection}.`;
                }

            case "paper":
                if (computerSelection === "scissors") {
                    return `You lose! ${computerSelection} beats ${playerSelection}.`;
                } else {
                    return `You win! ${playerSelection} beats ${computerSelection}.`;
                }

            case "scissors":
                if (computerSelection === "rock") {
                    return `You lose! ${computerSelection} beats ${playerSelection}.`;
                } else {
                    return `You win! ${playerSelection} beats ${computerSelection}.`;
                }

            default:
                return `Your input ${playerSelection} was invalid!`;
        }
    }
}

function game() {
    const roundsToWin = Math.floor(parseInt(prompt("How many rounds would you like to play: ")) / 2);
    let playerWins = 0, computerWins = 0;

    while (playerWins < roundsToWin && computerWins < roundsToWin) {
        const playerChoice = prompt("Choose rock, paper, or scissors: ");
        const result = playRound(playerChoice, getComputerChoice());

        
        if (result.includes("lose")) {
            computerWins++;
        } else if (result.includes("win")) {
            playerWins++;
        }

        console.log(result);
    }

    if (playerWins >= roundsToWin) {
        console.log("You are the winner!");
    } else {
        console.log("You are the loser!");
    }
}

game()