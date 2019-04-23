// hangman style guess the 

var WORDS = ["processor"];
var guessedLetters = [];
var guesses = 30;
var solution = [];

// 1. Pick a word
var word = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log("picked ", word);

for (var i = 0; i < word.length; i++) {
  solution[i] = "_";
}
console.log(solution);

guessWord = solution.join(" ");
document.getElementById("guess-word").textContent = guessWord;

document.onkeyup = function(event) {

  // Determines which key was pressed.
  var guess = event.key;
  
  // Put this in a test for validity.
  guessedLetters.push(guess);
  console.log("user guessed: ", guess);

  for (var j = 0; j < word.length; j++) {
    if (word[j] === guess) {
      solution[j] = guess;
      guessWord = solution.join(" ");
      document.getElementById("guess-word").textContent = guessWord;
      guesses++;
    }
  }
      guesses--;
      document.getElementById("guesses-left").textContent = guesses;
  
      console.log(solution);
  }