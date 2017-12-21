import React, {Component} from 'react';
import BoxerList from '../components/BoxerList';
import BoxerData from '../services/BoxerData';

class BoxerListLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {boxers: [], showError: false};
    this.data = props.boxerData ? props.boxerData : new BoxerData();
    this.mounted = false;
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
    this.getBoxers(this.props.division);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    this.getBoxers(nextProps.division);
  }

  render() {
    return (<BoxerList boxers={this.state.boxers} showError={this.state.showError}/>);
  }

}

export default BoxerListLoader;
