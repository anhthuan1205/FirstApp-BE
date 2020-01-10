var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var users = require('./route/UserRoute');
const port = 3000;

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', users);

app.listen(port, function() {
    console.log('Server is running on port: ' + port);
})