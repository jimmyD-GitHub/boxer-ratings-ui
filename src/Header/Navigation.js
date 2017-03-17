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
              <li><a href="#">Our Ratings</a></li>
              <li><a href="#">Your Ratings</a></li>
              <li className="active"><a href="#">Collective Ratings</a></li>
              <li><a href="#">P4P Ratings</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}

export default NavBar;