import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import divisions from '../data/Divisions';

class DivisionSelector extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    let path = props.location.pathname;
    let n = path.lastIndexOf('/');
    let division = path.substring(n + 1);
    this.state = {selected: division.length ? division : 'heavyweight'};
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