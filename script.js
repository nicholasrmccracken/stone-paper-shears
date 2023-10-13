const stone = document.querySelector('#selectable .stone');
stone.addEventListener('click', () => {
    playRound('stone', getComputerChoice());
    return false;
});

const paper = document.querySelector('#selectable .paper');
paper.addEventListener('click', () => {
    playRound('paper', getComputerChoice());
    return false;
});

const shears = document.querySelector('#selectable .shears');
shears.addEventListener('click', () => {
    playRound('shears', getComputerChoice());
    return false;
});

let playerLives = 5, computerLives = 5;

function getComputerChoice() {
    const choices = ['stone', 'paper', 'shears'];
    const choice = choices[Math.floor(Math.random() * choices.length)];
    
    document.querySelectorAll('#unselectable img').forEach(image => {
        image.style.transform = 'scale(1)';
    });

    document.querySelector(`#unselectable .${choice}`).style.transform = 'scale(1.25)';

    return choice
}

function playRound(playerSelection, computerSelection) {
    playerBorder = document.querySelector('#player');
    computerBorder = document.querySelector('#computer');

    const outcomes = {
        'tie' : () => {
            playerBorder.style.border = '8px solid var(--tie-border-color)';
            computerBorder.style.border = '8px solid var(--tie-border-color)';
        },
        'win' : () => {
            playerBorder.style.border = '8px solid var(--win-border-color)';
            computerBorder.style.border = '8px solid var(--loss-border-color)';

            computerHearts = document.querySelector('#computer .lives-container');
            computerHearts.children[computerLives - 1].setAttribute('src', 'images/empty-heart.png');
            computerLives--;

            checkResult();
        },
        'loss' : () => {
            playerBorder.style.border = '8px solid var(--loss-border-color)';
            computerBorder.style.border = '8px solid var(--win-border-color)';

            playerHearts = document.querySelector('#player .lives-container');
            playerHearts.children[playerLives - 1].setAttribute('src', 'images/empty-heart.png');
            playerLives--;
            
            checkResult();
        }
    };

    if (playerSelection === computerSelection) {
        outcomes['tie']();
    } else {
        switch (playerSelection) {
            case 'stone':
                if (computerSelection === 'paper') {
                    outcomes['loss']();
                } else {
                    outcomes['win'];
                }
            break;

            case 'paper':
                if (computerSelection === 'shears') {
                    outcomes['loss']();
                } else {
                    outcomes['win']();
                }
            break;

            case 'shears':
                if (computerSelection === 'stone') {
                    outcomes['loss']();
                } else {
                    outcomes['win']();
                }
            break;
        }
    }
}

function checkResult() {
    gameEnd = document.querySelector('#game-end-screen');

    if (playerLives === 0) {
        gameEnd.style.backgroundColor = 'rgba(109, 39, 39, var(--game-end-opacity))';
        gameEnd.children[0].textContent = 'You died!';
        
        score = document.querySelector('#game-end-screen span');
        score.textContent = `Herobrine had ${computerLives} lives left!`;

        gameEnd.style.display = 'flex';

        resetGame();
    } else if (computerLives === 0) {
        gameEnd.style.display = 'flex';

        resetGame();
    }
}

function resetGame() {
    respawn = document.querySelector('#game-end-screen img');
    respawn.addEventListener('click', () => location.reload());
}
