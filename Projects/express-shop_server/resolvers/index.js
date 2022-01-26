const { GraphQLDateTime } = require('graphql-iso-date')
const userResolvers = require('./user')
const messageResolvers = require('./message')

const customScalarResolvers = {
  Date: GraphQLDateTime,
};

const resolvers = [
  customScalarResolvers,
  userResolvers,
  messageResolvers,
]

module.exports = resolvers

