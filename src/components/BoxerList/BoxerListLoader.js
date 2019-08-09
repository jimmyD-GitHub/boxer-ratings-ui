import React, {Component} from 'react';
import BoxerList from './BoxerList';
import RatingService from '../../services/RatingService';

class BoxerListLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {boxers: [], showError: false};
    this.boxerService = props.boxerService ? props.boxerService : new RatingService();
  }

  getBoxers(division) {
    this.boxerService.fetchBoxersForDivision(division).then(boxers => {
      this.setState({boxers: boxers, showError: true});
    }).catch(error => {
      let showError = error.message === 'failed';
      this.setState({boxers: [], showError: showError});
    });
  }

  componentDidMount() {
    this.getBoxers(this.props.division);
  }

  componentWillReceiveProps(nextProps) {
    this.getBoxers(nextProps.division);
  }

  render() {
    return (
      <BoxerList boxers={this.state.boxers} divisionId={this.props.division.id} showError={this.state.showError}/>
    );
  }

}

export default BoxerListLoader;
