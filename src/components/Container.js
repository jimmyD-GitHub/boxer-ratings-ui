import React, {Component} from 'react';
import Divisions from '../data/Divisions';
import NavBar from '../components/NavBar';
import OurRatings from '../pages/OurRatings';
import YourRatings from '../pages/YourRatings';

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {selected: 'our-ratings'};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({selected: id});
  }

  render() {

    let page;
    switch (this.state.selected) {
      case 'our-ratings':
        page = <OurRatings divisions={Divisions} />;
        break;
      case 'your-ratings':
        page = <YourRatings divisions={Divisions} />;
        break;
      default:
        page = null;
    }

    return (
      <div className="row">
        <NavBar selected={this.state.selected} onClick={this.handleClick}/>
        {page}
      </div>
    );
  }

}

export default Container;