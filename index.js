var inquirer = require('inquirer');
var isLetter = require('is-letter');
var Word = require('./palabra.js');
var List = require('./lista.js');

var wordBank = List.newWord.wordList
var intentos = 10
var pozo = []
var mostrar = 0
var currentWord

startGame();

  function startGame() {
    console.log('')
    console.log('Bienvenido, espero te lo disfrutes!')
    console.log('')

    if(pozo.length > 0){
      pozo = []
    }
    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Listo para iniciar?"
    }]).then(function(answer) {
      if(answer.play){
        newGame()
      } else {
        console.log("Nos vemos");
      }
    })}

    function newGame() {
      if(intentos === 10) {
        var randNum = Math.floor(Math.random() * wordBank.length);
        currentWord = new Word(wordBank[randNum]);
        currentWord.getLetters();
        console.log(currentWord.wordRender());
        userPrompts();
      } else {
        resetGuessesRemaining();
        newGame();
      }
    }
    function resetGuessesRemaining() {
      intentos = 10;
    }
    function userPrompts() {
      inquirer.prompt([{
        name: "chosenLtr",
        type: "input",
        message: "Adivina una letra: ",
        validate: function(value) {
          if(isLetter(value)){
            return true;
          } else {
            return false;
          }
        }
      }]).then(function(ltr) {
        var letterReturned = (ltr.chosenLtr);
        var guessedAlready = false;
          for(var i = 0; i < pozo.length; i++){
            if(letterReturned === pozo[i]){
              guessedAlready = true;
            }
          }
          if(guessedAlready === false){
            pozo.push(letterReturned);

            var found = currentWord.letterCheck(letterReturned);

            if(found === 0){
              console.log("Incorrecta");
              intentos--;
              mostrar++;
              console.log("Intentos restantes: " + intentos);
              console.log("\n***************");
              console.log(currentWord.wordRender());
              console.log("\n***************");

              console.log("letras buscadas " + pozo);
            }else{
              console.log("Vas de maravilla");

                if(currentWord.wordCheck() === true){
                  console.log(currentWord.wordRender());
                  console.log("Felicidades Crack");
                } else {
                  console.log("Intentos restantes " + intentos);
                  console.log(currentWord.wordRender());
                  console.log("\n***************");
                  console.log("letras buscadas " + pozo);
                }
            }
            if(intentos > 0 && currentWord.wordFound === false) {
              userPrompts();
            }else if(intentos === 0){
              console.log("Oh oh, se termino la partida");
              console.log("La palabra que buscabas era: " + currentWord.word);

            }
          } else {
              console.log("Ya probaste esa letra, mejor intenta con otra");
              userPrompts();
          }
      })
    }


