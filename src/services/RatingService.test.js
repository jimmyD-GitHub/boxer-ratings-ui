import axios from 'axios';
import RatingService from './RatingService';

let MockAdapter = require('axios-mock-adapter');

describe('RatingService', () => {
  let boxerService, mock;
  const division = {id: 'heavyweight'};
  const user = {id: 999, name: 'Jimmy', token: 'ghbdhfyrt6475hnghyrtgdf'};
  const mikeTyson = {rating: 1, name: "Mike Tyson", homeTown: "Brooklyn, New York", record: "50-6-0"};
  const ratings = [999, 998];

  beforeEach(() => {
    mock = new MockAdapter(axios);
    boxerService = new RatingService();
  });

  afterEach(() => {
    mock.restore();
  });

  it('It returns an array of boxers objects after a successful ratings requests.', () => {
    mock.onGet('/ratings/heavyweight').reply(200, {boxers: [mikeTyson]});
    boxerService.fetchBoxersForDivision(division).then(boxers => {
      expect(boxers instanceof Array).toBeTruthy();
      expect(boxers[0]).toMatchObject(mikeTyson);
    });
  });

  it('It returns an array of boxers objects after a successful user ratings requests.', () => {
    mock.onGet('/user-ratings/999/heavyweight').reply(200, {boxers: [mikeTyson]});
    boxerService.fetchBoxersForUserAndDivision(user, division).then(boxers => {
      expect(boxers instanceof Array).toBeTruthy();
      expect(boxers[0]).toMatchObject(mikeTyson);
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

  it('It lets you save division ratings for a user.', () => {
    mock.onPost('/user-ratings/999/heavyweight').reply(200, {saved: true});
    boxerService.saveRatingsForUserAndDivision(ratings, user, division).then(response => {
      expect(response.saved).toBeTruthy();
    });
  });

  it('It lets you know if a save ratings request failed due to authentication.', () => {
    mock.onPost('/user-ratings/999/heavyweight').reply(401);
    boxerService.saveRatingsForUserAndDivision(ratings, user, division).catch(error => {
      expect(error.message).toBe('auth');
    });
  });
});