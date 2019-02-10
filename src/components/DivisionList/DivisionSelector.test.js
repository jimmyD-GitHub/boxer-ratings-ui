import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import DivisionSelector from './DivisionSelector';

describe('<DivisionSelector/>', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/test/cruiserweight']} initialIndex={1}>
      <DivisionSelector/>
    </MemoryRouter>
  );

  it('Renders a list of divisions.', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={['/test/heavyweight']} initialIndex={1}>
        <DivisionSelector/>
      </MemoryRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders the menu with the correct division selected by default.', () => {

    expect(wrapper.find('select#divisionSelector').children().length).toBe(17);
    expect(wrapper.find('select#divisionSelector').props().value).toBe('cruiserweight');
  });

  it('It loads the correct division when the option is changed.', () => {

    wrapper.find('select#divisionSelector').simulate('change', {target: {value: 'light-heavyweight'}});
    expect(wrapper.find('select#divisionSelector').props().value).toBe('light-heavyweight');
  });

  it('It does not load any options on the P4P page.', () => {

    let wrapper = mount(
      <MemoryRouter initialEntries={['/p4p-ratings']} initialIndex={1}>
        <DivisionSelector/>
      </MemoryRouter>
    );

    expect(wrapper.find('select#divisionSelector').children().length).toBe(0);
  });

});