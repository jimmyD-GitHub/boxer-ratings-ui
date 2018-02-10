import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from './Footer';
import OurRatings from '../../pages/OurRatings';
import MyRatings from '../../pages/MyRatings';
import PoundForPound from '../../pages/PoundForPound';

const Container = () => (
  <div id="content">
    <div className="container">
      <div className="row">
        <NavBar/>
        <Switch>
          <Route exact path="/our-ratings" component={OurRatings}/>
          <Route exact path="/our-ratings/*" component={OurRatings}/>
          <Route exact path="/my-ratings" component={MyRatings}/>
          <Route exact path="/my-ratings/*" component={MyRatings}/>
          <Route exact path="/p4p-ratings" component={PoundForPound}/>
          <Redirect exact from="/" to="/our-ratings"/>
        </Switch>
      </div>
    </div>
    <Footer/>
  </div>
);

export default Container;