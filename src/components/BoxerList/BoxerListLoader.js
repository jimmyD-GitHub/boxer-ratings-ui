import React, {Component} from 'react';
import BoxerList from './BoxerList';
import RatingService from '../../services/RatingService';
import {animateScroll as scroll} from 'react-scroll';

class BoxerListLoader extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {boxers: [], showError: false, loading: true};
    this.boxerService = props.boxerService ? props.boxerService : new RatingService();
  }

  getBoxers(division) {
    this.setState({loading: true});
    let component = this;
    this.boxerService.fetchBoxersForDivision(division).then(boxers => {
      this._isMounted && this.setState({boxers: boxers, showError: true});
    }).catch(error => {
      let showError = error.message === 'failed';
      this.setState({boxers: [], showError: showError});
    }).then(function () {
      component._isMounted && component.setState({loading: false});
    });
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getBoxers(this.props.division);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    this.getBoxers(nextProps.division);
    scroll.scrollToTop({duration: 400});
  }

  render() {
    return (
      <BoxerList loading={this.state.loading} boxers={this.state.boxers} divisionId={this.props.division.id}
                 showError={this.state.showError}/>
    );
  }

}

export default BoxerListLoader;
