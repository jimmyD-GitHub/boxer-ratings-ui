import React from 'react';
import {Route, Link, Redirect, Switch} from 'react-router-dom';
import OurRatings from '../pages/OurRatings';
import YourRatings from '../pages/YourRatings';
import PoundForPound from '../pages/PoundForPound';

const PageLoader = () => (
  <div className="row">
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/our-ratings" className="navbar-brand" id="brand-link">
            <img src="/images/br-logo.svg" alt="Boxer Ratings"/>
          </Link>
          <ul className="nav navbar-nav">
            <MenuLink to="/our-ratings" label="Our Ratings" id="our-ratings-link"/>
            <MenuLink to="/your-ratings" label="Your Ratings" id="your-ratings-link"/>
            <MenuLink to="/p4p-ratings" label="Pound For Pound" id="p4p-ratings-link"/>
          </ul>
        </div>
      </div>
    </nav>
    <Switch>
      <Route exact path="/our-ratings" component={OurRatings}/>
      <Route exact path="/our-ratings/*" component={OurRatings}/>
      <Route exact path="/your-ratings" component={YourRatings}/>
      <Route exact path="/your-ratings/*" component={YourRatings}/>
      <Route exact path="/p4p-ratings" component={PoundForPound}/>
      <Redirect exact from="/" to="/our-ratings"/>
    </Switch>
  </div>
);

const MenuLink = ({ label, to, id }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} id={id}>{label}</Link>
    </li>
  )}/>
);

export default PageLoader;