import React, {Component} from 'react';
import BoxerList from './BoxerList';
import RatingService from '../../services/RatingService';
import {animateScroll as scroll} from 'react-scroll';

class BoxerListLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {boxers: [], showError: false, loading: true};
    this.boxerService = props.boxerService ? props.boxerService : new RatingService();
  }

  getBoxers(division) {
    let component = this;
    this.boxerService.fetchBoxersForDivision(division).then(boxers => {
      this.setState({boxers: boxers, showError: true});
    }).catch(error => {
      let showError = error.message === 'failed';
      this.setState({boxers: [], showError: showError});
    }).then(function () {
      component.setState({loading: false});
    });
  }

  componentDidMount() {
    this.getBoxers(this.props.division);
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
