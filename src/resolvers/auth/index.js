const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const { createAccessToken, createRefreshToken } = require('./util')

module.exports = {
  Query: {
    getUser: async (_, __, { req }) => {
      try {
        const user = await User.findOne({ email: req.payload.email })
        return {
          ...user.toObject(),
          id: user.toObject()._id
        }
      } catch {
        throw new Error('not authenticated')
      }
    }
  },
  Mutation: {
    login: async (_, { email, password }) => {
      // Gets user from db
      try {
        var user = await User.findOne({ email })
      } catch {
        throw new Error('User does not exist')
      }

      try {
        // Compares password hashes
        await bcrypt.compare(password, user.password)
      } catch {
        throw new Error('Password is incorrect')
      }
      // Creates Token
      const token = createAccessToken(user) // 1h expiration
      return {
        ...user.toObject(),
        email,
        userId: user.id,
        accessToken: token,
        refreshToken: createRefreshToken(user)
      }
    }

  }
}
