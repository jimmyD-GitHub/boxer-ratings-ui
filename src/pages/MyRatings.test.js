import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import MyRatings from '../pages/MyRatings';
import {Provider} from 'react-redux';
import MockStore from "../store/Helpers/MockStore";
import OurRatings from "./OurRatings";

describe('<MyRatings/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/my-ratings/heavyweight']} initialIndex={1}>
        <Provider store={MockStore}>
          <MyRatings/>
        </Provider>
      </MemoryRouter>
    );
  });

  it('Loads the Division Menu and the Boxer List.', () => {
    expect(wrapper.find('DivisionLink').length).toBe(17);
    expect(wrapper.find('SortableBoxerList').length).toBe(1);
  });

  it('Shows the heavyweight ratings by default.', () => {
    expect(wrapper.find('h3').text()).toMatch(new RegExp('My Ratings: Heavyweight'));
    expect(wrapper.find('a .active').text()).toBe('Heavyweight');
  });

  it('Shows the correct ratings for division routes.', () => {
    let wrapper = mount(
      <MemoryRouter initialEntries={['/my-ratings/middleweight']} initialIndex={1}>
        <Provider store={MockStore}>
          <MyRatings/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find('h3').text()).toMatch(new RegExp('My Ratings: Middleweight'));
    expect(wrapper.find('a .active').text()).toBe('Middleweight');
  });
});