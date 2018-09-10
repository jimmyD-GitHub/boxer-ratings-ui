import React from 'react';
import {mount} from 'enzyme';
import SignUpForm from './SignUpForm';
import sinon from 'sinon';

describe('<SignUpForm/>', () => {
  let wrapper, form, name, email, password, confirm, handleSignUp = sinon.spy();

  beforeEach(() => {
    wrapper = mount(<SignUpForm handleSignUp={handleSignUp}/>);
    form = wrapper.find('form');
    name = wrapper.find('#name');
    email = wrapper.find('#signupEmail');
    password = wrapper.find('#signupPassword');
    confirm = wrapper.find('#confirm');
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('It updates state as the inputs are changed.', () => {
    let emailAddress = 'test@GMAIL.com', paswd = 'Autumn-ZY98';
    email.simulate('change', {target: {value: emailAddress, id: 'signupEmail'}});
    password.simulate('change', {target: {value: paswd, id: 'signupPassword'}});

    let state = wrapper.state();
    expect(state.signupEmail).toEqual(emailAddress.toLowerCase());
    expect(state.signupPassword).toEqual(paswd);
  });

  it('An error message is displayed if the name is too long.', () => {
    name.simulate('change', {target: {value: 'ttttttttttttttteeeeeeeeeeeeeeesssssssssssssstttttttttt', id: 'name'}});
    form.simulate('submit');
    expect(wrapper.find('#name-error').exists()).toBe(true);
    expect(wrapper.find('#name-error').text()).toBe('Invalid Name');
    name.simulate('change', {target: {value: 'Jimmy', id: 'name'}});
    form.simulate('submit');
    expect(wrapper.find('#name-error').exists()).toBe(false);
  });

  it('An error message is displayed if the email address is invalid.', () => {
    email.simulate('change', {target: {value: 'invalid.email', id: 'signupEmail'}});
    form.simulate('submit');
    expect(wrapper.find('#email-error').exists()).toBe(true);
    expect(wrapper.find('#email-error').text()).toBe('Invalid Email');
    email.simulate('change', {target: {value: 'test@gmail.com', id: 'signupEmail'}});
    form.simulate('submit');
    expect(wrapper.find('#email-error').exists()).toBe(false);
  });

  it('An error message is displayed if the password is too weak but not if it is strong.', () => {
    password.simulate('change', {target: {value: 'tttgggrrr', id: 'signupPassword'}});
    form.simulate('submit');
    expect(wrapper.find('#password-error').exists()).toBe(true);
    expect(wrapper.find('#password-error').text()).toBe('Password Too Weak');
    password.simulate('change', {target: {value: '1EDZep96john', id: 'signupPassword'}});
    form.simulate('submit');
    expect(wrapper.find('#password-error').exists()).toBe(false);
  });

  it('An error message is displayed if the passwords do not match.', () => {
    password.simulate('change', {target: {value: 'this_is_a_strong_password', id: 'signupPassword'}});
    confirm.simulate('change', {target: {value: 'this_is_a_very_strong_password', id: 'confirm'}});
    form.simulate('submit');
    expect(wrapper.find('#confirm-error').exists()).toBe(true);
    expect(wrapper.find('#confirm-error').text()).toBe('Passwords Do Not Match');
    confirm.simulate('change', {target: {value: 'this_is_a_strong_password', id: 'confirm'}});
    form.simulate('submit');
    expect(wrapper.find('#confirm-error').exists()).toBe(false);
  });

  it('It calls the sign up handler if the form is valid.', () => {
    let userName = 'Jimmy', emailAddress = 'test@gmail.com', paswd = 'Autumn-ZY98';

    name.simulate('change', {target: {value: userName, id: 'name'}});
    email.simulate('change', {target: {value: emailAddress, id: 'signupEmail'}});
    password.simulate('change', {target: {value: paswd, id: 'signupPassword'}});
    confirm.simulate('change', {target: {value: paswd, id: 'confirm'}});
    form.simulate('submit');

    expect(handleSignUp.called).toBe(true);
    expect(handleSignUp.getCall(0).args[0]).toEqual(userName);
    expect(handleSignUp.getCall(0).args[1]).toEqual(emailAddress);
    expect(handleSignUp.getCall(0).args[2]).toEqual(paswd);
  });

});