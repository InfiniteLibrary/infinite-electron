import fs from 'fs';
import path from 'path';
import React, { Component } from 'react';

let booksPath;
if (process.env.NODE_ENV === 'development') {
  booksPath = path.resolve('resources', 'books.json');
} else {
  booksPath = path.resolve(process.resourcesPath, 'books.json');
}

export default class App extends Component {
  state = {
    books: []
  };

  componentWillMount() {
    fs.readFile(booksPath, { encoding: 'utf8' }, (err, data) => {
      if (err) return console.error(err);
      this.setState({ books: JSON.parse(data) });
    });
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          books: this.state.books
        })}
      </div>
    );
  }
}
