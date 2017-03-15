import React, { Component } from 'react';
import './Navigation.css';

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">boxeratings.com</a>
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Divisional Ratings</a></li>
              <li><a href="#">P4P</a></li>
              <li><a href="#">Your Ratings</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}

export default NavBar;