import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';

var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

import Ratings from './Container';
import BoxerList from '../Boxer/List';

var DIVISIONS = [
  {id: 'heavyweight', name: 'Heavyweight', weightLimit: 'Over 200lbs/14st 4lbs'},
  {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: '200lbs/14st 4lbs '},
  {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: '175lbs/12st 7lbs'}
];

var BOXERS = [
  {rating: 1, name: "Mike Tyson", homeTown: "Brooklyn, New York", record: "50-6-0", nationality: "US",
    snippet: "The baddest man on the planet!"},
  {rating: 2, name: "Evander Holyfield", homeTown: "Atlanta, Georgia", record: "44-10-2", nationality: "US",
    snippet: "He was the real deal."},
  {rating: 3, name: "Riddick Bowe", homeTown: "Brooklyn, New York", record: "43-1-0", nationality: "US",
    snippet: "He loved cakes."},
];

describe('<Ratings/>', () => {
  let wrapper;

  beforeEach(() => {
    var fetchMock = sinon.stub(window, 'fetch');
    var response = new window.Response(JSON.stringify({boxers:BOXERS}));
    fetchMock.returnsPromise().resolves(response);
    wrapper = mount(<Ratings divisions={DIVISIONS} />);
  });

  afterEach(() => {
    sinon.restore(window.fetch);
  });

  it('Displays the right default division header.', () => {
    expect(wrapper.find('h1').text()).toBe('Heavyweight Over 200lbs/14st 4lbs');
  });

  it('Updates the division header when a division option is clicked.', () => {
    wrapper.find('#light-heavyweight').simulate('click');
    expect(wrapper.find('h1').text()).toBe('Light Heavyweight 175lbs/12st 7lbs');
  });

  it('Renders the list of boxers.', () => {
    wrapper.setState({boxers:BOXERS});
    expect(wrapper.find('#boxers').children().length).toBe(3);
    expect(wrapper.find('#1').text()).toBe('1. Mike Tyson (50-6-0)  Brooklyn, New York  Flag=US  23765 points ');
    expect(wrapper.find('#2').text()).toBe('2. Evander Holyfield (44-10-2)  Atlanta, Georgia  Flag=US  23765 points ');
    expect(wrapper.find('#3').text()).toBe('3. Riddick Bowe (43-1-0)  Brooklyn, New York  Flag=US  23765 points ');
  });

});