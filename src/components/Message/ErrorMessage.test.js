import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage/>', () => {

  it('It renders an error notification.', () => {
    const component = renderer.create(<ErrorMessage message="Doh!"/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});