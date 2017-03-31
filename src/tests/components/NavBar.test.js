import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import NavBar from '../../components/NavBar';

describe('<NavBar/>', () => {
  let click = jest.fn();

  it('Renders the navigation links.', () => {
    const component = renderer.create(<NavBar selected="ratings" onClick={click}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});