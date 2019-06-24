var Word = require('./Word.js')

var Hangman = function (word , guesses) {
  // the puzzle word, stored as a new Word object
  this.word = new Word(word);
  this.guesses = guesses;
  this.answer = this.word.getAnswer();
  this.guessedLetters = [];

  // returns puzzle word as a string
  this.toString = function() {
    return word.toString();
  }
  
  // returns true when the Word is solved
  this.isSolved = function() {
    if(this.word.remainingLetters() > 0) {
      return false;
    } else {
      return true;
    }
  }

  // returns true when there are no more wrong guesses
  this.noGuesses = function() {
    if(this.guesses <= 0) {
      return true;
    } else {
      return false;
    }
  }

  // returns true if the param is in guessedLetters
  this.isGuessed = function(letter) {
    if (this.guessedLetters.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

  // guesses a letter and returns 'guessed', true, or false
  this.guess = function (letter) {
    // Already guessed
    if (this.isGuessed(letter) || this.word.includes(letter)) {
      return 'guessed';
    // Wrong guess
    } else if (this.word.guessLetter(letter) === false){
      this.guessedLetters.push(letter);
      this.guesses--;
      return false;
    //Right Guess
    } else {
      this.word.guessLetter(letter);
      return true;
    }
  }

  // access to word.revealWord() from Hangman level
  this.revealAnswer = function() {
    return this.word.revealWord();
  }
}

// spread the love
module.exports = Hangman;