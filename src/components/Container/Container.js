import React, {Component} from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from './Footer';
import OurRatings from '../../pages/OurRatings';
import MyRatings from '../../pages/MyRatings';
import PoundForPound from '../../pages/PoundForPound';
import ForgotPassword from '../../pages/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword';
import VerifyEmail from "../../pages/VerifyEmail";

class Container extends Component {
  render() {
    return (
      <div id="content">
        <div className="container clear-top">
          <div className="row">
            <NavBar/>
            <Switch>
              <Route exact path="/our-ratings" component={OurRatings}/>
              <Route exact path="/our-ratings/*" component={OurRatings}/>
              <Route exact path="/my-ratings" component={MyRatings}/>
              <Route exact path="/my-ratings/*" component={MyRatings}/>
              <Route exact path="/p4p-ratings" component={PoundForPound}/>
              <Route exact path="/forgot-password" component={ForgotPassword}/>
              <Route exact path="/reset-password/:token" component={ResetPassword}/>
              <Route exact path="/verify-email/:token" component={VerifyEmail}/>
              <Route component={OurRatings}/>
              <Redirect exact from="/" to="/our-ratings/heavyweight"/>
            </Switch>
          </div>
        </div>
        <Footer path={this.props.location.pathname}/>
      </div>
    );
  }
}

export default withRouter(Container);