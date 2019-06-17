var Word = require('./Word.js')
var inquirer = require("inquirer");

var WORDS = ["mississippi"];

var Hangman = function (word , guesses) {
  this.wrd = new Word(word);
  this.guesses = guesses;
}