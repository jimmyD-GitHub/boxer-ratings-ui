import React from 'react';
import {mount} from 'enzyme';
import PageLoader from '../../components/PageLoader';
import OurRatings from '../../pages/OurRatings';
import YourRatings from '../../pages/YourRatings';

describe('<PageLoader/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<PageLoader/>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('It sets the correct menu link to active when it is clicked.', () => {
    expect(wrapper.find('li.active').text()).toBe('Our Ratings');
    wrapper.find('#your-ratings-link').simulate('click', {button:0});
    expect(wrapper.find('li.active').text()).toBe('Your Ratings');
    wrapper.find('#our-ratings-link').simulate('click', {button:0});
    expect(wrapper.find('li.active').text()).toBe('Our Ratings');
    wrapper.find('#p4p-ratings-link').simulate('click', {button:0});
    expect(wrapper.find('li.active').text()).toBe('Pound For Pound');
    wrapper.find('#brand-link').simulate('click', {button:0});
    expect(wrapper.find('li.active').text()).toBe('Our Ratings');
  });

  it('Loads the correct pages when you click the menu links.', () => {
    expect(wrapper.find(OurRatings).length).toBe(1);
    wrapper.find('#your-ratings-link').simulate('click', {button:0});
    expect(wrapper.find(OurRatings).length).toBe(0);
    expect(wrapper.find(YourRatings).length).toBe(1);
  });

});