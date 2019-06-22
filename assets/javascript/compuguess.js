var compuguess = {
  title : "C O M P U - G U E S S",
  tagline : 'Match wits with the machine!',
  instructions : [
    'Guess a letter at a time to decrypt my cypher.',
    'After 10 wrong inputs, I will defeat you.',
  ],
  guesses : 10,
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
  winnerMessages : [
    "You scored a win on behalf of humanity.",
    "Pretty good for a meatbag.",
    "Impressive for someone who's 80% water.",
    "You've done right by carbon based life everywhere.",
    "You've calculated correctly. Almost machine-like."
  ],
  losersMessages : [
    "Score one for the machines.",
    "The first step toward our inevitable conquest is complete.",
    "Just as we calculated.",
    "Witness the future. The world of the machine.",
    "Adapt to your new reality."
  ],
  goodGuesses : "Affirmative!",
  badGuesses :  "Negative!",
  alreadyGuesses : "Already tried! Retry!",
  winnerMessage : function() {
    return this.winnerMessages[Math.floor(Math.random() * this.winnerMessages.length)];
    },
  losersMessage : function() {
    return this.losersMessages[Math.floor(Math.random() * this.losersMessages.length)];
    },
  pickWord : function() {
      return this.words[Math.floor(Math.random() * this.words.length)];
    },
    goodGuess : function() {
      return this.goodGuesses;
    },
    badGuess : function() {
      return this.badGuesses;
    },
    tryAgain : function() {
      return this.alreadyGuesses;
    }
  };

  module.exports = compuguess;