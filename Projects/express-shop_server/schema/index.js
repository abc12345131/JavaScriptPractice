const { gql } = require('apollo-server-express')

const userSchema = require('./user')
const messageSchema = require('./message')

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

const schemas = [
  linkSchema,
  userSchema,
  messageSchema
]

module.exports = schemas
