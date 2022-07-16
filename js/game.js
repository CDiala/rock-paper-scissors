function computerPlay() {
  return selectionArray[Math.floor(Math.random() * selectionArray.length)];
}

function playRound(playerSelection, computerSelection) {
  let result = "It's a tie!";
  if (playerSelection === "rock") {
    if (computerSelection === "scissors") {
      result = "You Win! Rock crushes Scissors";
    } else if (computerSelection === "paper") {
      result = "You Lose! Paper covers Rock";
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "paper") {
      result = "You Win! Scissors cuts Paper";
    } else if (computerSelection === "rock") {
      result = "You Lose! Rock crushes Scissors";
    }
  } else if (playerSelection === "paper") {
    if (computerSelection === "rock") {
      result = "You Win! Paper covers Rock";
    } else if (computerSelection === "scissors") {
      result = "You Lose! Scissors cuts Paper";
    }
  }
  return result;
}

function isEntryValid(userInput) {
  if (typeof userInput === "string") {
    return selectionArray.includes(userInput);
  }
}

function trim(inputString) {
  if (typeof inputString === "string") {
    return inputString.replaceAll(" ", "").toLowerCase();
  }
}

function game() {
  let playerWinCount = 0;
  let computerWinCount = 0;

  for (let playCount = 0; playCount < 5; playCount++) {
    let result;
    let playerSelection = prompt(
      "Welcome to Rock-Paper-Scissors game. \nEnter your preferred choice. \nGood luck!"
    );
    playerSelection = trim(playerSelection);

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
      playCount--;
    }
  }
  let finalResult = `${
    playerWinCount > computerWinCount
      ? "Player Wins!"
      : playerWinCount < computerWinCount
      ? "Computer Wins!"
      : "It's a draw!"
  } `;
  console.log(finalResult);
  return finalResult;
}

const selectionArray = ["rock", "paper", "scissors"];
alert(game());
