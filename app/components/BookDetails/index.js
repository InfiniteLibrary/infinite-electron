import React, { Component } from 'react';
import { Link } from 'react-router';
import './BookDetails.scss';

export default class BookDetails extends Component {
  render() {
    const { title, coverUrl } = this.props.book;
    return (
      <div className="book-details">
        <Link to="/">
          <i className="fa fa-chevron-left" />
          Back to Overview
        </Link>

        <div className="book-details__cover">
          <img alt={title} src={coverUrl} className="book-details__cover__image" />
        </div>
        <div className="book-details__info">
          <h1 className="book-details__info__title">Moby Dick</h1>
          <h2 className="book-details__info__author">Herman Melville</h2>
          <h4 className="book-details__info__meta">Published by Project Gutenberg</h4>
          <p className="book-details__info__description">
            Nulla facilisi. Donec eros erat, molestie et dignissim in, pulvinar
            facilisis risus. Ut at nisl vitae odio malesuada ultrices vitae sit
            amet est. Cras feugiat neque sit amet elementum accumsan. Vestibulum
            pharetra a neque nec congue. Maecenas vel sollicitudin tortor, nec
            mattis mi. Praesent dui lorem, faucibus vitae purus semper, rhoncus
            tincidunt magna.
          </p>
          <p className="book-details__info__subjects"></p>
        </div>
      </div>
    );
  }
}
