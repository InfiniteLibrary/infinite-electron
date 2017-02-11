import React from 'react';
import Book from '../Book';
import './Bookshelf.scss';

const Bookshelf = ({ books }) => (
  <section className="bookshelf__listing">
    {books.map(book => <Book
      key={book.id}
      book={book}
    />)}
  </section>
);

export default Bookshelf;
