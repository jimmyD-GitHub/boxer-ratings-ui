import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmEmailMessage from "./ConfirmEmailMessage";

describe('<ConfirmEmailMessage/>', () => {

  it('It renders the verify email message after sign up.', () => {
    const component = renderer.create(<ConfirmEmailMessage name="Jimmy" email="admin@boxeratings.com"/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});