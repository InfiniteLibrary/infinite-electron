import React from 'react';
import { Link } from 'react-router';
import './Book.scss';

const Book = ({ book }) => (
  <div className="book__container">
    <Link to={`/${book.id}`} >
      <img
        className="book__image"
        alt={book.title}
        src={book.cover}
      />
    </Link>
    <div className="book__info">
      <p className="book__title">{book.title}</p>
      <p className="book__author">{book.author}</p>
    </div>
  </div>
);

export default Book;
