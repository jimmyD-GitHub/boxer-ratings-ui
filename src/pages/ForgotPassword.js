import React, {Component} from "react";
import * as emailValidator from "email-validator";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import UserService from "../services/UserService";
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import Loadable from 'react-loading-overlay';

class ForgotPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {email: '', emailValid: true, success: false, failure: false, error: null};
    this.userService = props.userService ? props.userService : new UserService();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();
    let emailValid = emailValidator.validate(this.state.email);
    this.setState({emailValid: emailValid});

    if (emailValid) {

      this.setState({loading: true});

      this.userService.forgotPassword(this.state.email).then(response => {

        if (response.emailSent) {
          this.setState({
            success: true, failure: false, loading: false,
            info: "An email has been sent to " + this.state.email + ". You should receive it in the next 5 minutes."
          });
        } else {
          this.setState({
            failure: true, success: false, loading: false,
            error: "A reset password email could not be sent."
          });
        }

      }).catch(error => {
        this.setState({
          failure: true, success: false, code: error.name, loading: false,
          error: "No account could be found for this email address."
        });
      });
    }
  }

  handleChange(event) {
    let value = event.target.value.trim();
    this.setState({email: value.toLowerCase()});
  }

  render() {
    const {loggedIn} = this.props;
    return loggedIn === true ? <Redirect to='/our-ratings/heavyweight'/> : (
      <div id="forgot-password">
        <Helmet>
          <title>BoxerRatings: Forgot Password?</title>
        </Helmet>
        <div className="col-md-8">
          <h3>Forgot Your Password?</h3>
          <hr/>
          <Loadable active={this.state.loading} spinner color="#ffd941">
            <div className="alert alert-info" role="alert">
              Enter your email address and we'll send you a link you can use to reset your password.
            </div>
            {this.state.failure && <ErrorMessage message={this.state.error}/>}
            {this.state.success && <SuccessMessage message={this.state.info}/>}
            <form className="h-75 d-inline-block margin-bottom" onSubmit={this.handleSubmit}>
              <fieldset disabled={(this.state.success ? 'disabled' : '')}>
                <div id="formGroup" className={"form-group" + (this.state.emailValid === false ? ' has-error' : '')}>
                  <label className="control-label" htmlFor="forgotPasswordEmail">Email Address</label>
                  <input onChange={this.handleChange} type="text" className="form-control"
                         id="forgotPasswordEmail" placeholder="Email"/>
                </div>
                <button type="submit" className="btn btn-default">SUBMIT</button>
              </fieldset>
            </form>
          </Loadable>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {loggedIn} = state.authentication;
  return {loggedIn};
}

const connectedForgotPassword = connect(mapStateToProps)(ForgotPassword);

export default connectedForgotPassword;