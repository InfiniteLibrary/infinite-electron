import React, { Component } from 'react';
import { Link } from 'react-router';
import './BookDetails.scss';

export default class BookDetails extends Component {
  render() {
    const book = this.props.book;
    console.log(this.props.book);

    const bookSummary = {
      __html: book.summary || 'No Description Available.' };

    return (
      <div className="book-details">
        <div className="book-details__back-link">
          <Link to="/">
            <i className="fa fa-close" />
          </Link>
        </div>

        <div className="book-details__cover">
          <img alt={book.title} src={book.image} className="book-details__cover__image" />
        </div>
        <div className="book-details__info">
          <h1 className="book-details__info__title">{book.title}</h1>
          <h2 className="book-details__info__author">by {book.author.name || book.author}</h2>
          <h4 className="book-details__info__meta" />
          <p dangerouslySetInnerHTML={bookSummary} className="book-details__info__description" />
          {
            book.category.length > 0 &&
            <p className="book-details__info__subjects">
              {book.category.join(', ')}
            </p>
          }
          <div className="book-details__info__buttons">
            <Link className="button" to={`/read/${book.id}`}>Start Reading</Link>
            <a className="button" href="">Add to My Books</a>
          </div>
        </div>
      </div>
    );
  }
}
