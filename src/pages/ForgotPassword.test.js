import React from 'react';
import {mount} from 'enzyme';
import ForgotPassword from '../pages/ForgotPassword';

describe('<ForgotPassword/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ForgotPassword/>);
  });

  it('It loads...', () => {
    expect(wrapper.find('h3').text()).toBe('Forgot Your Password?');
  });
});