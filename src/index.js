import React from 'react';
import ReactDOM from 'react-dom';
import PageLoader from './components/PageLoader';
import {BrowserRouter} from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <PageLoader/>
  </BrowserRouter>,
  document.getElementById('root')
);
