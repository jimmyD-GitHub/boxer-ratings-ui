import React, {Component} from 'react';
import * as emailValidator from 'email-validator';
import {Link, withRouter} from 'react-router-dom';

const passwordValidator = require('owasp-password-strength-test');

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value.trim();
    this.setState(event.target.id === 'email' ? {email: value.toLowerCase()} : {password: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    let emailValid = emailValidator.validate(this.state.email);
    let strengthCheck = passwordValidator.test(this.state.password);
    let passwordValid = strengthCheck.strong;

    this.setState({
      emailValid: emailValid,
      passwordValid: passwordValid
    });

    if (emailValid && passwordValid) {
      this.props.handleLogin(this.state.email, this.state.password);
    }
  }

  render() {
    const {loggingIn} = this.props;
    const {loginFail} = this.props;
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div
          className={"form-group " + ((this.state.emailValid === false || loginFail === 'email') ? 'has-error' : '')}>
          {(this.state.emailValid === false || loginFail === 'email') &&
          <label id="email-error" className="control-label" htmlFor="email">Invalid email...</label>
          }
          <input onChange={this.handleChange} className="form-control login" id="email" type="text"
                 placeholder="Email Address"/>
        </div>
        <div
          className={"form-group " + ((this.state.passwordValid === false || loginFail === 'password') ? 'has-error' : '')}>
          {(this.state.passwordValid === false || loginFail === 'password') &&
          <label id="password-error" className="control-label" htmlFor="password">Invalid password...</label>
          }
          <input onChange={this.handleChange} className="form-control login" id="password" type="password"
                 placeholder="Password.."/>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-6 padding-r-0">
              <Link to="/forgot-password" className="forgot-password">
                <small>Forgot Password?</small>
              </Link>
            </div>
            <div className="col-xs-6 text-right">
              <button type="submit" className="btn btn-default btn-primary">
                {loggingIn && <div className="loader"/>}
                {loggingIn !== true && 'Login'}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(LoginForm);