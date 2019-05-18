import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



class TableClass extends Component {

  render() {

    const nrOfTurns = 10;
    const turn = [];
  
    for (let count = 1; count <= nrOfTurns; count++) {
      turn.push(
        <Grid item xs={1} >

          <Paper square={true} style={{ 'padding': '12px' }}>{count}</Paper>
 
          {count == 10 ?
            <Grid container  >
              <Grid item xs={4}   >
                <Paper square={true}> {count}</Paper>
              </Grid>
              <Grid item xs={4}    >
                <Paper square={true}>{count}</Paper>
              </Grid>
              <Grid item xs={4}    >
                <Paper square={true}>{count}</Paper>
              </Grid>
            </Grid>
            :
            <Grid container  >
              <Grid item xs={6}   >
                <Paper square={true}> {count}</Paper>
              </Grid>
              <Grid item xs={6}    >
                <Paper square={true}>{count}</Paper>
              </Grid>
            </Grid>}
  
        <Paper square={true} style={{ 'padding': '12px' }}>{count}</Paper>
 
        </Grid >
      );
    }

    return (
      <div style={{ 'width': '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={1} ></Grid>
          {turn}
        </Grid>
      </div>
    );
  }
}
export default TableClass;