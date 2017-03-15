import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import DivisionMenu from './Menu';

const DIVISIONS = [
  {id: 'heavyweight', name: 'Heavyweight', weightLimit: 'Over 200lbs/14st 4lbs'},
  {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: '200lbs/14st 4lbs '},
  {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: '175lbs/12st 7lbs'}
];

const SELECTED = DIVISIONS[1];

describe('<DivisionMenu/>', () => {
  let click = jest.fn();
  const wrapper = shallow(<DivisionMenu divisions={DIVISIONS} selectedDivision={SELECTED} onClick={click} />);

  it('Renders a list of divisions.', () => {
    const component = renderer.create(
      <DivisionMenu divisions={DIVISIONS} selectedDivision={SELECTED} onClick={click} />
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

  it('Calls the onClick function passed to it when a menu option is clicked.', () => {
    wrapper.find('#heavyweight').simulate('click');
    wrapper.find('#light-heavyweight').simulate('click');
    expect(click).toHaveBeenCalledTimes(2);
  });
});
