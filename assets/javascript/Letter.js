var Letter = function(letter) {
  // the letter this Letter represents
  this.letter = letter.substring(0 , 1);

  // whether the Letter displays or not
  this.guessed = false;

  // returns true if .letter is in alphabet
  this.isAlpha = function() {
    if (this.letter.match(/[a-z]/i)) {
      return true;
    } else {
      return false;
    }
  };

  // displays .letter when Letter is .guessed
  this.toString = function() {
    if (this.guessed) {
      return this.letter;
    } else {
      return '_';
    }
  };

  // checks if a guess is correct
  this.guessLetter = function(guess) {
    guess = guess.substring(0 , 1);
    if (guess === this.letter) {
      this.guessed = true;
    } else {
      return false;
    }
  };

  // not every character is a letter
  if (!this.isAlpha()) {
    this.guessed = true;
  }
};

module.exports = Letter;