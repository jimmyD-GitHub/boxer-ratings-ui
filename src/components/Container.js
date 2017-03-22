import React, {Component} from 'react';
import Divisions from '../data/Divisions';
import OurRatings from '../pages/OurRatings';

class Container extends Component {

  render() {
    return (
      <div className="row">
        <NavBar/>
        <div className="col-md-8">
          <OurRatings divisions={Divisions} />
        </div>
      </div>
    );
  }

}

export default Container;