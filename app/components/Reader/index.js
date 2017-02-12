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

  componentDidMount() {
    if (this.props.book) {
      let location = localStorage.getItem(`${this.props.book.id}-location`);

      if (location) {
        console.log("location is", location);
        this.setState({ ...this.state, location });
      }
    }
  }

  _navigationReady(nav) {
    this.setState({ ...this.state, nav });
  }

  _onNavClick(item) {
    this.setState({ ...this.state, location: item.href });
  }

  handleReady() {
    this.setState({ ...this.state, isLoading: false });
  }

  tocToggle() {
    let navMenu = document.getElementById('toc-nav');

    if (navMenu.classList.contains('is-visible')) {
      navMenu.classList.remove('is-visible');
    } else {
      navMenu.classList.add('is-visible');
    }

  }

  state = {
    isLoading: true,
    nav: [],
    location : 0
  };

  handleReady() {
    this.setState({ ...this.state, isLoading: false });
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
              this.state.nav.map((item, index) =>
                <li>
                  <a key={`navitem_${index}`}
                     className="reader__toc__item"
                     onClick={() => {
                         this._onNavClick(item)
                         this.tocToggle()
                       }}>
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
            <a className="nav-item" onClick={() => { this.tocToggle()}}>
              <span className="icon">
                <i className="fa fa-navicon" />
              </span>
            </a>
          </div>
        </nav>
        {this.state.isLoading && <Loader />}
        <Epub
          src={`${getStreamHost()}/${book.id}/${download}/`}
          onNavigationReady={ this._navigationReady.bind(this) }
          onLocationChange={(location) => {
            // console.log(location.start)
            localStorage.setItem(`${book.id}-location`, location.start);
          }}
          onReady={ this.handleReady.bind(this) }
          location={this.state.location}
        />
      </div>
    );
  }
}

export default Reader;
