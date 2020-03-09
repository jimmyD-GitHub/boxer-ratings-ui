import React from 'react';
import {mount} from 'enzyme';
import ResetPassword from '../pages/ResetPassword';
import {Provider} from 'react-redux';
import MockStore from "../store/Helpers/MockStore";
import UserService from "../services/UserService";
import {MemoryRouter} from 'react-router-dom';
import sinon from "sinon";

const Promise = require('bluebird');

describe('<ResetPassword/>', () => {
  let wrapper, token = 'kCMPAgqKL86TsQlOzYQziCqo9cHdj1Tv3aAi63fO6HIQySJ1oGH7LB';
  let form, password, confirmPassword, userService = new UserService();

  beforeEach(() => {

    let match = {params: {token: token}};
    MockStore.setLoggedIn(false);

    wrapper = mount(
      <MemoryRouter>
        <Provider store={MockStore}>
          <ResetPassword userService={userService} match={match}/>
        </Provider>
      </MemoryRouter>
    );

    form = wrapper.find('form');
    password = wrapper.find('#forgotPassword');
    confirmPassword = wrapper.find('#forgotPassword2');
  });

  afterEach(() => {
    if (userService.resetPassword.restore && userService.resetPassword.restore.sinon) {
      userService.resetPassword.restore();
    }
  });

  it('It shows a success message when the password is updated.', async () => {

    let newPassword = '2RTGop95';
    sinon.stub(userService, 'resetPassword').withArgs(token, newPassword)
      .resolves({passwordUpdated: true});

    password.simulate('change', {target: {value: newPassword, id: 'forgotPassword'}});
    confirmPassword.simulate('change', {target: {value: newPassword, id: 'forgotPassword2'}});

    await form.simulate('submit');

    wrapper.update();
    expect(wrapper.find('.alert-success').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').exists()).toBe(false);

    expect(wrapper.find('.alert-success').text())
      .toBe('Thanks! Your password has been updated.');
  });

  it('It asks the user to try again if the server rejects the token.', async () => {

    let newPassword = '2RTGop95';
    sinon.stub(userService, 'resetPassword').withArgs(token, newPassword)
      .resolves({passwordUpdated: false});

    password.simulate('change', {target: {value: newPassword, id: 'forgotPassword'}});
    confirmPassword.simulate('change', {target: {value: newPassword, id: 'forgotPassword2'}});

    await form.simulate('submit');

    wrapper.update();
    expect(wrapper.find('.alert-success').exists()).toBe(false);
    expect(wrapper.find('.alert-danger').exists()).toBe(true);

    expect(wrapper.find('.alert-danger').text())
      .toBe("Oops! That didn't work. The link in the email you received may have expired. " +
        "Click here to try this again.");
  });

  it('It shows an error message when the password is too weak or blank.', async () => {

    let newPassword = 'easy123';
    password.simulate('change', {target: {value: newPassword, id: 'forgotPassword'}});
    confirmPassword.simulate('change', {target: {value: newPassword, id: 'forgotPassword2'}});

    await form.simulate('submit');

    expect(wrapper.find('.alert-success').exists()).toBe(false);
    expect(wrapper.find('.alert-danger').exists()).toBe(true);

    expect(wrapper.find('.alert-danger').text())
      .toBe('Oops! The password you have provided is not strong enough. Think of a less hackable one.');

    password.simulate('change', {target: {value: '', id: 'forgotPassword'}});

    await form.simulate('submit');

    wrapper.update();
    expect(wrapper.find('.alert-danger').text())
      .toBe('Oops! Please provide a new password for your account.');
  });

  it("It shows an error message when the passwords don't match.", async () => {

    let newPassword = 'k9yhetgrtg88&hh_b';
    password.simulate('change', {target: {value: newPassword, id: 'forgotPassword'}});
    confirmPassword.simulate('change', {target: {value: 'foobar', id: 'forgotPassword2'}});

    await form.simulate('submit');

    wrapper.update();
    expect(wrapper.find('.alert-success').exists()).toBe(false);
    expect(wrapper.find('.alert-danger').exists()).toBe(true);

    expect(wrapper.find('.alert-danger').text())
      .toBe('Oops! The two passwords you have provided do not match.');
  });

  it('It shows an error message when the form is valid but the server encounters an internal error.', () => {

    let newPassword = '2RTGop95';
    sinon.stub(userService, 'resetPassword').withArgs(token, newPassword)
      .rejects('fail!');

    password.simulate('change', {target: {value: newPassword, id: 'forgotPassword'}});
    confirmPassword.simulate('change', {target: {value: newPassword, id: 'forgotPassword2'}});

    form.simulate('submit');

    return Promise.delay(10).then(() => {

      wrapper.update();
      expect(wrapper.find('.alert-success').exists()).toBe(false);
      expect(wrapper.find('.alert-danger').exists()).toBe(true);

      expect(wrapper.find('.alert-danger').text())
        .toBe("Oops! That didn't work. The link in the email you received may have expired. " +
          "Click here to try this again.");
    });

  });

});