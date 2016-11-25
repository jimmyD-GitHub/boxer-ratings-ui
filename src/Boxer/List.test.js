import React from 'react';
import BoxerList from './List';
import renderer from 'react-test-renderer';

test('It renders a list of boxers.', () => {

  var BOXERS = [
    {rating: 1, name: "Mike Tyson", homeTown: "Brooklyn, New York", record: "50-6-0", nationality: "US",
      snippet: "The baddest man on the planet!"},
    {rating: 2, name: "Evander Holyfield", homeTown: "Atlanta, Georgia", record: "44-10-2", nationality: "US",
      snippet: "He was the real deal."},
    {rating: 3, name: "Riddick Bowe", homeTown: "Brooklyn, New York", record: "43-1-0", nationality: "US",
      snippet: "He loved cakes."},
  ];

  const component = renderer.create(
    <BoxerList boxers={BOXERS} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});