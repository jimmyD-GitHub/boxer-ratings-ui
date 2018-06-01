import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import MyRatings from '../pages/MyRatings';
import {Provider} from 'react-redux';
import mockStore from "../store/helpers/MockStore";

describe('<MyRatings/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/my-ratings/']} initialIndex={1}>
        <Provider store={mockStore}>
          <MyRatings/>
        </Provider>
      </MemoryRouter>
    );
  });

  it('Redirects to a different page if the user is not logged in.', () => {
    expect(wrapper.find('Redirect').length).toBe(1);
  });

});