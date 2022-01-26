const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const DataLoader = require('dataloader')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const debug = require('debug')('express-shop-server:server')
const http = require('http');
const jwt = require('./utils/jsonwebtoken')
const errorHandler = require('./middlewares/errorHandlerMiddleware')
const { JWT_SECRET } = require('./config/config')
const schemas = require('./schema')
const resolvers = require('./resolvers')
const models = require('./models')
const loaders = require('./loaders')

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

/**
 * Get port from environment and store in Express.
 */
 const port = normalizePort(process.env.PORT || '4000');
 app.set('port', port);



const getMe = async req => {
  const token = req.headers['x-token']

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      )
    }
  }
}


const apolloServer = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schemas,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')

    return {
      ...error,
      message,
    }
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.userLoader.batchUsers(keys, models),
          ),
        },
      }
    }

    if (req) {
      try {
        const me = await getMe(req)
      } catch(e) {
        throw new AuthenticationError(
          'Your session expired. Sign in again.'
        )
      }
      
      return {
        models,
        me,
        secret: JWT_SECRET,
        loaders: {
          user: new DataLoader(keys =>
            loaders.userLoader.batchUsers(keys, models),
          ),
        },
      }
    }
  },
})

apolloServer.start()
  .then(response => {
    apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' })
  })
  .catch(error=>{
    console.error(`Unable to start apollo server:`, error)
  })

/**
 * Create HTTP server.
 */
const httpServer = http.createServer(app)

models.sequelize.sync({ force: true })
  .then(async () => {
    createUsersWithMessages(new Date())
    httpServer.listen(port, () => {
      console.log(`Apollo Server on http://localhost:${port}/graphql`)
    })
  })
  .catch(error=>{
    console.error(`Unable to synchronize apollo server with database:`, error)
  })

const createUsersWithMessages = async (date) => {
    await models.UserModel.create(
      {
        username: 'admin',
        email: 'abc12345131@gmail.com',
        password: 'admin',
        role: 'ADMIN',
        messages: [
          {
            text: 'Published the Road to learn React',
            createdAt: date.setSeconds(date.getSeconds() + 1),
          },
        ],
      },
      {
        include: [models.MessageModel],
      },
    );
  
    await models.UserModel.create(
      {
        username: 'testuser1',
        email: 'testuser1@gmail.com',
        password: 'testuser1',
        messages: [
          {
            text: 'Happy to release ...',
            createdAt: date.setSeconds(date.getSeconds() + 1),
          },
          {
            text: 'Published a complete ...',
            createdAt: date.setSeconds(date.getSeconds() + 1),
          },
        ],
      },
      {
        include: [models.MessageModel],
      },
    )
  }

/**
 * Listen on provided port, on all network interfaces.
 */

httpServer.on('error', onError);
httpServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

 function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}