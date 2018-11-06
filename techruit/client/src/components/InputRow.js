import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Dashboard from './Dashboard'
import axios from 'axios'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

class InputRow extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      username : '',
      data: ''
    }
  };

  updateInput(event){
    this.setState({username : event.target.value})
  };

  onDataChanged(stuff) {
    this.props.onDataChanged(stuff);
  }
  showAlert() {
    axios
      .get('/api/gen/user/'+this.state.username)
      .then(res => this.onDataChanged(res));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <div className={classes.container}>
        <Input
          placeholder="TwitterHandle"
          className={classes.input}
          onChange={(evt) => this.updateInput(evt)}
          inputProps={{
            'aria-label': 'TwitterHandle',
          }}
        />
        <Button variant="contained" color="primary" onClick ={() => this.showAlert()}>
          Generate Report
        </Button>
      </div>
      <br></br>
      <br></br>
      </div>
    );
  };
};

InputRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputRow);
