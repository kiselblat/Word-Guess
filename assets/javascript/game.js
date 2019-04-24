// hangman style guess the word game

// word list of arbitrary length
var WORDS = ["processor", "memory", "pixel", "gigabyte", "motherboard", "qwerty", "binary", "keyboard", "mouse", "disk", "download", "digital", "electronic", "network", "server", "laptop", "input", "output", "circuit", "bandwidth"];

// how many bad guesses
var GUESSES = 10

// global scoreboard
var WINS = 0;
var LOSSES = 0;

// initialize variables
var remainingTurns = GUESSES;
var guessedLetters = [];
var solution = [];
var remainingLetters = 0;
var word = "";
var guessWord = "";
var outcome = "ongoing";

// refreshes the gameboard
var updateGameboard = function() {
  document.getElementById("guess-word").textContent = guessWord;
  document.getElementById("guesses-left").textContent = remainingTurns;
  document.getElementById("guessed-letters").textContent = guessedLetters;
  document.getElementById("wins").textContent = WINS;
  document.getElementById("losses").textContent = LOSSES;
}

// starts a new game
var newGame = function() {
  document.getElementById("results-banner").textContent = "";
  outcome = "ongoing";
  guessedLetters = [];
  solution = [];
  remainingLetters = 0;
  remainingTurns = GUESSES;
  word = WORDS[Math.floor(Math.random() * WORDS.length)];
  console.log("picked ", word);
  for (var i = 0; i < word.length; i++) {
    solution[i] = "_";
    remainingLetters ++;
    }
  guessWord = solution.join(" ");
  console.log(solution);
  console.log(remainingLetters);
  console.log(remainingTurns);
  updateGameboard();
}

// uses a regex to test that str is a lowercase alphanumeric letter
var isValidLetter = function (str) {
  if (str.length === 1 && str.match(/[a-z]/i)) {
    return true;
  } else {
    return false;
  }
}

// start the first game
newGame();

// wait for and store the user's guess
document.onkeyup = function(event) {
  var guess = event.key;
  
  // if game isn't over
  if (outcome === "ongoing") {
    
    // validate the user guess
    guess = guess.toLowerCase();
    if (!(isValidLetter(guess))) {
      console.log("user didn't guess a letter");
      return;
    } else if (guessedLetters.includes(guess)) {
      console.log("already guessed");
      return;
    } else {
      console.log("user guessed: ", guess)
    }
    
    // if the guess is in the word, reveal the letters and decrement the letter count
    if (word.includes(guess)){
      for (var j = 0; j < word.length; j++) {
        if (word[j] === guess) {
          solution[j] = guess;
          guessWord = solution.join(" ");
          remainingLetters--;
        }
      }
    // otherwise store the wrong guess and take away a chance
    } else if (!(word.includes(guess))) {
    guessedLetters.push(guess);
    remainingTurns--;
    }
    
    console.log(solution);
    console.log(remainingLetters);
    console.log(remainingTurns);

    // user wins if remaining letters reaches zero
    if (remainingLetters === 0) {
      WINS++;
      updateGameboard();
      document.getElementById("results-banner").textContent = "Congratulations! You scored a victory on behalf of humanity! Press space for a new game."
      outcome = "win";
      console.log(outcome);
    // user loses when they run out of guesses
    } else if (remainingTurns === 0) {
      LOSSES++;
      updateGameboard()
      document.getElementById("results-banner").textContent = "Score one for the machines, you've lost! You were trying to guess " + word + ". Press space for a new game."
      outcome = "loss";
      console.log(outcome);
    }

  // if game is over wait for user to press space
  } else if (!(outcome === "ongoing") && (guess === " ")) {
    console.log("game over");
    newGame();
  } else if (!(outcome === "ongoing")) {
    console.log("user didn't press space");
    return;
  }

  // refresh the display after doing all other game tasks
  updateGameboard();
}

