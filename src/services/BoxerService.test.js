import axios from 'axios';
import BoxerService from './BoxerService';

let MockAdapter = require('axios-mock-adapter');

describe('BoxerService', () => {
  let boxerService, mock;
  const division = {id: 'heavyweight'};
  const user = {id: 999, name: 'Jimmy', token: 'ghbdhfyrt6475hnghyrtgdf'};
  const mikeTyson = {rating: 1, name: "Mike Tyson", homeTown: "Brooklyn, New York", record: "50-6-0"};

  beforeEach(() => {
    mock = new MockAdapter(axios);
    boxerService = new BoxerService();
  });

  afterEach(() => {
    mock.restore();
  });

  it('It returns an array of boxer objects after successful ratings requests.', () => {
    mock.onGet('/ratings/heavyweight').reply(200, {boxers: [mikeTyson]});
    boxerService.fetchBoxersForDivision(division).then(boxers => {
      expect(boxers instanceof Array).toBe(true);
      expect(boxers[0].name).toBe('Mike Tyson');
      expect(boxers[0].record).toBe('50-6-0');
    });
  });

  it('It returns an array of boxer objects after successful user ratings requests.', () => {
    mock.onGet('/user-ratings/999/heavyweight').reply(200, {boxers: [mikeTyson]});
    boxerService.fetchBoxersForUserAndDivision(user, division).then(boxers => {
      expect(boxers instanceof Array).toBe(true);
      expect(boxers[0].name).toBe('Mike Tyson');
      expect(boxers[0].record).toBe('50-6-0');
    });
  });

  it('It returns an error message of \'failed\' after unsuccessful ratings requests.', () => {
    mock.onGet('/ratings/heavyweight').reply(500);
    boxerService.fetchBoxersForDivision(division).catch(error => {
      expect(error.message).toBe('failed');
    });
  });

  it('It returns an error message of \'failed\' after unsuccessful user ratings requests.', () => {
    mock.onGet('/ratings/heavyweight').reply(500);
    boxerService.fetchBoxersForUserAndDivision(user, division).catch(error => {
      expect(error.message).toBe('failed');
    });
  });

  it('It returns an error message of \'aborted\' after cancelled ratings requests.', () => {
    mock.onGet('/ratings/heavyweight').reply(200, {boxers: [mikeTyson]});
    boxerService.fetchBoxersForDivision(division).catch(error => {
      expect(error.message).toBe('aborted');
    });
    boxerService.fetchBoxersForDivision(division).catch(error => {
    }); // first request isn't finished yet...
  });

});