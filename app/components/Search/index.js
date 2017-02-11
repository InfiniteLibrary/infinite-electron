import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    return (
      <p className="control has-icon">
        <input className="input is-large" type="text" placeholder="Search for a book..." />
        <span className="icon is-medium">
          <i className="fa fa-search" />
        </span>
      </p>
    );
  }
}
