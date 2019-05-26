let currentPlayer = "player1";
let pinsKnockedDown = 10;
let throwCounter = 1;
let frame = 1;
const strikeValue = 10;

//For tests
// let firstTest = 2;
// let yes = false;

export function randomizeNumber() {
    //Math.random begins at 0 so we need to increase number +1 to be able to miss the shots entirely 

    pinsKnockedDown = Math.floor(Math.random() * (pinsKnockedDown + 1))

    //Smalltests
    // pinsKnockedDown =  5;
    // if (firstTest === 2 && yes === false) {
    //     pinsKnockedDown = 10;
    //     firstTest = 3;
    //     yes = true;
    // }
    // if (frame === 2 && yes === true) {
    //     pinsKnockedDown = 6;
    // }
    // if (frame === 2 && yes === false) {
    //     pinsKnockedDown = 1;
    //     yes = true;
    // }  
    // if (frame === 1 && firstTest === 2) {
    //     pinsKnockedDown = 10;
    // }
    // if (frame === 10) {
    //     pinsKnockedDown = 5;
    // } 


    //If all pins are down check if its the first or second throw
    if (pinsKnockedDown === 10) {

        //If we are at the end of the series and still getting strike / spares 
        if (frame >= 10) {
            assignScore(strikeValue);
            changePlayerTurn();
            return;
        }

        if (throwCounter === 1) {
            assignScore(strikeValue);
            throwCounter = 2;
        }
        changePlayerTurn();

        //Proceed by resetting the pins and change to the next player    
    }
    //If an open frame has been made, proceed displaying the remaining pins
    else if (throwCounter === 1) {
        assignScore(pinsKnockedDown);
        throwCounter = 2;
    }
    //If the player is on his second throw proceed by resetting the pins and change to the next player
    else {
        assignScore(pinsKnockedDown);
        changePlayerTurn();
    }
    //Set the remaning pins for new randomization
    pinsKnockedDown = 10 - pinsKnockedDown;
    //TODO END GAME
}

let lastValue = 0;
let totalScore = 0;
var strikes = [];

function assignScore(value) {

    if (value === strikeValue) {
        strikes.push({ frame: frame, value: 0, throwsLeft: 2 });
        bonusHitHasBeenMade("X");
    }

    if (strikes !== undefined && strikes.length !== 0) {
        loopThroughBonushits(value);
    }

//If a strike has been made theres no reason to move beyond this point
    if (value === strikeValue) {
        return
    }


    // From this point we are not able to make a strike 
    if (throwCounter === 1 && frame >= 10) {
        let throwIndex = throwCounter - 1;
        document.getElementById(currentPlayer + frame + throwIndex).innerHTML = pinsKnockedDown;
    }
    //Wait for two throws to get value before adding them and presenting the final result for the frame. 
    else if (throwCounter === 2) {
        if (value + lastValue === 10) {

            strikes.push({ frame: frame, value: lastValue, throwsLeft: 1 });
            bonusHitHasBeenMade("/")
            if (strikes !== undefined && strikes.length !== 0) {
                loopThroughBonushits(value);
            }
        } else {
            totalScore += value + lastValue;
            document.getElementById(currentPlayer + "score" + frame).innerHTML = totalScore;
            document.getElementById(currentPlayer + frame + throwCounter).innerHTML = value;
        }
    }
    else if (throwCounter === 3) {
        let throwIndex = throwCounter - 1;
        document.getElementById(currentPlayer + frame + throwIndex).innerHTML = value;
    }
    else {
        document.getElementById(currentPlayer + frame + throwCounter).innerHTML = value;
    }
    lastValue = value;
}

function bonusHitHasBeenMade(symbol) { 
    if (frame >= 10) {
        //Set the counter back one to fit the id element order 8,9,10 otherwise it would skip 10 and go straight to
        let throwIndex = throwCounter - 1;
        document.getElementById(currentPlayer + frame + throwIndex).innerHTML = symbol;
    }
    else {
        document.getElementById(currentPlayer + frame + throwCounter).innerHTML = symbol;
    }
}

function loopThroughBonushits(value) {

    for (let index = 0; index < strikes.length; index++) {
        let element = strikes[index];
        element["value"] += value;

        if (element["throwsLeft"] === 0) {
            totalScore += element["value"];

            element = strikes[0];
            document.getElementById(currentPlayer + "score" + element["frame"]).innerHTML = totalScore;

            //Remove the first value from the array
            strikes.shift();
            //And remove one from loop index to match the new length of the array
            index = index - 1;
        }

        if (element["throwsLeft"] !== 0) {
            element["throwsLeft"] = element["throwsLeft"] - 1;
        }
    }
}


function changePlayerTurn() {

    //#region start
    // if (currentPlayer === "player1") {
    //     currentPlayer = "player2";
    //     document.getElementById("playButton").innerText = "player2";
    // } else {
    //     currentPlayer = "player1";
    //     document.getElementById("playButton").innerText = "player1"; 
    // } 
    //#endregion

    if (frame >= 10 && throwCounter < 3) {
        throwCounter++;
    } else if (frame < 10) {
        throwCounter = 1;
        frame++;
    }
}
