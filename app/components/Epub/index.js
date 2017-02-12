import React, { Component } from 'react';
import ePub from 'epubjs';
import styles from './styles';
import './Epub.scss';

class Epub extends Component {

  constructor(props) {
    super(props);
    this.book = ePub();
  }

  componentWillMount() {
    // const { id } = this.props.book;
    this.book.open(this.props.src)
      .then(() => {
        console.log('OPEN');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.rendition = this.book.renderTo('stage', {
      flow: this.props.flow || 'paginated',
      minSpreadWidth: 550,
      width: '100%',
      height: '100%',
      manager: ePub.ViewManagers.default,
      view: ePub.Views.iframe
    });

    this.rendition.themes.register('http://localhost:3300/static/epub.css');
    this.rendition.themes.apply('book-theme');

    this.rendition.display(this.props.location || 0);

    this.rendition.on('locationChanged', (visibleLocation) => {
      this._visibleLocation = visibleLocation;

      if (this.props.onLocationChange) {
        this.props.onLocationChange(visibleLocation);
      }
    });

    this.book.ready.then(() => {
      this.props.onReady && this.props.onReady(this.book)
    });

    this.book.loaded.navigation.then((nav) => {
      this.props.onNavigationReady && this.props.onNavigationReady(nav.toc)
    });

    let keyListener = (e) => {

			// Left Key
			if ((e.keyCode || e.which) == 37) {
				this.rendition.prev();
			}

			// Right Key
			if ((e.keyCode || e.which) == 39) {
				this.rendition.next();
			}

		};

		this.rendition.on("keyup", keyListener);
		document.addEventListener("keyup", keyListener, false);
  }

  render() {
    return (
      <div className="epub__container">
        <button
          className="epub__container__button"
          onClick={() => this.rendition.prev()}
        >
          <i className="fa fa-chevron-left" />
        </button>
        <div id="stage" />
        <button
          className="epub__container__button"
          onClick={() => this.rendition.next()}
        >
          <i className="fa fa-chevron-right" />
        </button>
      </div>
    );
  }
}

export default Epub;
