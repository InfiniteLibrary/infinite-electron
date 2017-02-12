import React, { Component } from 'react';
import Reader from '../components/Reader';
import findBook from '../utils/find-book';

export default class ReaderPage extends Component {
  render() {
    const selected = findBook(this.props.books, this.props.params.bookId);
    return (
      <Reader book={selected} />
    );
  }
}
