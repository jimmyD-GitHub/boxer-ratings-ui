import React, {Component} from 'react';
import DivisionMenu from '../components/DivisionMenu';

class YourRatings extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {selectedDivision: this.props.divisions[0]};
  }

  handleClick(division) {
    this.setState({selectedDivision: division});
  }

  render() {
    return (
      <div id="your-ratings">
        <div className="col-md-8">
          <h1>
            {this.state.selectedDivision.name} <small>{this.state.selectedDivision.weightLimit}</small>
          </h1>
        </div>
        <div className="col-md-4">
          <DivisionMenu
            divisions={this.props.divisions}
            selectedDivision={this.state.selectedDivision}
            onClick={this.handleClick} />
        </div>
      </div>
    );
  }

}

export default YourRatings;