import React from 'react';
import {mount} from 'enzyme';
import SortableBoxerList from './SortableBoxerList';
import sinon from 'sinon';

let HEAVYWEIGHTS = [
  {
    rating: 1, name: "Mike Tyson", homeTown: "Brooklyn, New York", record: "50-6-0", nationality: "US",
    snippet: "The baddest man on the planet!", id: 1
  },
  {
    rating: 2, name: "Evander Holyfield", homeTown: "Atlanta, Georgia", record: "44-10-2", nationality: "US",
    snippet: "He was the real deal.", id: 2
  },
  {
    rating: 3, name: "Riddick Bowe", homeTown: "Brooklyn, New York", record: "43-1-0", nationality: "US",
    snippet: "He loved cakes.", id: 3
  }
];

let WELTERWEIGHTS = [
  {
    rating: 1, name: "Ray Leonard", homeTown: "Wilmington, North Carolina", record: "36-3-1", nationality: "US",
    snippet: "The sugar man.", id: 1
  },
  {
    rating: 2, name: "Thomas Hearns", homeTown: "Detroit, Michigan", record: "61-5-1", nationality: "US",
    snippet: "The hit man.", id: 2
  }
];

describe('<SortableBoxerList/>', () => {
  let wrapper, showMessage = sinon.spy();
  let handleSave = sinon.stub().resolves({});

  beforeEach(() => {
    wrapper = mount(<SortableBoxerList boxers={HEAVYWEIGHTS} handleSave={handleSave} showMessage={showMessage}/>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('It renders a list of boxers.', () => {
    
    expect(wrapper.find('[id=1] h4').text()).toMatch(new RegExp('Mike Tyson'));
    expect(wrapper.find('[id=1] h4 small').text()).toMatch(new RegExp('(50-6-0)'));
    expect(wrapper.find('[id=1] h4 small').text()).toMatch(new RegExp('Brooklyn, New York'));

    expect(wrapper.find('[id=2] h4').text()).toMatch(new RegExp('Evander Holyfield'));
    expect(wrapper.find('[id=2] h4 small').text()).toMatch(new RegExp('(44-10-2)'));
    expect(wrapper.find('[id=2] h4 small').text()).toMatch(new RegExp('Atlanta, Georgia'));

    expect(wrapper.find('[id=3] h4').text()).toMatch(new RegExp('Riddick Bowe'));
    expect(wrapper.find('[id=3] h4 small').text()).toMatch(new RegExp('(43-1-0)'));
    expect(wrapper.find('[id=3] h4 small').text()).toMatch(new RegExp('Brooklyn, New York'));
  });

  it('It updates the list of boxers when the state is changed.', () => {
    wrapper.setProps({boxers: WELTERWEIGHTS});

    expect(wrapper.find('[id=1] h4').text()).toMatch(new RegExp('Ray Leonard'));
    expect(wrapper.find('[id=1] h4 small').text()).toMatch(new RegExp('(36-3-1)'));
    expect(wrapper.find('[id=1] h4 small').text()).toMatch(new RegExp('Wilmington, North Carolina'));

    expect(wrapper.find('[id=2] h4').text()).toMatch(new RegExp('Thomas Hearns'));
    expect(wrapper.find('[id=2] h4 small').text()).toMatch(new RegExp('(61-5-1)'));
    expect(wrapper.find('[id=2] h4 small').text()).toMatch(new RegExp('Detroit, Michigan'));

    expect(wrapper.find('[id=1] p').text()).toBe('The sugar man.');
    expect(wrapper.find('[id=2] p').text()).toBe('The hit man.');
  });

  it('It shows a success message after the list has been saved.', async () => {
    wrapper.setProps({loading: false});
    await wrapper.find('#save-button').simulate('click');
    expect(showMessage.called).toBe(true);
    expect(showMessage.getCall(1).args).toEqual([]);
  });
});