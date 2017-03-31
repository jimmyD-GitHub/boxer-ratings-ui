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
      <FlipMove typeName="div" className="list-group" duration={800} easing="ease-out">
        {this.renderBoxers()}
      </FlipMove>
    );
  }

}

export default BoxerList;