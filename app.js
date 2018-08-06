const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').load();

const router = require('./routes');
const app = express();

app.use(passport.initialize())
app.use(passport.session());

const { DB_HOST, DB_USER, DB_PASSWORD, DB_ADDRESS } = process.env 

const DBHost = DB_HOST + DB_USER + ":" + DB_PASSWORD + DB_ADDRESS;
mongoose.connect(DBHost, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use('/', router)

require('./config/passport')(passport);

app.listen(app.get('port'), function() {
  console.log('App started on port ' + app.get('port'));
});

module.exports = app;