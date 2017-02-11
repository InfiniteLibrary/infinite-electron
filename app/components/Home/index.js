import React, { Component } from 'react';
import Bookshelf from '../Bookshelf';
import Header from '../Header';
import './Home.scss';

export default class Home extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <Bookshelf books={this.props.books} />
      </div>
    );
  }
}
