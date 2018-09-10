import UserService from '../../services/UserService';
import UserConstants from '../Constants/UserConstants';

const Service = new UserService();
const UserActions = {login, logout, signup, clearSignUp, verifyEmail};

function login(email, password) {
  return dispatch => {
    dispatch(request({email}));
    return Service.login(email, password)
      .then(
        user => {
          dispatch(success(user));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request(user) {
    return {type: UserConstants.LOGIN_REQUEST, user}
  }

  function success(user) {
    return {type: UserConstants.LOGIN_SUCCESS, user}
  }

  function failure(error) {
    return {type: UserConstants.LOGIN_FAILURE, error}
  }
}

function logout() {
  Service.logout();
  return {type: UserConstants.LOGOUT};
}

function clearSignUp() {
  Service.clearSignUp();
  return {type: UserConstants.SIGNUP_FAILURE, error: 'loggedIn'};
}

function signup(name, email, password) {
  return dispatch => {
    dispatch(request({email}));
    return Service.signup(name, email, password)
      .then(
        user => {
          dispatch(success(user));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request(user) {
    return {type: UserConstants.SIGNUP_REQUEST, user}
  }

  function success(user) {
    return {type: UserConstants.SIGNUP_SUCCESS, user}
  }

  function failure(error) {
    return {type: UserConstants.SIGNUP_FAILURE, error}
  }
}

function verifyEmail(token) {
  return dispatch => {
    return Service.verifyEmail(token)
      .then(
        user => {
          dispatch(success(user));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function success(user) {
    return {type: UserConstants.LOGIN_SUCCESS, user}
  }

  function failure(error) {
    return {type: UserConstants.LOGIN_FAILURE, error}
  }
}

export default UserActions;