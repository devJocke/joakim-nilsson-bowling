import React from 'react';
import './App.css';
import BowlingTables from './indexComponents/BowlingTables.js';
import Button from '@material-ui/core/Button';

function App() {

  return (
    <div className="App">
      <header className="App-header">

        <h3>Scored XXX</h3>

        <Button id="playButton" variant="contained" color="primary" onClick={randomiseNumber}>
          Player 1
        </Button>

        <h3>Player 1</h3>
        <BowlingTables />

        <h3>Player 2</h3>
        <BowlingTables />
      </header>
    </div>
  );
}

let tenpinsLeft = 10;
let throwCounter = 1;
let currentPlayer = 1;

function randomiseNumber() {
  //Math.random begins at 0 so we need to increase number +1 to be able to miss the shots entirely
  tenpinsLeft = Math.floor(Math.random() * (tenpinsLeft + 1));

  //If all tenpins are down check if its the first or second throw
  if (tenpinsLeft === 0) {
    //If its the first then a strike has been made
    if (throwCounter === 1) {
      console.log("PLAYER " + currentPlayer + " STRIKE    " + tenpinsLeft);
    }
    //If its the first then a half-strike has been made
    else if (throwCounter === 2) {
      console.log("PLAYER " + currentPlayer + " HALF-STRIKE    " + tenpinsLeft);
    }
    //Proceed by resetting the tenpins and change to the next player
    checkPlayerTurn();
  }
  //If no half/strike has been made proceed displaying the remaining tenpins
  else if (throwCounter === 1) {
    console.log("PLAYER " + currentPlayer + " FIRST BLOW     " + tenpinsLeft + " LEFT");
    throwCounter = 2;
  }
  //If the player is on his second throw proceed by resetting the tenpins and change to the next player
  else {
    console.log("PLAYER " + currentPlayer + " BLOW 2     " + tenpinsLeft + " LEFT");
    checkPlayerTurn();
  }
  //TODO MISSA
}

function checkPlayerTurn() {
  if (currentPlayer === 1) {
    currentPlayer = 2;
    document.getElementById("playButton").innerText = "player 2";
  } else {
    currentPlayer = 1;
    document.getElementById("playButton").innerText = "player 1";
  }
  tenpinsLeft = 10;
  throwCounter = 1;
}
export default App;
