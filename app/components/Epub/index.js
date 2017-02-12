import React, { Component, findDOMNode } from 'react';
import ePub from 'epubjs';
import getStreamHost from '../../utils/get-stream-host';
import './Epub.scss';

class Epub extends Component {

  constructor(props) {
    super(props);
    this.book = ePub();
    this._visibleLocation = 0;
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
    this._visibleLocation = this.props.location || 0;

    this._start();
  }


  componentWillUnmount() {
    this._stop();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.location !== this.props.location) {
      this._visibleLocation = nextProps.location;
      this.rendition.display(this._visibleLocation);
    }

    if (nextProps.theme !== this.props.theme) {
      this.rendition.themes.apply(nextProps.theme);
    }

    if (nextProps.fontSize !== this.props.fontSize) {
      this.rendition.themes.fontSize(nextProps.fontSize);
    }
  }

  display(what) {
    this.rendition && this.rendition.display(what);
  }

  _start() {
    this.rendition = this.book.renderTo('stage', {
      flow: this.props.flow || 'paginated',
      minSpreadWidth: 550,
      width: '100%',
      height: '100%',
      manager: ePub.ViewManagers.default,
      view: ePub.Views.iframe
    });

    this.rendition.themes.register(`${getStreamHost()}/static/epub.css`);
    this.rendition.themes.apply('book-theme');

    this.rendition.display(this._visibleLocation);

    this.rendition.on('locationChanged', (visibleLocation) => {
      this._visibleLocation = visibleLocation.start;

      if (this.props.onLocationChange) {
        this.props.onLocationChange(visibleLocation);
      }
    });

    this.book.loaded.navigation.then((nav) => {
      if (this.props.onNavigationReady) this.props.onNavigationReady(nav.toc);
    });

    this.keyListener = (e) => {
      // Left Key
      if ((e.keyCode || e.which) === 37) {
        this.rendition.prev();
      }

      // Right Key
      if ((e.keyCode || e.which) === 39) {
        this.rendition.next();
      }
    };

    this.book.ready.then(() => {
      if (this.props.onReady) this.props.onReady(this.book);
      this.rendition.on('keyup', this.keyListener);
      document.addEventListener('keyup', this.keyListener, false);
      window.addEventListener('resize', this._onResize.bind(this), false);
    });

    this.book.loaded.navigation.then((nav) => {
      if (this.props.onNavigationReady) this.props.onNavigationReady(nav.toc);
    });

  }

  _stop(){
    this.rendition.destroy();
    this.rendition.off('keyup', this.keyListener);
    document.removeEventListener('keyup', this.keyListener, false);
    window.removeEventListener('resize', this._onResize, false);
  }

  _onResize() {
    this._stop();
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this._start.bind(this), 250 );
  }

  render() {
    return (
      <div className="epub__container">
        <button className="epub__container__page-left" onClick={() => this.rendition.prev()} >
          <i className="fa fa-chevron-left" />
        </button>
        <div id="stage" />
        <button className="epub__container__page-right" onClick={() => this.rendition.next()} >
          <i className="fa fa-chevron-right" />
        </button>
      </div>
    );
  }
}

export default Epub;
