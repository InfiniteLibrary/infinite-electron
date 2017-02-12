import React, { Component } from 'react';
import { Link } from 'react-router';
import Loader from '../Loader';
import Epub from '../Epub';
import getStreamHost from '../../utils/get-stream-host';
import './Reader.scss';

class Reader extends Component {
  constructor(props) {
    super(props);
    this.handleReady = this.handleReady.bind(this);
  }

  state = {
    isLoading: true
  };

  handleReady() {
    this.setState({ isLoading: false });
  }

  render() {
    const { book } = this.props;
    const download = encodeURIComponent(book.download);
    return (
      <div className="reader__container">
        <nav className="nav is-fixed">
          <div className="nav-left">
            <Link to="/" className="nav-item">
              <span className="icon">
                <i className="fa fa-chevron-left" />
              </span>
            </Link>
          </div>
          <div className="nav-center">
            <div className="nav-item">
              { this.props.book.title }
            </div>
          </div>
          <div className="nav-right">
            <div className="nav-item">
              <span className="icon">
                <i className="fa fa-navicon" />
              </span>
            </div>
          </div>
        </nav>
        {this.state.isLoading && <Loader />}
        <Epub
          onReady={this.handleReady}
          src={`${getStreamHost()}/${book.id}/${download}/`}
        />
      </div>
    );
  }
}

export default Reader;
