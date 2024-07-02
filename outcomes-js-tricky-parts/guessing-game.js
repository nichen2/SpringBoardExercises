function guessingGame() {
    let guessCount = 1;
    let answer = Math.floor(Math.random() * 100)
    let gameOver = false;
    return function guess(number) {
        if (gameOver) {
            return("The game is over, you already won!");
        } else if (number > answer) {
            guessCount++;
            return(`${number} is too high!`);
        } else if (number < answer) {
            guessCount++;
            return(`${number} is too low!`);
        } else {
            gameOver = true;
            return(`You win! You found ${answer} in ${guessCount} guesses.`)
        }
    }
}

module.exports = { guessingGame };
