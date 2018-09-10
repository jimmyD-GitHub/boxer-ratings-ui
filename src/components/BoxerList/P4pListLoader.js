import React, {Component} from 'react';
import BoxerList from './BoxerList';
import RatingService from '../../services/RatingService';

class P4pListLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {boxers: [], showError: false};
    this.boxerService = props.boxerService ? props.boxerService : new RatingService();
  }

  getBoxers() {
    this.boxerService.fetchP4pBoxers().then(boxers => {
      this.setState({boxers: boxers, showError: true});
    }).catch(error => {
      let showError = error.message === 'failed';
      this.setState({boxers: [], showError: showError});
    });
  }

  componentDidMount() {
    this.getBoxers();
  }

  render() {
    return (<BoxerList p4p={true} boxers={this.state.boxers} showError={this.state.showError}/>);
  }
}

export default P4pListLoader;
