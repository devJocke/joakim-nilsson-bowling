import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class BowlingTables extends Component {

  render() {

    const nrOfTurns = 10;
    const gridItems = [];

    for (let count = 1; count <= nrOfTurns; count++) {

      let roundKey = count;
      gridItems.push(
        <Grid key={roundKey} item xs={1} style={{ 'paddingRight': '6px' }} >

          <Paper square={true} className="turn-and-total-score">{count}</Paper>

          {count === 10 ?
            <Grid container >
              {getGridRowWithSize(4, 3, roundKey)}
            </Grid>
            :
            <Grid container>
              {getGridRowWithSize(6, 2, roundKey)}
            </Grid>}

          <Paper id="total" square={true} className="turn-and-total-score" >{count}</Paper>

        </Grid >
      );
      arrayWithScore = [];
    }
    return (
      <div style={{ 'width': '100%' }}>
        <Grid container style={{ 'justifyContent': 'center' }}>
          {gridItems}
        </Grid>
      </div>
    );
  }
}

let arrayWithScore = [];
function getGridRowWithSize(gridSize, numberOfRows, roundKey) {

  for (let index = 1; index <= numberOfRows; index++) {
    arrayWithScore.push(
      //TODO:: FIXA TESTER
      <Grid id={roundKey + index} key={index} item sm={gridSize} style={{ 'width': '100%' }}  >
        <Paper square={true}> {"x"}</Paper>
      </Grid>
    );
    {/* console.log(roundKey);
    console.log(index); */}

  }
  return arrayWithScore;
}
export default BowlingTables;