const jwt = require('../utils/jsonwebtoken')
const { combineResolvers } = require('graphql-resolvers')
const { AuthenticationError, UserInputError } = require('apollo-server-express')
const { isAdmin, isAuthenticated } = require('./authorization')

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  })
}

module.exports = {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.UserModel.findAll()
    },
    user: async (parent, { id }, { models }) => {
      return await models.UserModel.findById(id);
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return await models.UserModel.findById(me.id)
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret },
    ) => {
      const user = await models.UserModel.create({
        username,
        email,
        password,
      })

      return { token: createToken(user, secret, '30m') }
    },

    signIn: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.UserModel.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        )
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.')
      }

      return { token: createToken(user, secret, '30m') }
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, me }) => {
        const user = await models.UserModel.findById(me.id)
        return await user.update({ username })
      },
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.UserModel.destroy({
          where: { id },
        })
      },
    ),
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.MessageModel.findAll({
        where: {
          userId: user.id,
        },
      })
    },
  },
}
