import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BoxerListItem from './BoxerListItem';
import ErrorMessage from './ErrorMessage';
import '../assets/css/boxerList.css';

class BoxerList extends Component {

  renderBoxers() {
    return this.props.boxers.map(
      boxer => <BoxerListItem boxer={boxer} key={boxer.id}/>
    );
  }

  render() {
    if (this.props.boxers.length === 0 && this.props.showError) {
      return (
        <ErrorMessage message="No boxer ratings could be found for this division."/>
      );
    }

    return (
      <div id="boxers">
        <ReactCSSTransitionGroup transitionName="boxerList"
                                 transitionEnterTimeout={500} transitionLeaveTimeout={300}
                                 transitionAppear={true} transitionAppearTimeout={500}>
          {this.renderBoxers()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default BoxerList;