// alert("Are You Ready To Rumble!!??");
// Global Var
// =================================================================
// array
var wordOptions = ["goku", "vegeta", "krillin", "bulma", "gohan", "piccolo", "trunks"]
var selectedWord = "";
var lettersinWord = [];
var numBlank = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];
var isLetterInWord = false;

// game counters
var winCounter = 0;
var lossCounter = 0;
var guessesLeft = 9;

// Functions 
// ===================================================================

function wordPick() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlank = lettersinWord.length;

    console.log(selectedWord);
}

function startGame() {
    // selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    // lettersinWord = selectedWord.split("");
    // numBlank = lettersinWord.length;

    // populate blanks for letters
    for (var i = 0; i < numBlank; i++) {
        blanksAndSuccesses.push("_")
    }
    //adding JS to HTML
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCounter;
    document.getElementById("lossCounter").innerHTML = lossCounter;

    // resets
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // consolelog
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlank);
    console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
    //  check if letter is in 
    // alert(letter);
    

    for (var i = 0; i < numBlank; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
            // alert("Letter Found");
        }
    }
    // where letter is and populate
    if (isLetterInWord) {
        for (var i = 0; i < numBlank; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
                document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
            }
        }
    } else {
        wrongLetters.push(letter);
        numGuesses--;
    }

    // test
    console.log(blanksAndSuccesses);

   
}

function roundComplete() {
    console.log("Win Count: " + winCounter + " | Loss Count: " + lossCounter + " | Guesses Left" + guessesLeft);
    // update HTML to reflect
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    // check in win
    if (isLetterInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Win!!");
        // update win in HTML
        document.getElementById("winCounter").innerHTML = winCounter;

        startGame();
        roundComplete();
    }
    // check is loss
    else if (numGuesses) {
        lossCounter++;
        alert("You Lost!");

        // update HTML
        document.getElementById("lossCounter").innerHTML = lossCounter;
        startGame();
        roundComplete();
    }
}


// Main process 
// ======================================================================

startGame();
wordPick();


// keyclicks
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    // alert(letterGuessed);
    console.log(letterGuessed);

    // roundComplete();
}