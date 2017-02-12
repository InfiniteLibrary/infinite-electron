import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    value: ''
  }

  handleChange({ target }) {
    this.setState({ value: target.value });
    this.props.search(target.value);
  }

  render() {
    return (
      <p className="control has-icon has-icon-right">
        <input
          value={this.state.value}
          onChange={this.handleChange}
          className="input"
          type="text"
          placeholder="Search for a book..."
        />
        <span className="icon is-small">
          <i className="fa fa-search" />
        </span>
      </p>
    );
  }
}
