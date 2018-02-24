import React, { Component } from 'react';
import * as d3 from 'd3';
import Route from './Route';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: {
        '19': true,
        'F': false,
        'N': true
      }
    };    
  }


  render() {

    let shownRoutes = Object.keys(this.state.routes).filter((key) => {
      return this.state.routes[key];
    });
    
    return (
    <div>
      Routes Container

      {
        shownRoutes.map((route, idx) => {
          return <Route key={idx} name={route} />;
        })
      }
    </div>
    );
  }
}

export default Routes;
