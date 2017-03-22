import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import NavBar from '../../components/NavBar';

describe('<NavBar/>', () => {

  it('Renders the navigation links.', () => {
    const component = renderer.create(<NavBar/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});