var express = require('express');
var app = express();

var elasticsearch = require('elasticsearch')

var router = express.Router();

require('./config/express')(app);

require('./config/routes')(app, router);

app.listen(8000);
console.log('listening on port 8000');