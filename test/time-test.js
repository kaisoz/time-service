/* eslint-disable no-undef */
const expect = require('chai').expect;
const sinon = require('sinon');
const time = require('../time');

require('chai').should();

describe('getTimeFor', () => {
  beforeEach(() => {
    this.clock = sinon.useFakeTimers(new Date('2019-09-19 19:19:19').getTime());
  });

  afterEach(() => {
    this.clock.restore();
  });

  it('should return the correct time for a given timezone', () => {
    // given
    const city = 'london';
    const country = 'united kingdom';
    const expectedDateInCountry = '2019-09-19 18:19';

    // when
    const dateInCountry = time.getTimeFor(city, country);

    // then
    dateInCountry.should.equal(expectedDateInCountry);
  });

  it('should throw an exception if not all the parameters are passed', () => {
    // given
    const city = 'london';

    // then
    expect(() => {
      time.getTimeFor(city);
    }).to.throw('Invalid input data');
  });

  it('should throw an exception when any input parameter is invalid', () => {
    // given
    const city = 'london';
    const country = 'fake country';

    // then
    expect(() => {
      time.getTimeFor(city, country);
    }).to.throw('Invalid input data');
  });
});
