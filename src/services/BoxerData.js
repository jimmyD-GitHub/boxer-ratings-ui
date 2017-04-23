import axios from 'axios';

class BoxerData {

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_REST_API
    });
  }

  fetchBoxersForDivision(division) {

    if (this.hasOwnProperty('request')) {
      this.request.cancel(); // cancel last request if it has not completed yet
    }

    var CancelToken = axios.CancelToken;
    this.request = CancelToken.source();

    return this.api.get('/our-ratings/' + division.id, {
      cancelToken: this.request.token
    }).then(function (response) {
      return response.data.boxers;
    }).catch(function (error) {
      let message = axios.isCancel(error) ? 'aborted' : 'failed';
      throw new Error(message);
    });

  }

}

export default BoxerData;