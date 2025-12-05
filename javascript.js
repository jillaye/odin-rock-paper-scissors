const choices = ["rock", "paper", "scissors"]

function getComputerChoice() {
    const randomIdx = Math.floor(Math.random() * choices.length);
    return choices[randomIdx]
}

function getHumanChoice() {
    let choice = prompt("choose rock, paper, or scissors");
    if (choice != null) {
        choice = choice.toLowerCase()
        if (choices.includes(choice)) {
            return choice;
        } else {
            return("");
        }
    } else {
        return("")
    }
}

function sleep() {
    // sleeps for 1.5 seconds (1500 msec)
    return new Promise(resolve => setTimeout(resolve, 1500));
}

async function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        if (humanChoice === computerChoice) {
            console.log("   Tie!")
            return
        }
        let humanWins = true;
        switch (humanChoice.toLowerCase()) {
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
                console.log("Invalid choice. Try again.")
                return;
        }
        processResult(humanChoice, computerChoice, humanWins)
    }

    function processResult(humanChoice, computerChoice, humanWins) {
        if (humanWins === true) {
            humanScore++;
            console.log(`   You win this round! ${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}.`)
        } else {
            computerScore++;
            console.log(`   You lose this round! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}.`)
        }
    }

    for (let x = 0; x < 5; x++) {
        console.log(`Round ${x + 1}:`)
        await sleep();
        const human = getHumanChoice();
        const computer = getComputerChoice();
        playRound(human, computer);
    }

    if (humanScore > computerScore) {
        console.log(`You WIN the game! Score ${humanScore} to ${computerScore}`)
    } else if (humanScore === computerScore){
        console.log("Tie game!")
    } else {
        console.log(`You LOST the game! Score ${humanScore} to ${computerScore}`)
    }
}

function capitalizeFirstLetter(s) {
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
}

playGame()
