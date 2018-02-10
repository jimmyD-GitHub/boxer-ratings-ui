import React from 'react';

const SignUpForm = () => (
  <form id="">
    <div className="form-group">
      <input type="text" name="name" id="name" className="form-control" placeholder="Name"
             value=""/>
    </div>
    <div className="form-group">
      <input type="email" name="email" id="signup-email" className="form-control"
             placeholder="Email Address" value=""/>
    </div>
    <div className="form-group">
      <input type="password" name="password" id="signup-password" className="form-control"
             placeholder="Password"/>
    </div>
    <div className="form-group">
      <input type="password" name="confirm-password" id="confirm-password"
             className="form-control" placeholder="Confirm Password"/>
    </div>
    <div className="form-group text-right">
      <button type="submit" className="btn btn-default btn-primary">Sign up</button>
    </div>
  </form>
);

export default SignUpForm;