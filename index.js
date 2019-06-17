var inquirer = require("inquirer");
var Hangman = require('./assets/javascript/Hangman.js');

// empty object to be replaced by a Hangman object when the game begins
var game = {};

var WORD = 'sam i am';
var GUESSES = 10;

var newGame = function() {
  game = new Hangman(WORD , GUESSES);
  gameLoop();
}

var makeGuess = function(guessResult) {
  // console.log(guessResult);
  if (guessResult === 'guessed') {
    // already guessed
    console.log("Try again");
  } else if (guessResult) {
    // good guess
    console.log("Good guess");
  } else if (!guessResult) {
    // bad guess
    console.log(`Bad guess. ${game.guesses} tries remaining.`);
  };
}


var gameLoop = function() {
  console.log(game.word + '');
  if ((game.remainingLetters() > 0) && (game.guesses > 0)) {
    // keep playing
    inquirer.prompt([
      {
        name : 'letter',
        message : "Guess a letter: "
      }
    ]).then(function(guess) {
      makeGuess(game.guess(guess.letter));
      gameLoop();
    });
  } else if ((game.remainingLetters() <= 0) && (game.guesses > 0)) { 
    // win
    console.log("You Win");
  } else if ((game.remainingLetters() > 0) && (game.guesses <= 0)) {
    // lose
    console.log("You Lose");
  } else {
    //game over
    console.log("Error - Game Over for No Reason");
  }
}

newGame();