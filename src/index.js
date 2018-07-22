import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './store/Helpers/Store';
import Container from './components/Container/Container';
import ScrollToTop from './components/Container/ScrollToTop';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={Store}>
        <Container/>
      </Provider>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root')
);
