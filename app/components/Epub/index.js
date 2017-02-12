import React, { Component } from 'react';
import ePub, { Rendition, Layout } from 'epubjs';
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
      <div>
        <button onClick={() => this.rendition.prev()}>‹</button>
        <div id="stage"/>
        <button onClick={() => this.rendition.next()}>›</button>
      </div>
    );
  }
}

export default Epub;
