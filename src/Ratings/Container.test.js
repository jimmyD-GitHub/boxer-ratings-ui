import React from 'react';
import {mount, shallow} from 'enzyme';

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

  const wrapper = mount(<Ratings divisions={DIVISIONS} />);

  it('Displays the right default division header.', () => {
    //console.log(wrapper.debug());
    //expect(wrapper.contains(<h1>Heavyweight <small>Over 200lbs/14st 4lbs</small></h1>)).toEqual(true);
  });

});