// utils
const replaceAt = (string, index, replace) => `${string.substring(0, index)}${replace}${string.substring(index + 1)}`;

$(document).ready(function () {
    // var $ = function (id) {
    //     return document.getElementById(id);
    // }

    // var and rules
    const game = ["Goku", "Vegeta", "Krillin", "Bulma", "Piccolo", "Cell", "Cell", "Gohan" ];
    const choice = Math.floor(Math.random() * 5);
    const answer = game[choice];
    // var myLength = game.length;
    var display = "";
    // var win = myLength;
    const letters = answer.split('');
    let attemptsLeft = letters.length-2;
    let userLetter = "";
    let output = "";
    let win = 0;
    let aText = '';
    // _ _ _ _ blank spaces for words
    const setup = function () {
        for (const letter of letters) {
            output = `${output}_`;
        }
        $("#game").text(output);
        console.log('initial output', output, answer, letters);
    }
    // submitting letters for word guesses
    const submit = function () {

        output = "";
        userLetter = $(letter).val();
        $(letter).val() = "";
        // store user input somewhere. 

    }

    const handleShowLetter = letter => {
        let hasUpdatedOutput = false;
        if (answer.toLowerCase().includes(letter)) {
            // modify output to show found letters
            let foundIndicies = [];
            for (const [index, val] of letters.entries()) {
                console.log('index', val, index);
                if (val.toLowerCase() === letter) {
                    output = replaceAt(output, index, letter);
                    console.log('new output', output);
                    hasUpdatedOutput = true;
                }
            }
        } else {
            handleMissedLetter(letter);
        }
        if (hasUpdatedOutput) {
            $('#game').text(output);
        }
        checkForWin();
    }
    const handleMissedLetter = letter => {
        attemptsLeft--;
        console.log('attempts left', attemptsLeft);
    }
    const checkForWin = () => {
        if (output.toLowerCase() === answer.toLowerCase()) {
            console.log('they won!');
            // reset game? or do whatever.
            $("#guesses").text("YOU WIN!!");
            return;
           
        }

       if (attemptsLeft === 0) {
           console.log('they lose, restart');
            $("#guess").text("YOU LOSE");
            $('#guesses').text('');
       }
       else {
            $("#guesses").text("You have " + attemptsLeft + " guesses left to make..");
       }
    }

    document.onkeypress = function (event) {
        const keyPressed = event.key.toLowerCase();
        aText += keyPressed;
        $('#guess').text(aText);
        console.log(keyPressed);
        handleShowLetter(keyPressed);
    };

    setup();
})