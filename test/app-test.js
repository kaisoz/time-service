/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Route time/', () => {
  beforeEach(() => {
    this.clock = sinon.useFakeTimers(new Date('2019-09-19 19:19:19').getTime());
  });

  afterEach(() => {
    this.clock.restore();
  });

  it('should return 200 for a valid city/country pair', done => {
    // given
    const testCity = 'london';
    const testCountry = 'united kingdom';
    const expectedDateInCountry = '2019-09-19 18:19';

    // when
    chai
      .request(app)
      .post('/time')
      .send({
        city: testCity,
        country: testCountry
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal(expectedDateInCountry);
        done();
      });
  });

  it('should return 500 for an invalid city/country pair', done => {
    const testCity = 'london';
    const testCountry = 'foo';

    chai
      .request(app)
      .post('/time')
      .send({
        city: testCity,
        country: testCountry
      })
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
