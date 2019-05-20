let currentPlayer = "player1";
let pinsLeft = 10;
let throwCounter = 1;
let frame = 1;


export function randomizeNumber() {
    //Math.random begins at 0 so we need to increase number +1 to be able to miss the shots entirely 
    pinsLeft = Math.floor(Math.random() * (pinsLeft + 1));
    //If all pins are down check if its the first or second throw
    if (pinsLeft === 0) {
        //If its the first then a strike has been made
        checkAndAssignScoreIfSpareOrStrike();
        //Proceed by resetting the pins and change to the next player 
        if (frame !== 10) {
            changePlayerTurn();
        }

    }

    //If an open frame has been made, proceed displaying the remaining pins
    else if (throwCounter === 1) {
        assignScore(pinsLeft);
        throwCounter = 2;
    }
    //If the player is on his second throw proceed by resetting the pins and change to the next player
    else {
        assignScore(pinsLeft);
        changePlayerTurn();

    }
    //Set the remaning pins for new randomization
    pinsLeft = 10 - pinsLeft;
    //TODO MISSA
    //TODO END GAME
}

function checkAndAssignScoreIfSpareOrStrike() {

    if (throwCounter === 1) {
        assignScore("X");
    }
    //If its the first then a spare-strike has been made 
    else if (throwCounter === 2 && frame !== 10) {
        assignScore("/");
    }
    if (frame === 10) {
        switch (throwCounter) {
            case 1:
                throwCounter = 2;
                break;
            case 2:
                assignScore("/");
                throwCounter = 3;
                break;
            case 3:
                assignScore("X");
                changePlayerTurn();
                break;
            default:
                break;
        }
    }
}

let lastVal = 0;
function assignScore(value) {
    if (lastVal === 0) {
        lastVal = value;
    } else {
        document.getElementById(currentPlayer + "score" + frame).innerHTML = lastVal + value;
        lastVal = 0;
    }
    document.getElementById(currentPlayer + frame + throwCounter).innerHTML = value == null ? pinsLeft : value;
}

function changePlayerTurn() {

    if (currentPlayer === "player1") {
        currentPlayer = "player2";
        document.getElementById("playButton").innerText = "player2";
    } else {
        currentPlayer = "player1";
        document.getElementById("playButton").innerText = "player1";
        if (frame !== 10) {
            frame++;
        }
    }
    throwCounter = 1;
}
