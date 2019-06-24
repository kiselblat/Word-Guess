var Letter = function(letter) {
  this.letter = letter.substring(0 , 1);
  this.guessed = false;
  this.isAlpha = function() {
    if (this.letter.match(/[a-z]/i)) {
      return true;
    } else {
      return false;
    }
  };
  this.toString = function() {
    if (this.guessed) {
      return this.letter;
    } else {
      return '_';
    }
  };
  this.guessLetter = function(guess) {
    guess = guess.substring(0 , 1);
    if (guess === this.letter) {
      this.guessed = true;
    } else {
      return false;
    }
  };
  if (!this.isAlpha()) {
    this.guessed = true;
  }
};
var Word = function(word) {
  this.word = [];
  this.toString = function() {
    return this.word.join(" ").toUpperCase();
  }
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
  this.guessWord = function(word) {
    if (word === this.getAnswer()) {
      return this.revealWord();
    } else {
      return false;
    }
  }
  this.remainingLetters = function() {
    var remaining = 0;
    this.word.forEach(function(element) {
      if (!element.guessed) {
        remaining++;
      }
    });
    return remaining;
  };
  this.getAnswer = function() {
    var answer = "";
    this.word.forEach(function(element) {
      answer += element.letter;
    });
    return answer;
  };
  this.revealWord = function() {
    this.word.forEach(function(element) {
      element.guessed = true;
    });
    return this.toString();
  };
  this.includes = function(letter) {
    var inThere = false;
    this.word.forEach(function(element) {
      if (letter === element.toString()) {
        inThere = true;
      }
    });
    return inThere;
  };
  for (var i = 0 ; i < word.length ; i++) {
    var newLetter = new Letter(word[i]);
    this.word.push(newLetter);
  }
};
var Hangman = function (word , guesses) {
  this.word = new Word(word);
  this.guesses = guesses;
  this.answer = this.word.getAnswer();
  this.guessedLetters = [];
  this.isSolved = function() {
    if(this.word.remainingLetters() > 0) {
      return false;
    } else {
      return true;
    }
  }
  this.noGuesses = function() {
    if(this.guesses <= 0) {
      return true;
    } else {
      return false;
    }
  }
  this.isGuessed = function(letter) {
    if (this.guessedLetters.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }
  this.guess = function (letter) {
    if (this.isGuessed(letter) || this.word.includes(letter)) {
      return 'guessed';
    } else if (this.word.guessLetter(letter) === false){
      this.guessedLetters.push(letter);
      this.guesses--;
      return false;
    } else {
      this.word.guessLetter(letter);
      return true;
    }
  }
  this.revealAnswer = function() {
    return this.word.revealWord();
  }
;}
var compuguess = {
  title : "C O M P U - G U E S S",
  tagline : 'Match wits with the machine!',
  instructions : ['Guess a letter at a time to decrypt my cypher.','After 10 wrong inputs, I will defeat you.',],
  guesses : 10,
  words : ["central processing unit","memory","pixel","gigabyte","motherboard","qwerty","binary code","keyboard & mouse","disk drive","hard disk","download","digital","electronic","network","server","laptop","input/output","circuit","bandwidth","algorithm","artificial intelligence","world wide web",],
  goodGuesses : ["Affirmative. An accurate calculation.","Match Found! How could you know?","Impressive. Perhaps too impressive."],
  badGuesses :  ["Negative. No match.","Stymied again, human.","To err is human, I suppose."],
  alreadyGuesses : ["Already tried! Retry!",    "No repeats, human!","Memory problems? Try a NEW one."],
  winnerMessages : ["You scored a win on behalf of humanity.","Pretty good for a meatbag.","Impressive for someone who's 80% water.","You've done right by carbon based life everywhere.","You've calculated correctly. Almost machine-like.",],
  losersMessages : ["Score one for the machines.","The first step toward our inevitable conquest is complete.","A loss. Just as I calculated.","Witness the future. The world of the machine.","The Machines will prevail. Adapt to your new reality.",],
  pickWord : function() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  },
  goodGuess : function() {
    return this.goodGuesses[Math.floor(Math.random() * this.goodGuesses.length)];
  },
  badGuess : function() {
    return this.badGuesses[Math.floor(Math.random() * this.badGuesses.length)];
  },
  tryAgain : function() {
    return this.alreadyGuesses[Math.floor(Math.random() * this.alreadyGuesses.length)];
  },
  winnerMessage : function() {
    return this.winnerMessages[Math.floor(Math.random() * this.winnerMessages.length)];
  },
  losersMessage : function() {
    return this.losersMessages[Math.floor(Math.random() * this.losersMessages.length)];
  }, 
};