import React from 'react';
import { Link } from 'react-router';
import notFoundImage from '../../not-found.png';
import './Book.scss';

const Book = ({ book }) => (
  <div className="Book__container">
    <Link to={`/${book.id}`} >
      <img
        className="Book__image"
        alt={book.title}
        src={book.image || notFoundImage}
      />
    </Link>
    <div className="Book__info">
      <p className="Book__title">{book.title}</p>
      <p className="Book__author">{book.author.name}</p>
    </div>
  </div>
);

export default Book;
