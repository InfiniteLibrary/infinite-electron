import React from 'react';
import './Book.scss';

const Book = ({ book }) => (
  <div className="Book__container">
    <img
      className="Book__image"
      alt={book.title}
      src={book.cover}
    />
    <div className="Book__info">
      <p className="Book__title">{book.title}</p>
      <p className="Book__author">{book.author}</p>
    </div>
  </div>
);

export default Book;
