var express = require('express');

var app = express();

var router = express.Router();

// Bootstrap express
require('./server/config/express')(app);

// Bootstrap routes
require('./server/config/routes')(app, router);

app.listen(9000);

console.log('server listening on port 9000');