var Letter = require('./letter.js')

function Word(wrd) {
  this.word = wrd
  this.letters = []
  this.wordFound = false

  this.getLetters = function () {
      for (var i = 0; i < this.word.length; i++) {
          var newLetter = new Letter(this.word[i]);
          this.letters.push(newLetter);
      }
  }

  this.wordCheck = function () {
    if (this.letters.every(function (lttr) {
        return lttr.appear === true;
    })) {
        this.wordFound = true;
        return true;
    }
  }

  this.letterCheck = function (pozo) {
    var whatToReturn = 0
    this.letters.forEach(function(lttr) {
      if(lttr.letter === pozo){
        lttr.appear = true
        whatToReturn++
      }
    })
    return whatToReturn
  }

  this.wordRender = function() {
    var mostrar = ''
    this.letters.forEach(function(lttr){
      var currentLetter = lttr.letterRender()
      mostrar+= currentLetter
    })
    return mostrar
  }
}

module.exports = Word