import React, { Component } from 'react';
import BookDetails from '../components/BookDetails';

const book = {
  title: 'Anna Karenina',
  author: 'Leo Tolstoy',
  coverUrl: 'https://cdn.rawgit.com/plympton/rtc/master/rtc_books_resized/rtc_Anna+Karenina_Victoria+Fernandez.jpeg'
};

export default class BookDetailsPage extends Component {
  render() {
    return (
      <BookDetails book={book} />
    );
  }
}
