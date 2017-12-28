import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import divisions from '../data/Divisions';

class DivisionSelector extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    //this.state = {selected: props.location.pathname};
    this.state = {selected: 'heavyweight'}
  }

  handleChange() {
    console.log(this.state.selected);
  }

  render() {
    return (
      <div className="form-group visible-xs-block"> {/* Selector for mobile version only */}
        <select value={this.state.selected} onChange={this.handleChange} className="form-control" id="divisionSelector">
          {divisions.map(division => (
            <option id={division.id} key={division.id} value={division.id}>{division.name}</option>
          ))}
        </select>
      </div>
    );
  }
}

const DivisionSelectorWithRouter = withRouter(DivisionSelector);
export default DivisionSelectorWithRouter;