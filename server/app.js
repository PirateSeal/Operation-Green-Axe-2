const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

require('dotenv').config();

const {
  checkAuthHeaderSetUser,
  checkAuthHeaderSetUserUnAuthorized,
  notFound,
  errorHandler,
} = require('./middlewares');

const auth = require('./auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(checkAuthHeaderSetUser);

app.get('/', checkAuthHeaderSetUserUnAuthorized, (req, res) => {
  res.json({
    message: 'This is the API',
  });
});

app.use('/auth', auth);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
