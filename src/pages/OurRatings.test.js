import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import OurRatings from '../pages/OurRatings';
import {Provider} from 'react-redux';
import MockStore from "../store/Helpers/MockStore";

describe('<OurRatings/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/our-ratings/heavyweight']} initialIndex={1}>
        <Provider store={MockStore}>
          <OurRatings/>
        </Provider>
      </MemoryRouter>
    );
  });

  it('Loads the Division Menu and the Boxer List.', () => {
    expect(wrapper.find('DivisionLink').length).toBe(18);
    expect(wrapper.find('BoxerList').length).toBe(1);
  });

  it('Shows the heavyweight ratings by default.', () => {
    expect(wrapper.find('h3').text()).toMatch(new RegExp('Heavyweight'));
    expect(wrapper.find('h3').text()).toMatch(new RegExp('Over 200lbs/14st 4lbs'));
    expect(wrapper.find('a .active').text()).toBe('Heavyweight');
  });

  it('Shows the correct ratings for division routes.', () => {
    let wrapper = mount(
      <MemoryRouter initialEntries={['/our-ratings/middleweight']} initialIndex={1}>
        <Provider store={MockStore}>
          <OurRatings/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find('h3').text()).toMatch(new RegExp('Middleweight'));
    expect(wrapper.find('h3').text()).toMatch(new RegExp('160lbs/11st 6lbs'));
    expect(wrapper.find('a .active').text()).toBe('Middleweight');
  });
});