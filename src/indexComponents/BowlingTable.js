import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'

class BowlingTables extends Component {

  render() {

    const numberOfFrames = 10;
    const gridItems = [];

    for (let currentFrame = 1; currentFrame <= numberOfFrames; currentFrame++) {
 
      gridItems.push(
        <Grid key={currentFrame} item xs={1} style={{ 'paddingRight': '6px' }} >

          <Paper square={true} className="turn-and-total-score">{currentFrame}</Paper>

          {currentFrame === 10 ?
            <Grid container >
              {getGridRowWithSize(4, 3, currentFrame, this.props.player)}
            </Grid>
            :
            <Grid container> 
              {getGridRowWithSize(6, 2, currentFrame, this.props.player)}
            </Grid>}

          <Paper id={(this.props.player + "score" + currentFrame).toString()} square={true} className="turn-and-total-score" >&#8205;</Paper>
        </Grid>
      );
      arrayWithScore = [];
    }
    return (
      <div style={{ 'width': '100%'}}>
        <Grid container style={{ 'justifyContent': 'center'}}>
          {gridItems}
        </Grid>
      </div>
    );
  }
}

let arrayWithScore = [];
function getGridRowWithSize(gridSize, numberOfRows, currentFrame, player) {

  for (let index = 1; index <= numberOfRows; index++) {

    if (numberOfRows === 3) {
      let newIndex = index - 1; 
      arrayWithScore.push(
        <Grid id={(player + currentFrame + newIndex).toString()} key={newIndex} item sm={gridSize} style={{ 'width': '100%' }}  >
          <Paper square={true}> &#8205;</Paper>
        </Grid>
      );
    }
    else {
      arrayWithScore.push( 
        <Grid id={(player + currentFrame + index).toString()} key={index} item sm={gridSize} style={{ 'width': '100%' }}  >
          <Paper square={true}> &#8205;</Paper>
        </Grid>
      );
    }
  }
  return arrayWithScore;
}

BowlingTables.propTypes = {
  player: PropTypes.string,
};
BowlingTables.defaultProps = {
  player: "",
};
export default BowlingTables;