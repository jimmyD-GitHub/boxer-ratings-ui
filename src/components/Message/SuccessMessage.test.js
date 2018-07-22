import React from 'react';
import renderer from 'react-test-renderer';
import SuccessMessage from './SuccessMessage';

describe('<SuccessMessage/>', () => {

  it('It renders a success confirmation notification.', () => {
    const component = renderer.create(<SuccessMessage message="Success!"/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});