import React, { Component } from 'react';
import './Ratings.css';
import 'whatwg-fetch';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedDivision: {}, boxers: []};
    this.setRatings(this.props.divisions[0]);
    this.handleClick = this.setRatings.bind(this);
  }

  setRatings(divison) {
    fetch('http://localhost:8080/ratings/' + divison.id)
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

class DivisionMenu extends Component {
  render() {
    var options = [];
    this.props.divisions.forEach((division) => {
      var listItem = division.id === this.props.selectedDivision.id ? 'list-group-item active' : 'list-group-item';
        let divisionClick = this.props.onClick.bind(this, division);
        options.push(
          <DivisionOption optionClass={listItem} key={division.id} click={divisionClick} name={division.name}/>
        );
      });
      return (
        <div className="list-group">{options}</div>
      );
    }
}

class DivisionOption extends Component {
  render() {
    return (
      <a href="#" className={this.props.optionClass} onClick={this.props.click}>
        {this.props.name}
      </a>
    );
  }
}

class BoxerList extends Component {
  render() {
    var items = [];
    this.props.boxers.forEach((boxer) => {
      items.push(
        <a href="#" className="list-group-item" key={boxer.rating}>
          <h4 className="list-group-item-heading">{boxer.rating}. {boxer.name}</h4>
          <p className="list-group-item-text">{boxer.snippet}</p>
        </a>
      );
    });

    return (
      <div className="list-group">{items}</div>
    );
  }
}

export default Ratings;
