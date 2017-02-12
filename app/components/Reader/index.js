import React, { Component } from 'react';
import { Link } from 'react-router';
import Epub from '../Epub';
import getStreamHost from '../../utils/get-stream-host';
import './Reader.scss';

class Reader extends Component {
  render() {
    const { book } = this.props;
    const download = encodeURIComponent(book.download);
    return (
      <div className="reader__container">
        <Link to="/">
          <i className="fa fa-chevron-left" />
        </Link>
        <Epub src={`${getStreamHost()}/${book.id}/${download}/`} />
      </div>
    );
  }
}

export default Reader;
