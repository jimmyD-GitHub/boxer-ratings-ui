import React from 'react';
import ReactDOM from 'react-dom';
import OurRatings from './pages/OurRatings';
import Divisions from './data/Divisions';
import './index.css';

ReactDOM.render(
  <OurRatings divisions={Divisions} />,
  document.getElementById('root')
);
