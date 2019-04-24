// hangman style guess the 

var isValidLetter = function (str) {
  if (str.length === 1 && str.match(/[a-z]/i)) {
    return true;
  } else {
    return false;
  }
}

var WORDS = ["processor"];
var guessedLetters = [];
var guesses = 30;
var solution = [];
var remainingLetters = 0;
var wins = 0;
var losses = 0;

// 1. Pick a word
var word = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log("picked ", word);

for (var i = 0; i < word.length; i++) {
  solution[i] = "_";
  remainingLetters ++;
}
console.log(solution);
console.log(remainingLetters);

guessWord = solution.join(" ");
document.getElementById("guess-word").textContent = guessWord;

document.onkeyup = function(event) {
  // Determines which key was pressed.
  var guess = event.key;
  
  guess = guess.toLowerCase();
  console.log(guess)

  if (!(isValidLetter(guess))) {
    console.log("user didn't guess a letter");
    return;
  } else if (guessedLetters.includes(guess)) {
    console.log("already guessed");
    return;
  } else {
    console.log("user guessed: ", guess)
  }

  if (remainingLetters === 0) {
    // YOU WIN
   } else if (guesses === 0) {
    // YOU LOSE
   } else if (word.includes(guess)){
      for (var j = 0; j < word.length; j++) {
        if (word[j] === guess) {
            solution[j] = guess;
            guessWord = solution.join(" ");
            document.getElementById("guess-word").textContent = guessWord;
          } 
      }
   } else if (!(word.includes(guess))) {
      guessedLetters.push(guess);
      guesses--;
    }

  document.getElementById("guesses-left").textContent = guesses;
  document.getElementById("guessed-letters").textContent = guessedLetters;
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  
      console.log(solution);
  }