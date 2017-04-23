import React, {Component} from 'react';
import BoxerList from '../components/BoxerList';
import DivisionMenu from '../components/DivisionMenu';
import BoxerData from '../services/BoxerData';
import divisions from '../data/divisions';

class OurRatings extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {selectedDivision: divisions[0], boxers: [], showError: false};
    this.data = props.boxerData ? props.boxerData : new BoxerData();
  }

  getBoxers(division) {
    this.data.fetchBoxersForDivision(division).then(boxers => {
      this.setState({boxers: boxers, showError: true});
    }).catch(error => {
      let showError = error.message === 'failed';
      if (this.mounted) {
        this.setState({boxers: [], showError: showError});
      }
    });
  }

  componentDidMount() {
    this.getBoxers(this.state.selectedDivision);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleClick(division, event) {
    event.preventDefault();
    this.setState({selectedDivision: division, boxers: [], showError: false});
    this.getBoxers(division);
  }

  render() {
    return (
      <div id="our-ratings">
        <div className="col-md-8">
          <h1>
            {this.state.selectedDivision.name} <small>{this.state.selectedDivision.weightLimit}</small>
          </h1>
          <BoxerList boxers={this.state.boxers} showError={this.state.showError} />
        </div>
        <div className="col-md-4">
           <DivisionMenu
             divisions={divisions}
             selectedDivision={this.state.selectedDivision}
             onClick={this.handleClick} />
        </div>
      </div>
    );
  }

}

export default OurRatings;
