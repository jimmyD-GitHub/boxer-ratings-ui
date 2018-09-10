import UserConstants from '../Constants/UserConstants';

let user = null, signup = null;
if (typeof(Storage) !== "undefined") {
  user = JSON.parse(localStorage.getItem('user'));
  signup = JSON.parse(localStorage.getItem('sign-up'));
}

const initialAuthState = user ? {loggedIn: true, user} : {};
const initialRegState = signup ? {signedUp: true, signup} : {};

export function authentication(state = initialAuthState, action) {
  switch (action.type) {
    case UserConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case UserConstants.LOGIN_FAILURE:
      return {
        loginFail: action.error
      };
    case UserConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

export function registration(state = initialRegState, action) {
  switch (action.type) {
    case UserConstants.SIGNUP_REQUEST:
      return {
        signingUp: true,
        signup: action.user
      };
    case UserConstants.SIGNUP_SUCCESS:
      return {
        signedUp: true,
        signup: action.user
      };
    case UserConstants.SIGNUP_FAILURE:
      return {
        signedUp: false,
        signupFail: action.error
      };
    default:
      return state
  }
}