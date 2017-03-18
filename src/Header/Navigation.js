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

  constructor(props) {
    super(props);
    this.state = {selected: 'ratings'};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({selected: id});
  }

  render() {

    let options = [];
    ListItems.forEach((item) => {
      let active = item.id === this.state.selected ? 'active' : '';
      let click = this.handleClick.bind(this, item.id);
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
            <a onClick={this.handleClick.bind(this, 'ratings')} className="navbar-brand" href="#">
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