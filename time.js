const citytz = require('city-timezones');

const moment = require('moment-timezone');

function getTimeFor(city, country) {
  try {
    let tz = citytz.lookupViaCity(city);
    if (tz.length > 0) {
      tz = tz.filter(currentTz => currentTz.country.toLowerCase() === country.toLowerCase());
    }

    return moment.tz(tz[0].timezone).format('YYYY-MM-DD HH:mm');
  } catch (err) {
    throw Error('Invalid input data');
  }
}

exports.getTimeFor = getTimeFor;
