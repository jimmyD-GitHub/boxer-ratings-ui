import React from 'react';
import {shallow} from 'enzyme';
import DivisionMenu from './Menu';

var DIVISIONS = [
  {id: 'heavyweight', name: 'Heavyweight', weightLimit: 'Over 200lbs/14st 4lbs'},
  {id: 'cruiserweight', name: 'Cruiserweight', weightLimit: '200lbs/14st 4lbs '},
  {id: 'light-heavyweight', name: 'Light Heavyweight', weightLimit: '175lbs/12st 7lbs'}
];

var SELECTED = DIVISIONS[0];

var click = function () {};

describe('<DivisionMenu />', () => {

  it('Sets the right menu option to active when one is clicked.', () => {

    const wrapper = shallow(<DivisionMenu divisions={DIVISIONS} selectedDivision={SELECTED} onClick={click} />);

    expect(wrapper.find('#heavyweight').node.props.className).toBe('list-group-item active');
    expect(wrapper.find('#cruiserweight').node.props.className).toBe('list-group-item');
    expect(wrapper.find('#light-heavyweight').node.props.className).toBe('list-group-item');

  });

});
