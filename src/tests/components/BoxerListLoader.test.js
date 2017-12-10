import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import BoxerListLoader from '../../components/BoxerListLoader';
import BoxerData from '../../services/BoxerData';

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
  let wrapper, data = new BoxerData();

  beforeEach(() => {
    sinon.spy(data, 'fetchBoxersForDivision');
    wrapper = mount(<BoxerListLoader division={DIVISIONS[0]} boxerData={data}/>);
  });

  afterEach(() => {
    data.fetchBoxersForDivision.restore();
  });

  it('Makes the expected API request for the division property passed to it.', () => {
    expect(data.fetchBoxersForDivision.getCall(0).args[0].id).toBe('heavyweight');
    expect(wrapper.find('BoxerList').length).toBe(1);
  });

  it('Makes the expected API request when the division property is refreshed.', () => {
    wrapper.setProps({division: DIVISIONS[2]});
    expect(data.fetchBoxersForDivision.getCall(0).args[0].id).toBe('heavyweight');
    expect(data.fetchBoxersForDivision.getCall(1).args[0].id).toBe('light-heavyweight');
    expect(wrapper.find('BoxerList').length).toBe(1);
  });

  it('Stubbing the boxer data API...', () => {
    data.fetchBoxersForDivision.restore();
    sinon.stub(data, 'fetchBoxersForDivision').withArgs(DIVISIONS[0]).resolves(BOXERS);
    wrapper = mount(<BoxerListLoader division={DIVISIONS[0]} boxerData={data}/>);
  });
});