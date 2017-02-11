import React, { Component } from 'react';
import Home from '../components/Home';

export default class HomePage extends Component {
  render() {
    return (
      <Home
        showFeatured={!!this.props.location.query.showFeatured}
        books={this.props.books}
      />
    );
  }
}
