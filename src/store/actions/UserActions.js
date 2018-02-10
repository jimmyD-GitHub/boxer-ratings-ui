import userService from '../../services/UserService';
import userConstants from '../constants/UserConstants';

const userActions = {
  login,
  logout
};

function login(email, password) {
  return dispatch => {
    dispatch(request({email}));
    userService.login(email, password)
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
    return {type: userConstants.LOGIN_REQUEST, user}
  }

  function success(user) {
    return {type: userConstants.LOGIN_SUCCESS, user}
  }

  function failure(error) {
    return {type: userConstants.LOGIN_FAILURE, error}
  }
}

function logout() {
  userService.logout();
  return {type: userConstants.LOGOUT};
}

export default userActions;