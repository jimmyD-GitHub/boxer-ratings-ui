import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import {withRouter} from 'react-router-dom';
import UserActions from '../store/Actions/UserActions';
import {connect} from "react-redux";

export class VerifyEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {verified: true};
  }

  componentDidMount() {
    const {dispatch, match} = this.props;
    dispatch(UserActions.logout());
    dispatch(UserActions.clearSignUp());
    setTimeout(function () {
      dispatch(UserActions.verifyEmail(match.params.token));
    }, 2000);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!nextProps.loggedIn) {
      this.setState({verified: false});
    } else if (this.props.history) {
      this.props.history.push('/my-ratings');
    }
  }

  render() {
    const {loginFail} = this.props;
    return (
      <div id="verify-email">
        <Helmet>
          <title>BoxerRatings: Verify Email</title>
        </Helmet>
        {this.state.verified &&
        <p className="alert alert-success" role="alert">
          <strong>Thanks!</strong> - Wait a second while we log you in...
        </p>
        }
        {this.state.verified === false &&
        <p className="alert alert-danger" role="alert">
          <strong>Oops!</strong> - {loginFail === 'alreadyVerified' ?
          'This email address has already been verified.' :
          'This email confirmation URL is not valid.'}
        </p>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {loggedIn, loginFail} = state.authentication;
  return {loggedIn, loginFail};
}

const connectedVerifyEmail = connect(mapStateToProps)(VerifyEmail);

export default withRouter(connectedVerifyEmail);