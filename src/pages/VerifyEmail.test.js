import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {shallow, mount} from 'enzyme';
import {VerifyEmail} from '../pages/VerifyEmail';
import sinon from "sinon";

describe('<VerifyEmail/>', () => {
  let wrapper, dispatch = sinon.spy();

  let history = {
    push: function () {
    }
  };

  beforeEach(() => {
    wrapper = shallow(
      <VerifyEmail history={history} dispatch={dispatch} loggedIn={false} loginFail={false}/>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('It mounts OK.', () => {

    wrapper = mount(
      <MemoryRouter>
        <VerifyEmail history={history} dispatch={dispatch} loggedIn={false} loginFail={false}/>
      </MemoryRouter>
    );

    expect(wrapper.find('p').text()).toBe('Thanks! - Wait a second while we log you in...');

  });

  it('It shows and info message that changes to an error message if the token is invalid.', () => {

    expect(wrapper.find('p').text()).toBe('Thanks! - Wait a second while we log you in...');

    wrapper.setProps({loggedIn: false});

    expect(wrapper.find('p').text()).toBe('Oops! - This email confirmation URL is not valid.');

  });

  it('It redirects the user to the My Ratings page if their sign up is confirmed.', () => {

    sinon.spy(history, 'push');
    expect(wrapper.find('p').text()).toBe('Thanks! - Wait a second while we log you in...');

    wrapper.setProps({loggedIn: true, history: history});

    expect(history.push.calledOnce).toBe(true);
    expect(history.push.getCall(0).args[0]).toBe('/my-ratings');

    history.push.restore();

  });

});