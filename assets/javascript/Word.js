var Letter = require('./Letter');

var Word = function(word) {
  // an array of letters, gets filled on new call
  this.word = [];
  
  // returns the word as a formatted string
  this.toString = function() {
    return this.word.join(" ").toUpperCase();
  }

  // matches the letter or returns false
  this.guessLetter = function(letter) {
    var isGood = false;
    this.word.forEach(function(element){
      if (!(element.guessLetter(letter) === false)) {
        element.guessLetter(letter);
        isGood = true;
      }
    });
    if (isGood === false) {
      return false;
    }
  };

  // takes a whole word guess and returns true or false
  this.guessWord = function(word) {
    if (word === this.getAnswer()) {
      return this.revealWord();
    } else {
      return false;
    }
  }

  // returns number of unguessed Letters
  this.remainingLetters = function() {
    var remaining = 0;
    this.word.forEach(function(element) {
      if (!element.guessed) {
        remaining++;
      }
    });
    return remaining;
  };

  // returns the hidden word stored in this object as a string
  this.getAnswer = function() {
    var answer = "";
    this.word.forEach(function(element) {
      answer += element.letter;
    });
    return answer;
  };

  // sets each letter to guessed and returns this.word as a string
  this.revealWord = function() {
    this.word.forEach(function(element) {
      element.guessed = true;
    });
    return this.toString();
  }

  // returns true if a word contains a letter
  this.includes = function(letter) {
    var inThere = false;
    this.word.forEach(function(element) {
      if (letter === element.toString()) {
        inThere = true;
      }
    });
    return inThere;
  }

  // populate Word with Letters
  for (var i = 0 ; i < word.length ; i++) {
    var newLetter = new Letter(word[i]);
    this.word.push(newLetter);
  }
}
  
// share this masterpiece with the whole folder
module.exports = Word;