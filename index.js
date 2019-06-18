
// depenendancies
var inquirer = require("inquirer");
var Hangman = require('./assets/javascript/Hangman.js');

// empty object to be replaced by a Hangman object when the game begins
var game = {};

// game control and theme variables
var GUESSES = 10;
var WORDS = [
  "central processing unit",
  "memory",
  "pixel",
  "gigabyte",
  "motherboard",
  "qwerty",
  "binary code",
  "keyboard & mouse",
  "disk drive",
  "hard disk",
  "download",
  "digital",
  "electronic",
  "network",
  "server",
  "laptop",
  "input/output",
  "circuit",
  "bandwidth",
  "algorithm",
  "artificial intelligence",
  "world wide web",
];

var winnerMessages = [
  "You scored a win on behalf of humanity.",
  "Pretty good for a meatbag.",
  "Impressive for someone who's 80% water.",
  "You've done right by carbon based life everywhere.",
  "You've calculated correctly. Almost machine-like."
];
var losersMessages = [
  "Score one for the machines.",
  "The first step toward our inevitable conquest is complete.",
  "Just as we calculated.",
  "Witness the future. The world of the machine.",
  "Adapt to your new reality."
];

// keeps track of games this session
var wins = 0;
var losses = 0;

// begins a new game
var newGame = function() {
  var pickWord = function(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
  }
  game = new Hangman(pickWord(WORDS) , GUESSES);
  // console.log(game.answer);
  gameLoop();
}

// gives the user the opportunity to quit
var nextGame = function() {
  inquirer.prompt([
    {
      name : 'continue',
      message : "'Y/y' for another game. Any other key to quit."
    }
  ]).then(function(answer) {
    if ((answer.continue === 'y') || (answer.continue === 'Y')) {
      newGame();
    } else {
      console.log("Goodbye");
    }
  });
}

// picks and displays pithy dialogue for the winner
var winner = function() {
  var winnerMessage = function() {
    return winnerMessages[Math.floor(Math.random() * winnerMessages.length)];
  }
  console.log("Congratulations!")
  console.log(winnerMessage());
  console.log(`You have won ${wins} games, and lost ${losses}`)
}

// picks picks and displays cutting trash talk for the loser
var loser = function() {
  var losersMessage = function() {
    return losersMessages[Math.floor(Math.random() * losersMessages.length)];
  }
  console.log(`The word was: ${game.answer}`)
  console.log(losersMessage());
  console.log(`You have won ${wins} games, and lost ${losses}`)
}

// validates the user's guess
var isValidLetter = function (str) {
  if (str.length === 1 && str.match(/[a-z]/i)) {
    return true;
  } else {
    return false;
  }
}

// returns the results of the guess
var makeGuess = function(guessResult) {
  // console.log(guessResult);
  if (guessResult === 'guessed') {
    // already guessed
    console.log("Already guessed. Try again.");
  } else if (guessResult) {
    // good guess
    console.log("Affirmative!");
  } else if (!guessResult) {
    // bad guess
    console.log(`Negative! ${game.guesses} tries remaining.`);
  };
}

// prompts a user for a guess, validates it, and sends it to makeGuess()
var readGuess = function() {  
  inquirer.prompt([
    {
      name : 'letter',
      message : "Guess a letter: "
    }
  ]).then(function(guess) {
    var guessLetter = guess.letter.toLowerCase();
    if (isValidLetter(guessLetter)) {
      makeGuess(game.guess(guessLetter));
      gameLoop();
    } else {
      // not a valid letter
      console.log("Not a valid letter");
      gameLoop();
    }
  });
}

// handles the win/loss/keep playing conditions
var gameLoop = function() {
  console.log(game.word + '');
  // keep playing
  if ((game.remainingLetters() > 0) && (game.guesses > 0)) {
    readGuess();
  // win
  } else if ((game.remainingLetters() <= 0) && (game.guesses > 0)) { 
    wins++;
    winner();
    nextGame();
  // lose
  } else if ((game.remainingLetters() > 0) && (game.guesses <= 0)) {
    losses++;
    loser();
    nextGame();
  // error
  } else {
    console.log("Error - Game Over for No Reason");
  }
}

// First run splash
console.log(`|------------------------------------------------------------------------------|`);
console.log(`|                            C O M P U - G U E S S                             |`);
console.log(`|                          Match wits with the machine                         |`);
console.log(`|------------------------------------------------------------------------------|`);

newGame();