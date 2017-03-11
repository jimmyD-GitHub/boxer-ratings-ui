import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
require('sinon-as-promised');

import Ratings from './Container';
import DivisionMenu from '../Division/Menu';
import BoxerList from '../Boxer/List';

var DIVISIONS = [
  {id: 'heavyweight', name: 'Heavyweight', weightLimit: 'Over 200lbs/14st 4lbs'},
  {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: '200lbs/14st 4lbs'},
  {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: '175lbs/12st 7lbs'}
];

describe('<Ratings/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Ratings divisions={DIVISIONS} />);
  });

  it('Shows the heavyweight ratings by default', () => {
    expect(wrapper.find('h1').text()).toBe('Heavyweight Over 200lbs/14st 4lbs');
  });

  it('Loads the Division Menu and the Boxer List', () => {
    expect(wrapper.find(DivisionMenu).length).toBe(1);
    expect(wrapper.find(BoxerList).length).toBe(1);
  });

});