import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import BookDetailsPage from './containers/BookDetailsPage';
import ReaderPage from './containers/ReaderPage';


export default (
  <Route path="/" component={App}>
    <Route path=":bookId" component={BookDetailsPage} />
    <Route path="read/:bookId" component={ReaderPage} />
    <IndexRoute component={HomePage} />
  </Route>
);
