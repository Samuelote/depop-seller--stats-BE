const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const { verify } = require('jsonwebtoken')
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')
const bodyParser = require('body-parser')

require('./dbconfig')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res, payload }) => ({ req, res, payload })
})
const app = express()
// enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
}

const isAuth = async (req, _, next) => {
  const authorization = req.headers.authorization
  let token
  if (authorization) {
    token = authorization.split(' ')[1]
  }
  if (token) {
    try {
      const payload = verify(token, process.env.ACCESS_TOKEN)
      req.payload = payload
      next()
    } catch (err) {
      next()
      throw new Error('not authenticated')
    }
  } else {
    next()
  }
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(isAuth)
// Auth and Session Middleware

server.applyMiddleware({ app })

app.listen(5000, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
)
