import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  root: {
    flexWrap: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 1,
    width: 270
  }
})

class DisplayEmotion extends Component {
  render() {

  const { classes } = this.props;

  return (
  <div>
    <Grid container direction="column" spacing={8}>
      <Grid item xs = {2.4}>
        <Paper className = {classes.paper}>
          <Grid container spacing={8}>
          <Grid item xs = {3}>
            Sadness:
          </Grid>
          <Grid item xs = {9}>
          <LinearProgress color="secondary" variant="determinate" value={this.props.data.sadness} />
          </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs = {2.4}>
        <Paper className = {classes.paper}>
          <Grid container spacing={8}>
          <Grid item xs = {3}>
            Joy:
          </Grid>
          <Grid item xs = {9}>
          <LinearProgress color="secondary" variant="determinate" value={this.props.data.joy} />
          </Grid>
          </Grid>
        </Paper>
      </Grid><Grid item xs = {2.4}>
        <Paper className = {classes.paper}>
          <Grid container spacing={8}>
          <Grid item xs = {3}>
            Fear:
          </Grid>
          <Grid item xs = {9}>
          <LinearProgress color="secondary" variant="determinate" value={this.props.data.fear} />
          </Grid>
          </Grid>
        </Paper>
      </Grid><Grid item xs = {2.4}>
        <Paper className = {classes.paper}>
          <Grid container spacing={8}>
          <Grid item xs = {3}>
            Disgust:
          </Grid>
          <Grid item xs = {9}>
          <LinearProgress color="secondary" variant="determinate" value={this.props.data.disgust} />
          </Grid>
          </Grid>
        </Paper>
      </Grid><Grid item xs = {2.4}>
        <Paper className = {classes.paper}>
          <Grid container spacing={8}>
          <Grid item xs = {3}>
            Anger:
          </Grid>
          <Grid item xs = {9}>
          <LinearProgress color="secondary" variant="determinate" value={this.props.data.anger} />
          </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </div>
)
}

}

DisplayEmotion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayEmotion);
