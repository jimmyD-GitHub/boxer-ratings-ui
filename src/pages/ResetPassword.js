import React from 'react';

const ResetPassword = () => (
  <div id="reset-password">
    <div className="col-md-8">
      <h3>Reset Password</h3>
      <hr/>
      <div className="alert alert-info" role="alert">
        Reset password for email address <strong>test@example.com</strong>
      </div>
      <form className="h-75 d-inline-block">
        <div className="form-group">
          <label htmlFor="forgotPassword">Password</label>
          <input type="password" className="form-control" id="forgotPassword" placeholder="Password"/>
        </div>
        <div className="form-group">
          <label htmlFor="forgotPassword">Re-type Password...</label>
          <input type="password" className="form-control" id="forgotPassword2" placeholder="Password2"/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
  </div>
);

export default ResetPassword;