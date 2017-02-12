import React, { Component } from 'react';
import BookDetails from '../components/BookDetails';
import findBook from '../utils/find-book';

export default class BookDetailsPage extends Component {
  render() {
    const selected = findBook(this.props.books, this.props.params.bookId);
    return (
      <BookDetails book={selected} />
    );
  }
}
