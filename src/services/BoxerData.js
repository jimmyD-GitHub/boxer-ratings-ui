import 'whatwg-fetch';

class BoxerData {

  fetchBoxersForDivision(division) {
    return fetch(process.env.REACT_APP_REST_API + '/ratings/' + division.id)
      .then(function (response) {
        return response.json();
      }).then(data => {
        return data.boxers;
      }).catch(function (error) {
        return [];
      });
  };

}

export default BoxerData;