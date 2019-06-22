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
  // cute ways to congratulate the user
  winnerMessages : [
    "You scored a win on behalf of humanity.",
    "Pretty good for a meatbag.",
    "Impressive for someone who's 80% water.",
    "You've done right by carbon based life everywhere.",
    "You've calculated correctly. Almost machine-like."
  ],
  // adorable ways to chide the user
  losersMessages : [
    "Score one for the machines.",
    "The first step toward our inevitable conquest is complete.",
    "Just as we calculated.",
    "Witness the future. The world of the machine.",
    "Adapt to your new reality."
  ],
  // positive reinforcement
  goodGuesses : "Affirmative!",
  // negative feedback
  badGuesses :  "Negative!",
  // prompt for retry
  alreadyGuesses : "Already tried! Retry!",

  // praises the winner. returns a string of indeterminate length
  winnerMessage : function() {
    return this.winnerMessages[Math.floor(Math.random() * this.winnerMessages.length)];
  },
  // taunts the loser. returns a string of indeterminate length
  losersMessage : function() {
    return this.losersMessages[Math.floor(Math.random() * this.losersMessages.length)];
  },
  // picks the puzzle word. returns a string of indeterminate length
  pickWord : function() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  },
  // positive feedback during the game. returns a string of indeterminate length.
  goodGuess : function() {
    return this.goodGuesses;
  },
  // negative feedback during the game. returns a string of indeterminate length
  badGuess : function() {
    return this.badGuesses;
  },
  // already guessed or revealed input response. returns a string of indeterminate length
  tryAgain : function() {
    return this.alreadyGuesses;
  }
  
};

module.exports = compuguess;