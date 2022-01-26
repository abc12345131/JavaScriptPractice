const { ForbiddenError } = require('apollo-server')
const { combineResolvers, skip } = require('graphql-resolvers')

const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.')

exports.isAuthenticated = isAuthenticated

exports.isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
)

exports.isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const message = await models.MessageModel.findById(id, { raw: true });

  if (message.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip
}
