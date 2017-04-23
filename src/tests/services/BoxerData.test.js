import axios from 'axios';
import BoxerData from '../../services/BoxerData';
var MockAdapter = require('axios-mock-adapter');

describe('BoxerData', () => {

  let data, mock = new MockAdapter(axios);
  const mikeTyson = {rating: 1, name: "Mike Tyson",
    homeTown: "Brooklyn, New York", record: "50-6-0"};

  beforeEach(() => {
    data = new BoxerData();
  });

  afterEach(() => {
    mock.restore();
  });

  it('It returns an array of boxer objects after successful requests.', () => {
    mock.onGet('/our-ratings/heavyweight').reply(200, {boxers: [mikeTyson]});
    data.fetchBoxersForDivision({'id': 'heavyweight'}).then(boxers => {
      expect(boxers instanceof Array).toBe(true);
      expect(boxers[0].name).toBe('Mike Tyson');
      expect(boxers[0].record).toBe('50-6-0');
    });
  });

  it("It returns an error message of 'failed' after unsuccessful requests.", () => {
    mock.onGet('/our-ratings/heavyweight').reply(500);
    data.fetchBoxersForDivision({'id': 'heavyweight'}).catch(error => {
      expect(error.message).toBe('failed');
    });
  });

  it("It returns an error message of 'aborted' after cancelled requests.", () => {
    mock.onGet('/our-ratings/heavyweight').reply(200, {boxers: [mikeTyson]});
    data.fetchBoxersForDivision({'id': 'heavyweight'}).catch(error => {
      expect(error.message).toBe('aborted');
    });
    data.fetchBoxersForDivision({'id': 'middleweight'}).catch(error => {}); // first request isn't finished yet...
  });

});