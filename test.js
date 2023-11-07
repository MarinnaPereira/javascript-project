const prompt = require("prompt-sync")({ sigint: true });

function generateSecretNumber() {
  const digits = [...Array(10).keys()];
  const secret = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    secret.push(digits.splice(randomIndex, 1)[0]);
  }
  return secret;
}

function countBullsAndCows(secret, guess) {
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < 4; i++) {
    if (guess[i] == secret[i]) {
      bulls++;
    } else if (secret.includes(guess[i])) {
      cows++;
    }
  }

  return { bulls, cows };
}

function playGame() {
  console.clear();
  console.log("Welcome to Bulls and Cows!");

  const playerName = prompt("Enter your name (default: Player): ");
  const name = playerName || "Player";

  const gameLevel = prompt("Choose the game level (easy/hard): ");
  const maxAttempts = gameLevel === "easy" ? Infinity : 10;

  let playAnotherRound = "yes";
  let totalGames = 0;
  let totalAttempts = 0;

  while (playAnotherRound.toLowerCase() === "yes") {
    totalGames++;
    const secret = generateSecretNumber();
    let attempts = 0;

    console.log(`\nRound ${totalGames}`);
    console.log(`Hello, ${name}! Try to guess the secret 4-digit number.`);
    console.log("Remember, each digit is unique.");

    while (attempts < maxAttempts) {
      const guess = prompt("Enter your guess: ");

      if (!guess || guess.length !== 4 || [...new Set(guess)].length !== 4) {
        console.log(
          "Invalid input. Please enter a valid 4-digit guess with unique digits."
        );
        continue;
      }

      attempts++;

      const { bulls, cows } = countBullsAndCows(secret, guess);

      if (bulls === 4) {
        console.log(
          `Congratulations, ${name}! You guessed the secret number (${secret.join(
            ""
          )}) in ${attempts} attempts.`
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
        console.log(`Hint: ${bulls} bull(s) and ${cows} cow(s)`);
      }

      if (attempts === maxAttempts) {
        console.log(
          `Sorry, you've reached the maximum number of attempts (${maxAttempts}). The secret number was ${secret.join(
            ""
          )}.`
        );
      }
    }

    totalAttempts += attempts;
    console.log(`Total games played: ${totalGames}`);
    console.log(`Total attempts made: ${totalAttempts}`);

    playAnotherRound = prompt("Play another round? (yes/no): ").toLowerCase();
  }

  console.log("Thanks for playing Bulls and Cows!");
}

playGame();
