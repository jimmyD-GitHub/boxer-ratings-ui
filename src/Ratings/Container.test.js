import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';

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
    sinon.spy(window, 'fetch');
    wrapper = mount(<Ratings divisions={DIVISIONS} />);
  });

  afterEach(() => {
    window.fetch.restore();
  });

  it('Loads the Division Menu and the Boxer List.', () => {
    expect(wrapper.find(DivisionMenu).length).toBe(1);
    expect(wrapper.find(BoxerList).length).toBe(1);
  });

  it('Shows the heavyweight ratings by default.', () => {
    expect(wrapper.find('h1').text()).toBe('Heavyweight Over 200lbs/14st 4lbs');
  });

  it('Refreshes the ratings when a division option is clicked.', () => {
    wrapper.find('#cruiserweight').simulate('click');
    expect(wrapper.find('h1').text()).toBe('Cruiserweight 200lbs/14st 4lbs');
    wrapper.find('#light-heavyweight').simulate('click');
    expect(wrapper.find('h1').text()).toBe('Light Heavyweight 175lbs/12st 7lbs');
  });

  it('Makes API requests to retrieve data for the selected division.', () => {
    wrapper.find('#light-heavyweight').simulate('click');
    expect(window.fetch.calledTwice).toBe(true);
    expect(window.fetch.getCall(0).args[0]).toBe('/ratings/heavyweight');
    expect(window.fetch.getCall(1).args[0]).toBe('/ratings/light-heavyweight');
  });

});