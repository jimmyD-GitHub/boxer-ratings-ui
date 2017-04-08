import axios from 'axios';

class BoxerData {

  fetchBoxersForDivision(division) {

    if (this.hasOwnProperty('request')) {
      this.request.cancel(); // cancel last request if it has not completed yet
    }

    var CancelToken = axios.CancelToken;
    this.request = CancelToken.source();

    return axios.get(process.env.REACT_APP_REST_API + '/our-ratings/' + division.id, {
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