const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
//redis for session cache
// const redis = require('redis')
// const session = require('express-session')
const indexRouter = require('./routes/index');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_IP, REDIS_PORT, SESSION_SECRET } = require('./config/config')


const app = express();

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

//mongoose
//dev url
//const mongoUrl = 'mongodb://localhost:27017/react-app'
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/react-app?authSource=admin`
const connectWithRetry = () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB is connected!')
  })
  .catch(error => {
    console.error('Failed to connect mongoDB!', error)
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry()

//redis
// let RedisStore = require('connect-redis')(session)
// let redisClient = redis.createClient({
//   host: REDIS_IP,
//   port: REDIS_PORT
// })

// redisClient.on('error', function (err) {
//   console.log('Could not establish a connection with redis. ' + err);
// })
// redisClient.on('connect', function (err) {
//   console.log('Connected to redis successfully');
// })

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: SESSION_SECRET,
//     cookie: {
//       secure: false,
//       resave: false,
//       saveUninitialized: false,
//       httpOnly: true,
//       maxAge: 3600000
//     }
//   })
// )


//api router
app.use('/api', indexRouter);

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
