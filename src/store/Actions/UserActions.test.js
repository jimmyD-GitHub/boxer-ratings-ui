import UserActions from './UserActions';
import UserConstants from '../Constants/UserConstants';
import UserService from '../../services/UserService';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('UserActions', () => {
  let email = 'test@example.com', password = 'abc123', user = {email: email}, error = {error: 'test'};

  it('It lets you log the user in.', () => {
    const store = mockStore({});
    sinon.stub(UserService.prototype, 'login').withArgs(email, password).resolves(user);

    let expectedActions = [
      {'type': UserConstants.LOGIN_REQUEST, 'user': user},
      {'type': UserConstants.LOGIN_SUCCESS, 'user': user}
    ];

    return store.dispatch(UserActions.login(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('It registers a failed log in.', () => {
    const store = mockStore({});
    UserService.prototype.login.restore();
    sinon.stub(UserService.prototype, 'login').withArgs(email, password).rejects(error);

    let expectedActions = [
      {'type': UserConstants.LOGIN_REQUEST, 'user': user},
      {'error': error, 'type': UserConstants.LOGIN_FAILURE}
    ];

    return store.dispatch(UserActions.login(email, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it('It lets you log the user out.', () => {
    sinon.spy(UserService.prototype, 'logout');
    expect(UserActions.logout()).toMatchObject({type: UserConstants.LOGOUT});
    expect(UserService.prototype.logout.calledOnce).toBeTruthy();
    UserService.prototype.logout.restore();
  });

});