import React, { Component } from 'react';
import './Menu.css';

class DivisionMenu extends Component {
  render() {
    var options = [];
    this.props.divisions.forEach((division) => {
      var listItem = division.id === this.props.selectedDivision.id ? 'list-group-item active' : 'list-group-item';
      let divisionClick = this.props.onClick.bind(this, division);
      options.push(
        <a href="#" className={listItem} onClick={divisionClick} key={division.id} id={division.id}>
          {division.name}
        </a>
      );
    });
    return (
      <div className="list-group">{options}</div>
    );
  }
}

export default DivisionMenu;