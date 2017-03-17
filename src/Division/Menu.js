import React, { Component } from 'react';
import './Menu.css';

class DivisionMenu extends Component {

  render() {
    let options = [];
    this.props.divisions.forEach((division) => {
      let divisionClick = this.props.onClick.bind(this, division);
      let divisionId = this.props.selectedDivision.id;
      let listClass = division.id === divisionId ? 'list-group-item active' : 'list-group-item';
      options.push(
        <a className={listClass} href="#" onClick={divisionClick} key={division.id} id={division.id}>
          {division.name}
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