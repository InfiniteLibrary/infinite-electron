import React, { Component } from 'react';
import BookDetails from './BookDetails/index.js';

const coverUrl = 'https://raw.githubusercontent.com/GITenberg/Adventures-of-Huckleberry-Finn_76/master/cover.jpg';

export default class Home extends Component {
  render() {
    return (
      <div>
        <BookDetails coverUrl={coverUrl} />
      </div>
    );
  }
}
