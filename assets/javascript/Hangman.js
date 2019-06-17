var Word = require('./Word.js')

var Hangman = function (word , guesses) {
  this.word = new Word(word);
  this.guesses = guesses;
  this.answer = "";
  this.guessedLetters = [];

  this.isGuessed = function(letter) {
    if (this.guessedLetters.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

  this.remainingLetters = function() {
    var remaining = 0;
    for(var i = 0 ; i < this.word.word.length ; i++) {
      if (!this.word.word[i].guessed) {
        remaining++;
      } 
    }
    return remaining;
    }

  this.guess = function (letter) {
    var remaining = this.remainingLetters();
    var remainingNew = 0;
    
    if (this.isGuessed(letter)) {
      return 'guessed';
    } else {
      this.guessedLetters.push(letter);
      this.word.guess(letter);
      remainingNew = this.remainingLetters();
      // console.log(remaining , remainingNew , this.guessedLetters , this.guesses);
      // Wrong guess
      if (remaining === remainingNew) {
        this.guesses--;
        return false;
      // Right guess
      } else if (remaining > remainingNew) {
        return true;
      } else {
        console.log("Error! Letter became unguessed!");
      }
    }
  }
  
  for (var i=0 ; i < this.word.word.length ; i++) {
    this.answer += this.word.word[i].letter;
  }
  // console.log(this.answer);

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