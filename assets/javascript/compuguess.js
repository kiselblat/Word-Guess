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

module.exports = compuguess;