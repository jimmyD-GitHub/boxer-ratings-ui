import axios from 'axios';
import userService from './UserService';
import storageMock from '../store/helpers/MockStorage';

let MockAdapter = require('axios-mock-adapter');

describe('UserService', () => {
  let mock = new MockAdapter(axios);
  let email = 'example@test.com', password = 'strong_pass_456hgjtu867';

  beforeEach(() => {
    window.Storage = storageMock;
    window.localStorage = storageMock;
  });

  afterEach(() => {
    userService.logout();
    mock.restore();
  });

  it('It returns a user object after a successful login.', () => {

    let user = {id: 999, name: 'Jimmy', token: 'ghbdhfyrt6475hnghyrtgdf'};
    mock.onPost('/auth/', {email: email, password: password}).reply(200, {user});

    userService.login(email, password).then(response => {
      expect(response.id).toBe(user.id);
      expect(response.name).toBe(user.name);
      expect(response.token).toBe(user.token);
    });

  });

  it('It returns an error object after an unsuccessful login.', () => {

    mock.onPost('/auth/', {email: email, password: password}).reply(500);

    userService.login(email, password).catch(errorType => {
      expect(errorType).toBe('email'); //default to email error if internal server error
    });

  });

});