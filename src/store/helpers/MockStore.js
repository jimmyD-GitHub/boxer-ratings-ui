const mockStore = {};

mockStore.subscribe = function () {
};

mockStore.dispatch = function () {
};

mockStore.getState = function () {
  return {authentication: {loggedIn: false}}
};

export default mockStore;