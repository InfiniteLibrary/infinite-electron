import React from 'react';
import Spinner from 'react-spinkit';
import './Loader.scss';

const Loader = () => (
  <div className="loader__container">
    Loading
    <Spinner
      spinnerName="chasing-dots"
      noFadeIn
    />
  </div>
);

export default Loader;
