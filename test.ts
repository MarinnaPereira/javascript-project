import * as chalk from "chalk";
import * as promptSync from "prompt-sync";

console.clear();

console.log(`${chalk.cyanBright.underline("BULLS AND COWS") + "\n"}`);

const prompt = promptSync();

let playerName: string = prompt(
  chalk.cyanBright.bgGreenBright.bold("Enter your name?") + " "
);

const name: string = playerName.trim() || "Stranger";

function greet(name: string): string {
  const greetings: string[] = ["Hi", "Hey", "Hello", "Yo"];
  let randomIndex: number = Math.floor(Math.random() * greetings.length);
  let randomGreetings: string = greetings[randomIndex];
  return `${randomGreetings}, ${chalk.greenBright(name)}!`;
}

const createSecretNumber = (): string => {
  const possibleDigits: string = "0123456789";
  let secretNumber: string = "";

  while (secretNumber.length < 4) {
    const randomIndex: number = Math.floor(
      Math.random() * possibleDigits.length
    );
    const randomDigit: string = possibleDigits[randomIndex];
    if (!secretNumber.includes(randomDigit)) {
      secretNumber += randomDigit;
    }
  }
  console.log(secretNumber);

  return secretNumber;
};

function countBullsAndCows(
  input: string,
  secretNumber: string
): { bulls: number; cows: number } {
  let result: { bulls: number; cows: number } = { bulls: 0, cows: 0 };
  for (let i = 0; i < 4; i++) {
    if (secretNumber[i] === input[i]) {
      result.bulls++;
    } else if (secretNumber.includes(input[i])) {
      result.cows++;
    }
  }
  return result;
}

function hasRepeatedChars(input: string): boolean {
  for (let i = 0; i < input.length; i++) {
    const char: string = input[i];
    if (input.includes(char, i + 1)) {
      return true;
    }
  }
  return false;
}

const start = (): void => {
  console.log(
    chalk.cyanBright(
      `\n${greet(
        name
      )}! Welcome to Bulls and Cows! 👋 It's like being a secret agent on a code-cracking mission. 🕵️‍♂️ \nThe computer has a ${chalk.greenBright(
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

  console.log(
    chalk.cyanBright(
      "Before we jump right into your mission, let's set up its level.\n"
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
      )} with a maximum of 10 attempts, type ${chalk.rgb(
        245,
        252,
        205
      )("2")}.\n`
    )
  );

  let gameMode: string = "";
  let chosenMode: string = "";

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

  console.log(chalk.rgb(255, 136, 0)(`\nNice! ${chosenMode} it is!\n`));

  const maxAttempts: number = gameMode === "1" ? Infinity : 10;

  let playAgain: string = "yes";
  let totalGames: number = 0;
  let totalAttempts: number = 0;

  while (playAgain.trim().toLowerCase() === "yes") {
    totalGames++;
    const secretNumber: string = createSecretNumber();
    let attempts: number = 0;

    console.log(
      chalk.cyanBright(
        "Ready for Bulls and Cows? 🎮 Great! Now, give us your best shot.\n"
      )
    );

    while (attempts < maxAttempts) {
      if (chosenMode !== "Easy mode" && attempts > 0) {
        console.log(
          chalk.yellow(`You have ${maxAttempts - attempts} attempts left.\n`)
        );
      }

      let input: string = prompt(
        chalk.cyanBright.bgGreenBright.bold("Enter your guess:") + " "
      );

      input = input.trim();

      if (input.length !== 4) {
        console.log(
          chalk.redBright(
            `\n📢 Oops! Your entry should be a 4-digit number. Try again, Agent ${name}!\n`
          )
        );
        continue;
      }

      if (!/^\d+$/.test(input)) {
        console.log(
          chalk.redBright(
            `\n📢 Be alert! Your entry should contain only numeric digits, no secret symbols or letters. Try again! \n`
          )
        );
        continue;
      }

      if (hasRepeatedChars(input)) {
        console.log(
          chalk.redBright(
            `\n📢 Remember, the code should have four unique numbers. No repeats allowed. Try again with distinct digits!\n`
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
            `\n🎉 Congratulations, Agent ${name}! 🎉\nYou cracked the secret code in ${attempts} attempts! You're a code-cracking genius. 🏆\nYou've earned your stripes as the ultimate Bulls and Cows champion! 🥳💼🕵️‍♂️\n`
          )
        );
        break;
      }
      if (bulls === 0 && cows === 0 && attempts < maxAttempts) {
        const noBullsNoCowsMessages: string[] = [
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
        console.log(
          chalk.redBright(
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

  console.log(chalk.cyanBright("\n👋 Bye! Thanks for playing Bulls and Cows!"));
};

start();
