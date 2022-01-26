const Sequelize = require('sequelize');
const { 
  DATABASE_IP,
  DATABASE_TYPE,
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  POOL_MAX,
  POOL_MIN,
  POOL_ACQUIRE,
  POOL_IDLE,
} = require('./config/config')

pool= {
  max: POOL_MAX,
  min: POOL_MIN,
  acquire: POOL_ACQUIRE,
  idle: POOL_IDLE
}
//sequelize
let sequelize
if (process.env.DATABASE_IP) {
  sequelize = new Sequelize(
    DATABASE,
    DATABASE_USER,
    DATABASE_PASSWORD, 
    {
      host: DATABASE_IP,
      dialect: DATABASE_TYPE,
      operatorsAliases: false,
      pool: pool
    }
  );
} else {
  sequelize = new Sequelize(
    DATABASE,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
      host: 'localhost',
      dialect: DATABASE_TYPE,
      operatorsAliases: false,
      pool: pool
    },
  );
}

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error(`Unable to connect to the database:`, error)
}

const models = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  MessageModel: require("./message")(sequelize, Sequelize),
  UserModel: require("./user")(sequelize, Sequelize),
  TutorialModel: require("./tutorial.js")(sequelize, Sequelize)
}

module.exports = models
