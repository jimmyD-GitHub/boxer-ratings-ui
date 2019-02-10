import React, {Component} from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import UserService from "../services/UserService";
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import Loadable from 'react-loading-overlay';
import {Link, Redirect} from 'react-router-dom';

const passwordStrength = require('zxcvbn');

class ResetPassword extends Component {

  constructor(props) {
    super(props);

    this.token = decodeURIComponent(this.props.match.params.token);

    this.state = {password: '', confirmPassword: '', passwordInvalid: false, failure: false, success: false};
    this.userService = props.userService ? props.userService : new UserService();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();

    let error = null;
    let strengthCheck = passwordStrength(this.state.password);
    let passwordValid = (strengthCheck.score >= 1);
    let passwordMatch = (this.state.password === this.state.confirmPassword);

    if (passwordValid === false) {

      error = "The password you have provided is not strong enough. Think of a less hackable one.";
      if (this.state.password.length === 0) {
        error = "Please provide a new password for your account.";
      }

    } else if (passwordMatch === false) {
      error = "The two passwords you have provided do not match.";
      passwordValid = false;
    }

    this.setState({
      passwordInvalid: passwordValid === false,
      passwordMisMatch: passwordMatch === false,
      failure: passwordValid === false || passwordMatch === false,
      error: error
    });

    if (passwordValid) {

      this.setState({loading: true});

      this.userService.resetPassword(this.token, this.state.password).then(response => {

        if (response.passwordUpdated) {
          this.setState({success: true, failure: false, loading: false});
        } else {
          this.setState({success: false, failure: true, error: 'fail', loading: false});
        }

      }).catch(error => {
        this.setState({success: false, failure: true, code: error.name, error: 'fail', loading: false});
      });
    }
  }

  handleChange(event) {
    let value = event.target.value.trim();
    this.setState(event.target.id === 'forgotPassword' ? {password: value} : {confirmPassword: value});
  }

  render() {

    const {loggedIn} = this.props;

    const fail =
    <Link to="/forgot-password" className="failedPasswordResetLink">
      That didn't work. The link in the email you
      received may have expired. Click here to try this again.
    </Link>;

    return loggedIn === true ? <Redirect to='/our-ratings/heavyweight'/> : (
      <div id="reset-password">
        <Helmet>
          <title>BoxerRatings: Reset Password</title>
        </Helmet>
        <div className="col-md-8">
          <h3>Reset Password</h3>
          <hr/>
          <Loadable active={this.state.loading} spinner color="#ffd941">
            <div className="alert alert-info" role="alert">
              Please provide a new password for your account.
            </div>
            {this.state.success && <SuccessMessage message="Your password has been updated."/>}
            {this.state.failure && <ErrorMessage message={this.state.error === 'fail' ? fail : this.state.error}/>}
            <form className="h-75 d-inline-block margin-bottom" autoComplete="off" onSubmit={this.handleSubmit}>
              <fieldset disabled={(this.state.error === 'fail' || this.state.success ? 'disabled' : '')}>
                <div className={"form-group" + (this.state.passwordInvalid ? ' has-error' : '')}>
                  <label htmlFor="forgotPassword">Password</label>
                  <input type="password" autoComplete="off" className="form-control" onChange={this.handleChange}
                         id="forgotPassword" placeholder="Password"/>
                </div>
                <div className={"form-group" + (this.state.passwordMisMatch ? ' has-error' : '')}>
                  <label htmlFor="forgotPassword">Re-type Password...</label>
                  <input type="password" className="form-control" autoComplete="off" onChange={this.handleChange}
                         id="forgotPassword2" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-default">SUBMIT</button>
              </fieldset>
            </form>
          </Loadable>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {loggedIn} = state.authentication;
  return {loggedIn};
}

const connectedResetPassword = connect(mapStateToProps)(ResetPassword);

export default connectedResetPassword;