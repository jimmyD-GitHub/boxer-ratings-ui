import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import BoxerListLoader from './BoxerListLoader';
import RatingService from '../../services/RatingService';

const divisions = [
  {id: 'heavyweight', name: 'Heavyweight', weightLimit: 'Over 200lbs/14st 4lbs'},
  {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: '200lbs/14st 4lbs '},
  {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: '175lbs/12st 7lbs'}
];

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

describe('<BoxerListLoader/>', () => {
  let wrapper, ratingService = new RatingService();

  beforeEach(() => {
    sinon.spy(ratingService, 'fetchBoxersForDivision');
    wrapper = mount(<BoxerListLoader division={divisions[0]} boxerService={ratingService}/>);
  });

  afterEach(() => {
    ratingService.fetchBoxersForDivision.restore();
  });

  it('It makes the expected API request for the division property passed to it.', () => {
    expect(ratingService.fetchBoxersForDivision.getCall(0).args[0].id).toBe('heavyweight');
    expect(wrapper.find('BoxerList').length).toBe(1);
  });

  it('It makes the expected API request when the division property is refreshed.', () => {
    wrapper.setProps({division: divisions[2]});
    expect(ratingService.fetchBoxersForDivision.getCall(0).args[0].id).toBe('heavyweight');
    expect(ratingService.fetchBoxersForDivision.getCall(1).args[0].id).toBe('light-heavyweight');
    expect(wrapper.find('BoxerList').length).toBe(1);
  });

  it('It loads boxer list items for each of the boxers retrieved from the API.', async () => {
    ratingService.fetchBoxersForDivision.restore();
    sinon.stub(ratingService, 'fetchBoxersForDivision').withArgs(divisions[0]).resolves(boxers);
    wrapper = await mount(<BoxerListLoader division={divisions[0]} boxerService={ratingService}/>);
    expect(wrapper.find('BoxerListItem').at(0).props().boxer.name).toBe('Mike Tyson');
    expect(wrapper.find('BoxerListItem').at(1).props().boxer.name).toBe('Evander Holyfield');
    expect(wrapper.find('BoxerListItem').at(2).props().boxer.name).toBe('Riddick Bowe');
  });
});