// Bulls and Cows
// Get library for user input
// we need to keep the next line, so we can prompt the user for input
const prompt = require("prompt-sync")({ sigint: true });

// Test that prompt is working
let name = prompt("What is your name? ");
console.log(`User's input is: ${name}`);

// Feel free to edit / remove the line above, this is just to test the package
// Although we may want to use the user's name for something

// ------------------------

// Function which creates a secret number with 4 unique digits
const createSecretNumber = () => {
  const possibleDigits = "0123456789";
  let secretNumber = "";
  while (secretNumber.length < 4) {
    const randomIndex = Math.floor(Math.random() * possibleDigits.length);
    const randomDigit = possibleDigits[randomIndex];
    if (!secretNumber.includes(randomDigit)) {
      secretNumber += randomDigit;
    }
  }
  console.log(secretNumber);
  return secretNumber;
};

// Function to check the player's input
function checkInput(secretNumber, input) {
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < 4; i++) {
    if (secretNumber[i] === input[i]) {
      bulls++;
    } else if (secretNumber.includes(input[i])) {
      cows++;
    }
  }
  return { bulls, cows };
}

// Start function
const start = () => {
  const secretNumber = createSecretNumber();

  console.log(
    `Welcome to Bulls and Cows' game, ${name}! Guess our secret number. It has 4 unique digits.`
  );

  //   let attempts = 0;
  do {
    let input = prompt("Try a number: ");
    if (input.length !== 4 || !/^[0-9]/.test(input)) {
      console.log(`Invalid guess. Please write a number with 4 unique digits.`);
      continue;
    }

    function hasRepeatedChars(input) {
      for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (input.includes(char, i + 1)) {
          return true;
        }
      }
      return false;
    }

    if (hasRepeatedChars(input)) {
      console.log(`You can't repeat any digit. Try again.`);
      continue;
    }

    const result = checkInput(secretNumber, input);

    if (result.bulls === 4) {
      console.log(`Congratulations. You are a winner!!`);
      break;
    } else {
      console.log(
        `Here is a hint for you: ${result.bulls} bulls and ${result.cows} cows. Keep going...`
      );
    }
  } while (true);
};

start();
