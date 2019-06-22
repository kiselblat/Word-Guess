// depenendancies
var inquirer = require("inquirer");
var Hangman = require('./assets/javascript/Hangman.js');

// empty object to be replaced by a Hangman object when the game begins
var game = {};

// keeps track of games this session
var wins = 0;
var losses = 0;

// game control and theme variables
var gameObj = require('./assets/javascript/compuguess.js');

// tells you the title and tagline of the game before the first game
var firstRun = function() {
  console.log(gameObj.title);
  console.log(gameObj.tagline);
  newGame();
}

// begins a new game
var newGame = function() {
  game = new Hangman(gameObj.pickWord() , gameObj.guesses);
  // console.log(game.answer);
  gameLoop();
}

// gives the user the opportunity to quit
var nextGame = function() {
  inquirer.prompt([
    {
      name : 'continue',
      message : "'y' for another game. All others quit."
    }
  ]).then(function(answer) {
    if ((answer.continue === 'y') || (answer.continue === 'Y')) {
      newGame();
    } else {
      console.log("Goodbye");
    }
  });
}

// gets pithy dialogue for the winner
var winner = function() {
  console.log("Congratulations!")
  console.log(gameObj.winnerMessage());
  console.log(`${wins} wins, ${losses} losses`);
}

// gets cutting trash talk for the loser
var loser = function() {
  console.log(game.revealAnswer());
  console.log(gameObj.losersMessage());
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

// returns the results of the guess
var makeGuess = function(guessResult) {
  // already guessed
  if (guessResult === 'guessed') {
    console.log(gameObj.tryAgain());
  // good guess
  } else if (guessResult === true) {
    console.log(gameObj.goodGuess());
  // bad guess
  } else if (guessResult === false) {
    console.log(gameObj.badGuess());
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
      console.log("Not a valid letter");
      gameLoop();
    }
  });
}

// handles the win/loss/keep playing conditions
var gameLoop = function() {
  console.log(game.word + '');
  // keep playing
  if (!game.isSolved() && (game.guesses > 0)) {
    readGuess();
  // win
  } else if (game.isSolved() && (game.guesses > 0)) { 
    wins++;
    winner();
    nextGame();
  // lose
  } else if (!game.isSolved() > 0 && (game.guesses <= 0)) {
    losses++;
    loser();
    nextGame();
  // error
  } else {
    console.log("Error - Game Over for No Reason");
  }
}

// runs the first game
firstRun();