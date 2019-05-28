import React from 'react';
import './App.css';
import BowlingTable from './indexComponents/BowlingTable.js';
import Button from '@material-ui/core/Button';
import HandlePlayers from './models/HandlePlayers';
import { Fade } from '@material-ui/core';
import bowlingPin from './images/bowling-pin.png';

function App() {

  let player1 = new HandlePlayers();
  let player2 = new HandlePlayers();

  window.onload = function () {
    document.getElementById("playButton2").innerText = "Throw"
    document.getElementById("playButton2").disabled = true;
  }

  return (
    <div className="App">
      <header className="App-header">

        <Fade in={true} timeout={500} style={{ width: "100%" }} >
          <div>
            <div>
              <h3>Bowling Game</h3>
              <img id="imgSourceplayer1" alt="bowlingpin" src={bowlingPin} />
              <h5 >Friendly reminder  - Do not cross foul line</h5>
              <img id="imgSourceplayer2" alt="bowlingpin" src={bowlingPin} />
              <hr></hr>
            </div>
            <h3 id="gameInfoDisplay">&#8205;</h3>

            <h3>Player 1</h3>

            <Button id="playButton1" variant="contained" color="primary" onClick={() => player1.randomizeNumber("player1")}>
              Throw
            </Button>
            <div id="player1Foreground" className="foreground">
              <BowlingTable player="player1" />
            </div>

            <h3>Player 2</h3>

            <Button id="playButton2" variant="contained" color="primary" onClick={() => player2.randomizeNumber("player2")} >
              Throw
           </Button>

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
