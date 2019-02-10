import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import LoginForm from './LoginForm';
import {Provider} from 'react-redux';
import MockStore from '../../../store/Helpers/MockStore';
import sinon from 'sinon';

describe('<LoginForm/>', () => {
  let wrapper, form, email, password, handleLogin = sinon.spy();

  beforeEach(() => {

    wrapper = mount(
      <MemoryRouter>
        <Provider store={MockStore}>
          <LoginForm handleLogin={handleLogin}/>
        </Provider>
      </MemoryRouter>
    );

    form = wrapper.find('form');
    email = wrapper.find('#email');
    password = wrapper.find('#password');

  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('It calls the login handler if the credentials are valid.', () => {
    let emailAddress = 'test@gmail.com', paswd = 'Autumn-ZY98';
    email.simulate('change', {target: {value: emailAddress, id: 'email'}});
    password.simulate('change', {target: {value: paswd}});
    form.simulate('submit');
    expect(handleLogin.called).toBe(true);
    expect(handleLogin.getCall(0).args[0]).toEqual(emailAddress);
    expect(handleLogin.getCall(0).args[1]).toEqual(paswd);
  });

  it('An error message is displayed if the email address is invalid.', () => {
    email.simulate('change', {target: {value: 'invalid.email', id: 'email'}});
    form.simulate('submit');
    expect(wrapper.find('#email-error').text()).toBe('Invalid email...');
    email.simulate('change', {target: {value: 'test@gmail.com', id: 'email'}});
    form.simulate('submit');
    expect(wrapper.find('#email-error').exists()).toBe(false);
  });

  it('An error message is displayed if the password is invalid.', () => {
    password.simulate('change', {target: {value: 'password'}});
    form.simulate('submit');
    expect(wrapper.find('#password-error').text()).toBe('Invalid password...');
    password.simulate('change', {target: {value: 'this_is_a_strong_password'}});
    form.simulate('submit');
    expect(wrapper.find('#password-error').exists()).toBe(false);
  });

});