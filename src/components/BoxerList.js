import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import BoxerListItem from './BoxerListItem';

class BoxerList extends Component {

  renderBoxers() {
    return this.props.boxers.map(
      boxer => <BoxerListItem boxer={boxer}  key={boxer.rating} />
    );
  }

  render() {
    return (
      <div className="list-group" id="boxers">
        <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
          {this.renderBoxers()}
        </FlipMove>
      </div>
    );
  }

}

export default BoxerList;