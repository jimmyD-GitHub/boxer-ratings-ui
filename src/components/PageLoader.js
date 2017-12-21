import React from 'react';
import {Route, Link, Redirect, Switch} from 'react-router-dom';
import DivisionSelector from '../components/DivisionSelector';
import OurRatings from '../pages/OurRatings';
import YourRatings from '../pages/YourRatings';
import PoundForPound from '../pages/PoundForPound';

const PageLoader = () => (
  <div className="row">
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <Link to="/our-ratings" className="navbar-brand" id="brand-link">
            <img src="/images/br-logo.svg" alt="Boxer Ratings"/>
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav navbar-right">
            <MenuLink to="/our-ratings" label="Our Ratings" id="our-ratings-link"/>
            <MenuLink to="/your-ratings" label="Your Ratings" id="your-ratings-link"/>
            <MenuLink to="/p4p-ratings" label="Pound For Pound" id="p4p-ratings-link"/>
          </ul>
          <DivisionSelector/>
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

const MenuLink = ({label, to, id}) => (
  <Route path={to} children={({match}) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} id={id}>{label}</Link>
    </li>
  )}/>
);

export default PageLoader;