const bcrypt = require('bcryptjs')
const User = require('../../models/user')

module.exports = {

  Mutation: {
    createUser: async (_, args) => {
      try {
        const existingUser = await User.findOne({
          email: args.email
        })
        if (existingUser) {
          throw new Error('User already exists.')
        }

        // 12 rounds of salting(?) is considered 'safe'
        return bcrypt
          .hash(args.password, 12)
          .then(hashPass => {
            const user = new User({
              ...args,
              password: hashPass,
              files: [],
              account: {
                type: 'standard',
                subscription: null
              },
              payment: {
                type: null
              }
            })
            return user.save()
          })
          .then(result => {
            return { ...result._doc, _id: result.id }
          })

          .catch(err => {
            console.log(err)
            throw err
          })
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
}
