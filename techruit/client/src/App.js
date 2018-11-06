import React, { Component } from 'react';
import './App.css';
import InputRow from './components/InputRow';
import Dashboard from './components/Dashboard';
import {Helmet} from 'react-helmet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <style>{'body { background-color: #eceff1; }'}</style>
        </Helmet>
        <Dashboard />
      </div>
    );
  }
}

export default App;
