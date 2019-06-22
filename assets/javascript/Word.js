var Letter = require('./Letter');

var Word = function(word) {
  
  this.word = [];
  
  this.toString = function() {
    return this.word.join(" ").toUpperCase();
  }
  // takes a letter and checks it with each Letter
  // returns false if no matches
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
  // reveals the word by setting letter.guessed to true and 
  // calling this.toString().
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
  
module.exports = Word;

// var tester = new Word("mississippi");
// console.log(tester.includes('m'));
// tester.guessLetter('m');
// console.log(tester + "");
// console.log(tester.includes('m'));


// var testWord = new Word("mississippi");
// console.log(testWord.getAnswer());
// console.log(testWord + "");
// console.log(testWord.remainingLetters());
// testWord.guessLetter('i');
// console.log(testWord + "");
// console.log(testWord.remainingLetters());
// testWord.guessLetter('m');
// console.log(testWord + "");
// console.log(testWord.remainingLetters());
// testWord.guessLetter('p');
// console.log(testWord + "");
// console.log(testWord.remainingLetters());
// testWord.guessLetter('s');
// console.log(testWord + "");
// console.log(testWord.remainingLetters());

// var testWordTwo = new Word("sam i am");
// console.log(testWordTwo.getAnswer());
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());
// testWordTwo.guessLetter('s');
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());
// testWordTwo.guessLetter('m');
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());
// testWordTwo.guessLetter('i');
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());
// testWordTwo.guessLetter('a');
// console.log(testWordTwo + "");
// console.log(testWordTwo.remainingLetters());

// var testWordThree = new Word("minnehaha");
// console.log(testWordThree.getAnswer());
// console.log(testWordThree.guessWord("minnehaha"));