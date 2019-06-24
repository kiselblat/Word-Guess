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

// Word object constructor
var Word = function(word) {
  // an array of letters, gets filled on new call
  this.word = [];
  
  // returns the word as a formatted string
  this.toString = function() {
    return this.word.join(" ").toUpperCase();
  }

  // matches the letter or returns false
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

  // sets each letter to guessed and returns this.word as a string
  this.revealWord = function() {
    this.word.forEach(function(element) {
      element.guessed = true;
    });
    return this.toString();
  };

  // returns true if a word contains a letter
  this.includes = function(letter) {
    var inThere = false;
    this.word.forEach(function(element) {
      if (letter === element.toString()) {
        inThere = true;
      }
    });
    return inThere;
  };

  // populate Word with Letters
  for (var i = 0 ; i < word.length ; i++) {
    var newLetter = new Letter(word[i]);
    this.word.push(newLetter);
  }
};

// Hangman object constructor
var Hangman = function (word , guesses) {
  // the puzzle word, stored as a new Word object
  this.word = new Word(word);
  this.guesses = guesses;
  this.answer = this.word.getAnswer();
  this.guessedLetters = [];
  
  // returns true when the Word is solved
  this.isSolved = function() {
    if(this.word.remainingLetters() > 0) {
      return false;
    } else {
      return true;
    }
  }

  // returns true when there are no more wrong guesses
  this.noGuesses = function() {
    if(this.guesses <= 0) {
      return true;
    } else {
      return false;
    }
  }

  // returns true if the param is in guessedLetters
  this.isGuessed = function(letter) {
    if (this.guessedLetters.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

  // guesses a letter and returns 'guessed', true, or false
  this.guess = function (letter) {
    // Already guessed
    if (this.isGuessed(letter) || this.word.includes(letter)) {
      return 'guessed';
    // Wrong guess
    } else if (this.word.guessLetter(letter) === false){
      this.guessedLetters.push(letter);
      this.guesses--;
      return false;
    //Right Guess
    } else {
      this.word.guessLetter(letter);
      return true;
    }
  }

  // access to word.revealWord() from Hangman level
  this.revealAnswer = function() {
    return this.word.revealWord();
  }
;}

// Compuguess object literal
var compuguess = {
  // title of this Hangman game
  title : "C O M P U - G U E S S",

  // a fun tagline
  tagline : 'Match wits with the machine!',

  // remind the user how to play a grade school game
  instructions : [
    'Guess a letter at a time to decrypt my cypher.',
    'After 10 wrong inputs, I will defeat you.',
  ],

  // how many bad guesses they get
  guesses : 10,

  // list of puzzle words and phrases to pick from
  words : [
    "central processing unit",
    "memory",
    "pixel",
    "gigabyte",
    "motherboard",
    "qwerty",
    "binary code",
    "keyboard & mouse",
    "disk drive",
    "hard disk",
    "download",
    "digital",
    "electronic",
    "network",
    "server",
    "laptop",
    "input/output",
    "circuit",
    "bandwidth",
    "algorithm",
    "artificial intelligence",
    "world wide web",
  ],

  // positive reinforcement
  goodGuesses : [
    "Affirmative. An accurate calculation.",
    "Match Found! How could you know?",
    "Impressive. Perhaps too impressive."
  ],

  // negative feedback
  badGuesses :  [
    "Negative. No match.",
    "Stymied again, human.",
    "To err is human, I suppose."
  ],

  // prompt for retry options
  alreadyGuesses : [
    "Already tried! Retry!",
    "No repeats, human!",
    "Memory problems? Try a NEW one."
  ],

  // cute ways to congratulate the winner
  winnerMessages : [
    "You scored a win on behalf of humanity.",
    "Pretty good for a meatbag.",
    "Impressive for someone who's 80% water.",
    "You've done right by carbon based life everywhere.",
    "You've calculated correctly. Almost machine-like.",
  ],

  // adorable ways to chide the loser
  losersMessages : [
    "Score one for the machines.",
    "The first step toward our inevitable conquest is complete.",
    "A loss. Just as I calculated.",
    "Witness the future. The world of the machine.",
    "The Machines will prevail. Adapt to your new reality.",
  ],

  // picks the puzzle word. returns a string of indeterminate length
  pickWord : function() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  },

  // positive feedback during the game. returns a string of indeterminate length.
  goodGuess : function() {
    return this.goodGuesses[Math.floor(Math.random() * this.goodGuesses.length)];
  },

  // negative feedback during the game. returns a string of indeterminate length
  badGuess : function() {
    return this.badGuesses[Math.floor(Math.random() * this.badGuesses.length)];
  },

  // already guessed or revealed input response. returns a string of indeterminate length
  tryAgain : function() {
    return this.alreadyGuesses[Math.floor(Math.random() * this.alreadyGuesses.length)];
  },

  // praises the winner. returns a string of indeterminate length
  winnerMessage : function() {
    return this.winnerMessages[Math.floor(Math.random() * this.winnerMessages.length)];
  },

  // taunts the loser. returns a string of indeterminate length
  losersMessage : function() {
    return this.losersMessages[Math.floor(Math.random() * this.losersMessages.length)];
  },
  
};