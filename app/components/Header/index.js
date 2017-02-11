import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import Search from '../Search';
import './Header.scss';

const Header = ({ showFeatured }) => (
  <nav className="nav has-shadow is-fixed">
    <div className="nav-left">
      <a className="header__logo" href="">∞</a>
    </div>
    <div className="nav-center">
      <Link
        className={cx('nav-item is-tab', { 'is-active': !showFeatured })}
        to="/"
      >
        My Books
      </Link>
      <Link
        className={cx('nav-item is-tab', { 'is-active': showFeatured })}
        to="/?showFeatured=true"
      >
        Featured Titles
      </Link>
    </div>
    <div className="nav-right">
      <div className="nav-item">
        <Search />
      </div>
    </div>
  </nav>
);

export default Header;
