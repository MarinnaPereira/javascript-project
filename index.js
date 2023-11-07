console.clear();

// Bulls and Cows
// Get library for user input
const prompt = require("prompt-sync")({ sigint: true });

// Test that prompt is working
let name = prompt("What is your name? ");
name = !name ? "Stranger" : name[0].toUpperCase() + name.slice(1).toLowerCase();

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
  //   console.log(secretNumber);

  return secretNumber;
};

// Function which checks the player's input regarding the secret number
function checkInput(input, secretNumber) {
  let result = { bulls: 0, cows: 0 };

  for (let i = 0; i < 4; i++) {
    if (secretNumber[i] === input[i]) {
      result.bulls++;
    } else if (secretNumber.includes(input[i])) {
      result.cows++;
    }
  }
  return result;
}

//Function which checks for repeated characters
function hasRepeatedChars(input) {
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (input.includes(char, i + 1)) {
      return true;
    }
  }
  return false;
}

// Start function
const start = () => {
  const secretNumber = createSecretNumber();

  console.log(
    `Hello ${name}! Welcome to Bulls and Cows! 🎉 It's like being a secret agent on a code-cracking mission. The computer has a 4-digit secret number with unique digits. Your goal? Figure it out! You get 🐂 "Bulls" for the right digits in the right spots and 🐄 "Cows" for the right digits in the wrong spots.\n`
  );

  const gameMode = prompt(
    "Before we jump right into your mission, lets's set up its level... Would you like to go for the easy mode (no limit of attempts) or for the hard mode (maximum of 8 attempts)? Type '1' for easy or '2' for hard. "
  );
  gameMode = gameMode === "1" ? "Easy mode" : "Hard mode";

  console.log(`Nice! ${gameMode} it is!`);

  let attempts = 0;

  do {
    let input = "";
    input =
      attempts === 0
        ? prompt(
            "Ready for Bulls and Cows? 🎮 Great! Now, give us your best shot. Enter a 4-digit number: "
          )
        : prompt("Enter a 4-digit number: ");

    // wrong length
    if (input.length !== 4) {
      console.log(
        `Oops! Your entry should be a 4-digit number. Try again, Agent ${name}! 🕵️‍♂️💡`
      );
      attempts++;
      continue;
    }

    // no numeric character
    if (!/^[0-9]/.test(input)) {
      console.log(
        `Watch out, Agent ${name}! Your entry should contain only numeric digits, no secret symbols or letters. Try again! 🕵️‍♂️🔢\n`
      );
      attempts++;
      continue;
    }

    // repeated character
    if (hasRepeatedChars(input)) {
      console.log(
        `Whoops! Remember, the code should have four unique numbers, Agent ${name}. No repeats allowed. Try again with distinct digits! 🕵️‍♂️🔢\n`
      );
      attempts++;
      continue;
    }

    const result = checkInput(secretNumber, input);

    if (result.bulls === 4) {
      console.log(
        `Congratulations, Agent ${name}! You cracked the secret code! You're a code-cracking genius 🏆🎉. You've earned your stripes as the ultimate Bulls and Cows champion! 🥳💼🕵️‍♂️`
      );
      break;
    } else {
      console.log(
        `Here is a hint: you have ${result.bulls} bulls and ${result.cows} cows. Keep going...`
      );
    }
  } while (true);
};

start();
