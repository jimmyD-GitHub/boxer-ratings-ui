import React, {Component} from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from './Footer';
import OurRatings from '../../pages/OurRatings';
import MyRatings from '../../pages/MyRatings';
import ForgotPassword from '../../pages/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword';
import VerifyEmail from "../../pages/VerifyEmail";
import Blog from "../../pages/Blog";

class Container extends Component {
  render() {
    let isRoot = this.props.location.pathname === '/';
    return (
      <div id="content">
        <div className="container clear-top">
          <div className="row">
            <NavBar/>
            <Switch>
              <Route exact path="/our-ratings"
                     render={(props) => <OurRatings {...props} rootPath={isRoot}/>}
              />
              <Route exact path="/our-ratings/*"
                     render={(props) => <OurRatings {...props} rootPath={isRoot}/>}
              />
              <Route exact path="/my-ratings" component={MyRatings}/>
              <Route exact path="/my-ratings/*" component={MyRatings}/>
              <Route exact path="/forgot-password" component={ForgotPassword}/>
              <Route exact path="/reset-password/:token" component={ResetPassword}/>
              <Route exact path="/verify-email/:token" component={VerifyEmail}/>
              <Route exact path="/blog" component={Blog}/>
              <Route exact path="/blog/:slug" component={Blog}/>
              <Route render={(props) => <OurRatings {...props} rootPath={isRoot}/>}/>
              <Redirect exact from="/" to="/our-ratings/heavyweight"/>
            </Switch>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(Container);