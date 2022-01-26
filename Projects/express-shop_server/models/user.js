const bcrypt = require('bcrypt')

module.exports = (sequelize, Sequelize) => {
  const UserModel = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 42],
      },
    },
    role: {
      type: DataTypes.STRING,
    },
  })

  UserModel.associate = models => {
    UserModel.hasMany(models.MessageModel, { onDelete: 'CASCADE' });
  }

  UserModel.findByLogin = async login => {
    let user = await UserModel.findOne({
      where: { username: login },
    })

    if (!user) {
      user = await UserModel.findOne({
        where: { email: login },
      })
    }

    return user;
  }

  UserModel.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  UserModel.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  UserModel.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  
  return UserModel
};
