import React, {Component} from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import NavBarDropDowns from './NavBarDropDowns';
import DivisionSelector from '../DivisionList/DivisionSelector';
import {connect} from "react-redux";

class NavBar extends Component {

  render() {
    const {loggedIn} = this.props;
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
            <NavBarDropDowns/>
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
  const {loggedIn} = state.authentication;
  return {
    loggedIn
  };
}

const connectedNavBar = withRouter(connect(mapStateToProps)(NavBar));

export default connectedNavBar;