var createError = require('http-errors');
var express = require('express');
const cookiesMiddleware = require('universal-cookie-express')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());

//cors
//const origin = process.env.NODE_ENV === "development" ? "http://localhost:3000": "http://example.com"
app.use(cors({
  //credentials: true,
  //origin
}));

//proxy setting
app.enable('trust proxy');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
