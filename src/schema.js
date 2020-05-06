const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String
    files: [String]!
    account: Account
    # make sure to add email notification option
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
    userId: ID!
    email: String!
    files: [String]!
    account: Account
    accessToken: String!
    refreshToken: String!
  }

  type File {
    filename: String!
    content: String
  }
  type Query {
    getFiles: [File]
    getUser: User
  }

  type Mutation {
    login(email: String!, password: String!): LoginData!
    createUser(email: String!, password: String!): User
    uploadFile(file: Upload!): Boolean
    deleteFile(file: String!): Boolean
    updateFile(file: String!): Boolean
  }
`

module.exports = typeDefs
