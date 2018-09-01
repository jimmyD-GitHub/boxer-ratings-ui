import React from 'react';

const ForgotPassword = () => (
  <div id="forgot-password">
    <div className="col-md-8">
      <h3>Forgot Your Password?</h3>
      <hr/>
      <div className="alert alert-info" role="alert">
        Enter your email address below and we'll send you a link you can use to reset it.
      </div>
      <form className="h-75 d-inline-block margin-bottom-lg">
        <div className="form-group">
          <label htmlFor="forgotPasswordEmail1">Email Address</label>
          <input type="email" className="form-control" id="forgotPasswordEmail1" placeholder="Email"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
  </div>
);

export default ForgotPassword;