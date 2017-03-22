import sinon from 'sinon';
require('sinon-as-promised')

import BoxerData from '../../services/BoxerData';

describe('BoxerData', () => {
  let data = new BoxerData();

  afterEach(() => {
    window.fetch.restore();
  });

  it('Makes the correct API request for the division it needs data for.', () => {
    sinon.spy(window, 'fetch');
    data.fetchBoxersForDivision({'id': 'welterweight'});
    expect(window.fetch.calledWith('/ratings/welterweight')).toBe(true);
    data.fetchBoxersForDivision({'id': 'lightweight'});
    expect(window.fetch.calledWith('/ratings/lightweight')).toBe(true);
    expect(window.fetch.calledWith('/ratings/heavyweight')).toBe(false);
  });

  it('Returns an array of boxer objects when the API request is successful.', () => {
    sinon.stub(window, 'fetch');
    let tyson = [{rating: 1, name: "Mike Tyson", homeTown: "Brooklyn, New York", record: "50-6-0"}]
    window.fetch.resolves(new window.Response(JSON.stringify({boxers:tyson})));
    data.fetchBoxersForDivision({'id': 'heavyweight'}).then(boxers => {
      expect(boxers instanceof Array).toBe(true);
      expect(boxers[0].name).toBe('Mike Tyson');
      expect(boxers[0].record).toBe('50-6-0');
    });
  });

  it('Returns an empty array when the API request fails.', () => {
    sinon.stub(window, 'fetch');
    window.fetch.rejects('Failed request...');
    data.fetchBoxersForDivision({'id': 'heavyweight'}).then(boxers => {
      expect(boxers instanceof Array).toBe(true);
      expect(boxers.length).toBe(0);
    });
  });

});