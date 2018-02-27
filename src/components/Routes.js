import React, { Component } from 'react';
import Route from './Route';

class Routes extends Component {

  render() {

    let { routes, vehicles } = this.props;
    
    return (
    <g className="Routes">
      {
        this.props.routes.map((route, idx) => {
          return <Route key={idx} route={route} vehicles={this.props.vehicles[route]}/>;
        })
      }
    </g>
    );
  }
}

export default Routes;
