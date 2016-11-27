import React, { Component } from 'react';
import DivisionMenu from '../Division/Menu';
import BoxerList from '../Boxer/List';
import './Container.css';
import 'whatwg-fetch';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {selectedDivision: this.props.divisions[0], boxers: []};
  }

  componentDidMount() {
    this.fetchBoxers(this.state.selectedDivision).then(response => {
      this.setState({boxers: response.boxers});
    });
  }

  fetchBoxers(division) {
    return fetch('/ratings/' + division.id).then(function (response) {
      return response.json();
    });
  }

  handleClick(division) {
    this.setState({selectedDivision: division});
    this.fetchBoxers(division).then(response => {
      this.setState({boxers: response.boxers});
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <h1>
            {this.state.selectedDivision.name} <small>{this.state.selectedDivision.weightLimit}</small>
          </h1>
          <BoxerList boxers={this.state.boxers} />
        </div>
        <div className="col-md-4">
           <DivisionMenu
             divisions={this.props.divisions}
             selectedDivision={this.state.selectedDivision}
             onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default Ratings;
