var WORDS = ["mississippi"];
var GUESSES = 20;

var wordGame = {
  word : "",
  solution : [],
  remainingLetters : 0,
  guessWord : "",
  guessedLetters : [],
  gameState : "new",
  
  newWord : function(wordlist) {
    this.gameState = "solving";
    this.guessedLetters = [];
    this.remainingLetters = 0;
    this.word = wordlist[Math.floor(Math.random() * wordlist.length)];
    console.log("wordGame.newGame() picked: ", this.word);
    for (var i = 0; i < this.word.length; i++) {
      this.solution[i] = "_";
      this.remainingLetters++;
    }
    guessWord = solution.join(" ");
    console.log("wordGame.newGame(): ", solution);
    console.log("wordGame.newGame(): ", remainingLetters;
    console.log("wordGame.newGame(): ", remainingTurns);
  },
    
  isValidGuess : function(keypress) {
    if (!keypress.match(/[a-z]/i)) {
      console.log("wordGame.isValidGuess(): user didn't guess a letter");
      return false;
    } else if (this.guessedLetters.includes(keypress)) {
      console.log("wordGame.isValidGuess(): user already guessed letter");
      return false;
    } else {
      console.log("wordGame.isValidGuess(): user guessed: ", guess);
      return true;
    }
  },

  guessLetter : function(letter) {
    if (this.word.includes(letter) && !this.guessWord.includes(letter)) {
      for (var i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          this.solution[i] = letter;
          this.guessWord = this.solution.join(" ");
          this.remainingLetters--;
        }
      }
    } else if (!this.word.includes(letter)) {
      this.guessedLetters.push(letter);
    }
    console.log("wordGame.guessLetter: ", this.solution);
    console.log("wordGame.guessLetter: ", this.remainingLetters);
    console.log("wordGame.guessLetter: ", this.remainingGuesses);
  },
    
  isSolved : function() {
    if (this.remainingLetters === 0) {
      return true;
    } else {
      return false;
    }
  },
};

document.onkeyup = function(event) {
  var guess = event.key;

  while (!wordGame.isSolved && guessesRemaining > 0) {
    if (wordGame.isValidGuess(guess) && !wordGame.guessWord.includes(guess)) {
      guessLetter(guess);
    }
  }
  
  
  wordGame.isSolved();
  // updateGameboard();
}