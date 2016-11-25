import React, { Component } from 'react';
import './Menu.css';

class DivisionMenu extends Component {
  render() {
    var options = [];
    this.props.divisions.forEach((division) => {
      let divisionClick = this.props.onClick.bind(this, division);
      options.push(
        <a className={division.id === this.props.selectedDivision.id ? 'list-group-item active' : 'list-group-item'}
          href="#" onClick={divisionClick} key={division.id} id={division.id}>{division.name}
        </a>
      );
    });

    return (
      <div className="list-group">
        {options}
      </div>
    );
  }
}

export default DivisionMenu;