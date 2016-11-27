import React from 'react';
import {mount, shallow} from 'enzyme';
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

});