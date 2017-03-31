import React, {Component} from 'react';
import Divisions from '../data/Divisions';
import NavBar from '../components/NavBar';
import OurRatings from '../pages/OurRatings';

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {selected: 'ratings'};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({selected: id});
  }

  render() {
    return (
      <div className="row">
        <NavBar selected={this.state.selected} onClick={this.handleClick}/>
        <OurRatings divisions={Divisions} />
      </div>
    );
  }

}

export default Container;