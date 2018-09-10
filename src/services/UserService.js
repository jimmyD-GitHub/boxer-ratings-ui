import axios from 'axios';

let save = function (data) {
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem(data.item, JSON.stringify(data.value));
  }
};

let remove = function (item) {
  if (typeof (Storage) !== "undefined") {
    localStorage.removeItem(item);
  }
};

let handleError = function (error) {
  let type;
  if (error.hasOwnProperty('response') && error.response.hasOwnProperty('data')) {
    let code = error.response.data.hasOwnProperty('code') ? error.response.data.code : 0;
    switch (code) {
      case 10:
        type = 'email';
        break;
      case 20:
        type = 'password';
        break;
      case 30:
        type = 'alreadyVerified';
        break;
      default:
        type = 'unknown';
    }
  }
  return Promise.reject(type);
};

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_REST_API
    });
  }

  login(email, password) {
    let data = {email: email, password: password};
    return this.api.post('/auth', data).then(function (response) {
      let user = response.data.user;
      save({item: 'user', value: user});
      remove('sign-up');
      return user;
    }).catch(function (error) {
      return handleError(error);
    });
  }

  logout() {
    remove('user');
  }

  signup(name, email, password) {
    let data = {username: name, email: email, password: password};
    return this.api.post('/user-signup', data).then(function (response) {
      let user = response.data.user;
      save({item: 'sign-up', value: user});
      return user;
    }).catch(function (error) {
      return handleError(error);
    });
  }

  clearSignUp() {
    remove('sign-up');
  }

  verifyEmail(token) {
    let data = {encoded: decodeURIComponent(token)};
    return this.api.post('/verify-email', data).then(function (response) {
      let user = response.data.user;
      save({item: 'user', value: user});
      remove('sign-up');
      return user;
    }).catch(function (error) {
      return handleError(error);
    });
  }
}

export default UserService;