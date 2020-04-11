const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String
    files: [String]
    account: Account
  }
  type Account {
    type: String!
    subscription: String
  }
  input UserInput {
    email: String!
    password: String!
  }

  type LoginData {
    id: ID!
    email: String!
    files: [String]
    account: Account
    token: String!
    tokenExpiration: Int!
  }
  type Query {
    login(email: String!, password: String!): LoginData!
  }

  type Mutation {
    createUser(email: String!, password: String!): User
  }
`

module.exports = typeDefs
