const Sequelize = require('sequelize')
const { combineResolvers } = require('graphql-resolvers')
const { PubSub } = require('graphql-subscriptions')
const EVENTS = require('../subscription')
const { isAuthenticated, isMessageOwner } = require('./authorization')

const pubsub = new PubSub()
const toCursorHash = string => Buffer.from(string).toString('base64')
const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii')

module.exports = {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: fromCursorHash(cursor),
              },
            },
          }
        : {}

      const messages = await models.MessageModel.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      })

      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    message: async (parent, { id }, { models }) => {
      return await models.MessageModel.findById(id)
    },
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const message = await models.MessageModel.create({
          text,
          userId: me.id,
        });

        pubsub.publish(EVENTS.MESSAGE.CREATED, {
          messageCreated: { message },
        });

        return message;
      },
    ),

    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } })
      },
    ),
  },

  Message: {
    user: async (message, args, { loaders }) => {
      return await loaders.user.load(message.userId)
    },
  },

  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
}
