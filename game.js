  alert("Are You Ready To Rumble!!??");
      // Global Var
      // =================================================================
      // array
const constants = {
    GUESSES_LEFT: 9,
  };

  var wordOptions = [
    "goku",
    "vegeta",
    "krillin",
    "bulma",
    "gohan",
    "piccolo",
    "trunks",
  ];
  var selectedWord = "";
  var lettersinWord = [];
  var selectedWordLength = 0;
  var blanksAndSuccesses = [];
  var wrongLetters = [];

  // game counters
  var winCounter = 0;
  var lossCounter = 0;
  var guessesLeft = constants.GUESSES_LEFT;

  // Functions
  // ===================================================================

  function selectRandomWord() {
    selectedWord =
      wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    selectedWordLength = lettersinWord.length;

    console.log(selectedWord);
  }

  function resetInputs() {
    blanksAndSuccesses = [];
    wrongLetters = [];
    guessesLeft = constants.GUESSES_LEFT;
  }

  function startGame() {
    // selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    // lettersinWord = selectedWord.split("");
    // selectedWordLength = lettersinWord.length;

    resetInputs();
    selectRandomWord();

    // populate blanks for letters
    for (var i = 0; i < selectedWordLength; i++) {
      blanksAndSuccesses.push("_");
    }
    //adding JS to HTML
    document.getElementById(
      "wordToGuess"
    ).innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCounter;
    document.getElementById("lossCounter").innerHTML = lossCounter;

    // consolelog
    console.log("selectedWord", selectedWord);
    console.log(lettersinWord);
    console.log(selectedWordLength);
    console.log(blanksAndSuccesses);
  }

  function checkLetters(letter) {
    //  check if letter is in
    // alert(letter);
    let isLetterInWord = false;

    for (var i = 0; i < selectedWordLength; i++) {
      if (selectedWord[i] === letter) {
        isLetterInWord = true;
        // alert("Letter Found");
      }
    }
    // where letter is and populate
    if (isLetterInWord) {
      for (var i = 0; i < selectedWordLength; i++) {
        if (selectedWord[i] == letter) {
          blanksAndSuccesses[i] = letter;
          document.getElementById(
            "wordToGuess"
          ).innerHTML = blanksAndSuccesses.join(" ");
        }
      }
    } else {
      console.log("wrong letter", letter, guessesLeft);
      wrongLetters.push(letter);
      guessesLeft--;
    }

    // this is weird - the naming should be more like checkForWin
    roundComplete();

    // test
    console.log({ blanksAndSuccesses });
  }

  function roundComplete() {
    // check in win
    if (blanksAndSuccesses.join("") === selectedWord) {
      winCounter++;
      document.getElementById('winMusic').play();
      alert("You Win!!");
      // update win in HTML
      document.getElementById("winCounter").innerHTML = winCounter;

      startGame();
    }
    // check is loss
    else if (guessesLeft === 0) {
      lossCounter++;
      alert("You Lost!");

      // update HTML
      document.getElementById("lossCounter").innerHTML = lossCounter;

      startGame();
    }

    console.log(
      "Win Count: " +
        winCounter +
        " | Loss Count: " +
        lossCounter +
        " | Guesses Left" +
        guessesLeft
    );
    // update HTML to reflect
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById(
      "wordToGuess"
    ).innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(
      " "
    );
  }

  // Main process
  // ======================================================================

  startGame();

  // keyclicks
  document.onkeyup = function(event) {
    // check for actual letters only so misc keys don't count
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
      checkLetters(letterGuessed);
    }

    // alert(letterGuessed);
    console.log(letterGuessed);

    // roundComplete();
  };