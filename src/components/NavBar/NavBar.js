import React, {Component} from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import NavBarDropDowns from './NavBarDropDowns';
import DivisionSelector from '../DivisionList/DivisionSelector';
import UserActions from '../../store/Actions/UserActions';
import {connect} from "react-redux";

export class NavBar extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    if (this.props.user && this.props.user.hasOwnProperty('expires')) {
      let time = Date.now ? Date.now() : new Date().getTime();
      let now = Math.floor(time / 1000); //seconds timestamp
      if (now > this.props.user.expires) {
        //one week session time out
        const {dispatch} = this.props;
        dispatch(UserActions.logout());
      }
    }
  }

  handleLogout(event) {
    event.preventDefault();
    const {dispatch} = this.props;
    dispatch(UserActions.logout());
  }

  handleLogin(email, password) {
    const {dispatch} = this.props;
    dispatch(UserActions.login(email, password));
  }

  render() {
    const {loggingIn, loggedIn, loginFail, user} = this.props;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle"
                    data-toggle="collapse" data-target="#navigationBar">
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <Link to="/our-ratings" className="navbar-brand" id="brand-link">
              <img src="/images/br-logo.svg" alt="Boxer Ratings"/>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navigationBar">
            <ul className="nav navbar-nav">
              <MenuLink to="/our-ratings" label="Our Ratings" id="our-ratings-link"/>
              {loggedIn && <MenuLink to="/my-ratings" label="My Ratings" id="my-ratings-link"/>}
              <MenuLink to="/p4p-ratings" label="Pound For Pound" id="p4p-ratings-link"/>
            </ul>
            <DivisionSelector/>
            <NavBarDropDowns user={user}
                             loggingIn={loggingIn}
                             loggedIn={loggedIn}
                             loginFail={loginFail}
                             handleLogin={this.handleLogin}
                             handleLogout={this.handleLogout}/>
          </div>
        </div>
      </nav>
    );
  }
}

const MenuLink = ({label, to, id}) => (
  <Route path={to} children={({match}) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} id={id}>{label}</Link>
    </li>
  )}/>
);

function mapStateToProps(state) {
  const {loggingIn, loggedIn, loginFail, user} = state.authentication;
  return {loggingIn, loggedIn, loginFail, user};
}

const connectedNavBar = withRouter(connect(mapStateToProps)(NavBar));

export default connectedNavBar;