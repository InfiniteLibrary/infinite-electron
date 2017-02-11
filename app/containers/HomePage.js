import React, { Component } from 'react';
import Home from '../components/Home';

const originals = [
  {
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    cover: 'https://cdn.rawgit.com/plympton/rtc/master/rtc_books_resized/rtc_Anna+Karenina_Victoria+Fernandez.jpeg'
  },
  {
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    cover: 'https://cdn.rawgit.com/plympton/rtc/master/rtc_books_resized/rtc_A+Tale+of+Two+Cities_Alexis+Lampley.jpg'
  },
  {
    title: 'Call of the Wild',
    author: 'Jack London',
    cover: 'https://cdn.rawgit.com/plympton/rtc/master/rtc_books_resized/rtc_Call+of+the+Wild_Michael+van+Kekem.jpeg'
  },
  {
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
    cover: 'https://cdn.rawgit.com/plympton/rtc/master/rtc_books_resized/rtc_The+Count+of+Monte+Cristo_Sara+Nauman.jpeg'
  }
];

// TODO: Remove me.
// Repeat the mock books 5 times:
let books = [];
for (let i = 0; i < 5; i++) books = books.concat(originals);
books = books.map(book => ({
  ...book,
  // Assign a random ID for now:
  id: Math.floor(Math.random() * 1000)
}));

export default class HomePage extends Component {
  render() {
    return (
      <Home books={books} />
    );
  }
}
