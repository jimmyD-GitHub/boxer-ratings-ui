import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import BoxerListLoader from './BoxerListLoader';
import BoxerService from '../../services/BoxerService';

const DIVISIONS = [
  {id: 'heavyweight', name: 'Heavyweight', weightLimit: 'Over 200lbs/14st 4lbs'},
  {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: '200lbs/14st 4lbs '},
  {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: '175lbs/12st 7lbs'}
];

let BOXERS = [
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
  let wrapper, boxerService = new BoxerService();

  beforeEach(() => {
    sinon.spy(boxerService, 'fetchBoxersForDivision');
    wrapper = mount(<BoxerListLoader division={DIVISIONS[0]} boxerService={boxerService}/>);
  });

  afterEach(() => {
    boxerService.fetchBoxersForDivision.restore();
  });

  it('Makes the expected API request for the division property passed to it.', () => {
    expect(boxerService.fetchBoxersForDivision.getCall(0).args[0].id).toBe('heavyweight');
    expect(wrapper.find('BoxerList').length).toBe(1);
  });

  it('Makes the expected API request when the division property is refreshed.', () => {
    wrapper.setProps({division: DIVISIONS[2]});
    expect(boxerService.fetchBoxersForDivision.getCall(0).args[0].id).toBe('heavyweight');
    expect(boxerService.fetchBoxersForDivision.getCall(1).args[0].id).toBe('light-heavyweight');
    expect(wrapper.find('BoxerList').length).toBe(1);
  });

  it('Loads boxer list items for each of the boxers retrieved from the API.', async () => {
    boxerService.fetchBoxersForDivision.restore();
    sinon.stub(boxerService, 'fetchBoxersForDivision').withArgs(DIVISIONS[0]).resolves(BOXERS);
    wrapper = await mount(<BoxerListLoader division={DIVISIONS[0]} boxerService={boxerService}/>);
    expect(wrapper.find('BoxerListItem').at(0).props().boxer.name).toBe('Mike Tyson');
    expect(wrapper.find('BoxerListItem').at(1).props().boxer.name).toBe('Evander Holyfield');
    expect(wrapper.find('BoxerListItem').at(2).props().boxer.name).toBe('Riddick Bowe');
  });
});