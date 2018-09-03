import React from 'react';
import {Helmet} from "react-helmet";

const ForgotPassword = () => (
  <div id="forgot-password">
    <Helmet>
      <title>BoxerRatings: Forgot Password?</title>
    </Helmet>
    <div className="col-md-8">
      <h3>Forgot Your Password?</h3>
      <hr/>
      <div className="alert alert-info" role="alert">
        Enter your email address and we'll send you a link you can use to reset your password.
      </div>
      <form className="h-75 d-inline-block">
        <div className="form-group">
          <label htmlFor="forgotPasswordEmail">Email Address</label>
          <input type="email" className="form-control" id="forgotPasswordEmail" placeholder="Email"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
  </div>
);

export default ForgotPassword;