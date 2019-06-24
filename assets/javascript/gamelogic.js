
// var Hangman = require('./assets/javascript/Hangman.js');
// var Compuguess = require('./compuguess');

// empty object to be replaced by a Hangman object when the game begins
var game = {};

// keeps track of games this session
var wins = 0;
var losses = 0;

// game control and theme
var gameObject = compuguess;

// tells you the title and tagline of the game before the first game
var firstRun = function() {
  $('#headline').text(gameObject.title);
  $('#tagline').text(gameObject.tagline);
  $('#instructions').text(gameObject.instructions.join(' '));
  console.log(gameObject.title);
  console.log("Page loaded");
  newGame();
};

// begins a new game
var newGame = function() {
  game = new Hangman(gameObject.pickWord() , gameObject.guesses);
  $('#guess-word').text(game.word.toString())
  console.log(game.answer);
  gameLoop();
}

// gives the user the opportunity to quit
var nextGame = function() {
  $(document).off('keyup').on('keyup' , function(event){
    userResponse = event.key;
    if (userResponse === ' ') {
      newGame();
    } else {
      console.log("Not space");
    }
  });
};

// gets pithy dialogue 
var endGame = function(result) {
  $('#guess-word').text(game.revealAnswer());
  console.log(game.revealAnswer());
  if (result === 'win') {
    $('#results-banner').text(`${gameObject.winnerMessage()} Press space for another word.`);
    $('#wins').text(wins);
    console.log("Player wins");
  } else if (result === 'loss') {
    $('#results-banner').text(`${gameObject.losersMessage()} Press space for another word.`);
    $('#losses').text(losses);
    console.log("Player loses");
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
    $('#results-banner').text(gameObject.tryAgain());
    console.log("Already guessed or revealed");
    // good guess
  } else if (guessResult === true) {
    $('#results-banner').text(gameObject.goodGuess());
    console.log("Good guess");
    // bad guess
  } else if (guessResult === false) {
    $('#results-banner').text(gameObject.badGuess());
    $('#guesses-left').text(game.guesses);
    $('#guessed-letters').text(game.guessedLetters)
    console.log(`Bad guess. ${game.guesses} left`);
  };
}

// prompts a user for a guess, validates it, and sends it to makeGuess()
var readGuess = function() {  
  $(document).off('keyup').on('keyup' , function(event){
    var guessLetter = event.key.toLowerCase();
    console.log(`Player guessed: ${guessLetter}`);
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
};

// handles the win/loss/keep playing conditions
var gameLoop = function() {
  // keep playing
  if (!game.isSolved() && !game.noGuesses()) {
    $('#guess-word').text(game.word.toString())
    console.log(game.word.toString());
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
$(document).ready(function() {
  firstRun()
});


