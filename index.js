// depenendancies
var inquirer = require("inquirer");
var Hangman = require('./assets/javascript/Hangman.js');

// empty object to be replaced by a Hangman object when the game begins
var game = {};

// keeps track of games this session
var wins = 0;
var losses = 0;

// game control and theme
var gameObject = require('./assets/javascript/compuguess.js');

// tells you the title and tagline of the game before the first game
var firstRun = function() {
  console.log(gameObject.title);
  console.log(gameObject.tagline);
  console.log(gameObject.instructions.join('\n'))
  newGame();
}

// begins a new game
var newGame = function() {
  game = new Hangman(gameObject.pickWord() , gameObject.guesses);
  // console.log(game.answer);
  gameLoop();
}

// gives the user the opportunity to quit
var nextGame = function() {
  inquirer.prompt([
    {
      type : 'confirm',
      name : 'continue',
      message : "Another game?",
    }
  ]).then(function(answer) {
    if (answer.continue) {
      newGame();
    }
  });
}

// gets pithy dialogue 
var endGame = function(result) {
  console.log(game.revealAnswer());
  if (result === 'win') {
    console.log(gameObject.winnerMessage());
  } else if (result === 'loss') {
    console.log(gameObject.losersMessage());
  }
  console.log(`${wins} wins, ${losses} losses`);
}

// validates the user's guess
var isValidLetter = function (str) {
  if (str.length === 1 && str.match(/[a-z]/i)) {
    return true;
  } else {
    return false;
  }
}

// directs the results of the guess
var makeGuess = function(guessResult) {
  // already guessed
  if (guessResult === 'guessed') {
    console.log(gameObject.tryAgain());
  // good guess
  } else if (guessResult === true) {
    console.log(gameObject.goodGuess());
  // bad guess
  } else if (guessResult === false) {
    console.log(gameObject.badGuess());
    console.log(`${game.guesses} tries left`);
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
    // is a valid letter
    if (isValidLetter(guessLetter)) {
      // game.guess returns the results of each guess
      makeGuess(game.guess(guessLetter));
      gameLoop();
    // not a valid letter
    } else {
      console.log("Invalid entry");
      gameLoop();
    }
  });
}

// handles the win/loss/keep playing conditions
var gameLoop = function() {
  // keep playing
  if (!game.isSolved() && !game.noGuesses()) {
    console.log(game + '');
    readGuess();
  // win
  } else if (game.isSolved() && !game.noGuesses()) { 
    wins++;
    endGame('win');
    nextGame();
  // lose
  } else if (!game.isSolved() && game.noGuesses()) {
    losses++;
    endGame('loss');
    nextGame();
  // error
  } else {
    console.log("Error - Game Over for No Reason");
  }
}

// runs the first game
firstRun();