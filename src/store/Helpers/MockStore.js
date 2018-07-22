const MockStore = {};
const user = {id: 999, name: 'Jimmy', token: 'ghbdhfyrt6475hnghyrtgdf'};

MockStore.subscribe = function () {
};

MockStore.dispatch = function () {
};

MockStore.getState = function () {
  return {authentication: {loggedIn: true, user: user}}
};

export default MockStore;