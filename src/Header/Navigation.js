import React, { Component } from 'react';
import './Navigation.css';

const ListItems = [
  {name: 'Our Ratings', id: 'our-ratings'},
  {name: 'Your Ratings', id: 'your-ratings'},
  {name: 'Collective Ratings', id: 'ratings'},
  {name: 'P4P Ratings', id: 'p4p-ratings'},
  {name: 'Blog', id: 'blog'}
];

class NavBar extends Component {

  render() {

    let options = [];
    ListItems.forEach((item) => {
      let path = '/' + item.id;
      options.push(
        <li key={item.id} id={item.id}>
          <a href={path}>{item.name}</a>
        </li>
      );
    });

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/ratings">boxeratings.com</a>
            <ul className="nav navbar-nav">
              {options}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}

export default NavBar;