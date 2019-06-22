var Word = require('./Word.js')

var Hangman = function (word , guesses) {
  this.word = new Word(word);
  this.guesses = guesses;
  this.answer = this.word.getAnswer();
  this.guessedLetters = [];
  
  this.isSolved = function() {
    if(this.word.remainingLetters() > 0) {
      return false;
    } else {
      return true;
    }
  }

  this.isGuessed = function(letter) {
    if (this.guessedLetters.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

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

  this.revealAnswer = function() {
    return this.word.revealWord();
  }
}

module.exports = Hangman;

// var testGame = new Hangman('mississippi' , 10);
// console.log(testGame.word + '');
// console.log(testGame.guess('s'));
// console.log(testGame.word + '');
// console.log(testGame.guess('p'));
// console.log(testGame.word + '');
// console.log(testGame.guess('m'));
// console.log(testGame.word + '');
// console.log(testGame.guess('j'));
// console.log(testGame.word + '');
// console.log(testGame.guess('m'));
// console.log(testGame.word + '');
// console.log(testGame.guess('i'));
// console.log(testGame.word + '');

// var testGameTwo = new Hangman('sam i am' , 10);
// console.log(testGameTwo.word + '');
// console.log(testGameTwo.guess('s'));
// console.log(testGameTwo.word + '');
// console.log(testGameTwo.guess('a'));
// console.log(testGameTwo.word + '');
// console.log(testGameTwo.guess('m'));
// console.log(testGameTwo.word + '');
// console.log(testGameTwo.guess('j'));
// console.log(testGameTwo.word + '');
// console.log(testGameTwo.guess('m'));
// console.log(testGameTwo.word + '');
// console.log(testGameTwo.guess('i'));
// console.log(testGameTwo.word + '');