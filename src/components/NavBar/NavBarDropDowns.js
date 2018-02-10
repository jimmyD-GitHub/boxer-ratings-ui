import React, {Component} from 'react';
import SignUpForm from './Forms/SignUpForm';
import LoginForm from './Forms/LoginForm';
import {connect} from "react-redux";
import userActions from '../../store/actions/UserActions';

class NavBarDropDowns extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    const {dispatch} = this.props;
    dispatch(userActions.logout());
  }

  render() {
    const {loggedIn} = this.props;
    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          {/*<a href="" className="dropdown-toggle" data-toggle="dropdown">
        Sign up <span className="caret"/>
      </a>*/}
          <ul className="dropdown-menu" role="menu">
            <SignUpForm/>
          </ul>
        </li>
        {loggedIn &&
        <li className="dropdown">
          <a className="dropdown-toggle" href="" data-toggle="dropdown">
            Jimmy <span className="caret"/>
          </a>
          <div className="dropdown-menu" role="menu">
            <a onClick={this.handleLogout} className="dropdown-item" href="">Sign out</a>
          </div>
        </li>
        }
        {loggedIn !== true &&
        <li className="dropdown">
          <a className="dropdown-toggle" href="" data-toggle="dropdown">
            Login <span className="caret"/>
          </a>
          <div className="dropdown-menu" role="menu">
            <LoginForm/>
          </div>
        </li>
        }
      </ul>
    );
  }
}

function mapStateToProps(state) {
  const {loggedIn} = state.authentication;
  return {
    loggedIn
  };
}

const connectedNavBarDropDowns = connect(mapStateToProps)(NavBarDropDowns);

export default connectedNavBarDropDowns;