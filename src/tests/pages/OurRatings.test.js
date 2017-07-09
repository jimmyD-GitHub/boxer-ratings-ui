import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import OurRatings from '../../pages/OurRatings';

describe('<OurRatings/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/our-ratings/']} initialIndex={1}>
        <OurRatings/>
      </MemoryRouter>
    );
  });

  it('Loads the Division Menu and the Boxer List.', () => {
    expect(wrapper.find('DivisionLink').length).toBe(17);
    expect(wrapper.find('BoxerList').length).toBe(1);
  });

  it('Shows the heavyweight ratings by default.', () => {
    expect(wrapper.find('h1').text()).toBe('Heavyweight Over 200lbs/14st 4lbs');
    expect(wrapper.find('a .active').text()).toBe('Heavyweight');
  });

  it('Shows the correct ratings for division routes.', () => {
    let wrapper = mount(
      <MemoryRouter initialEntries={['/our-ratings/middleweight']} initialIndex={1}>
        <OurRatings/>
      </MemoryRouter>
    );
    expect(wrapper.find('h1').text()).toBe('Middleweight 160lbs/11st 6lbs');
    expect(wrapper.find('a .active').text()).toBe('Middleweight');
  });

  it('Refreshes the ratings when a division option is clicked.', () => {
    wrapper.find('#cruiserweight').simulate('click', {button:0});
    expect(wrapper.find('h1').text()).toBe('Cruiserweight 200lbs/14st 4lbs');
    wrapper.find('#light-heavyweight').simulate('click', {button:0});
    expect(wrapper.find('h1').text()).toBe('Light Heavyweight 175lbs/12st 7lbs');
  });

});