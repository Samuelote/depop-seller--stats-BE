const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const { verify } = require('jsonwebtoken')
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers')
const bodyParser = require('body-parser')
const { createAccessToken, createRefreshToken } = require('./src/resolvers/auth/util')

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

// Auth and Session Middleware
const isAuth = (req, _, next) => {
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
app.post('/refresh_token', (req, res) => {
  const token = req.body
  console.log('TOKEN', req)
  return {
    refreshToken: 'asdf'
  }
  res.send('hello')
  // try {
  //   const payload = verify(token, process.env.ACCESS_TOKEN)
  //   req.payload = payload
  // } catch (err) {
  //   throw new Error('Wrong refresh token')
  // }
})

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(isAuth)

server.applyMiddleware({ app })

app.listen(5000, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
)
