var Letter = function(letter) {
  this.letter = letter;
  this.guessed = false;
  this.alphaChar = true;

  this.toString = function() {
    if (this.guessed) {
      return this.letter;
    } else {
      return '_';
    }
  };

  this.guessLetter = function(guess) {
    if (guess === this.letter) {
      this.guessed = true;
    }
  }

  if (!this.letter.match(/[a-z]/i)) {
    this.guessed = true;
    this.alphaChar = false;
  }
}

module.exports = Letter;

// var lett = new Letter('a');
// console.log(lett.toString());
// lett.guessLetter('b');
// lett.guessLetter('a');
// console.log(lett.toString());
// var lettTwo = new Letter(' ');
// console.log(lettTwo.guessed);
// console.log('#' + lettTwo + '#');
// var lettThree = new Letter('#');
// console.log(lettThree.guessed);
// console.log('#' + lettThree + '#');