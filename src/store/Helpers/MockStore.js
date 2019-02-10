const MockStore = {loggedIn: true};
const user = {id: 999, name: 'Jimmy', token: 'ghbdhfyrt6475hnghyrtgdf'};

MockStore.subscribe = function () {
};

MockStore.dispatch = function () {
};

MockStore.setLoggedIn = function(loggedIn) {
  this.loggedIn = loggedIn;
};

MockStore.getState = function () {
  return {
    authentication: {loggedIn: this.loggedIn, user: user},
    registration: {}
  }
};

export default MockStore;