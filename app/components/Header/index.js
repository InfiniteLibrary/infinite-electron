import React from 'react';
import Search from '../Search';
import './Header.scss';

const Header = () => (
  <nav className="nav has-shadow is-fixed">
    <div className="nav-left">
      <a className="header__logo" href="">∞</a>
    </div>
    <div className="nav-center">
      <a className="nav-item is-tab is-active" href="">My Books</a>
      <a className="nav-item is-tab" href="">Featured Titles</a>
      <a className="nav-item is-tab" href="">Search for Books</a>
    </div>
    <div className="nav-right">
      <a className="nav-item header__help-link is-tab" href="">About</a>
    </div>
  </nav>
);

export default Header;
