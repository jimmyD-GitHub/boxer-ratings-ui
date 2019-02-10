import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmEmailMessage from "./ConfirmEmailMessage";
import {mount} from 'enzyme';

describe('<ConfirmEmailMessage/>', () => {

  it('It renders the verify email message after sign up.', () => {
    const component = renderer.create(<ConfirmEmailMessage name="Jimmy" email="admin@boxeratings.com"/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it ('It render the message in an info alert box.', () => {

    const wrapper = mount(<ConfirmEmailMessage name="Jimmy" email="admin@boxeratings.com"/>);

    expect(wrapper.find('.alert-info').text()).toMatch(new RegExp(
      'Hello Jimmy. A confirmation email has been sent to  admin@boxeratings.com, ' +
      'please click the link in the email to confirm sign up.'
    ));

  });

});