import React, { Component } from 'react';
import BookDetails from '../components/BookDetails';

export default class BookDetailsPage extends Component {
  render() {
    const selected = this.props.books.find(book => book.id === Number(this.props.params.bookId));
    return (
      <BookDetails book={selected} />
    );
  }
}
