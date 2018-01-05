import React from 'react';
import {mount} from 'enzyme';
import BoxerList from '../../components/BoxerList';

let HEAVYWEIGHTS = [
  {
    rating: 1, name: "Mike Tyson", homeTown: "Brooklyn, New York", record: "50-6-0", nationality: "US",
    snippet: "The baddest man on the planet!", id: 1
  },
  {
    rating: 2, name: "Evander Holyfield", homeTown: "Atlanta, Georgia", record: "44-10-2", nationality: "US",
    snippet: "He was the real deal.", id: 2
  },
  {
    rating: 3, name: "Riddick Bowe", homeTown: "Brooklyn, New York", record: "43-1-0", nationality: "US",
    snippet: "He loved cakes.", id: 3
  }
];

let WELTERWEIGHTS = [
  {
    rating: 1, name: "Ray Leonard", homeTown: "Wilmington, North Carolina", record: "36-3-1", nationality: "US",
    snippet: "The sugar man.", id: 1
  },
  {
    rating: 2, name: "Thomas Hearns", homeTown: "Detroit, Michigan", record: "61-5-1", nationality: "US",
    snippet: "The hit man.", id: 2
  }
];

describe('<BoxerList/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BoxerList boxers={HEAVYWEIGHTS}/>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Renders a list of boxers.', () => {
    expect(wrapper.find('div#1 h4').text()).toBe('Mike Tyson');
    expect(wrapper.find('div#1 p.media-metatag').text()).toMatch(new RegExp('(50-6-0)'));
    expect(wrapper.find('div#1 p.media-metatag').text()).toMatch(new RegExp('Brooklyn, New York'));

    expect(wrapper.find('div#2 h4').text()).toBe('Evander Holyfield');
    expect(wrapper.find('div#2 p.media-metatag').text()).toMatch(new RegExp('(44-10-2)'));
    expect(wrapper.find('div#2 p.media-metatag').text()).toMatch(new RegExp('Atlanta, Georgia'));

    expect(wrapper.find('div#3 h4').text()).toBe('Riddick Bowe');
    expect(wrapper.find('div#3 p.media-metatag').text()).toMatch(new RegExp('(43-1-0)'));
    expect(wrapper.find('div#3 p.media-metatag').text()).toMatch(new RegExp('Brooklyn, New York'));
  });

  it('Updates the list of boxers when the state is changed.', () => {
    wrapper.setProps({boxers: WELTERWEIGHTS});

    expect(wrapper.find('div#1 h4').text()).toBe('Ray Leonard');
    expect(wrapper.find('div#1 p.media-metatag').text()).toMatch(new RegExp('(36-3-1)'));
    expect(wrapper.find('div#1 p.media-metatag').text()).toMatch(new RegExp('Wilmington, North Carolina'));

    expect(wrapper.find('div#2 h4').text()).toBe('Thomas Hearns');
    expect(wrapper.find('div#2 p.media-metatag').text()).toMatch(new RegExp('(61-5-1)'));
    expect(wrapper.find('div#2 p.media-metatag').text()).toMatch(new RegExp('Detroit, Michigan'));
  });
});