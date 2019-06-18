# Word-Guess

1. [Installation and Requirements](##Installation-and-Requirements)
2. [How to Play](##How-to-Play)
3. [Overview](##Overview)
4. [About](##About)

A hangman style game library and implementation in javascript for both Web and command line for those who want that sort thing. The actual game takes the form of Compu-Guess, a battle of the minds between you, the user, and the machine, a super-intelligence that has emerged from cyberspace to make you guess words.

## Installation and Requirements

The Web version does not need to be installed anywhere. It can be run in your preferred browser by loading `index.html`.

The CLI version of Compu-Guess requires node.js to run. Find and install it from their [website](https://nodejs.org/en/). The `index.js` file itself depends on the `inquirer` `npm` package, install it with the included `package.json` file by running `npm i` from the command line.

The rest of the library: `Letter.js`, `Word.js`, and `Hangman.js` do not depend on any external packages.

## How to Play

The Web version of Compu-Guess can be played [here](https://kiselblat.github.io/Word-Guess) on almost any browser, or by loading `index.html` from the repository directly.

The web game takes input directly from the keyboard. The game will display a series of underscores prominantly, representing the unguessed word.

Type letters on the keyboard to guess, the game will ignore non-letter keys, letters that have already been revealed, and letters that have already been guessed.

---

Run the CLI version from the command line by entering:
```
node index.js
```
This will display the title, COMPU-GUESS and then a number of dashes representing the unguessed word. Below that is a prompt.

Enter one letter at a time. Non-letters and already guessed letters will cause the game to re-prompt the user.

---

Both versions of Compu-Guess give the player 10 wrong guesses, and will prompt the user to play a new game when the current one is concluded.

## Overview

Word-Guess is a web app and a small library of files that implements a game. The web version, contained in `assets/javascript/game.js` represents one of the author's earliest coding assignments.

The remaining files in `assets/javascript/` each define objects that share their filenames: `Letter.j`, `Word.js`, and `Hangman.js`. Each file depends the the preceeding one.

### `Letter.js`

A `Letter` object takes in and stores an a-z character and displays an underscore in its place until it has been guessed.

### `Word.js`

A `Word` is an array of `Letter` objects, and as such depends on the presences of `Letter.js` in the same directory. `Word` is also responsible for displaying itself with its `.toString` method.

### `Hangman.js`

A `Hangman` object takes in a `Word` and then provides a framework for accessing and guessing. A `Hangman` not only handles guessing through the `.guess` method which, unlike the `Word.guess(char)` function will report back `true`/`false` whether the guess was successful or not, but also stores guessed letters, and has a way of accessing the answer.
`Hangman` does not keep track of how many wrong guesses the player gets, or has left.

### `index.js`

This is file is what makes it Compu-Guess. `index.js` contains the game logic (including the number of wrong guesses), the list of potential words, and all the endgame messages.

## About

Word-Guess was developed based on an assignment in the University of Minnesota Full-Stack Web Developer Boot Camp program. This version of the assignment was authored entirely by me, [Thomas Christ](https://kiselblat.github.io/).