import React, { Component } from 'react';
import { Link } from 'react-router';
import Epub from '../Epub';

class Reader extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <i className="fa fa-chevron-left" />
        </Link>
        <Epub src="http://localhost:3300/pg20154/" />
      </div>
    );
  }
}

export default Reader;
