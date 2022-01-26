module.exports = (sequelize, Sequelize) => {
  const MessageModel = sequelize.define('message', {
    id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
    type: {
			allowNull: false,
			type: Sequelize.STRING,
		},
    text: {
      type: Sequelize.STRING,
      validate: { notEmpty: true },
    },
  })

  MessageModel.associate = models => {
    MessageModel.belongsTo(models.UserModel);
  }

  return MessageModel
};

