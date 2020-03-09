import React, {Component} from 'react';
import SignUpForm from './Forms/SignUpForm';
import LoginForm from './Forms/LoginForm';
import isMobile from 'react-device-detect';

class NavBarDropDowns extends Component {
  render() {

    if (isMobile) {
      return (<ul/>);
    }

    const {loggingIn, loggedIn, loginFail, signupFail, signedUp, user} = this.props;
    return (
      <ul className="nav navbar-nav navbar-right">
        {!loggedIn && false &&
        <li className="dropdown">
          <a href="/" className="dropdown-toggle" data-toggle="dropdown">
            Sign up <span className="caret"/>
          </a>
          <ul className="dropdown-menu" role="menu">
            <SignUpForm handleSignUp={this.props.handleSignUp} signedUp={signedUp} signupFail={signupFail}/>
          </ul>
        </li>
        }
        {loggedIn &&
        <li className="dropdown">
          <a className="dropdown-toggle" href="/" data-toggle="dropdown">
            {user.name} <span className="caret"/>
          </a>
          <div className="dropdown-menu" role="menu">
            <a id="log-out" onClick={this.props.handleLogout} className="dropdown-item" href="/">Sign out</a>
          </div>
        </li>
        }
        {loggedIn !== true &&
        <li className="dropdown">
          <a className="dropdown-toggle" href="/" data-toggle="dropdown">
            Login <span className="caret"/>
          </a>
          <div className="dropdown-menu" role="menu">
            <LoginForm logginIn={loggingIn} loginFail={loginFail} handleLogin={this.props.handleLogin}/>
          </div>
        </li>
        }
      </ul>
    );
  }
}

export default NavBarDropDowns;