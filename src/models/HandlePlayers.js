

import bowlingPinStrike from '../images/bowling-pin-strike.png';
import bowlingPin from '../images/bowling-pin.png'; 

export default class HandlePlayers {
    pinsKnockedDown = 10;
    currentPlayer = "player1";
    throwCounter = 1;
    frame = 1;
    strikeValue = 10;

    lastValue = 0;
    totalScore = 0;
    strikes = [];

    //For tests
    // firstTest = 2;
    // yes = false;
    randomizeNumber(playerName) {
        //Math.random begins at 0 so we need to increase number +1 to be able to miss the shots entirely 
        this.currentPlayer = playerName;
        this.pinsKnockedDown = Math.floor(Math.random() * (this.pinsKnockedDown + 1));

        //Smalltests
        // this.pinsKnockedDown = 5;
        // if (firstTest === 2 && yes === false) {
        //     this.pinsKnockedDown = 10;
        //     firstTest = 3;
        //     yes = true;
        // }
        // if (this.frame === 2 && yes === true) {
        //     this.pinsKnockedDown = 6;
        // }
        // if (this.frame === 2 && yes === false) {
        //     this.pinsKnockedDown = 1;
        //     yes = true;
        // }  
        // if (this.frame === 1 && firstTest === 2) {
        //     this.pinsKnockedDown = 10;
        // }
        // if (this.frame === 2 && this.throwCounter == 1) {
        //     this.pinsKnockedDown = 10;
        // }
        // if (this.frame === 1 && this.throwCounter === 1) {
        //     this.pinsKnockedDown = 10;
        // }
        // if (this.frame === 10 && this.throwCounter === 1) {
        //     this.pinsKnockedDown = 0;
        // }

        // if (this.frame === 10 && this.throwCounter == 2) {
        //     this.pinsKnockedDown = 10;
        // }

        //If all pins are down check if its the first or second throw
        if (this.pinsKnockedDown === 10) {

            //If we are at the end of the series and still getting strike / spares 
            if (this.frame >= 10) {
                this.assignScore(this.strikeValue);
                this.changeFrame(); 
                endGameIfMaxFrameValueIsSet();
                return;
            }

            if (this.throwCounter === 1) {
                this.assignScore(this.strikeValue);
                this.throwCounter = 2;
            } else if (this.throwCounter === 2) {
                this.assignScore(this.strikeValue);
            }
            this.changeFrame();

            //Proceed by resetting the pins and change to the next player    
        }
        //If an open this.frame has been made, proceed displaying the remaining pins
        else if (this.throwCounter === 1) {
            this.assignScore(this.pinsKnockedDown);
            this.throwCounter = 2;
        }
        //If the player is on his second throw proceed by resetting the pins and change to the next player
        else {
            this.assignScore(this.pinsKnockedDown);
            this.changeFrame();
        }
        //Set the remaning pins for new randomization
        this.pinsKnockedDown = 10 - this.pinsKnockedDown;
        endGameIfMaxFrameValueIsSet();
    }

    assignScore(value) {

        if (value === this.strikeValue) {
            if (this.throwCounter > 1) {
                this.strikes.push({ frame: this.frame, value: 0, throwsLeft: 1 });
                this.bonusHitHasBeenMade("/");
            } else {
                this.strikes.push({ frame: this.frame, value: 0, throwsLeft: 2 });
                this.bonusHitHasBeenMade("X");
            }
              
            document.getElementById("imgSource"+ this.currentPlayer).src = bowlingPinStrike;
        }

        if (this.strikes !== undefined && this.strikes.length !== 0) {
            this.loopThroughBonushits(value);
        }

        //If a strike has been made theres no reason to move beyond this 
        if (value === this.strikeValue) {
            return
        }


        // From this point we are not able to make a strike 
        if (this.throwCounter === 1 && this.frame >= 10) {
            let throwIndex = this.throwCounter - 1;
            document.getElementById(this.currentPlayer + this.frame + throwIndex).innerHTML = this.pinsKnockedDown;
        }
        //Wait for two throws to get value before adding them and presenting the final result for the this.frame. 
        else if (this.throwCounter === 2) {
            if (value + this.lastValue === 10) {

                this.strikes.push({ frame: this.frame, value: this.lastValue, throwsLeft: 1 });
                this.bonusHitHasBeenMade("/")
                if (this.strikes !== undefined && this.strikes.length !== 0) {
                    this.loopThroughBonushits(value);
                }
            } else {
                this.totalScore += value + this.lastValue;
                document.getElementById(this.currentPlayer + "score" + this.frame).innerHTML = this.totalScore;
                document.getElementById(this.currentPlayer + this.frame + this.throwCounter).innerHTML = value;
            }
        }
        else if (this.throwCounter === 3) {
            let throwIndex = this.throwCounter - 1;
            document.getElementById(this.currentPlayer + this.frame + throwIndex).innerHTML = value;

        }
        else {
            document.getElementById(this.currentPlayer + this.frame + this.throwCounter).innerHTML = value;
        }
        this.lastValue = value;
    }

