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
    .fromPath('redfin_2017-07-02-15-47-37.csv', {headers: ['saleType', 'soldDate', 'propertyType', 'address',
                                                          'city', 'state', 'zip', 'price', 'beds', 'baths', 'location',
                                                          'squareFeet', 'lotSize', 'yearBuilt', 'daysOnMarket',
                                                          'pricePerSquareFoot', 'hoaFee', 'status', 'nextOpenHouseStart',
                                                          'nextOpenHouseEnd', 'url', 'source', 'mlsNumber', 'favorite',
                                                          'interested', 'lat', 'long']})
    .validate(function(data) {
      return _.includes(data.address.toLowerCase(), req.query.term.toLowerCase()) ||
        _.includes(data.location.toLowerCase(), req.query.term.toLowerCase()) ||
        _.includes([data.city.toLowerCase(), data.state.toLowerCase(), data.zip], req.query.term.toLowerCase());
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
