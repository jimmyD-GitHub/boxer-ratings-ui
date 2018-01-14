import React from 'react';
import renderer from 'react-test-renderer';
import BoxerListItem from '../../components/BoxerListItem';

let HOLYFIELD = {
  rating: 2, name: "Evander Holyfield", homeTown: "Atlanta, Georgia", record: "44-10-2", nationality: "US",
  snippet: "He was the real deal.", id: 2, thumbnail: "/images/thumbs/thumb-99.jpg"
};

describe('<BoxerListItem/>', () => {

  it('Renders boxer information as a list item.', () => {
    const component = renderer.create(<BoxerListItem boxer={HOLYFIELD}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});