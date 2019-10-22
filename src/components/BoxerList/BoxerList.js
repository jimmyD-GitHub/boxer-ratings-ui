import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BoxerListItem from './BoxerListItem';
import ErrorMessage from '../Message/ErrorMessage';
import Loadable from 'react-loading-overlay';
import '../../assets/css/boxerList.css';

class BoxerList extends Component {

  renderBoxers() {
    return this.props.boxers.map(
      boxer => <BoxerListItem boxer={boxer} key={boxer.id} isP4P={this.props.divisionId === 'p4p'}/>
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
        <Loadable active={this.props.loading} spinner color="#ffd941" fadeSpeed="50">
          <ReactCSSTransitionGroup transitionName="boxerList"
                                   transitionEnterTimeout={500} transitionLeaveTimeout={300}
                                   transitionAppear={true} transitionAppearTimeout={500}>
            {this.renderBoxers()}
          </ReactCSSTransitionGroup>
        </Loadable>
      </div>
    );
  }
}

export default BoxerList;