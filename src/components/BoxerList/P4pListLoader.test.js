import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import P4pListLoader from './P4pListLoader';
import RatingService from '../../services/RatingService';

const boxers = [
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

describe('<P4pListLoader/>', () => {
  let wrapper, ratingService = new RatingService();

  it('It loads boxer list items for each of the boxers retrieved from the API.', async () => {
    sinon.stub(ratingService, 'fetchP4pBoxers').resolves(boxers);
    wrapper = await mount(<P4pListLoader boxerService={ratingService}/>);
    expect(wrapper.find('BoxerListItem').at(0).props().boxer.name).toBe('Mike Tyson');
    expect(wrapper.find('BoxerListItem').at(1).props().boxer.name).toBe('Evander Holyfield');
    expect(wrapper.find('BoxerListItem').at(2).props().boxer.name).toBe('Riddick Bowe');
  });
});