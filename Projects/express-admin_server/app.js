var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var fs = require('fs');

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

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api', indexRouter);

//mongoose 
mongoose.connect('mongodb://username:password@ip:27017/?authSource=admin')
  .then(() => {
    console.log('MongoDB is connected!')
  })
  .catch(error => {
    console.error('Failed to connect mongoDB!', error)
  })
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


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
