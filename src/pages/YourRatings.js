import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import DIVISIONS from '../data/Divisions';
import DivisionMenu from '../components/DivisionMenu';

const findDivision = (id) => DIVISIONS.find(d => d.id === id);
const Boxers = ({match}) => {
  let divisionId = match.params.id ? match.params.id : 'heavyweight';
  const division = findDivision(divisionId);
  return (
    <div className="col-md-8">
      <h3>{division.name}
        <small>{division.weightLimit}</small>
      </h3>
      <hr/>
    </div>
  )
};

const YourRatings = () => (
  <div id="our-ratings">
    <Switch>
      <Redirect exact from='/your-ratings' to='/your-ratings/heavyweight'/>
      <Route exact path="/your-ratings/:id" component={Boxers}/>
    </Switch>
    <div className="col-md-3 col-sm-4 col-md-offset-1 col-sm-offset-0">
      <DivisionMenu divisions={DIVISIONS} path="/your-ratings/"/>
    </div>
  </div>
);

export default YourRatings;