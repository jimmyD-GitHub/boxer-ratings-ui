import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Container from './Container';
import MockStore from '../../store/Helpers/MockStore';

describe('<Container/>', () => {

  it('It loads the "Our Ratings" page by default.', () => {
    let wrapper = mount(
      <MemoryRouter>
        <Provider store={MockStore}>
          <Container/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find('OurRatings').length).toBe(1);
    expect(wrapper.find('MyRatings').length).toBe(0);
    expect(wrapper.find('PoundForPound').length).toBe(0);
  });

});