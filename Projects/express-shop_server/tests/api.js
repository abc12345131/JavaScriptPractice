const axios = require('axios')

const API_URL = 'http://localhost:8000/graphql';

exports.signIn = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    variables,
  })

exports.me = async token =>
  await axios.post(
    API_URL,
    {
      query: `
        {
          me {
            id
            email
            username
          }
        }
      `,
    },
    token
      ? {
          headers: {
            'x-token': token,
          },
        }
      : null,
  )

exports.user = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          username
          email
          role
        }
      }
    `,
    variables,
  })

exports.users = async () =>
  axios.post(API_URL, {
    query: `
      {
        users {
          id
          username
          email
          role
        }
      }
    `,
  })

exports.signUp = async variables =>
  axios.post(API_URL, {
    query: `
      mutation(
        $username: String!,
        $email: String!,
        $password: String!
      ) {
        signUp(
          username: $username,
          email: $email,
          password: $password
        ) {
          token
        }
      }
    `,
    variables,
  })

exports.updateUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($username: String!) {
          updateUser(username: $username) {
            username
          }
        }
      `,
      variables,
    },
    token
      ? {
          headers: {
            'x-token': token,
          },
        }
      : null,
  )

exports.deleteUser = async (variables, token) =>
  axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables,
    },
    token
      ? {
          headers: {
            'x-token': token,
          },
        }
      : null,
  )
