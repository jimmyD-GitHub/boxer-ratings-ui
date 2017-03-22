import React, {Component} from 'react';
import Divisions from '../data/Divisions';
import NavBar from '../components/NavBar';
import OurRatings from '../pages/OurRatings';

class Container extends Component {

  render() {
    return (
      <div className="row">
        <NavBar/>
        <OurRatings divisions={Divisions} />
      </div>
    );
  }

}

export default Container;