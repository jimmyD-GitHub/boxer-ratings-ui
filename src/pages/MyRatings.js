import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import DIVISIONS from '../components/DivisionList/DivisionData';
import DivisionMenu from '../components/DivisionList/DivisionMenu';
import {connect} from "react-redux";

const findDivision = (id) => DIVISIONS.find(d => d.id === id);
const Boxers = ({match}) => {
  let divisionId = match.params.id ? match.params.id : 'heavyweight';
  const division = findDivision(divisionId);
  return (
    <div className="col-md-8">
      <h3>My Ratings: <span className="white">{division.name}</span></h3>
      <hr/>
    </div>
  )
};

class MyRatings extends Component {
  render() {
    const {loggedIn} = this.props;
    return loggedIn !== true ? <Redirect to='/our-ratings/heavyweight'/> : (
      <div id="my-ratings">
        <Switch>
          <Redirect exact from='/my-ratings' to='/my-ratings/heavyweight'/>
          <Route exact path="/my-ratings/:id" component={Boxers}/>
        </Switch>
        <div className="col-md-3 col-sm-4 col-md-offset-1 col-sm-offset-0">
          <DivisionMenu divisions={DIVISIONS} path="/my-ratings/"/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {loggedIn} = state.authentication;
  return {
    loggedIn
  };
}

const connectedMyRatings = connect(mapStateToProps)(MyRatings);

export default connectedMyRatings;