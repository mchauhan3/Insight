import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputRow from './InputRow'
import Chip from '@material-ui/core/Chip';
import Display from './Display';
import DisplayEmotion from './DisplayEmotion';
import DisplayProgress from './DisplayProgress';
import DisplayPie from './DisplayPie';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2.3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 240
  },
  paperTop: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 530
  }
});

class Dashboard extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      data: '',
      loaded: false
    }

    this.onDataChanged = this.onDataChanged.bind(this);
  }

  onDataChanged(newData) {
    this.setState({data: newData, loaded: true});
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <InputRow data={this.state.data} onDataChanged = {this.onDataChanged}/>
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper className={classes.paperTop}>
              {this.state.loaded ? (<Chip
                label={`Overall Score: ${this.state.data.data.score}`}
                color="primary"
              />) : (<Chip
                label="Overall Score"
                color="primary"
              />)
              }
              <br/>
              <br/>
              {this.state.loaded ? (
                <DisplayPie data = {this.state.data.data.sentiment_dict} />
              ) : <br/>}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing = {8}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Chip
                    label="Progress"
                    color="primary"
                  />
                  <br/>
                  <br/>
                  {this.state.loaded ? (
                    <DisplayProgress data = {this.state.data.data.sent_aranges} />
                  ) : <br/>}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Chip
                    label="Positive Keywords"
                    color="primary"
                  />
                  <br/>
                  <br/>
                  {this.state.loaded ? (
                    <Display data = {this.state.data.data.good_keywords} />
                  ) : <br/>}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing = {8}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Chip
                    label="Top Emotions"
                    color="primary"
                  />
                  <br/>
                  <br/>
                  {this.state.loaded ? (
                    <DisplayEmotion data = {this.state.data.data.emotions} />
                  ) : <br/>}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Chip
                    label="Negative Keywords"
                    color="primary"
                  />
                  <br/>
                  <br/>
                  {this.state.loaded ? (
                    <Display data = {this.state.data.data.bad_keywords} />
                  ) : <br/>}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
            <Chip
                label="Top Colleges"
                color="primary"
              />
              <br/>
              <br/>
              {this.state.loaded ? (
                <Display data = {this.state.data.data.colleges} />
              ) : <br/>}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
            <Chip
                label="Top Interests"
                color="primary"
              />
              <br/>
              <br/>
              {this.state.loaded ? (
                <Display data = {this.state.data.data.categories} />
              ) : <br/>}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
            <Chip
                label="Top Concepts"
                color="primary"
              />
              <br/>
              <br/>
              {this.state.loaded ? (
                <Display data = {this.state.data.data.concepts} />
              ) : <br/>}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
            <Chip
                label="Top Entities"
                color="primary"
              />
              <br/>
              <br/>
              {this.state.loaded ? (
                <Display data = {this.state.data.data.entities} />
              ) : <br/>}
            </Paper>
          </Grid>
        </Grid>
      </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
