import React, { Component } from 'react';
import './Ratings.css';
import 'whatwg-fetch';

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selectedDivision: this.props.divisions[0]
    };
  }

  handleClick(division) {
    this.setState({
      selectedDivision: division
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <h1>{this.state.selectedDivision.name}</h1>
          <BoxerList />
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
    return (
      <div className="list-group">
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">1. Boxer Name</h4>
          <p className="list-group-item-text">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
        </a>
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">2. Boxer Name</h4>
          <p className="list-group-item-text">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
            of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
        </a>
        <a href="#" className="list-group-item">
          <h4 className="list-group-item-heading">3. Boxer Name</h4>
          <p className="list-group-item-text">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
            of classical Latin literature from 45 BC, making it over 2000 years old.
          </p>
        </a>
      </div>
    );
  }
}

export default Ratings;
