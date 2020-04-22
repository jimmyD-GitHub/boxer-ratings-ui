import React, {Component} from 'react';
import SortableBoxerList from './SortableBoxerList';
import RatingService from '../../services/RatingService';
import UserActions from '../../store/Actions/UserActions';
import {animateScroll as scroll} from 'react-scroll';
import {connect} from "react-redux";

export class SortableBoxerListLoader extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {boxers: [], showError: false};
    this.boxerService = props.boxerService ? props.boxerService : new RatingService();
    this.handleSave = this.handleSave.bind(this);
  }

  getBoxers(user, division) {
    this.boxerService.fetchBoxersForUserAndDivision(user, division).then(boxers => {
      this._isMounted && this.setState({boxers: boxers, showError: true});
    }).catch(error => {
      if (error.message === 'auth') {
        const {dispatch} = this.props;
        dispatch(UserActions.logout());
      } else {
        let showError = error.message === 'failed';
        this._isMounted && this.setState({boxers: [], showError: showError});
      }
    });
  }

  handleSave(ratings) {
    return this.boxerService.saveRatingsForUserAndDivision(
      ratings, this.props.user, this.props.division
    );
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getBoxers(this.props.user, this.props.division);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    this.props.showMessage(false);
    this.getBoxers(nextProps.user, nextProps.division);
    scroll.scrollToTop({duration: 400});
  }

  render() {
    return (
      <SortableBoxerList boxers={this.state.boxers} showError={this.state.showError}
                         showMessage={this.props.showMessage} handleSave={this.handleSave}/>
    );
  }

}

function mapStateToProps(state) {
  const {user} = state.authentication;
  return {user};
}

const connectedSortableBoxerListLoader = connect(mapStateToProps)(SortableBoxerListLoader);

export default connectedSortableBoxerListLoader;
