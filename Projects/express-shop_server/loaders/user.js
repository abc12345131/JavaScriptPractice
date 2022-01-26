exports.batchUsers = async (keys, models) => {
  const users = await models.UserModel.findAll({
    where: {
      id: {
        $in: keys,
      },
    },
  });

  return keys.map(key => users.find(user => user.id === key));
};
