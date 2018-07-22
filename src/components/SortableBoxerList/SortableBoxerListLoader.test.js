import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import {SortableBoxerListLoader} from './SortableBoxerListLoader';
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

const user = {id: 999, name: 'Jimmy', token: 'ghbdhfyrt6475hnghyrtgdf'};

describe('<SortableBoxerListLoader/>', () => {
  let wrapper, boxerService = new RatingService();

  beforeEach(() => {
    sinon.spy(boxerService, 'fetchBoxersForUserAndDivision');
    let showMessage = function () {
    };
    wrapper = mount(
      <SortableBoxerListLoader user={user}
                               division={divisions[0]}
                               boxerService={boxerService}
                               showMessage={showMessage}/>
    );
  });

  afterEach(() => {
    boxerService.fetchBoxersForUserAndDivision.restore();
  });

  it('It makes the expected API request for the user and division passed to it.', () => {
    expect(boxerService.fetchBoxersForUserAndDivision.getCall(0).args[0].name).toBe('Jimmy');
    expect(boxerService.fetchBoxersForUserAndDivision.getCall(0).args[1].id).toBe('heavyweight');
    expect(wrapper.find('SortableBoxerList').length).toBe(1);
  });

  it('It makes the expected API request when the division is refreshed.', () => {
    wrapper.setProps({division: divisions[2], user: user});
    expect(boxerService.fetchBoxersForUserAndDivision.getCall(0).args[0]).toBe(user);
    expect(boxerService.fetchBoxersForUserAndDivision.getCall(0).args[1].id).toBe('heavyweight');
    expect(boxerService.fetchBoxersForUserAndDivision.getCall(1).args[0]).toBe(user);
    expect(boxerService.fetchBoxersForUserAndDivision.getCall(1).args[1].id).toBe('light-heavyweight');
    expect(wrapper.find('SortableBoxerList').length).toBe(1);
  });

  it('It loads sortable boxer list items for each of the boxers retrieved from the API.', async () => {
    boxerService.fetchBoxersForUserAndDivision.restore();

    sinon.stub(boxerService, 'fetchBoxersForUserAndDivision').withArgs(user, divisions[0]).resolves(boxers);
    wrapper = await mount(
      <SortableBoxerListLoader user={user} division={divisions[0]} boxerService={boxerService}/>
    );

    expect(wrapper.find('SortableBoxerListItem').at(0).props().boxer.name).toBe('Mike Tyson');
    expect(wrapper.find('SortableBoxerListItem').at(1).props().boxer.name).toBe('Evander Holyfield');
    expect(wrapper.find('SortableBoxerListItem').at(2).props().boxer.name).toBe('Riddick Bowe');
  });
});