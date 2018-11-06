import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PieChart, Pie, Sector, Cell, Tooltip, Legend} from 'recharts';
import Grid from '@material-ui/core/Grid';

const COLORS = ['#00C49F', '#FF8042',  '#FFBB28'];

const RADIAN = Math.PI / 180;

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

class DisplayPie extends Component {


  render() {

    const { classes } = this.props;
    return (
      <div>
      <Grid container spacing = {16}>
      <Grid item xs = {4}>
      </Grid>
      <Grid item xs = {6}>
        <PieChart width={1000} height={1000} onMouseEnter={this.onPieEnter}>
          <Pie
            data={this.props.data}
            cx={120}
            cy={200}
            innerRadius={100}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            label
          >
          	{
            	this.props.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
          <Tooltip />
          </PieChart>
        </Grid>
        <Grid item xs = {2}>
        </Grid>
        </Grid>
      </div>
    )

  }

}

DisplayPie.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayPie);
