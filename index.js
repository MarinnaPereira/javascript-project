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
  chalk.cyanBright.bgGreenBright.bold("Enter your name?") + " "
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
      )}! Welcome to Bulls and Cows! 🎉 It's like being a secret agent on a code-cracking mission. The computer has a ${chalk.greenBright(
        "4-digit secret number"
      )} with unique digits. Your goal? Figure it out! You get 🐂 ${chalk.greenBright(
        "Bulls"
      )} for the right digits in the right spots and 🐄  ${chalk.greenBright(
        "Cows"
      )} for the right digits in the wrong spots.\n`
    )
  );

  console.log(
    chalk.cyanBright(
      "Before we jump right into your mission, lets's set up its level.\n"
    )
  );

  console.log(
    chalk.cyanBright(
      `For the ${chalk.greenBright(
        "easy mode"
      )} with no limit of attempts, type ${chalk.rgb(
        245,
        252,
        205
      )("1")}. \nFor the ${chalk.greenBright(
        "hard mode"
      )} hard mode with a maximum of 8 attempts, type ${chalk.rgb(
        245,
        252,
        205
      )("2")}.\n`
    )
  );

  const gameMode = prompt(
    chalk.cyanBright.bgGreenBright.bold("Enter your choice (1/2):") + " "
  );
  const chosenMode = gameMode.toLowerCase() === "1" ? "Easy mode" : "Hard mode";

  console.log(chalk.rgb(255, 136, 0)(`\nNice! ${chosenMode} it is!\n`));

  const maxAttempts = gameMode.toLowerCase() === "1" ? Infinity : 8;

  let playAgain = "yes";
  let totalGames = 0;
  let totalAttempts = 0;

  while (playAgain.trim().toLowerCase() === "yes") {
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
        chalk.cyanBright.bgGreenBright.bold("Enter a 4-digit number:") + " "
      );

      // wrong length
      if (input.length !== 4) {
        console.log(
          chalk.red(
            `\n📢 Oops! Your entry should be a 4-digit number. Try again, Agent ${name}!\n`
          )
        );
        continue;
      }

      // no numeric character
      if (!/^\d+$/.test(input)) {
        console.log(
          chalk.red(
            `\n📢 Watch out! Your entry should contain only numeric digits, no secret symbols or letters. Try again! \n`
          )
        );
        continue;
      }

      // repeated character
      if (hasRepeatedChars(input)) {
        console.log(
          chalk.red(
            `\n📢 Whoops! Remember, the code should have four unique numbers. No repeats allowed. Try again with distinct digits!\n`
          )
        );
        continue;
      }

      attempts++;

      const { bulls, cows } = countBullsAndCows(secretNumber, input);

      if (bulls === 4) {
        console.log(
          chalk.rgb(
            245,
            252,
            205
          )(
            `\n🎉 Congratulations, Agent ${name}! 🎉\nYou cracked the secret code in ${attempts} attempts! You're a code-cracking genius 🏆. You've earned your stripes as the ultimate Bulls and Cows champion! 🥳💼🕵️‍♂️\n`
          )
        );
        break;
      }
      if (bulls === 0 && cows === 0) {
        const noBullsNoCowsMessages = [
          "\nKeep trying, you'll get it!",
          "\nDon't give up, you're close!",
          "\nYou can do it, just a little more.",
        ];
        console.log(
          chalk.white(
            noBullsNoCowsMessages[
              Math.floor(Math.random() * noBullsNoCowsMessages.length)
            ]
          )
        );
      } else if (attempts < 8) {
        console.log(
          chalk.greenBright(
            `\nHere is a hint:  ${chalk.white(
              "you got " +
                chalk.greenBright(bulls) +
                " bulls and " +
                chalk.greenBright(cows) +
                " cows. Keep going... "
            )} `
          )
        );
      }
      if (attempts === maxAttempts) {
        console.log(
          chalk.red(
            `\n💥 You've reached the maximum number of attempts. 💥\nThe secret code was ${chalk.rgb(
              245,
              252,
              205
            )(secretNumber)}. Better luck next time!\n`
          )
        );
      }
    }
    totalAttempts += attempts;
    console.log(
      chalk.greenBright(
        `Total games played: ${chalk.rgb(245, 252, 205)(totalGames)}`
      )
    );
    console.log(
      chalk.greenBright(
        `Total attempts made: ${chalk.rgb(245, 252, 205)(totalAttempts)}\n`
      )
    );

    playAgain = prompt(
      chalk.cyanBright.bgGreenBright.bold("Play again? (yes/no):") + " "
    );
  }

  console.log(chalk.cyanBright("\nThanks for playing Bulls and Cows!"));
};

start();
