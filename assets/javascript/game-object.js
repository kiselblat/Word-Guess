var WORDS = ["mississippi"];
var GUESSES = 20;

var wordGame = {
  word : "",
  solution : [],
  remainingLetters : 0,
  guessWord : "",
  guessedLetters : [],
  remainingGuesses : GUESSES,
  gameState : "new",
  
  newGame : function() {
      this.gameState = "solving";
      this.guessedLetters = [];
      this.remainingLetters = 0;
      this.remainingGuesses = GUESSES;
      this.word = WORDS[Math.floor(Math.random() * WORDS.length)];
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
        this.gameState = "solved";
      } else {
        this.gameState = "solving";
      }
    },
}

document.onkeyup = function(event) {
  var guess = event.key;

  if (wordGame.gameState === "new" && guess === " ") {
    wordGame.newGame();
  } else if ((wordGame.gameState === "solving" ) && isValidGuess(guess)) {
    guessLetter(guess);
  } else if (wordGame.gameState === "solved") {
    endgameHandler("win");
    console.log("game over");
    wordGame.gameState = "new";
  } else if (remainingGuesses === 0) {
    endgameHandler("lose");
    console.log("game over");
    wordGame.gameState = "new";
  }
  
  wordGame.isSolved();
  // updateGameboard();
}