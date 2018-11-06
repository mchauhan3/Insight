import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 23,
    width: 270
  }
})

class Display extends Component {
  render() {

  const { classes } = this.props;

  return (
  <div>
    <Grid container direction="column" spacing={8}>
      <Grid item xs = {3}>
      {this.props.data[0] ?
        (<Paper className = {classes.paper}>
           {this.props.data[0]}
        </Paper>): ""}
      </Grid>
      <Grid item xs = {3}>
      {this.props.data[1] ?
        (<Paper className = {classes.paper}>
           {this.props.data[1]}
        </Paper>): ""}
      </Grid>
      <Grid item xs = {3}>
      {this.props.data[2] ?
        (<Paper className = {classes.paper}>
           {this.props.data[2]}
        </Paper>): ""}
      </Grid>
    </Grid>
  </div>
)
}

}

Display.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Display);
