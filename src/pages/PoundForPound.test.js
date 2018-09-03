import React from 'react';
import {mount} from 'enzyme';
import PoundForPound from '../pages/PoundForPound';

describe('<PoundForPound/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<PoundForPound/>);
  });

  it('It loads...', () => {
    expect(wrapper.find('h3').text()).toBe('Pound For Pound: All Divisions');
  });
});