import axios from 'axios';
import UserService from './UserService';

let MockAdapter = require('axios-mock-adapter');

describe('UserService', () => {
  let userService, mock, jimmy = {id: 999, name: 'Jimmy'};

  beforeEach(() => {
    mock = new MockAdapter(axios);
    userService = new UserService();
  });

  afterEach(() => {
    mock.restore();
    userService.clearSignUp();
  });

  it('It returns a user object after a successful sign up.', () => {
    let data = {username: 'Jimmy', email: 'admin@boxeratings.com', password: 'strongPass_9999'};
    mock.onPost('/user-signup', data).reply(200, {user: jimmy});
    userService.signup(data.username, data.email, data.password).then(user => {
      expect(jimmy).toMatchObject(user);
    }).catch(function (error) {
      console.log(error);
    });
  });

  it('It returns an error message if the users email address has already been registered.', () => {
    let data = {username: 'Jimmy', email: 'admin@boxeratings.com', password: 'strongPass_9999'};
    mock.onPost('/user-signup', data).reply(422, {error: 'Email [admin@boxeratings.com] is already in use.', code: 10});
    userService.signup(data.username, data.email, data.password).then(user => {
      console.log(user);
    }).catch(function (error) {
      expect(error).toBe('email');
    });
  });

  it('It returns a user object after a successful login.', () => {
    let data = {email: 'admin@boxeratings.com', password: 'strongPass_9999'};
    mock.onPost('/auth', data).reply(200, {user: jimmy});
    userService.login(data.email, data.password).then(user => {
      expect(jimmy).toMatchObject(user);
    }).catch(function (error) {
      console.log(error);
    });
  });

  it('It returns an error message if the users login credentials are invalid.', () => {
    let data = {email: 'admin@boxeratings.com', password: 'strongPass_9999'};
    mock.onPost('/auth', data).reply(422, {error: 'Password is not correct.', code: 20});
    userService.login(data.email, data.password).then(user => {
      console.log(user);
    }).catch(function (error) {
      expect(error).toBe('password');
    });
  });

  it('It returns an error message if an unknown error occurs.', () => {
    let data = {email: 'admin@boxeratings.com', password: 'strongPass_9999'};
    mock.onPost('/auth', data).reply(500, {error: 'Something is broken.', code: 0});
    userService.login(data.email, data.password).then(user => {
      console.log(user);
    }).catch(function (error) {
      expect(error).toBe('unknown');
    });
  });

  it('It returns a user object after the user confirms their email address.', () => {
    let data = {encoded: 'secretlyencodedstring'};
    mock.onPost('/verify-email', data).reply(200, {user: jimmy});
    userService.verifyEmail(data.encoded).then(user => {
      expect(jimmy).toMatchObject(user);
    }).catch(function (error) {
      console.log(error);
    });
  });

  it('It returns an error message if the users email address has already been verified.', () => {
    let data = {encoded: 'secretlyencodedstring'};
    mock.onPost('/verify-email', data).reply(422, {
      error: 'The email address for this user has already been verified.',
      code: 30
    });
    userService.verifyEmail(data.encoded).then(user => {
      console.log(user);
    }).catch(function (error) {
      expect(error).toBe('alreadyVerified');
    });
  });

});