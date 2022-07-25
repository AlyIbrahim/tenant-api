var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var tenant = require('./tenant-api.js');

app.use(cors())
app.use(bodyParser.json());
app.use('/tenant', tenant)

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

module.exports = app
