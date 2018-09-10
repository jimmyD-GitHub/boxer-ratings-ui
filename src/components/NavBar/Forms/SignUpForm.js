import React, {Component} from 'react';
import * as emailValidator from 'email-validator';

const passwordStrength = require('zxcvbn');

class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return {
      name: '',
      signupEmail: '',
      signupPassword: '',
      confirm: '',
      nameInvalid: false,
      emailInvalid: false,
      passwordInvalid: false,
      confirmInvalid: false
    };
  }

  handleChange(event) {
    event.preventDefault();

    let state = {};
    let value = event.target.value.trim();
    let validFields = ['name', 'signupEmail', 'signupPassword', 'confirm'];
    let id = event.target.id;

    if (validFields.indexOf(id) >= 0) {
      state[id] = id === 'signupEmail' ? value.toLowerCase() : value;
    }

    this.setState(state);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.signedUp) {
      this.setState(this.getInitialState());
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    let nameValid = (this.state.name.length <= 45 && this.state.name.length > 0);
    let emailValid = emailValidator.validate(this.state.signupEmail);
    let strengthCheck = passwordStrength(this.state.signupPassword);
    let passwordValid = (strengthCheck.score >= 2);
    let confirmValid = this.state.signupPassword === this.state.confirm;

    this.setState({
      nameInvalid: nameValid === false,
      emailInvalid: emailValid === false,
      passwordInvalid: passwordValid === false,
      confirmInvalid: confirmValid === false
    });

    if (nameValid && emailValid && passwordValid && confirmValid) {
      this.props.handleSignUp(
        this.state.name,
        this.state.signupEmail,
        this.state.signupPassword
      )
    }
  }

  render() {
    const {signupFail} = this.props;
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className={"form-group " + (this.state.nameInvalid ? 'has-error' : '')}>
          {this.state.nameInvalid &&
          <label id="name-error" className="control-label" htmlFor="name">Invalid Name</label>
          }
          <input onChange={this.handleChange} type="text" name="name" id="name" className="form-control"
                 placeholder="Name" value={this.state.name}/>
        </div>
        <div className={"form-group " + (this.state.emailInvalid || signupFail === 'email' ? 'has-error' : '')}>
          {(this.state.emailInvalid || signupFail === 'email') &&
          <label id="email-error" className="control-label" htmlFor="signup-email">
            {signupFail === 'email' ? 'Email Already Registered' : 'Invalid Email'}
          </label>
          }
          <input onChange={this.handleChange} type="email" name="signupEmail" id="signupEmail"
                 className="form-control" placeholder="Email Address" value={this.state.signupEmail}/>
        </div>
        <div className={"form-group " + (this.state.passwordInvalid || signupFail === 'password' ? 'has-error' : '')}>
          {(this.state.passwordInvalid || signupFail === 'password') &&
          <label id="password-error" className="control-label" htmlFor="password">Password Too Weak</label>
          }
          <input onChange={this.handleChange} type="password" name="signupPassword" id="signupPassword"
                 className="form-control" placeholder="Password" value={this.state.signupPassword}/>
        </div>
        <div className={"form-group " + (this.state.confirmInvalid ? 'has-error' : '')}>
          {this.state.confirmInvalid &&
          <label id="confirm-error" className="control-label" htmlFor="confirm">Passwords Do Not Match</label>
          }
          <input onChange={this.handleChange} type="password" name="confirm" id="confirm"
                 className="form-control" placeholder="Confirm Password" value={this.state.confirm}/>
        </div>
        <div className="form-group text-right">
          <button type="submit" className="btn btn-default btn-primary">Sign up</button>
        </div>
      </form>
    );
  }
}

export default SignUpForm;