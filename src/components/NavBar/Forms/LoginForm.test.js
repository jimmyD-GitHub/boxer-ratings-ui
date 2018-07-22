import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import LoginForm from './LoginForm';
import {Provider} from 'react-redux';
import MockStore from '../../../store/Helpers/MockStore';

describe('<LoginForm/>', () => {
  let wrapper, form, email, password;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Provider store={MockStore}>
          <LoginForm/>
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