var Letter = require('./Letter');

var Word = function(word) {
  
  this.word = [];
  
  this.toString = function() {
    return this.word.join(" ").toUpperCase();
  }
  
  this.guess = function(letter) {
    for (var i = 0 ; i < this.word.length ; i++) {
      this.word[i].guessLetter(letter);
    }
  }

  this.lettersRemain = function() {
    for (var i = 0 ; i < this.word.length ; i++) {
      if (!this.word[i].guessed) {
        return true;
      } else {
        return false;
      }
    }
  }

  module.exports = Word;

  for (var i = 0 ; i < word.length ; i++) {
    var newLetter = new Letter(word[i]);
    this.word.push(newLetter);
  }
}

var testWord = new Word("mississippi");
console.log(testWord + "");
testWord.guess('i');
console.log(testWord + "");
testWord.guess('m');
console.log(testWord + "");
testWord.guess('p');
console.log(testWord + "");
testWord.guess('s');
console.log(testWord + "");

var testWordTwo = new Word("sam i am");
console.log(testWordTwo + "");
testWordTwo.guess('s');
console.log(testWordTwo + "");
testWordTwo.guess('m');
console.log(testWordTwo + "");
testWordTwo.guess('i');
console.log(testWordTwo + "");
testWordTwo.guess('a');
console.log(testWordTwo + "");