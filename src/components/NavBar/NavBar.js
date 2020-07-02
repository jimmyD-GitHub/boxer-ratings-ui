import React, {Component} from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import NavBarDropDowns from './NavBarDropDowns';
import DivisionSelector from '../DivisionList/DivisionSelector';
import UserActions from '../../store/Actions/UserActions';
import Fingerprint2 from 'fingerprintjs2';
import {connect} from 'react-redux';

export class NavBar extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);

    this.state = {fingerprint: null};

    if (this.props.user && this.props.user.hasOwnProperty('expires')) {
      let time = new Date().getTime();
      let now = Math.floor(time / 1000); //seconds timestamp
      if (now > this.props.user.expires) {
        const {dispatch} = this.props;
        dispatch(UserActions.logout()); //session timeout
      }
    }
  }

  handleLogout(event) {
    event.preventDefault();
    const {dispatch} = this.props;
    dispatch(UserActions.logout());
    this.props.history.push('/our-ratings/heavyweight');
  }

  async handleLogin(email, password) {
    const {dispatch} = this.props;
    dispatch(UserActions.clearSignUp());
    await dispatch(UserActions.login(email, password));
    this.props.history.push('/my-ratings/heavyweight');
  }

  componentDidMount() {
    let component = this;
    Fingerprint2.get({}, function (components) {
      let values = components.map(function (component) {
        return component.value
      });
      let hash = Fingerprint2.x64hash128(values.join(''), 31);
      component.setState({fingerprint: hash});
    });
  }

  handleSignUp(name, email, password) {
    const {dispatch} = this.props;
    this.props.history.push('/our-ratings/heavyweight');
    dispatch(UserActions.signup(name, email, password, this.state.fingerprint));
  }

  render() {
    const {loggingIn, loggedIn, loginFail, signupFail, signedUp, user} = this.props;
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
              <MenuLink to="/our-ratings" label="Our Ratings" id="our-ratings-link"
                        active={this.props.location.pathname === '/'}/>
              {loggedIn && <MenuLink to="/my-ratings" label="My Ratings" id="my-ratings-link"/>}
              <MenuLink to="/blog" label="Blog" id="blog-link"/>
            </ul>
            {this.props.renderDivisionSelector && <DivisionSelector/>}
            <NavBarDropDowns user={user}
                             loggingIn={loggingIn}
                             loggedIn={loggedIn}
                             loginFail={loginFail}
                             signupFail={signupFail}
                             signedUp={signedUp}
                             handleLogin={this.handleLogin}
                             handleLogout={this.handleLogout}
                             handleSignUp={this.handleSignUp}/>
          </div>
        </div>
      </nav>
    );
  }
}

const MenuLink = ({label, to, id, active = false}) => (
  <Route path={to} children={({match}) => (
    <li className={(match || active) ? 'active' : ''}>
      <Link to={to} id={id}>{label}</Link>
    </li>
  )}/>
);

function mapStateToProps(state) {
  const {loggingIn, loggedIn, loginFail, user} = state.authentication;
  const {signupFail, signedUp} = state.registration;
  return {signupFail, signedUp, loggingIn, loggedIn, loginFail, user};
}

const connectedNavBar = withRouter(connect(mapStateToProps)(NavBar));

export default connectedNavBar;