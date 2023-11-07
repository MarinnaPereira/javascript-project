console.clear();

// Bulls and Cows

// Get library for user input
// const prompt = require("prompt-sync")({ sigint: true });
import promptSync from "prompt-sync";
const prompt = promptSync();

// Get library for customize terminal colors
import chalk from "chalk";

// Get player's name
let playerName = prompt(
  chalk.magenta.bgGreenBright.bold("Enter your name?") + " "
);
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
  console.log(secretNumber);

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
    chalk.cyanBright(
      `\n${greet(
        name
      )}! Welcome to Bulls and Cows! 🎉 It's like being a secret agent on a code-cracking mission. The computer has a 4-digit secret number with unique digits. Your goal? Figure it out! You get 🐂 "Bulls" for the right digits in the right spots and 🐄 "Cows" for the right digits in the wrong spots.\n`
    )
  );

  console.log(
    chalk.cyanBright(
      "Before we jump right into your mission, lets's set up its level.\n"
    )
  );

  console.log(
    chalk.cyanBright(
      "In the (1) easy mode you'll have no limit of attempts, but in in the (2) hard mode you'll have a maximum of 8 attempts. So... \n"
    )
  );

  const gameMode = prompt(
    chalk.magenta.bgGreenBright.bold("Enter your choice (1/2):") + " "
  );
  const chosenMode = gameMode.toLowerCase() === "1" ? "Easy mode" : "Hard mode";

  console.log(chalk.rgb(255, 136, 0)(`\nNice! ${chosenMode} it is!\n`));

  const maxAttempts = gameMode.toLowerCase() === "1" ? Infinity : 8;

  let playAgain = "yes";
  let totalGames = 0;
  let totalAttempts = 0;

  while (playAgain.toLowerCase() === "yes") {
    totalGames++;
    const secretNumber = createSecretNumber();
    let attempts = 0;

    console.log(
      chalk.cyanBright(
        `Ready for Bulls and Cows? 🎮 Great! Now, give us your best shot.\n`
      )
    );

    while (attempts < maxAttempts) {
      if (chosenMode !== "Easy mode" && attempts > 0) {
        console.log(
          chalk.yellow(`You have ${maxAttempts - attempts} attempts left.\n`)
        );
      }
      let input = prompt(
        chalk.magenta.bgGreenBright.bold("Enter a 4-digit number:") + " "
      );

      // wrong length
      if (input.length !== 4) {
        console.log(
          chalk.red(
            `\n📢 Oops! Your entry should be a 4-digit number. Try again, Agent ${name}! 🕵️‍♂️💡\n`
          )
        );
        continue;
      }

      // no numeric character
      if (!/^\d+$/.test(input)) {
        console.log(
          chalk.red(
            `\n📢 Watch out! Your entry should contain only numeric digits, no secret symbols or letters. Try again! 🕵️‍♂️🔢\n`
          )
        );
        continue;
      }

      // repeated character
      if (hasRepeatedChars(input)) {
        console.log(
          chalk.red(
            `\n📢 Whoops! Remember, the code should have four unique numbers. No repeats allowed. Try again with distinct digits! 🕵️‍♂️🔢\n`
          )
        );
        continue;
      }

      attempts++;

      const { bulls, cows } = countBullsAndCows(secretNumber, input);

      if (bulls === 4) {
        console.log(
          chalk.green.bold(
            `\nCongratulations, Agent ${name}! You cracked the secret code in ${attempts} attempts! You're a code-cracking genius 🏆🎉. You've earned your stripes as the ultimate Bulls and Cows champion! 🥳💼🕵️‍♂️\n`
          )
        );
        break;
      }
      if (bulls === 0 && cows === 0) {
        const noBullsNoCowsMessages = [
          "Keep trying, you'll get it!\n",
          "Don't give up, you're close!\n",
          "You can do it, just a little more.\n",
        ];
        console.log(
          chalk.greenBright(
            noBullsNoCowsMessages[
              Math.floor(Math.random() * noBullsNoCowsMessages.length)
            ]
          )
        );
      } else {
        console.log(
          chalk.greenBright(
            `Here is a hint: you got ${chalk.white(
              bulls
            )} bulls and ${chalk.white(cows)} cows. Keep going...`
          )
        );
      }
      if (attempts === maxAttempts) {
        console.log(
          chalk.red.bold(
            `You've reached the maximum number of attempts.💥 The secret code was ${secretNumber}. Better luck next time!\n`
          )
        );
      }
    }
    totalAttempts += attempts;
    console.log(chalk.magentaBright(`Total games played: ${totalGames}`));
    console.log(chalk.magentaBright(`Total attempts made: ${totalAttempts}`));

    playAgain = prompt(
      chalk.magenta.bgGreenBright.bold("Play again? (yes/no):") + " "
    ).toLowerCase();
  }

  console.log(chalk.cyanBright("Thanks for playing Bulls and Cows!"));
};

start();
