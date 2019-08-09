import React from 'react';
import {Helmet} from "react-helmet";
import {Route, Redirect, Switch} from 'react-router-dom';
import BoxerListLoader from '../components/BoxerList/BoxerListLoader';
import DivisionMenu from '../components/DivisionList/DivisionMenu';
import DIVISIONS from '../components/DivisionList/DivisionData';
import ConfirmEmailMessage from "../components/Message/ConfirmEmailMessage";
import {connect} from "react-redux";

const findDivision = (id) => DIVISIONS.find(d => d.id === id);
const Boxers = (props) => {
  let divisionId = props.match.params.id ? props.match.params.id : 'heavyweight';
  const division = findDivision(divisionId);
  return division === undefined ? <Redirect to='/our-ratings/heavyweight'/> : (
    <div className="col-md-8 col-sm-7">
      {props.confirmEmail &&
      <ConfirmEmailMessage name={props.signup.name} email={props.signup.email}/>
      }
      <h3>{division.name}&#160;
        <small>{division.weightLimit}</small>
      </h3>
      {divisionId === 'p4p' && <p>
        This pound for pound list is purely subjective and was not created with the intention to cause offense :)
        If you disagree with our ratings, feel free to roast us on <a
          href="https://twitter.com/@boxerRatings" rel="noopener noreferrer" target="_blank">Twitter <span
          className="glyphicon glyphicon-new-window" aria-hidden="true"/></a>
      </p>}
      {divisionId !== 'p4p' && <p>The ratings points <span
        className="star">&#11089;</span> are refreshed every 5 minutes. </p>}
      <hr/>
      <BoxerListLoader division={division}/>
    </div>
  )
};

const OurRatings = (props) => {
  const {signedUp, signup} = props;
  return (
    <div id="our-ratings">
      <Helmet>
        <title>BoxerRatings: Our Ratings</title>
      </Helmet>
      <Switch>
        <Redirect exact from='/our-ratings' to='/our-ratings/heavyweight'/>
        <Route exact path="/our-ratings/:id"
               render={(props) => <Boxers {...props} signup={signup} confirmEmail={signedUp}/>}
        />
        <Route render={(props) => <Boxers {...props} signup={signup} confirmEmail={signedUp}/>}
        />
      </Switch>
      <div className="col-md-3 col-sm-4 col-md-offset-1 col-sm-offset-0">
        <DivisionMenu divisions={DIVISIONS} path="/our-ratings/"/>
      </div>
    </div>
  )
};

function mapStateToProps(state) {
  const {signedUp, signup} = state.registration;
  return {signedUp, signup};
}

const connectedOurRatings = connect(mapStateToProps)(OurRatings);

export default connectedOurRatings;