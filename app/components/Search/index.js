import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    return (
      <p className="control has-icon has-icon-right">
        <input className="input" type="text" placeholder="Search for a book..." />
        <span className="icon is-small">
          <i className="fa fa-search" />
        </span>
      </p>
    );
  }
}
