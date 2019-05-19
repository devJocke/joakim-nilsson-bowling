import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class BowlingTables extends Component {

  render() {

    const nrOfTurns = 10;
    const gridItems = [];

    for (let count = 1; count <= nrOfTurns; count++) {

      gridItems.push(
        <Grid item xs={1} style={{ 'paddingRight': '6px' }} >

          <Paper square={true} className="turn-and-total-score">{count}</Paper>

          {count == 10 ?
            <Grid container >
              {getGridRowWithSize(4, 3)}
            </Grid>
            :
            <Grid container>
              {getGridRowWithSize(6, 2)}
            </Grid>}

          <Paper id="total" square={true} className="turn-and-total-score" >{count}</Paper>

        </Grid >
      );
    }

    return (
      <div style={{ 'width': '100%' }}>
        <Grid container style={{ 'justify-content': 'center' }}>
          {gridItems}
        </Grid>
      </div>
    );
  }
}

function getGridRowWithSize(gridSize, numberOfRows) {
  const array = [];

  for (let index = 0; index < numberOfRows; index++) {
    array.push(
      <Grid item sm={gridSize} style={{ 'width': '100%' }}  >
        <Paper square={true}> {'X'}</Paper>
      </Grid>
    );
  }
  return array;
}
export default BowlingTables;