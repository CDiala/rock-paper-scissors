const objGame = {
  selectionArray: ["rock", "paper", "scissors"],
  playButton: document.querySelector(".btn-start"),
  gameCountEntry: document.querySelector("#gameRound"),
  gameButtons: document.querySelectorAll(".btn-play"),
  myParentElement: document.querySelector(".game-result-container"),
  statusContainer: document.querySelector(".game-status"),
  gameRounds: 0,
  playerWinCount: 0,
  computerWinCount: 0,
  result: 0,
  playCount: 0,
};

function computerPlay() {
  return objGame.selectionArray[
    Math.floor(Math.random() * objGame.selectionArray.length)
  ];
}

function playRound(playerSelection, computerSelection, round) {
  let result = `Round ${round}: It's a tie!`;
  if (playerSelection === "rock") {
    if (computerSelection === "scissors") {
      result = `Round ${round}: You Win! Rock crushes Scissors`;
    } else if (computerSelection === "paper") {
      result = `Round ${round}: You Lose! Paper covers Rock`;
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "paper") {
      result = `Round ${round}: You Win! Scissors cuts Paper`;
    } else if (computerSelection === "rock") {
      result = `Round ${round}: You Lose! Rock crushes Scissors`;
    }
  } else if (playerSelection === "paper") {
    if (computerSelection === "rock") {
      result = `Round ${round}: You Win! Paper covers Rock`;
    } else if (computerSelection === "scissors") {
      result = `Round ${round}: You Lose! Scissors cuts Paper`;
    }
  }
  return result;
}

objGame.playButton.addEventListener("click", () => {
  if (objGame.playButton.textContent === "Start") {
    if (objGame.gameCountEntry.value) {
      objGame.gameRounds = objGame.gameCountEntry.value;
      objGame.playButton.textContent = "Reset";
      enableGameButtons(objGame.gameButtons, false);
      displayError(objGame.statusContainer, "");
    } else {
      displayError(
        objGame.statusContainer,
        "Invalid entry. Please enter a number greater than zero (0)."
      );
    }
  } else if (
    (objGame.playButton.textContent === "Reset") &
    (objGame.gameCountEntry.value > 0)
  ) {
    resetGame();
  } else {
    resetGame();
  }
});

function enableGameButtons(buttons, isDisabled) {
  buttons.forEach((button) => {
    button.disabled = isDisabled;
    if (button.disabled) {
      button.classList.add("disabled");
    } else {
      button.classList.remove("disabled");
    }
  });
}

function displayError(element, data) {
  element.textContent = data;
}

objGame.gameButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (objGame.gameRounds > 0) {
      objGame.playCount++;
      let playerSelection = button.textContent.trim();
      objGame.result = playRound(
        playerSelection,
        computerPlay(),
        objGame.playCount
      );
      createNewLabel(objGame.result);
      objGame.result.includes("Lose")
        ? objGame.computerWinCount++
        : objGame.result.includes("Win")
        ? objGame.playerWinCount++
        : null;
      objGame.gameRounds--;
      if (objGame.gameRounds === 0) {
        let finalResult = `${
          objGame.playerWinCount > objGame.computerWinCount
            ? "Congratulations!!! Player Wins!"
            : objGame.playerWinCount < objGame.computerWinCount
            ? "Oops! Computer Wins! Better luck next time."
            : "Wow! It's a draw!"
        }`;
        createNewLabel(finalResult, true);
      }
    }
  });
});

function createNewLabel(value, isBold = false) {
  let myChildLabel = document.createElement("p");
  myChildLabel.textContent = value;
  if (isBold) {
    myChildLabel.style.cssText = `font-size: 18px; font-style: italic; font-weight: 700; color: 
      ${
        value.includes("Player Wins")
          ? "green"
          : value.includes("Computer Wins")
          ? "#b50000"
          : "#803c8e"
      } `;
  }
  objGame.myParentElement.append(myChildLabel);
}

function clearResults(parentElement, childElement) {
  parentElement.querySelectorAll(childElement).forEach((child) => {
    objGame.myParentElement.removeChild(child);
  });
}

function resetGame() {
  if (objGame.gameCountEntry.value / 1 > 0) {
    objGame.gameRounds = objGame.gameCountEntry.value;
    displayError(objGame.statusContainer, "");
    enableGameButtons(objGame.gameButtons, false);
  } else {
    enableGameButtons(objGame.gameButtons, true);
    clearResults(objGame.myParentElement, "p");
    displayError(
      objGame.statusContainer,
      "Invalid entry. Please enter a number greater than zero (0)."
    );
    objGame.gameRounds = 0;
  }
  clearResults(objGame.myParentElement, "p");
  objGame.playerWinCount = 0;
  objGame.computerWinCount = 0;
  objGame.result = "";
  objGame.playCount = 0;
}
