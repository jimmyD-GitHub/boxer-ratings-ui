import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import BoxerListLoader from '../components/BoxerListLoader';
import DivisionMenu from '../components/DivisionMenu';
import DIVISIONS from '../data/Divisions';

const findDivision = (id) => DIVISIONS.find(d => d.id === id);
const Boxers = ({match}) => {
  let divisionId = match.params.id ? match.params.id : 'heavyweight';
  const division = findDivision(divisionId);
  return (
    <div className="col-md-8">
      <h3>{division.name} <small>{division.weightLimit}</small></h3>
      <hr/>
      <BoxerListLoader division={division}/>
    </div>
  )
};

const OurRatings = () => (
  <div id="our-ratings">
    <Switch>
      <Redirect exact from='/our-ratings' to='/our-ratings/heavyweight'/>
      <Route exact path="/our-ratings/:id" component={Boxers}/>
    </Switch>
    <div className="col-md-3 col-sm-4 col-md-offset-1 col-sm-offset-0">
      <DivisionMenu divisions={DIVISIONS} path="/our-ratings/"/>
    </div>
  </div>
);

export default OurRatings;