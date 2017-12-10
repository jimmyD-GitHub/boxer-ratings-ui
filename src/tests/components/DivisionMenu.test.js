import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import DivisionMenu from '../../components/DivisionMenu';

const DIVISIONS = [
  {id: 'heavyweight', name: 'Heavyweight', weightLimit: 'Over 200lbs/14st 4lbs'},
  {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: '200lbs/14st 4lbs '},
  {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: '175lbs/12st 7lbs'}
];

describe('<DivisionMenu/>', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/test/cruiserweight']} initialIndex={1}>
      <DivisionMenu divisions={DIVISIONS} path="/test/"/>
    </MemoryRouter>
  );

  it('Renders a list of divisions.', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={['/test/heavyweight']} initialIndex={1}>
        <DivisionMenu divisions={DIVISIONS} path="/test/"/>
      </MemoryRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders the menu with the correct division selected by default.', () => {
    expect(wrapper.find('div.list-group').children().length).toBe(3);
    expect(wrapper.find('#heavyweight').props().className).toBe('list-group-item');
    expect(wrapper.find('#cruiserweight').props().className).toBe('list-group-item active');
    expect(wrapper.find('#light-heavyweight').props().className).toBe('list-group-item');
  });

  it('Sets the correct option to active when the menu is clicked.', () => {
    wrapper.find('#light-heavyweight').simulate('click', {button: 0});
    expect(wrapper.find('a .active').text()).toBe('Light Heavyweight');
    wrapper.find('#heavyweight').simulate('click', {button: 0});
    expect(wrapper.find('a .active').text()).toBe('Heavyweight');
  });
});
