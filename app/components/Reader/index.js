import React, { Component } from 'react';
import { Link } from 'react-router';
import Epub from '../Epub';
import getStreamHost from '../../utils/get-stream-host';
import './Reader.scss';

class Reader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "nav": [],
      "location" : 0
    };
  }

  _navigationReady(nav) {
    this.setState({ nav });
  }

  _onNavClick(item) {
    this.setState({location : item.href })
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
            <div>
            {
              this.state.nav.map((item, index) =>
                <a className="nav-item"
                  onClick={() => { this._onNavClick(item) }}>
                  {item.label}
                </a>
              )
            }
            </div>
          </div>
        </nav>
        <Epub
          src={`${getStreamHost()}/${book.id}/${download}/`}
          onNavigationReady={ this._navigationReady.bind(this) }
          onLocationChanged={(location) => console.log(location)}
          onReady={(book) => console.log("ready")}
          location={this.state.location}
        />
      </div>
    );
  }
}

export default Reader;
