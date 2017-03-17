import React from 'react';
import ReactDOM from 'react-dom';
import Ratings from './Ratings/Container';
import DivisionOptions from './Division/Options.js';
import './index.css';

ReactDOM.render(
  <Ratings divisions={DivisionOptions} />,
  document.getElementById('root')
);
