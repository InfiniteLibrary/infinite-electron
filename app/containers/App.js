import fs from 'fs';
import path from 'path';
import lunr from 'lunr';
import React, { Component } from 'react';

let booksPath;
if (process.env.NODE_ENV === 'development') {
  booksPath = path.resolve('resources', 'books.json');
} else {
  booksPath = path.resolve(process.resourcesPath, 'books.json');
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  state = {
    books: []
  };

  componentWillMount() {
    this.index = lunr(function indexCreator() {
      this.field('title', { boost: 10 });
      this.field('author', { boost: 10 });
      this.ref('id');
    });

    fs.readFile(booksPath, { encoding: 'utf8' }, (err, data) => {
      if (err) return console.error(err);
      const books = JSON.parse(data);
      books.forEach(book => this.index.add(book));
      this.setState({ books });
    });
  }

  search(query) {
    if (!query || query.length < 3) {
      return this.setState({
        ...this.state,
        isSearching: false
      });
    }

    const results = this.index.search(query);
    const books = results.map(({ ref }) =>
      this.state.books.find(({ id }) => ref === id)
    );

    this.setState({
      ...this.state,
      isSearching: true,
      searchResults: books
    });
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          search: this.search,
          isSearching: this.state.isSearching,
          searchResults: this.state.searchResults || [],
          books: this.state.books
        })}
      </div>
    );
  }
}
