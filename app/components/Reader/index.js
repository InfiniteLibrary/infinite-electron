import React, { Component } from 'react';
import ePub from 'epubjs';

class Reader extends Component {
  componentWillMount() {
    const { id } = this.props.book;
    this.reader = ePub(`http://localhost:3300/${id}`);
  }

  render() {
    console.log(this.reader);
    return (
      <div>hi</div>
    );
  }
}

export default Reader;
