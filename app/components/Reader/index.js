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
    this.handleNavReady = this.handleNavReady.bind(this);
  }

  state = {
    isLoading: true,
    nav: [],
    location: 0
  };

  handleNavReady(nav) {
    this.setState({ ...this.state, nav });
  }

  handleNavClick(item) {
    this.setState({ ...this.state, location: item.href });
  }

  handleReady() {
    this.setState({ ...this.state, isLoading: false });
  }

  tocToggle() {
    const navMenu = document.getElementById('toc-nav');

    if (navMenu.classList.contains('is-visible')) {
      navMenu.classList.remove('is-visible');
    } else {
      navMenu.classList.add('is-visible');
    }
  }

  render() {
    const { book } = this.props;
    const download = encodeURIComponent(book.download);
    return (
      <div className="reader__container">
        <div id="toc-nav" className="reader__toc">
          <ul>
            <h2>Table of Contents</h2>
            {
              this.state.nav.map(item =>
                <li key={item.id}>
                  <a
                    className="reader__toc__item"
                    onClick={() => {
                      this.handleNavClick(item);
                      this.tocToggle();
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              )
            }
          </ul>
        </div>
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
            <a className="nav-item" onClick={() => { this.tocToggle(); }}>
              <span className="icon">
                <i className="fa fa-navicon" />
              </span>
            </a>
          </div>
        </nav>
        {this.state.isLoading && <Loader />}
        <Epub
          src={`${getStreamHost()}/${book.id}/${download}/`}
          onNavigationReady={this.handleNavReady}
          onReady={this.handleReady}
          location={this.state.location}
        />
      </div>
    );
  }
}

export default Reader;
