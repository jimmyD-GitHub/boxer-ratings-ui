import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';

import Ratings from './Container';
import DivisionMenu from '../Division/Menu';
import BoxerList from '../Boxer/List';
import BoxerData from '../Service/BoxerData';

var DIVISIONS = [
  {id: 'heavyweight', name: 'Heavyweight', weightLimit: 'Over 200lbs/14st 4lbs'},
  {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: '200lbs/14st 4lbs'},
  {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: '175lbs/12st 7lbs'}
];

describe('<Ratings/>', () => {
  let wrapper, data = new BoxerData();

  beforeEach(() => {
    sinon.spy(data, 'fetchBoxersForDivision');
    wrapper = mount(<Ratings divisions={DIVISIONS} boxerData={data} />);
  });

  afterEach(() => {
    data.fetchBoxersForDivision.restore();
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
    expect(data.fetchBoxersForDivision.calledTwice).toBe(true);
    expect(data.fetchBoxersForDivision.getCall(0).args[0].id).toBe('heavyweight');
    expect(data.fetchBoxersForDivision.getCall(1).args[0].id).toBe('light-heavyweight');
  });

});