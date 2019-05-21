import React from 'react';
import './App.css';
import BowlingTable from './indexComponents/BowlingTable.js';
import Button from '@material-ui/core/Button';
import { randomizeNumber } from './models/HandlePlayers';

function App() {

  return (
    <div className="App">
      <header className="App-header">

        <h3>Scored XXX</h3>

        <Button id="playButton" variant="contained" color="primary" onClick={randomizeNumber}>
          Player 1
        </Button>

        <h3>Player 1</h3>
        <BowlingTable player="player1" />

        <h3>Player 2</h3>
        <BowlingTable player="player2" />
      </header>
    </div>
  );
}

export default App;
