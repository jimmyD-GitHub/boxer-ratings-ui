import React, {Component} from 'react';
import NavBar from '../components/NavBar';
import DivisionMenu from '../components/DivisionMenu';
import BoxerList from '../components/BoxerList';
import BoxerData from '../services/BoxerData';

class OurRatings extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {selectedDivision: this.props.divisions[0], boxers: []};
    this.data = props.boxerData ? props.boxerData : new BoxerData();
  }

  componentDidMount() {
    this.data.fetchBoxersForDivision(this.state.selectedDivision).then(boxers => {
      this.setState({boxers: boxers});
    });
  }

  handleClick(division) {
    this.setState({selectedDivision: division});
    this.data.fetchBoxersForDivision(division).then(boxers => {
      this.setState({boxers: boxers});
    });
  }

  render() {
    return (
      <div className="row">
        <NavBar/>
        <div className="col-md-8">
          <h1>
            {this.state.selectedDivision.name} <small>{this.state.selectedDivision.weightLimit}</small>
          </h1>
          <BoxerList boxers={this.state.boxers} />
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

export default OurRatings;
