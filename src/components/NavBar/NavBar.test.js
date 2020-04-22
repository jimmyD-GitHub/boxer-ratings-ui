import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount, shallow} from 'enzyme';
import {NavBar} from './NavBar';
import sinon from 'sinon';
import UserActions from '../../store/Actions/UserActions';

describe('<NavBar/>', () => {
  let wrapper, dispatch = sinon.spy();
  let location = {pathname: null};

  let time = new Date().getTime();
  let now = Math.floor(time / 1000); //seconds timestamp

  const user = {name: 'Jimmy', expires: now + 10000};

  let history = {
    push: function () {
    }
  };

  beforeEach(() => {
    sinon.spy(history, 'push');
    sinon.spy(UserActions, 'clearSignUp');
    sinon.spy(UserActions, 'login');
    sinon.spy(UserActions, 'signup');
  });

  afterEach(() => {
    wrapper.unmount();
    history.push.restore();
    UserActions.clearSignUp.restore();
    UserActions.login.restore();
    UserActions.signup.restore();
  });

  it("The 'My Ratings' and 'Our Ratings' menu items are not shown when the user is not logged in.", () => {
    wrapper = mount(
      <MemoryRouter>
        <NavBar location={location} user={user} loggedIn={false}
                dispatch={dispatch} history={history}/>
      </MemoryRouter>
    );
    expect(wrapper.find('#my-ratings-link').exists()).toBe(false);
    expect(wrapper.find('#our-ratings-link').exists()).toBe(false);
    expect(wrapper.find('MenuLink').length).toBe(0);
    expect(wrapper.find('DivisionSelector').length).toBe(1);
    expect(wrapper.find('NavBarDropDowns').length).toBe(1);
  });

  it('The user is not redirected to /my-ratings unless they just logged in.', async () => {
    wrapper = mount(
      <MemoryRouter>
        <NavBar location={location} user={user} loggedIn={false}
                dispatch={dispatch} history={history}/>
      </MemoryRouter>
    );

    wrapper.setState({redirectedAfterLogin: true});
    wrapper.setProps({loggedIn: false});

    sinon.assert.callCount(history.push, 0);
  });

  it('The user sign up form is cleared after a successful login.', () => {
    wrapper = shallow(
      <NavBar location={location} user={user} loggedIn={false}
              dispatch={dispatch} history={history}/>
    );
    let email = 'admin@boxeratings.com', password = 'AUG345XCV';
    wrapper.instance().handleLogin(email, password);
    expect(dispatch.called).toBe(true);
    expect(UserActions.clearSignUp.calledOnce);
    expect(UserActions.login.calledOnce);
  });

  it('The signup methods triggers the appropriate user action.', () => {
    wrapper = shallow(
      <NavBar location={location} user={user} loggedIn={false}
              dispatch={dispatch} history={history}/>
    );
    let name = 'Jimmy', email = 'admin@boxeratings.com', password = 'AUG345XCV';
    wrapper.instance().handleSignUp(name, email, password);
    expect(dispatch.called).toBe(true);
    expect(UserActions.signup.calledOnce);
  });

  it("The 'My Ratings' menu item is displayed when the user is logged in.", () => {
    wrapper = mount(
      <MemoryRouter>
        <NavBar location={location} user={user} loggedIn={true}
                dispatch={dispatch} history={history}/>
      </MemoryRouter>
    );
    expect(wrapper.find('#my-ratings-link').exists()).toBe(true);
    expect(wrapper.find('#our-ratings-link').exists()).toBe(true);
    expect(wrapper.find('MenuLink').length).toBe(2);
    expect(wrapper.find('DivisionSelector').length).toBe(1);
    expect(wrapper.find('NavBarDropDowns').length).toBe(1);
    wrapper.find('#log-out').simulate('click');
    expect(history.push.calledOnce);
    expect(history.push.getCall(0).args[0]).toBe('/our-ratings/heavyweight');
    expect(dispatch.called).toBe(true); //user log out
  });

  it('It logs the user out if their session has expired.', () => {

    user.expires = 1560260921;

    wrapper = mount(
      <MemoryRouter>
        <NavBar location={location} user={user} loggedIn={true}
                dispatch={dispatch} history={history}/>
      </MemoryRouter>
    );

    expect(dispatch.called).toBe(true); //session time out
  });

});