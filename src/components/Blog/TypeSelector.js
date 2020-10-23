import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import TYPES from "./TypeData";

class TypeSelector extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {selected: this.getTypeFromPath()};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({selected: this.getTypeFromPath(nextProps.location.pathname)});
  }

  handleChange(event) {

    let type = event.target.value;
    let path = '/posts/' + type;

    if (type === 'all') {
      path = '/blog';
    }

    this.props.history.push(path);
  }

  getTypeFromPath(pathname = null) {

    let path = pathname ? pathname : this.props.location.pathname;
    let n = path.lastIndexOf('/');

    return path.substring(n + 1);
  }

  render() {
    return (
      <div className="form-group visible-xs-block">
        <select value={this.state.selected} onChange={this.handleChange}
                className="form-control" id="divisionSelector">
          {TYPES.map(type => (
            <option id={type.id} key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
    );
  }

}

export default withRouter(TypeSelector);