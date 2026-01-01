const choices = ["rock", "paper", "scissors"]
let computerScore = 0;
let humanScore = 0;
const buttons = document.querySelector('#buttonContainer');
const humanElements = document.querySelectorAll('.human');
const computerElements = document.querySelectorAll('.computer');
const humanChoice = document.getElementById('humanChoice')
const computerChoice = document.getElementById('computerChoice')
const roundResult = document.getElementById('roundResult');
const result = document.getElementById('result');
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

resetGame();

closeButton.addEventListener('click', () => {
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
// This event sets off the playing of one round of the rps game.
buttons.addEventListener('click', (e) => {
    let button = e.target;
    let human = button.id;
    humanChoice.textContent = capitalizeFirstLetter(human);
    playRound(human, getComputerChoice());
})

// playRound plays one round of rps, based on the human and computer choices passed in.
function playRound(humanChoice, computerChoice) {
    let humanWins = true;
    if (humanChoice === computerChoice) {
        roundResult.hidden = false;
        result.textContent = "Tie!";
        return
    } else {
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
            default:
                return;
        }
        roundResult.hidden = false;
        humanWins ? result.value = "You win! " : result.value = "You lose! ";
        tallyRound(humanChoice, computerChoice, humanWins)
    }
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

// tallyRound keeps a running total of the rps game score. When either 
// the human or the computer score reaches 5, it ends the game.
function tallyRound(humanChoice, computerChoice, humanWins) {
    if (humanWins === true) {
        result.textContent = "You win!";
        humanScore++;
        setHumanScore(humanScore);
    } else {
        result.textContent = "You lose!";
        computerScore++;
        setComputerScore(computerScore);
    }
    if ((humanScore == 5) || (computerScore == 5)) {
        processGameOver();
    }
}

// processGameOver dispays a game over dialog which declares a winner and
// displays the final score
function processGameOver() {
    dialog.showModal();
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
