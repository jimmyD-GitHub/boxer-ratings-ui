import React, { Component } from 'react';
import './List.css';

class BoxerList extends Component {
  render() {
    let items = [];
    this.props.boxers.forEach((boxer) => {
      items.push(
        <a href="#" className="list-group-item" key={boxer.rating}>
          <h4 className="list-group-item-heading" id={boxer.rating}>
            {boxer.rating}. {boxer.name}
            <small> ({boxer.record}) </small>
            <small> {boxer.homeTown} </small>
            <small> Flag={boxer.nationality} </small>
            <small> 23765 points </small>
          </h4>
          <p className="list-group-item-text">{boxer.snippet}</p>
        </a>
      );
    });

    if (items.length == 0) {
      return (
        <p className="alert alert-danger" role="alert">
          <strong>Oops!</strong> No boxer ratings could be found for this division.
        </p>
      );
    }

    return (
      <div className="list-group" id="boxers">
        {items}
      </div>
    );
  }
}

export default BoxerList;