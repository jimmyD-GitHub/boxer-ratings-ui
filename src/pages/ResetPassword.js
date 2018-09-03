import React from 'react';
import {Helmet} from "react-helmet";

const ResetPassword = () => (
  <div id="reset-password">
    <Helmet>
      <title>BoxerRatings: Reset Password</title>
    </Helmet>
    <div className="col-md-8">
      <h3>Reset Password</h3>
      <hr/>
      <div className="alert alert-info" role="alert">
        Reset password for email address <strong>test@example.com</strong>
      </div>
      <form className="h-75 d-inline-block" autoComplete="off">
        <div className="form-group">
          <label htmlFor="forgotPassword">Password</label>
          <input type="password" className="form-control" id="forgotPassword" placeholder="Password"/>
        </div>
        <div className="form-group">
          <label htmlFor="forgotPassword">Re-type Password...</label>
          <input type="password" className="form-control" id="forgotPassword2" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-default">SUBMIT</button>
      </form>
    </div>
  </div>
);

export default ResetPassword;