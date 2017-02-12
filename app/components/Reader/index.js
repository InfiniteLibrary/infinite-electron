import React, { Component } from 'react';
import Epub from '../Epub';

class Reader extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <Epub ref="epub" src={`http://localhost:3300/alice/`} />
    );
  }
}

export default Reader;
