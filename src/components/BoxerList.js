import React, { Component } from 'react';
import BoxerListItem from './BoxerListItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../assets/css/boxerList.css';

class BoxerList extends Component {

  renderBoxers() {
    return this.props.boxers.map(
      boxer => <BoxerListItem boxer={boxer}  key={boxer.rating} />
    );
  }

  render() {
    return (
      <div className="list-group" id="boxers">
        <ReactCSSTransitionGroup transitionName="boxerList"
          transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {this.renderBoxers()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

export default BoxerList;