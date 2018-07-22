import UserService from '../../services/UserService';
import UserConstants from '../Constants/UserConstants';

const UserActions = {
  login,
  logout
};

function login(email, password) {
  return dispatch => {
    dispatch(request({email}));
    return UserService.login(email, password)
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
  UserService.logout();
  return {type: UserConstants.LOGOUT};
}

export default UserActions;