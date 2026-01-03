// File globals
const choices = ["rock", "paper", "scissors"]
const imageMap = new Map([
    [choices[0], "./images/rock.jpg"],
    [choices[1], "./images/paper.jpg"],
    [choices[2], "./images/scissors.jpg"],
])
const buttons = document.querySelector('#buttonContainer');
const humanElements = document.querySelectorAll('.human');
const computerElements = document.querySelectorAll('.computer');
const humanChoice = document.getElementById('humanChoice');
const computerChoice = document.getElementById('computerChoice');
const computerImage = document.getElementById('computerImage');
// const humanRockImage = document.getElementById('rock');
// const humanPaperImage = document.getElementById('paper');
// const humanScissorsImage = document.getElementById('scissors');
const roundResult = document.getElementById('roundResult');
const result = document.getElementById('result');
const dialog = document.querySelector("dialog");
const finalResult = document.getElementById('final');
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
    computerSelection = choices[randomIdx];
    computerChoice.textContent = capitalizeFirstLetter(computerSelection);
    computerImage.src = imageMap.get(computerSelection);
    return computerSelection;
}

// This is event listener for clicking any of the 3 buttons in the buttonContainer.
// This event sets off the playing of one round of the RPS game.
buttons.addEventListener('click', (e) => {
    roundResult.hidden = false;
    let human = e.target.id;
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

function toggleImage(choice) {
    console.log("choice = ", choice)
    if (choice === "rock") {
            humanRockImage.style.filter = "brightness(100%)";
            humanPaperImage.style.filter = 'brightness(20%)';
            humanScissorsImage.style.filter = 'brightness(20%)';
    }
}

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
        processEndGame();
    }
}

function processEndGame() {
    if (humanScore === computerScore) {
        finalResult.textContent = "Tie";
    } else if (humanScore > computerScore) {
        finalResult.textContent = "You win";
    } else {
        finalResult.textContent = "You lose";
    }
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
