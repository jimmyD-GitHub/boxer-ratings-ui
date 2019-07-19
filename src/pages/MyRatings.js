import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {Route, Redirect, Switch} from 'react-router-dom';
import Divisions from '../components/DivisionList/DivisionData';
import DivisionMenu from '../components/DivisionList/DivisionMenu';
import SortableBoxerListLoader from '../components/SortableBoxerList/SortableBoxerListLoader';
import SuccessMessage from '../components/Message/SuccessMessage';
import ErrorMessage from '../components/Message/ErrorMessage';
import '../assets/css/messageFadeOut.css';

const findDivision = (id) => Divisions.find(d => d.id === id);

class Boxers extends Component {

  constructor(props) {
    super(props);
    this.showMessage = this.showMessage.bind(this);
    this.state = {success: false, failure: false};
  }

  showMessage(success = true, failure = false) {
    this.setState({success: success, failure: failure});
    if (success) {
      setTimeout(() => {
        this.setState({success: false})
      }, 3000);
    }
  }

  render() {
    let divisionId = this.props.match.params.id ? this.props.match.params.id : 'heavyweight';
    const division = findDivision(divisionId);
    const success = 'Your ' + division.name + ' ratings have been updated.';
    const failure = 'Your ' + division.name + ' ratings could not be updated. Please try again later.';
    return (
      <div className="col-md-8">
        {this.state.success && <SuccessMessage message={success} fadeout={true}/>}
        {this.state.failure && <ErrorMessage message={failure}/>}
        <h3>My Ratings: <span className="white">{division.name}</span></h3>
        <p>Drag and drop then click SAVE to re-order the boxers and create your own {division.name} ratings.</p>
        <hr/>
        <SortableBoxerListLoader division={division} showMessage={this.showMessage}/>
      </div>
    );
  }
}

class MyRatings extends Component {

  render() {
    const {loggedIn} = this.props;
    const divisions = [...Divisions];
    divisions.shift();

    return loggedIn !== true ? <Redirect to='/our-ratings/heavyweight'/> : (
      <div id="my-ratings">
        <Helmet>
          <title>BoxerRatings: My Ratings</title>
        </Helmet>
        <Switch>
          <Redirect exact from='/my-ratings' to='/my-ratings/heavyweight'/>
          <Route exact path="/my-ratings/:id" component={Boxers}/>
        </Switch>
        <div className="col-md-3 col-sm-4 col-md-offset-1 col-sm-offset-0">
          <DivisionMenu divisions={divisions} path="/my-ratings/"/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {loggedIn} = state.authentication;
  return {loggedIn};
}

const connectedMyRatings = connect(mapStateToProps)(MyRatings);

export default connectedMyRatings;