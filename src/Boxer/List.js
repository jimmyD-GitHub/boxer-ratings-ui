import React, { Component } from 'react';
import './List.css';

class BoxerList extends Component {
  render() {
    var items = [];
    this.props.boxers.forEach((boxer) => {
      items.push(
        <a href="#" className="list-group-item" key={boxer.rating}>
          <h4 className="list-group-item-heading">
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

    return (
      <div className="list-group" id="boxers">
        {items}
      </div>
    );
  }
}

export default BoxerList;