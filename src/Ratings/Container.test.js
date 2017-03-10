import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';

var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

import Ratings from './Container';

var DIVISIONS = [
  {id: 'heavyweight', name: 'Heavyweight', weightLimit: 'Over 200lbs/14st 4lbs'},
  {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: '200lbs/14st 4lbs'},
  {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: '175lbs/12st 7lbs'}
];

var HEAVYWEIGHTS = [
  {rating: 1, name: "Mike Tyson", homeTown: "Brooklyn, New York", record: "50-6-0", nationality: "US",
    snippet: "The baddest man on the planet!"},
  {rating: 2, name: "Evander Holyfield", homeTown: "Atlanta, Georgia", record: "44-10-2", nationality: "US",
    snippet: "He was the real deal."},
  {rating: 3, name: "Riddick Bowe", homeTown: "Brooklyn, New York", record: "43-1-0", nationality: "US",
    snippet: "He loved cakes."},
];

var CRUISERWEIGHTS = [
  {rating: 1, name: "Virgil Hill", homeTown: "Williston, North Dakota", record: "51-7-0", nationality: "US",
    snippet: "Olympic silver medalist."},
  {rating: 2, name: "Jean-Marc Mormeck", homeTown: "Pantin, Seine-Saint-Denis", record: "37-6-0", nationality: "France",
    snippet: "His fans chose his nickname."},
  {rating: 3, name: "David Haye", homeTown: "Bermondsey, London", record: "28-3-0", nationality: "UK",
    snippet: "He supports Millwall FC."},
];

describe('<Ratings/>', () => {
  let wrapper, fetchMock;

  beforeEach(() => {
    fetchMock = sinon.stub(window, 'fetch');
    fetchMock.returnsPromise().resolves(new window.Response(JSON.stringify({boxers:HEAVYWEIGHTS})));
    wrapper = mount(<Ratings divisions={DIVISIONS} />);
  });

  afterEach(() => {
    sinon.restore(window.fetch);
  });

  it('Renders the Heavyweight boxers until you click Cruiserweight, then it shows the Cruiserweighs.', (done) => {

    done();
    expect(wrapper.find('h1').text()).toBe('Heavyweight Over 200lbs/14st 4lbs');

    expect(wrapper.find('#boxers').children().length).toBe(3);
    expect(wrapper.find('#1').text()).toBe('1. Mike Tyson (50-6-0)  Brooklyn, New York  Flag=US  23765 points ');
    expect(wrapper.find('#2').text()).toBe('2. Evander Holyfield (44-10-2)  Atlanta, Georgia  Flag=US  23765 points ');
    expect(wrapper.find('#3').text()).toBe('3. Riddick Bowe (43-1-0)  Brooklyn, New York  Flag=US  23765 points ');

    wrapper.find('#cruiserweight').simulate('click');
    expect(wrapper.find('h1').text()).toBe('Cruiserweight 200lbs/14st 4lbs');

  });

});