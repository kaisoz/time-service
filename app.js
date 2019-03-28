const express = require('express');
const { getTimeFor } = require('./time');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.post('/time', function timecheck(req, res) {
  try {
    const city = req.body.city;
    const country = req.body.country;

    const time = getTimeFor(city, country);
    res.status(200).send(time);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, function listen() {
  console.log(`Listening on port ${port}!`);
});

module.exports = app;
