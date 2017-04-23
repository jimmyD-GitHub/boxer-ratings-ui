import React from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import OurRatings from '../pages/OurRatings';
import YourRatings from '../pages/YourRatings';
import PoundForPound from '../pages/PoundForPound';

const PageLoader = () => (
  <BrowserRouter>
    <div className="row">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/our-ratings" className="navbar-brand" id="brand-link">boxeratings.com</Link>
            <ul className="nav navbar-nav">
              <MenuLink to="/our-ratings" label="Our Ratings" id="our-ratings-link"/>
              <MenuLink to="/your-ratings" label="Your Ratings" id="your-ratings-link"/>
              <MenuLink to="/p4p-ratings" label="Pound For Pound" id="p4p-ratings-link"/>
            </ul>
          </div>
        </div>
      </nav>
      <Redirect from="/" to="/our-ratings"/>
      <Route path="/our-ratings" component={OurRatings}/>
      <Route path="/your-ratings" component={YourRatings}/>
      <Route path="/p4p-ratings" component={PoundForPound}/>
    </div>
  </BrowserRouter>
);

const MenuLink = ({ label, to, id }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} id={id}>{label}</Link>
    </li>
  )}/>
);

export default PageLoader;