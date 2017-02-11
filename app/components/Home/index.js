import React, { Component } from 'react';
import Bookshelf from '../Bookshelf';
import Header from '../Header';
import './Home.scss';

export default class Home extends Component {
  render() {
    let books;
    if (this.props.showFeatured) {
      books = this.props.books.slice(0, 50);
    } else {
      books = this.props.books.filter(({ isOwn }) => isOwn);
    }

    return (
      <div className="main">
        <Header showFeatured={this.props.showFeatured} />
        <Bookshelf books={books} />
      </div>
    );
  }
}
