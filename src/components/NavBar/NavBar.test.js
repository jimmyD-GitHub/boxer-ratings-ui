import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import {NavBar} from './NavBar';
import sinon from 'sinon';

describe('<NavBar/>', () => {
  let wrapper, dispatch = sinon.spy();
  const user = {name: 'Jimmy', expires: 1335017913};

  afterEach(() => {
    wrapper.unmount();
  });

  it("The 'My Ratings' menu item is not shown when the user is not logged in.", () => {
    wrapper = mount(<MemoryRouter><NavBar user={user} loggedIn={false} dispatch={dispatch}/></MemoryRouter>);
    expect(wrapper.find('#my-ratings-link').exists()).toBe(false);
    expect(wrapper.find('#our-ratings-link').exists()).toBe(true);
    expect(wrapper.find('#p4p-ratings-link').exists()).toBe(true);
    expect(wrapper.find('MenuLink').length).toBe(2);
    expect(wrapper.find('DivisionSelector').length).toBe(1);
    expect(wrapper.find('NavBarDropDowns').length).toBe(1);
    expect(dispatch.called).toBe(true); //session time out
  });

  it("The 'My Ratings' menu item is displayed when the user is logged in.", () => {
    wrapper = mount(<MemoryRouter><NavBar user={user} loggedIn={true} dispatch={dispatch}/></MemoryRouter>);
    expect(wrapper.find('#my-ratings-link').exists()).toBe(true);
    expect(wrapper.find('#our-ratings-link').exists()).toBe(true);
    expect(wrapper.find('#p4p-ratings-link').exists()).toBe(true);
    expect(wrapper.find('MenuLink').length).toBe(3);
    expect(wrapper.find('DivisionSelector').length).toBe(1);
    expect(wrapper.find('NavBarDropDowns').length).toBe(1);
    wrapper.find('#log-out').simulate('click');
    expect(dispatch.called).toBe(true); //user log out
  });
});