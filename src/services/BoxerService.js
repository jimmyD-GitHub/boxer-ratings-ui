import axios from 'axios';

class BoxerData {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_REST_API
    });
  }

  fetchBoxersForDivision(division) {
    this.initRequest();
    return this.api.get('/ratings/' + division.id, {
      cancelToken: this.request.token
    }).then(function (response) {
      return response.data.boxers;
    }).catch(function (error) {
      let message = axios.isCancel(error) ? 'aborted' : 'failed';
      throw new Error(message);
    });
  }

  fetchBoxersForUserAndDivision(user, division) {
    this.initRequest();
    return this.api.get('/user-ratings/' + user.id + '/' + division.id, {
      cancelToken: this.request.token,
      headers: ['Authorization: Bearer ' + user.token]
    }).then(function (response) {
      return response.data.boxers;
    }).catch(function (error) {
      let message = axios.isCancel(error) ? 'aborted' : 'failed';
      throw new Error(message);
    });
  }

  initRequest() {
    if (this.hasOwnProperty('request')) {
      this.request.cancel(); // cancel last request if it has not completed yet
    }
    let CancelToken = axios.CancelToken;
    this.request = CancelToken.source();
  }
}

export default BoxerData;