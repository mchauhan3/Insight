import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

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

class DisplayProgress extends Component {


  render() {

    const { classes } = this.props;
    return (
      <div>
      <LineChart width={250} height={200} data={this.props.data.points}>
        <XAxis dataKey = "x"/>
        <YAxis/>
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
      </LineChart>
      </div>
    )

  }

}

DisplayProgress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayProgress);
