import axios from 'axios';

const UserService = {
  login,
  logout
};

function login(email, password) {

  let api = axios.create({
    baseURL: process.env.REACT_APP_REST_API
  });

  return api.post('/auth/', {
    email: email,
    password: password
  }).then(function (response) {

    let user = response.data.user;

    if (typeof(Storage) !== "undefined") {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return user;

  }).catch(function (error) {

    let errorType = 'email', response;

    if (error.response) {
      response = error.response;
      errorType = (response.data.code && response.data.code === 20) ? 'password' : 'email';
    }

    return Promise.reject(errorType);

  });
}

function logout() {
  if (typeof(Storage) !== "undefined") {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
  }
}

export default UserService;