import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import DivisionSelector from '../../components/DivisionSelector';

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
    expect(wrapper.find('select#divisions').children().length).toBe(17);
  });
});