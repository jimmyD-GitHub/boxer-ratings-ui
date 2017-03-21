import React, {Component} from 'react';
import DivisionOptions from '../Division/Options';

class Layout extends Component {

  render() {
    return (
      <div className="row">
        <NavBar/>
        <div className="col-md-8">
          <Ratings divisions={DivisionOptions} />
        </div>
      </div>
    );
  }

}

export default Layout;