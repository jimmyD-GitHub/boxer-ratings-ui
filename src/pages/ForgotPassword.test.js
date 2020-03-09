import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import ForgotPassword from '../pages/ForgotPassword';
import {Provider} from 'react-redux';
import MockStore from "../store/Helpers/MockStore";
import UserService from "../services/UserService";
import {MemoryRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";

const Promise = require('bluebird');

describe('<ForgotPassword/>', () => {
  let wrapper, form, email, userService = new UserService();

  beforeEach(() => {
    MockStore.setLoggedIn(false);

    wrapper = mount(
      <Provider store={MockStore}>
        <ForgotPassword userService={userService}/>
      </Provider>
    );

    form = wrapper.find('form');
    email = wrapper.find('#forgotPasswordEmail');

  });

  afterEach(() => {
    if (userService.forgotPassword.restore && userService.forgotPassword.restore.sinon) {
      userService.forgotPassword.restore();
    }
  });

  it('It redirects if the user is logged in.', () => {

    MockStore.setLoggedIn(true);

    wrapper = mount(
      <MemoryRouter>
        <Provider store={MockStore}>
          <ForgotPassword userService={userService}/>
        </Provider>
      </MemoryRouter>
    );

    expect(wrapper.find(Redirect)).toHaveLength(1);

  });

  it('It makes the input box go red if you enter an invalid email address.', () => {

    let emailAddress = 'test-foo';

    email.simulate('change', {target: {value: emailAddress, id: 'forgotPasswordEmail'}});
    form.simulate('submit');

    expect(wrapper.find('#formGroup').hasClass('has-error')).toBe(true);
  });

  it('It shows a success message if a valid email address is submitted.', async () => {

    let emailAddress = 'test@gmail.com';
    sinon.stub(userService, 'forgotPassword').withArgs(emailAddress)
      .resolves({emailSent: true});

    email.simulate('change', {target: {value: emailAddress, id: 'forgotPasswordEmail'}});
    await form.simulate('submit');
    wrapper.update();

    expect(wrapper.find('.alert-success').exists()).toBe(true);
    expect(wrapper.find('.alert-danger').exists()).toBe(false);

    expect(wrapper.find('.alert-success').text())
      .toBe('Thanks! An email has been sent to test@gmail.com. You should receive it in the next 5 minutes.');
  });

  it('It shows an error message if something went wrong.', async () => {

    let emailAddress = 'test@gmail.com';
    sinon.stub(userService, 'forgotPassword').withArgs(emailAddress)
      .resolves({emailSent: false});

    email.simulate('change', {target: {value: emailAddress, id: 'forgotPasswordEmail'}});
    await form.simulate('submit');
    wrapper.update();

    expect(wrapper.find('.alert-success').exists()).toBe(false);
    expect(wrapper.find('.alert-danger').exists()).toBe(true);

    expect(wrapper.find('.alert-danger').text()).toBe('Oops! A reset password email could not be sent.');
  });

  it('It shows an error message if the email address is not recognised.', () => {

    let emailAddress = 'test@gmail.com';
    sinon.stub(userService, 'forgotPassword').withArgs(emailAddress)
      .rejects('test');

    email.simulate('change', {target: {value: emailAddress, id: 'forgotPasswordEmail'}});
    form.simulate('submit');

    return Promise.delay(10).then(() => {

      wrapper.update();
      expect(wrapper.find('.alert-success').exists()).toBe(false);
      expect(wrapper.find('.alert-danger').exists()).toBe(true);
      expect(wrapper.find('.alert-danger').text())
        .toBe('Oops! No account could be found for this email address.');

    });

  });

});