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

  
    
    for (var i = 0 ; i < word.length ; i++) {
      var newLetter = new Letter(word[i]);
      this.word.push(newLetter);
    }
  }
  
module.exports = Word;

// var testWord = new Word("mississippi");
// console.log(testWord + "");
// console.log(testWord.remainingLetters());
// testWord.guess('i');
// console.log(testWord + "");
// console.log(testWord.remainingLetters());
// testWord.guess('m');
// console.log(testWord + "");
// console.log(testWord.remainingLetters());
// testWord.guess('p');
// console.log(testWord + "");
// console.log(testWord.remainingLetters());
// testWord.guess('s');
// console.log(testWord + "");
// console.log(testWord.remainingLetters());

// var testWordTwo = new Word("sam i am");
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());
// testWordTwo.guess('s');
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());
// testWordTwo.guess('m');
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());
// testWordTwo.guess('i');
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());
// testWordTwo.guess('a');
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());