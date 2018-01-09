import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import divisions from '../data/Divisions';

class DivisionSelector extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {selected: this.getDivisionFromPath()};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selected: this.getDivisionFromPath(nextProps.location.pathname)});
  }

  getDivisionFromPath(pathname = null) {
    let path = pathname ? pathname : this.props.location.pathname;
    let n = path.lastIndexOf('/');
    return path.substring(n + 1);
  }

  isP4pPage() {
    let path = this.props.location.pathname;
    return path === '/p4p-ratings';
  }

  getRedirectPathForDivision(division) {
    let path = this.props.location.pathname;
    return path.substring(0, path.lastIndexOf('/')) + '/' + division;
  }

  handleChange(event) {
    let division = event.target.value;
    this.props.history.push(this.getRedirectPathForDivision(division));
  }

  render() {

    if (this.isP4pPage()) {
      return null;
    }

    return (
      <div className="form-group visible-xs-block"> {/* Selector for mobile version only */}
        <select value={this.state.selected} onChange={this.handleChange}
                className="form-control" id="divisionSelector">
          {divisions.map(division => (
            <option id={division.id} key={division.id} value={division.id}>{division.name}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default withRouter(DivisionSelector);