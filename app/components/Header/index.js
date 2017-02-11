import React from 'react';
import Search from '../Search';
import './Header.scss';

const Header = () => (
  <header className="Header__container">
    <h1 className="Header__title">
      Infinite Library
    </h1>
    <Search />
  </header>
);

export default Header;