    bonusHitHasBeenMade(symbol) {
        if (this.frame >= 10) {
            //Set the counter back one to fit the id element order 8,9,10 otherwise it would skip 10 and go straight to
            let throwIndex = this.throwCounter - 1;
            document.getElementById(this.currentPlayer + this.frame + throwIndex).innerHTML = symbol;
        }
        else {
            document.getElementById(this.currentPlayer + this.frame + this.throwCounter).innerHTML = symbol;
        }
    }

    loopThroughBonushits(value) {

        for (let index = 0; index < this.strikes.length; index++) {
            let element = this.strikes[index];
            element["value"] += value;


            if (element["throwsLeft"] === 0) {
                this.totalScore += element["value"];

                element = this.strikes[0];
                document.getElementById(this.currentPlayer + "score" + element["frame"]).innerHTML = this.totalScore;

                //Remove the first value from the array
                this.strikes.shift();
                //And remove one from loop index to match the new length of the array
                index = index - 1;
                document.getElementById("imgSource"+ this.currentPlayer).src = bowlingPin;
            }

            if (element["throwsLeft"] !== 0) {
                element["throwsLeft"] = element["throwsLeft"] - 1;
            }
        }
    }

    changeFrame() {

        let prevcount = this.throwCounter - 1;
        if (document.getElementById(this.currentPlayer + this.frame + prevcount).innerText === "/") {

        }
        else if (this.currentPlayer === "player1") {
            document.getElementById("playButton1").innerText = "Throw"
            enableDisablePlayerThrowButtons(true, false);
            fadePlayerBoard(0.5, 1.0);
        } else {
            this.currentPlayer = "player1";
            document.getElementById("playButton2").innerText = "Throw"
            enableDisablePlayerThrowButtons(false, true);
            fadePlayerBoard(1.0, 0.5);
        }
        if (this.frame >= 10 && this.throwCounter < 3) {
            this.throwCounter++;
        } else if (this.frame < 10) {
            this.throwCounter = 1;
            this.frame++;
        }
    }
}

function endGameIfMaxFrameValueIsSet() {
    if (document.getElementById("player2score10").innerText > 0) {
        fadePlayerBoard(1.0, 1.0);
        enableDisablePlayerThrowButtons(true, true);
        let player1Score = document.getElementById("player1score10").innerText
        let player2Score = document.getElementById("player2score10").innerText
        if (player1Score > player2Score) {
            document.getElementById("gameInfoDisplay").innerText = "Player 1 wins with the score " + player1Score;
        } else if (player1Score === player2Score) {
            document.getElementById("gameInfoDisplay").innerText = "TIE " + player1Score;
        } else if (player1Score < player2Score) {
            document.getElementById("gameInfoDisplay").innerText = "Player 2 wins with the score " + player2Score;
        } 
    }
}

function enableDisablePlayerThrowButtons(disableValuep1, disableValuep2) {
    document.getElementById("playButton1").disabled = disableValuep1;
    document.getElementById("playButton2").disabled = disableValuep2;
}

function fadePlayerBoard(opacityValuep1, opacityValuep2) {
    document.getElementById("player1Foreground").style.opacity = opacityValuep1;
    document.getElementById("player2Foreground").style.opacity = opacityValuep2;
}

