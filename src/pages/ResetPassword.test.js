import React from 'react';
import {mount} from 'enzyme';
import ResetPassword from '../pages/ResetPassword';

describe('<ResetPassword/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ResetPassword/>);
  });

  it('It loads...', () => {
    expect(wrapper.find('h3').text()).toBe('Reset Password');
  });
});