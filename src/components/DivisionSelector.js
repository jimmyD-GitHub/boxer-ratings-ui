import React, {Component} from 'react';
import { withRouter } from 'react-router';
import divisions from '../data/Divisions';

class DivisionSelector extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {selected: props.location.pathname};
  }

  handleChange() {

  }

  render() {
    return (
      <div className="form-group visible-xs-block"> {/* Selector for mobile version only */}
        <select onChange={this.handleChange} className="form-control" id="divisions">
          {divisions.map(division => (
            <option id={division.id} key={division.id}>{division.name}</option>
          ))}
        </select>
      </div>
    );
  }
}

const DivisionSelectorWithRouter = withRouter(DivisionSelector);
export default DivisionSelectorWithRouter;