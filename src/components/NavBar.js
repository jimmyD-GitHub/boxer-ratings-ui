import React, { Component } from 'react';
import NavBarOptions from '../data/NavBarOptions';

class NavBar extends Component {

  render() {
    let options = [];
    NavBarOptions.forEach((item) => {
      let active = item.id === this.props.selected ? 'active' : '';
      let click = this.props.onClick.bind(this, item.id);
      options.push(
        <li className={active} key={item.id} id={item.id}>
          <a onClick={click} href="#">{item.name}</a>
        </li>
      );
    });

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a onClick={this.props.onClick.bind(this, 'our-ratings')} className="navbar-brand" href="#">
              boxeratings.com
            </a>
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