
const jwt = require('jsonwebtoken')

module.exports = {

  createAccessToken: (user) => {
    return jwt.sign(
      { userId: user.id, email: user.email },
      // will want to produce some longer complex key
      process.env.ACCESS_TOKEN,
      { expiresIn: '15m' }
    )
  },

  createRefreshToken: (user) => {
    return jwt.sign(
      { userId: user.id, email: user.email },
      // will want to produce some longer complex key
      process.env.REFRESH_TOKEN,
      { expiresIn: '7d' }
    )
  }
}
