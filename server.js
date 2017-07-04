var _ = require('lodash');
var csv = require('fast-csv');
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
})

app.get('/api/homes', function(req, res) {
  var homes = [];
  csv
    .fromPath('redfin_2017-07-02-15-47-37.csv', {headers: true})
    .validate(function(data) {
      return _.includes(data.ADDRESS.toLowerCase(), req.query.term.toLowerCase()) ||
        _.includes(data.LOCATION.toLowerCase(), req.query.term.toLowerCase()) ||
        _.includes([data.CITY.toLowerCase(), data.STATE.toLowerCase(), data.ZIP], req.query.term.toLowerCase());
    })
    .on('data', function(data) {
      homes.push(data);
    })
    .on('end', function() {
      res.send(homes);
    })


})

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});
