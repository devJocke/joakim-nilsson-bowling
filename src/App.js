import React from 'react';
import './App.css';
import BowlingTables from './indexComponents/BowlingTables.js';
import Button from '@material-ui/core/Button';

function App() {

  return (
    <div className="App">
      <header className="App-header">

      <h3> Scored XXX</h3>
        <Button variant="contained" color="primary">
          Play
        </Button>
        <h3>Player 1</h3>
        <BowlingTables />

        <h3>Player 2</h3>
        <BowlingTables />
      </header>
    </div>
  );
}

export default App;
