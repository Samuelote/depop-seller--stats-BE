const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
  Query: {
    login: async (_, { email, password }) => {
      // Gets user from db
      const user = await User.findOne({ email: email })
      if (!user) {
        throw new Error('User does not exist')
      }
      // Compares password hashes
      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) {
        throw new Error('Password is incorrect')
      }
      // Creates Token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        // will want to produce some longer complex key
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      )
      // return token
      return {
        ...user.toObject(),
        email,
        userId: user.id,
        token,
        tokenExpiration: 1
      }
    }
  }
}
