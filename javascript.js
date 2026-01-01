// File globals
const choices = ["rock", "paper", "scissors"]
const buttons = document.querySelector('#buttonContainer');
const humanElements = document.querySelectorAll('.human');
const computerElements = document.querySelectorAll('.computer');
const humanChoice = document.getElementById('humanChoice')
const computerChoice = document.getElementById('computerChoice')
const roundResult = document.getElementById('roundResult');
const result = document.getElementById('result');
const dialog = document.querySelector("dialog");
const gameOverButton = document.querySelector("dialog button");
let computerScore = 0;
let humanScore = 0;

resetGame();

// Adds a click event listener to the close button of the dialog that appears
// when the game is over.
gameOverButton.addEventListener('click', () => {
    dialog.close();
    resetGame();
})

// getComputerChoice randomly selects and returns one member from the choices array 
function getComputerChoice() {
    const randomIdx = Math.floor(Math.random() * choices.length);
    computerChoice.textContent = capitalizeFirstLetter(choices[randomIdx]);
    return choices[randomIdx]
}

// This is event listener for clicking any of the 3 buttons in the buttonContainer.
// This event sets off the playing of one round of the RPS game.
buttons.addEventListener('click', (e) => {
    roundResult.hidden = false;
    let button = e.target;
    let human = button.id;
    let computer = getComputerChoice();
    humanChoice.textContent = capitalizeFirstLetter(human);
    computerChoice.textContent = capitalizeFirstLetter(computer);
    if (human !== computer) {
        let humanWins = playRound(human, computer);
        humanWins ? result.textContent = "You win! " : result.textContent = "You lose! ";
        tallyRound(humanWins);
    } else {
        result.textContent = "Tie!";
    }
})

// playRound plays one round of RPS, based on the human and computer choices passed in.
function playRound(humanChoice, computerChoice) {
    let humanWins = true;
    switch (humanChoice) {
        case "rock":
            if (computerChoice === "paper") {
                humanWins = false;
            }
            break;
        case "paper":
            if (computerChoice === "scissors") {
                humanWins = false;
            }
            break;
        case "scissors":
            if (computerChoice === "rock") {
                humanWins = false;
            }
            break;
    }
    return humanWins;
}

// setHumanScore sets all human element text content to score.
function setHumanScore(score) {
    humanElements.forEach(span => {
        span.textContent = score;
    })
}

// setComputerScore sets all computer element text content to score.
function setComputerScore(score) {
    computerElements.forEach(span => {
        span.textContent = score;
    })
}

// tallyRound keeps a running total of the RPS game score. When either 
// the human or the computer score reaches 5, it ends the game.
function tallyRound(humanWins) {
    if (humanWins === true) {
        humanScore++;
        setHumanScore(humanScore);
    } else {
        computerScore++;
        setComputerScore(computerScore);
    }
    if ((humanScore == 5) || (computerScore == 5)) {
        dialog.showModal();
    }
}

// resetGame sets all scores (and text content) back to zero and hides the 
// round result
function resetGame() {
    humanScore = 0;
    setHumanScore(humanScore);
    computerScore = 0;
    setComputerScore(computerScore);
    roundResult.hidden = true;
}

// capitalizeFirstLetter returns the passed in string with the first character
// capitalized
function capitalizeFirstLetter(s) {
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
}
