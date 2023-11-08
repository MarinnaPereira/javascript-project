console.clear();

// Bulls and Cows

// Get library for user input
import promptSync from "prompt-sync";
const prompt = promptSync();

// Get library for customize terminal colors
import chalk from "chalk";

// Get library for centering text in the terminal
import centerText from "center-text";

console.log(`${chalk.cyanBright.underline("BULLS AND COWS") + "\n"}`);

// Get player's name
let playerName = prompt(
  chalk.cyanBright.bgGreenBright.bold("Enter your name?") + " "
);

const name = playerName.trim() || "Stranger";

// Function which greets the user using random greetings
function greet(name) {
  const greetings = ["Hi", "Hey", "Hello", "Yo"];
  let randomIndex = Math.floor(Math.random() * greetings.length);
  let randomGreetings = greetings[randomIndex];
  return `${randomGreetings}, ${chalk.greenBright(name)}!`;
}

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

// Function which checks if the input is a repeated guess
const isRepeatedGuess = (gameGuesses, input) => gameGuesses.includes(input);

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

// Function which checks the input for repeated characters
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
  // welcome message
  console.log(
    chalk.cyanBright(
      `\n${greet(
        name
      )} Welcome to Bulls and Cows! 👋 It's like being a secret agent on a code-cracking mission. 🕵️‍♂️ \nThe computer has a ${chalk.greenBright(
        "secret number"
      )} with ${chalk.greenBright(
        "4 unique digits"
      )}. Your goal is to figure it out! \nYou get 🐂 ${chalk.greenBright(
        "Bulls"
      )} for the right digits in the right spots and 🐄 ${chalk.greenBright(
        "Cows"
      )} for the right digits in the wrong spots.\n`
    )
  );

  // messages for setting up game level/mode
  console.log(
    chalk.cyanBright(
      "Before we jump right into your mission, lets's set up its level."
    )
  );

  let playAgain = "yes";
  let totalGames = 0;
  let totalVictories = 0;

  // play the game
  while (playAgain.trim().toLowerCase() === "yes") {
    console.log(
      chalk.cyanBright(
        `\nFor the ${chalk.greenBright(
          "easy mode"
        )} with no limit of attempts, type ${chalk.rgb(
          245,
          252,
          205
        )("1")}. \nFor the ${chalk.greenBright(
          "hard mode"
        )} with a maximum of 10 attempts, type ${chalk.rgb(
          245,
          252,
          205
        )("2")}.\n`
      )
    );

    let gameMode = "";
    let chosenMode = "";

    // get the game mode from the user
    while (chosenMode === "") {
      gameMode = prompt(
        chalk.cyanBright.bgGreenBright.bold("Choose game mode (1/2):") + " "
      );

      if (gameMode.trim() === "1") {
        chosenMode = "Easy mode";
        break;
      } else if (gameMode.trim() === "2") {
        chosenMode = "Hard mode";
        break;
      } else {
        console.log(
          chalk.redBright(`\n📢 Entry is invalid. It has to be "1" or "2".\n`)
        );
      }
    }

    console.log(chalk.rgb(255, 136, 0)(`\nNice! ${chosenMode} it is!`));

    // define maximum of attempts
    const maxAttempts = gameMode === "1" ? Infinity : 10;

    totalGames++;
    const secretNumber = createSecretNumber();
    let attempts = 0;
    const gameGuesses = [];

    console.log(
      chalk.cyanBright(
        chalk.greenBright("\n▶️ Ready for Bulls and Cows? ") +
          "🎮 Great! Now, give us your best shot.\n"
      )
    );

    // catches the user's guess
    while (attempts < maxAttempts) {
      if (chosenMode !== "Easy mode" && attempts > 0) {
        console.log(
          chalk.yellow(`You have ${maxAttempts - attempts} attempts left.\n`)
        );
      } else if (chosenMode === "Easy mode" && attempts > 0) {
        console.log(chalk.yellow(`This is your attempt No. ${attempts}.\n`));
      }

      let input = prompt(
        chalk.cyanBright.bgGreenBright.bold("Enter your guess:") + " "
      );

      input = input.trim();

      // test input length
      if (input.length !== 4) {
        console.log(
          chalk.redBright(
            `\n📢 Oops! Your entry should be a 4-digit number. Try again, Agent ${name}!\n`
          )
        );
        continue;
      }

      // test input for no numeric character
      if (!/^\d+$/.test(input)) {
        console.log(
          chalk.redBright(
            `\n📢 Be alert! Your entry should contain only numeric digits, no secret symbols or letters. Try again! \n`
          )
        );
        continue;
      }

      // repeated character
      if (hasRepeatedChars(input)) {
        console.log(
          chalk.redBright(
            `\n📢 Remember, the code should have four unique numbers. No repeats allowed. Try again with distinct digits!\n`
          )
        );
        continue;
      }

      if (isRepeatedGuess(gameGuesses, input)) {
        console.log(
          chalk.redBright(
            `\n📢 You already tried this number. Try a different one. \n`
          )
        );
        continue;
      } else {
        gameGuesses.push(input);
      }

      attempts++;

      const { bulls, cows } = countBullsAndCows(secretNumber, input);

      if (bulls === 4) {
        const congratulationsMessage = centerText(
          `🎉 Congratulations, Agent ${name}! 🎉`
        );
        const messagePart2 = centerText(
          `You cracked the secret code in ${attempts} attempts!`
        );
        const messagePart3 = centerText(`You're a code-cracking genius.`);
        const messagePart4 = centerText(
          `You've earned your stripes as the ultimate Bulls and Cows champion!`
        );
        const messagePart5 = centerText(`🎯🏆`);
        const styledMessage = chalk.rgb(
          245,
          252,
          205
        )(
          `\n${congratulationsMessage}\n\n${messagePart2}\n${messagePart3}\n${messagePart4}\n\n${messagePart5}\n`
        );

        console.log(styledMessage);
        totalVictories++;
        break;
      }
      if (bulls === 0 && cows === 0 && attempts < maxAttempts) {
        const noBullsNoCowsMessages = [
          "keep trying, you'll get it!",
          "don't give up, you can make it!",
          "you can do it, try just a little more!",
        ];
        console.log(
          chalk.white(
            `\n${
              chalk.greenBright("So far: ") +
              "you got " +
              chalk.greenBright(bulls) +
              " bulls and " +
              chalk.greenBright(cows) +
              " cows. But "
            } ${
              noBullsNoCowsMessages[
                Math.floor(Math.random() * noBullsNoCowsMessages.length)
              ]
            }`
          )
        );
      } else if (attempts < 10) {
        console.log(
          chalk.greenBright(
            `\nHere is a hint: ${chalk.white(
              "you got " +
                chalk.greenBright(bulls) +
                " bulls and " +
                chalk.greenBright(cows) +
                " cows. Keep going... "
            )}`
          )
        );
      }
      if (attempts === maxAttempts) {
        const losingMessagePart1 = centerText(
          `💥 You've reached the maximum number of attempts. 💥`
        );
        const losingMessagePart2 = centerText(
          `                 The secret code was ${chalk.rgb(
            245,
            252,
            205
          )(secretNumber)}.`
        );
        const losingMessagePart3 = centerText(`Better luck next time!`);
        const losingMessagePart4 = centerText(`🍀`);

        console.log(
          chalk.redBright(
            `\n${losingMessagePart1}\n\n${losingMessagePart2}\n${losingMessagePart3}\n\n${losingMessagePart4}\n`
          )
        );
      }
    }

    console.log(
      chalk.greenBright(
        `Total games played: ${chalk.rgb(245, 252, 205)(totalGames)}`
      )
    );
    const victoryRate = Math.floor((totalVictories / totalGames) * 100);
    console.log(
      chalk.greenBright(
        `Victory rate: ${chalk.rgb(245, 252, 205)(victoryRate + "%\n")}`
      )
    );

    playAgain = "";

    while (playAgain === "") {
      playAgain = prompt(
        chalk.cyanBright.bgGreenBright.bold("Play again? (yes/no):") + " "
      );

      if (playAgain.toLowerCase().trim() === "yes") {
        playAgain = "yes";
      } else if (playAgain.toLowerCase().trim() === "no") {
        playAgain = "no";
        break;
      } else {
        console.log(
          chalk.redBright(
            `\n📢 Entry is invalid. It has to be "yes" or "no".\n`
          )
        );
      }
    }
  }

  console.log(
    chalk.cyanBright("\n👋 Bye! Thanks for playing Bulls and Cows! \n")
  );
};

start();
