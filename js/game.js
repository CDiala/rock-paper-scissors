function computerPlay() {
  return selectionArray[Math.floor(Math.random() * selectionArray.length)];
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();

  if (playerSelection === "rock") {
    if (computerSelection === "scissors") {
      return "You Win! Rock crushes Scissors";
    } else {
      return "You Lose! Paper covers Rock";
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "paper") {
      return "You Win! Scissors cut Paper";
    } else {
      return "You Lose! Rock crushes Scissors";
    }
  } else if (playerSelection === "paper") {
    if (computerSelection === "rock") {
      return "You Win! Paper covers Rock";
    } else {
      return "You Lose! Scissors cut Paper";
    }
  }
}

function isEntryValid(userInput) {
  if (typeof userInput === "string") {
    return selectionArray.includes(userInput);
  }
}

function trim(inputString) {
  if (typeof inputString === "string") {
    return inputString.replaceAll(" ", "");
  }
}

function game() {
  let playerWinCount = 0;
  let computerWinCount = 0;
  for (let i = 0; i < 5; i++) {
    let playerSelection = prompt("What's your selection?");
    playerSelection = trim(playerSelection);
    let result;

    if (isEntryValid(playerSelection)) {
      result = playRound(playerSelection, computerPlay());

      console.log(result);

      result.includes("Lose")
        ? computerWinCount++
        : result.includes("Win")
        ? playerWinCount++
        : null;
    } else {
      console.log(`Wrong choice: "${playerSelection}"`);
    }
  }
  return `${playerWinCount > computerWinCount ? "Player" : "Computer"} Wins!`;
}

const selectionArray = ["rock", "paper", "scissors"];
console.log(game());
