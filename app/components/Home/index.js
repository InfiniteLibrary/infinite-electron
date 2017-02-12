import React, { Component } from 'react';
import Bookshelf from '../Bookshelf';
import Header from '../Header';
import './Home.scss';

export default class Home extends Component {
  render() {
    let books;
    if (this.props.isSearching) {
      books = this.props.searchResults;
    } else if (this.props.showFeatured) {
      books = this.props.books.slice(0, 50);
    } else {
      books = this.props.books.filter(({ isOwn }) => isOwn);
    }

    return (
      <div className="main">
        <Header {...this.props} />
        <Bookshelf books={books} />
      </div>
    );
  }
}
