// hangman style guess the word game

// word list of arbitrary length
var WORDS = ["processor", "memory", "pixel", "gigabyte", "motherboard", "qwerty", "binary", "keyboard", "mouse", "disk", "download", "digital", "electronic", "network", "server", "laptop", "input", "output", "circuit", "bandwidth"];

// how many bad guesses
var GUESSES = 10

// global scoreboard
var WINS = 0;
var LOSSES = 0;

var winMessages = ["You scored a win on behalf of humanity.","Pretty good for a meatbag.","Impressive for someone who's 80% water.","You've done right by carbon based life everywhere.","You've calculated correctly. Almost machine-like."];

var loseMessages = ["Score one for the machines.","The first step toward our inevitable conquest is complete.","Just as we calculated.","Witness the future. The world of the machine.","Adapt to your new reality."];

// initialize variables
var remainingTurns = GUESSES;
var guessedLetters = [];
var solution = [];
var remainingLetters = 0;
var word = "";
var guessWord = "";
var outcome = "ongoing";

// picks pithy endgame dialogue
var endgameMessage = function(condition) {
  if(condition === "win") {
    message = winMessages[Math.floor(Math.random() * winMessages.length)];
    return message;
  } else if (condition === "loss") {
    message = loseMessages[Math.floor(Math.random() * loseMessages.length)];
    return message;
  } else {
    return "error - endgameMessage() passed bad condition";
  }
}

// refreshes the gameboard
var updateGameboard = function() {
  document.getElementById("guess-word").textContent = guessWord;
  document.getElementById("guesses-left").textContent = remainingTurns;
  document.getElementById("guessed-letters").textContent = guessedLetters;
  document.getElementById("wins").textContent = WINS;
  document.getElementById("losses").textContent = LOSSES;
}

// sends game info to the console
var logGame = function() {
  console.log(solution);
  console.log("remaining letters: ", remainingLetters);
  console.log("remaining turns: ", remainingTurns);
}

// starts a new game
var newGame = function() {
  console.log("new game")
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
  logGame();
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
      console.log("letter already guessed");
      return;
    } else {
      console.log("user guessed: ", guess)
    }
    
    // if the guess is in the word, reveal the letters and decrement the letter count
    if (word.includes(guess) && !guessWord.includes(guess)) {
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
    logGame();

    // user wins if remaining letters reaches zero
    if (remainingLetters === 0) {
      WINS++;
      updateGameboard();
      outcome = "win";
      document.getElementById("results-banner").textContent = "Congratulations. " + endgameMessage(outcome) + " Press space to begin another game.";
      console.log(outcome);
    // user loses when they run out of guesses
    } else if (remainingTurns === 0) {
      LOSSES++;
      updateGameboard()
      outcome = "loss";
      document.getElementById("results-banner").textContent = "The machine has won. You were trying to guess " + word + ". " + endgameMessage(outcome) + " Press space to begin another game.";
      console.log(outcome);
    }

  // if game is over wait for user to press space
  } else if (!(outcome === "ongoing") && (guess === " ")) {
    console.log("game over");
    newGame();
  // ignore anything but spacebar
  } else if (!(outcome === "ongoing")) {
    console.log("user didn't press space");
    return;
  }

  // refresh the display after doing all other game tasks
  updateGameboard();
}

