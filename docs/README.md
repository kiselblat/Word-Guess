# Word-Guess

1. [Installation and Requirements](#installation-and-requirements)
2. [How to Play](#how-to-play)
3. [Overview](#overview)
    1. [`Letter.js`](#letterjs)
    2. [`Word.js`](#wordjs)
    3. [`Hangman.js`](#hangmanjs)
    4. [`Compuguess.js`](#compuguessjs)
    5. [`index.js`](`indexjs`)
    6. [`gamelogic.js` and `word-guess.js`](#gamelogicjs-and-word-guessjs)
4. [About](#about)

A hangman style game library and implementation in javascript for both Web and command line for those who want that sort thing. The actual game takes the form of Compu-Guess, a battle of the minds between you, the user, and the machine, a super-intelligence that has emerged from cyberspace to make you guess words.

## Installation and Requirements

The Web version does not need to be installed anywhere. It can be run in your preferred browser by loading `index.html`.

The CLI version of Compu-Guess requires node.js to run. Find and install it from their [website](https://nodejs.org/en/). The `index.js` file itself depends on the `inquirer`, `bootstrap`, and `jquery` `npm` packages. They can be installed with the included `package.json` file, along with all their own requirements, by running `npm i` from the command line.

The rest of the library: `Letter.js`, `Word.js`, and `Hangman.js` do not depend on any external packages.

## How to Play

The Web version of Compu-Guess can be played [here](https://kiselblat.github.io/Word-Guess) on almost any browser, or by loading `index.html` from the repository directly.

![See the Demo](./gifs/compu-guess-web-demo.gif)

The web game takes input directly from the keyboard. The game will display a series of underscores prominantly, representing the unguessed word.

Type letters on the keyboard to guess, the game will ignore non-letter keys, letters that have already been revealed, and letters that have already been guessed.

---

Run the CLI version from the command line by entering:
```
node index.js
```
This will display the title, COMPU-GUESS and then a number of dashes representing the unguessed word. Below that is a prompt.

Enter one letter at a time. Non-letters and already guessed letters will cause the game to re-prompt the user.

![See the Demo](./gifs/compu-guess-cli-demo.gif)
---

Both versions of Compu-Guess give the player 10 wrong guesses, and will prompt the user to play a new game when the current one is concluded.

## Overview

Word-Guess is a web app and a small library of files that implements a word guessing game, commonly called Hangman here in the United States. The web version, contained in `assets/javascript/gamelogic.js` and `assets/javascript/word-guess.js`. The former reflects the code in `index.js` which takes in an object and uses a `Hangman` to run a game. The latter is a 

The remaining files in `assets/javascript/` each define objects that share their filenames: `Letter.js`, `Word.js`, and `Hangman.js`. Each file depends the the preceeding one.

### `Letter.js`

1. [`this.letter`](#letterletter)
2. [`this.guessed`](#letterguessed)
3. [`this.isAlpha()`](#letterisalpha)
4. [`this.toString()`](#lettertostring)
5. [`this.guessLetter(`*`char`*`)`](#letterguessletterchar)

A `Letter` object takes in and stores an a-z character and displays an underscore in its place until it has been guessed.
`Letter`s are built so that they, and their methods will only take one character.
Non-alpha characters, notably spaces are initialized as already guessed. This way, `Word` never counts them in `.remainingLetters()`.

#### `Letter.letter`

This property is used to access the actual letter the `Letter` object represents. When created, `.letter` will only take the first character in any string passed into `Letter()`.

#### `Letter.guessed`

A boolean value when set to true causes the `toString()` to return `.letter`.

#### `Letter.isAlpha()`

Returns `false` when `this.letter` is not an a-z character, otherwise returns `true`. `isAlpha()` is invoked when a new `Letter` is created to automatically reveal spaces and symbols.

#### `Letter.toString()`

Returns `'_'` unless the `Letter` has been `.guessed`. It is so named to take advantage of default JavaScript behavior that invokes a method named `toString` whenever that object is used in a string-like fashion.

#### `Letter.guessLetter(`*`char`*`)`

Takes in a letter and sets `.guessed` to true if it matches `.letter`. If the ``*`char`*`` doesn't match, `.guessLetter` will return `false`. `.guessLetter` will only check the first character in any string passed to it.

---

### `Word.js`

1. [`this.word[`*`i`*`]`](#wordword)
2. [`this.toString()`](#wordtostring)
3. [`this.guessLetter(`*`char`*`)`](#wordguessletterchar)
4. [`this.guessWord(`*`string`*`)`](#wordguesswordstring)
5. [`this.remainingLetters()`](#wordremainingletters)
6. [`this.getAnswer()`](#wordgetanswers)
7. [`this.revealWord()`](#wordrevealword)
8. [`this.includes(`*`char`*`)`](#wordincludeschar)

A `Word` is an array of `Letter` objects, and as such depends on the presences of `Letter.js` in the same directory. `Word` is also responsible for displaying itself with its `.toString` method.

#### `Word.word[`*`i`*`]`

The only property in a `Word` is the `.word` array, which contains only `Letter`s.

#### `Word.toString()`

Returns the `Word` in a string, with each `Letter` displaying according to its `Letter.guessed` status. It is so named to take advantage of default JavaScript behavior that invokes a method named `toString` whenever that object is used in a string-like fashion.

#### `Word.guessLetter(`*`char`*`)`

Takes a letter and checks each `Letter` by using `Letter.guessLetter(`*`char`*`)`. 

#### `Word.guessWord(`*`string`*`)`

Takes in a word guess in the form of a string. If it's not the word, `.guessWord` returns `false`, otherwise it returns the results of calling `this.revealWord()`.

#### `Word.remainingLetters()`

Returns the number of `Letter`s that are not `guessed`.

#### `Word.getAnswer()`

As you'd expect, this function returns the solution to the hidden word, in the form of a string.

#### `Word.revealWord()`

Reveal word is intended to be called after a game has been determined, or a word has been guessed with `guessWord()`. `.revealWord()` sets each `Letter` to `guessed` and then returns a call to `.toString()`

#### `Word.includes(`*`char`*`)`

Returns `true` or `false` if the **currently revealed** letters in a word include the passed character, thus behaving similarly to `.toString()`.

### `Hangman.js`

1. [`this.word`](#hangmanword)
2. [`this.guesses`](#hangmanguesses)
3. [`this.answer`](#hangmananswer)
4. [`this.guessedLetters`](#hangmanguessedletters)
5. [`this.toString()`](#hangmantostring)
6. [`this.isSolved()`](#hangmanissolved)
7. [`this.noGuesses()`](#hangmannoguesses)
8. [`this.isGuessed()`](#hangmanisguessed)
9. [`this.guess(`*`char`*`)`](#hangmanguesschar)
10. [`this.revealAnswer()`](#hangmanrevealanswer)

A `Hangman` object takes in a `Word` and then provides a framework for accessing and guessing. A `Hangman` not only handles guessing through the `.guess` method which will report back `true`/`false`/`guessed` whether the guess was successful or not, but also stores guessed letters, and has a way of accessing the answer.

#### `Hangman.word`

The `Word` object that makes the backbone of the `Hangman` instance. `Hangman.word` gets set to a new `Word` when a new `Hangman` gets created by the game.

#### `Hangman.guesses`

Keeps track of the wrong tries left in the game. Initialized from a value passed into the `new Hangman` when it is invoked. `Hangman.guesses` is decremented after every wrong guess.

#### `Hangman.answer`

A convenient parameter initialized with the `Word.getAnswer()` method. Provides a way to peek into the answer to the `Hangman`. Someday, `Hangman.guess()` will hopefully allow for guessing whole answers at once, and this parameter may be useful. Or it will get depracated.

#### `Hangman.guessedLetters`

The array in which all wrong guesses go. Currently this parameter is the only way to access the guessed letters.

#### 'Hangman.toString()'

Does exactly what the `.toString()` function does for the `Word` object because it works by calling it, and returning the resulting string. It is so named to take advantage of default JavaScript behavior that invokes a method named `toString` whenever that object is used in a string-like fashion.

#### `Hangman.isSolved()`

Returns `true` or `false` whether the `Word` is fully solved or not. Used to register a win, but still abstracted from the concepts of victory and defeat.

#### `Hangman.noGuesses()'

Returns `true` when there are no more `guesses`. Used to register a loss, but not expressed in terms of winning and losing.

#### `Hangman.isGuessed(`*`char`*`)`

Returns `true` or `false` whether the passed character has already been guessed, but is not in the `Word`.

#### `Hangman.guess(`*`char`*`)`

Returns `'guessed'`, `true`, or `false` depending on the character passed to the method. If it has already been guessed or revealed in the `Word`. If it is in the `Word` then that and all matching `Letter`s are revealed. Or if it hasn't been guessed and isn't in the `Word`, then that guess is added to `guessedLetters`.

#### `Hangman.revealAnswer()`

Pretty much just calls `Word.revealAnswer()` so there's a convenient way to do that through the `Hangman`.

### `Compuguess.js`

1. [`Compuguess.title`](#compuguesstitle)
2. [`Compuguess.tagline`](#compuguesstagline)
3. [`Compuguess.instructions`](#compuguessinstructions)
4. [`Compuguess.guesses`](#compuguessguesses)
5. [`Compuguess.winnerMessage`](#compuguesswinnermessage)
6. [`Compuguess.losersMessage`](#compuguesslosersmessage)
7. [`Compuguess.pickWord`](#compuguesspickword)
8. [`Compuguess.goodGuess`](#compuguessgoodguess)
9. [`Compuguess.badGuess`](#compuguessbadguess)
10. [`Compuguess.tryAgain`](#compuguesstryagain)

Defines a `gameObject` that provides necessary game rules, choices, and output. Most of the data in the `Compuguess` object are user outputs to add flavor and a list of possible words to guess. All the following entries are called by code in `index.js` and are therefore required.

#### `Compuguess.title`

A string that contains the title of the `gameObject`.

#### `Compuguess.tagline`

A string that contains a fun tagline to add atmosphere.

#### `Compuguess.instructions`

A string that contains instructions. Incase the user has never heard of this game before.

#### `Compuguess.guesses`

Set to an integer number of wrong guesses before the user loses. Gets passed into `Hangman` as the second parameter.

#### `Compuguess.winnerMessage`

A required method that serves up a sweet congrats on being a winner.

#### `Compuguess.losersMessage`

A required method that tosses out some attitude if the user's a loser.

#### `Compuguess.pickWord`

A required method that picks a word to instantiate the `Hangman` object with.

#### `Compuguess.goodGuess`

A required method that gives the user positive reinforcement on good guesses.

#### `Compuguess.badGuess`

A required method that gives out some sly negative feedback on bad guesses.

#### `Compuguess.tryAgain`

A required method that prompts the user to try again on duplicate or already discovered entries.


### `index.js`

Implements code that: 

1. Loads a `gameObject` from a file
2. Instantiates a new `Hangman`
3. Executes the game loop
4. Generates console output based loop results
5. Records wins and losses for the session
6. Gives an option to play again

`index.js` is where the `gameObject`, in this case Compu-Guess, combines with the `Hangman.js` object constructor to make a functioning game. `index.js` uses the `inquirer` package to take in user input and pass it into the game.

### `gamelogic.js` and `word-guess.js`

Implements the same as `index.js` but rewritten for the web. The latter file is a slightly condensed version of the library defined here, but without any `node.js` specific functions. I couldn't find a satisfactory solution to this problem. I cannot expose and import each file without `module.export` or `require()`, and I can't load javascript that has those calls without a reference error in the browser! All the solutions I found were some automated variation on what I've done here.

## About

Word-Guess was developed based on an assignment in the University of Minnesota Full-Stack Web Developer Boot Camp program. This version of the assignment was authored entirely by me, [Thomas Christ](https://kiselblat.github.io/).