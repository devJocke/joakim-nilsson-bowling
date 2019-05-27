import React from 'react';
import './App.css';
import BowlingTable from './indexComponents/BowlingTable.js';
import Button from '@material-ui/core/Button';
import HandlePlayers from './models/HandlePlayers';

function App() {

  let player1 = new HandlePlayers();
  let player2 = new HandlePlayers();

  window.onload = function(){
    document.getElementById("playButton2").innerText = "player 2" 
    document.getElementById("playButton2").disabled = true; 
  }
  
  return (
    <div className="App">
      <header className="App-header">

        <h3>Scored XXX</h3>
        <Button id="playButton1" variant="contained" color="primary" onClick={() => player1.randomizeNumber("player1")}>
          Player 1
        </Button>
        <h3>Player 1</h3>
        <BowlingTable player="player1" />

        <Button id="playButton2" variant="contained" color="primary" onClick={() => player2.randomizeNumber("player2")}>
          Player 2
        </Button>

        <h3>Player 2</h3>
        <BowlingTable player="player2" />
      </header>
    </div>
  );
}

export default App;
