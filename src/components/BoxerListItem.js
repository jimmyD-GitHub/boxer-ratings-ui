import React, { Component } from 'react';

class BoxerListItem extends Component {

  render() {
    return (
      <a href="#" className="list-group-item" key={this.props.boxer.rating}>
        <h4 className="list-group-item-heading" id={this.props.boxer.rating}>
          {this.props.boxer.rating}. {this.props.boxer.name}
          <small> ({this.props.boxer.record}) </small>
          <small> {this.props.boxer.homeTown} </small>
          <small> Flag={this.props.boxer.nationality} </small>
          <small> 23765 points </small>
        </h4>
        <p className="list-group-item-text">{this.props.boxer.snippet}</p>
      </a>
    );
  }

}

export default BoxerListItem;