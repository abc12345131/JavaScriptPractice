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
const { 
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  //REDIS_IP,
  //REDIS_PORT,
  //SESSION_SECRET
} = require('./config/config')
const errorHandler = require('./middlewares/errorHandlerMiddleware')


const app = express();

//cors
//const origin = process.env.NODE_ENV === "development" ? "http://localhost:3000": "http://example.com"
app.use(cors({
  //credentials: true,
  //origin
}));

//proxy setting
app.enable('trust proxy');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongoose
let mongoUrl
if(process.env.MONGO_IP) {
  mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/react-app?authSource=admin`
} else {
  mongoUrl = 'mongodb://localhost:27017/react-app'
}

const connectWithRetry = () => {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB is connected!')
  })
  .catch(error => {
    console.error(`Failed to connect mongoDB at ${mongoUrl}!`, error)
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

// if frontend and backend project deployed together, incase of frontend router not working
// app.use((req, res) => {
//   fs.readFile(__dirname + '/public/index.html', (err, data)=>{
//     if(err){
//       console.log(err)
//       res.send('Server error')
//     } else {
//       res.writeHead(200, {
//         'Content-Type': 'text/html; charset=utf-8',
//       });
//       res.send(data)
//     }
//   })
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
