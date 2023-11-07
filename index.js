console.clear();

// Bulls and Cows
// Get library for user input
const prompt = require("prompt-sync")({ sigint: true });

// Get player's name
let playerName = prompt("Enter your name? ");
const name = playerName || "Stranger";

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

function greet(name) {
  const greetings = ["Hi", "Hey", "Hello", "Yo"];
  let randomIndex = Math.floor(Math.random() * greetings.length);
  let randomGreetings = greetings[randomIndex];
  return `${randomGreetings}, ${name}!`;
}

// Function which counts bulls and cows in the player's input
function countBullsAndCows(input, secretNumber) {
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

// Function which checks for repeated characters
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
  console.log(
    `${greet(
      name
    )}! Welcome to Bulls and Cows! 🎉 It's like being a secret agent on a code-cracking mission. The computer has a 4-digit secret number with unique digits. Your goal? Figure it out! You get 🐂 "Bulls" for the right digits in the right spots and 🐄 "Cows" for the right digits in the wrong spots.\n`
  );

  console.log(
    "Before we jump right into your mission, lets's set up its level.\nIn the (1) easy mode you'll have no limit of attempts, but in in the (2) hard mode you'll have a maximum of 8 attempts. So... "
  );

  const gameMode = prompt("Enter your choice (1/2): ");
  const chosenMode = gameMode.toLowerCase() === "1" ? "Easy mode" : "Hard mode";

  console.log(`Nice! ${chosenMode} it is!`);

  const maxAttempts = gameMode.toLowerCase() === "1" ? Infinity : 8;

  let playAgain = "yes";
  let totalGames = 0;
  let totalAttempts = 0;

  while (playAgain.toLowerCase() === "yes") {
    totalGames++;
    const secretNumber = createSecretNumber();
    let attempts = 0;

    console.log(
      `Ready for Bulls and Cows? 🎮 Great! Now, give us your best shot.`
    );

    while (attempts < maxAttempts) {
      if (chosenMode !== "Easy mode" && attempts > 0) {
        console.log(`You have more attempts left: ${maxAttempts - attempts}`);
      }
      let input = prompt("Enter a 4-digit number: ");

      // wrong length
      if (input.length !== 4) {
        console.log(
          `Oops! Your entry should be a 4-digit number. Try again, Agent ${name}! 🕵️‍♂️💡`
        );
        continue;
      }

      // no numeric character
      if (!/^[0-9]/.test(input)) {
        console.log(
          `Watch out, Agent ${name}! Your entry should contain only numeric digits, no secret symbols or letters. Try again! 🕵️‍♂️🔢\n`
        );
        continue;
      }

      // repeated character
      if (hasRepeatedChars(input)) {
        console.log(
          `Whoops! Remember, the code should have four unique numbers, Agent ${name}. No repeats allowed. Try again with distinct digits! 🕵️‍♂️🔢\n`
        );
        continue;
      }

      attempts++;

      const { bulls, cows } = countBullsAndCows(secretNumber, input);

      if (bulls === 4) {
        console.log(
          `Congratulations, Agent ${name}! You cracked the secret code in ${attempts} attempts! You're a code-cracking genius 🏆🎉. You've earned your stripes as the ultimate Bulls and Cows champion! 🥳💼🕵️‍♂️`
        );
        break;
      }
      if (bulls === 0 && cows === 0) {
        const noBullsNoCowsMessages = [
          "Keep trying, you'll get it!",
          "Don't give up, you're close!",
          "You can do it, just a little more.",
        ];
        console.log(
          noBullsNoCowsMessages[
            Math.floor(Math.random() * noBullsNoCowsMessages.length)
          ]
        );
      } else {
        console.log(
          `Here is a hint: you got ${bulls} bulls and ${cows} cows. Keep going...`
        );
      }
      if (attempts === maxAttempts) {
        console.log(
          `You've reached the maximum number of attempts.💥 The secret code was ${secretNumber}. Better luck next time!`
        );
      }
    }
    totalAttempts += attempts;
    console.log(`Total games played: ${totalGames}`);
    console.log(`Total attempts made: ${totalAttempts}`);

    playAgain = prompt("Play again? (yes/no): ").toLowerCase();
  }

  console.log("Thanks for playing Bulls and Cows!");
};

start();
