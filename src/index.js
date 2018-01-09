import React from 'react';
import ReactDOM from 'react-dom';
import PageLoader from './components/PageLoader';
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <PageLoader/>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root')
);
