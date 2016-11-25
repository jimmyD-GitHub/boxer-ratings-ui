import React, { Component } from 'react';
import DivisionMenu from '../Division/Menu';
import BoxerList from '../Boxer/List';
import './Container.css';
import 'whatwg-fetch';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDivision: {}, boxers: []};
    this.handleClick = this.setRatings.bind(this);
  }

  componentDidMount() {
    this.setRatings(this.props.divisions[0]);
  }

  setRatings(divison) {
    fetch(process.env.REACT_APP_REST_API + '/ratings/' + divison.id)
      .then((response) => response.json())
      .then((responseJson) => { return responseJson.boxers; })
      .then((boxers) => {
        this.setState({
          selectedDivision: divison,
          boxers: boxers
        });
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <h1>{this.state.selectedDivision.name}</h1>
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
