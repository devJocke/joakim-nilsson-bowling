import React from 'react';
import './App.css';
import BowlingTable from './indexComponents/BowlingTable.js';
import Button from '@material-ui/core/Button';
import HandlePlayers from './models/HandlePlayers';
import { Fade } from '@material-ui/core';

function App() {

  let player1 = new HandlePlayers();
  let player2 = new HandlePlayers();

  window.onload = function () {
    document.getElementById("playButton2").innerText = "Player 2 Throw"
    document.getElementById("playButton2").disabled = true;
  }

  return (
    <div className="App">
      <header className="App-header">

        <Fade in={true} timeout={500} style={{ width: "100%" }} >
          <div>
            <h3 id="gameInfoDisplay">Scored XXX</h3>

            <Button id="playButton1" variant="contained" color="primary" onClick={() => player1.randomizeNumber("player1")}>
              Player 1 Throw
            </Button>

            <h3>Player 1</h3>

            <div id="player1Foreground" className="foreground">
              <BowlingTable player="player1" />
            </div>

            <Button id="playButton2" variant="contained" color="primary" onClick={() => player2.randomizeNumber("player2")} >
              Player 2 Throw
           </Button>

            <h3>Player 2</h3>

            <div id="player2Foreground" className="foreground" >
              <BowlingTable player="player2" />
            </div>
            
          </div>
        </Fade >
      </header>
    </div >
  );
}

export default App;
