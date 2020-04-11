const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')
require('./dbconfig')

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
