import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import BookDetailsPage from './containers/BookDetailsPage';


export default (
  <Route path="/" component={App}>
    <Route path=":bookId" component={BookDetailsPage} />
    <IndexRoute component={HomePage} />
  </Route>
);
