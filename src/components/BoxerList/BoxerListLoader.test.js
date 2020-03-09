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

});