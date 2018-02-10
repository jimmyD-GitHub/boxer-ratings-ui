import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/helpers/Store';
import Container from './components/Container/Container';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <Container/>
      </Provider>
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById('root')
);
