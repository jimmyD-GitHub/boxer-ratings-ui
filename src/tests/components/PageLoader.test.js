import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import PageLoader from '../../components/PageLoader';

describe('<PageLoader/>', () => {

  it('The "Our Ratings" menu link is active by default.', () => {
    let wrapper = mount(<MemoryRouter><PageLoader/></MemoryRouter>);
    expect(wrapper.find('li.active').text()).toBe('Our Ratings');
  });

  it('It loads the "Our Ratings" page by default.', () => {
    let wrapper = mount(<MemoryRouter><PageLoader/></MemoryRouter>);
    expect(wrapper.find('OurRatings').length).toBe(1);
    expect(wrapper.find('YourRatings').length).toBe(0);
    expect(wrapper.find('PoundForPound').length).toBe(0);
  });

});