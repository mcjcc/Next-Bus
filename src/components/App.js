import React, { Component } from 'react';
import Map from './Map';

import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Real-Time MUNI Vehicle Locator</h1>
        <Map />
      </div>
    );
  }
}

export default App;
